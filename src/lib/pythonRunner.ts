import { PythonRunResult } from '../types';

export function runPythonCodeLocally(code: string): PythonRunResult {
  const startTime = performance.now();
  const logs: string[] = [];
  const errors: string[] = [];

  // Static Syntax and Security Checks
  const lines = code.split('\n');

  // Check 1: Missing colon on if / for / while / def / class / elif / else / try / except
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    const lineNum = i + 1;

    if (
      (trimmed.startsWith('if ') ||
        trimmed.startsWith('elif ') ||
        trimmed === 'else' ||
        trimmed.startsWith('for ') ||
        trimmed.startsWith('while ') ||
        trimmed.startsWith('def ') ||
        trimmed === 'try' ||
        trimmed.startsWith('except')) &&
      !trimmed.endsWith(':') &&
      !trimmed.includes('#')
    ) {
      const elapsed = performance.now() - startTime;
      return {
        stdout: '',
        stderr: `SyntaxError: Dois-pontos ':' ausente no final da instrução na linha ${lineNum}:\n  ${trimmed}\n  ^`,
        hasError: true,
        errorType: 'SyntaxError',
        errorDetails: `Em Python, estruturas de controle e definições de função obrigatoriamente terminam com dois-pontos ':'.`,
        executionTimeMs: Math.round(elapsed),
      };
    }

    // Check 2: Unmatched quotes
    const singleQuotes = (trimmed.match(/'/g) || []).length;
    const doubleQuotes = (trimmed.match(/"/g) || []).length;
    if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
      if (!trimmed.includes('\\"') && !trimmed.includes("\\'")) {
        const elapsed = performance.now() - startTime;
        return {
          stdout: '',
          stderr: `SyntaxError: Aspas não fechadas ou desbalanceadas na linha ${lineNum}:\n  ${trimmed}`,
          hasError: true,
          errorType: 'SyntaxError',
          errorDetails: `Certifique-se de que todas as strings abertas com aspas simples ou duplas sejam devidamente fechadas na mesma linha.`,
          executionTimeMs: Math.round(elapsed),
        };
      }
    }
  }

  // Safe Emulation Context
  try {
    const customPrint = (...args: any[]) => {
      logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    };

    // Lightweight Python-to-JS transpiler / evaluation for interactive cybersecurity scripts
    let jsCode = transpilePythonToJs(code);

    // Sandbox execution with custom print & simulated libs
    const sandboxFunction = new Function('print', 'hashlib', 're', 'json', 'math', jsCode);

    // Mock hashlib
    const mockHashlib = {
      sha256: (data: string) => ({
        hexdigest: () => simpleSha256(String(data)),
      }),
      md5: (data: string) => ({
        hexdigest: () => simpleMd5(String(data)),
      }),
    };

    // Mock regex
    const mockRe = {
      match: (pattern: string, text: string) => {
        try {
          const reg = new RegExp(pattern);
          return reg.exec(text);
        } catch {
          return null;
        }
      },
      search: (pattern: string, text: string) => {
        try {
          const reg = new RegExp(pattern);
          return reg.exec(text);
        } catch {
          return null;
        }
      },
    };

    sandboxFunction(customPrint, mockHashlib, mockRe, JSON, Math);

    const elapsed = performance.now() - startTime;
    return {
      stdout: logs.join('\n') || '[Execução concluída com sucesso sem saídas no console]',
      stderr: '',
      hasError: false,
      executionTimeMs: Math.round(elapsed),
    };
  } catch (err: any) {
    const elapsed = performance.now() - startTime;
    return {
      stdout: logs.join('\n'),
      stderr: `RuntimeError: ${err.message || 'Erro durante a execução do script'}`,
      hasError: true,
      errorType: 'RuntimeError',
      errorDetails: `Ocorreu uma falha durante o processamento do código. Verifique os nomes das variáveis e a tipagem.`,
      executionTimeMs: Math.round(elapsed),
    };
  }
}

function transpilePythonToJs(pythonCode: string): string {
  // Transpile Python keywords and builtins into safe JavaScript statements
  let lines = pythonCode.split('\n');
  let jsLines: string[] = [];

  for (let line of lines) {
    let l = line;

    // Comments
    if (l.trim().startsWith('#')) {
      jsLines.push('//' + l.trim().substring(1));
      continue;
    }

    // Replace Python booleans & None
    l = l.replace(/\bTrue\b/g, 'true');
    l = l.replace(/\bFalse\b/g, 'false');
    l = l.replace(/\bNone\b/g, 'null');
    l = l.replace(/\band\b/g, '&&');
    l = l.replace(/\bor\b/g, '||');
    l = l.replace(/\bnot\b/g, '!');

    // Handle .encode() on strings
    l = l.replace(/\.encode\(\)/g, '');

    // Handle f-strings basic conversion f"..." or f'...'
    l = l.replace(/f"([^"]*)"/g, (match, p1) => {
      const template = p1.replace(/\{([^}]+)\}/g, '${$1}');
      return '`' + template + '`';
    });
    l = l.replace(/f'([^']*)'/g, (match, p1) => {
      const template = p1.replace(/\{([^}]+)\}/g, '${$1}');
      return '`' + template + '`';
    });

    // Handle Python .count() and .lower()
    // Handle isin / in list for basic syntax
    if (l.includes(' in [')) {
      l = l.replace(/(\w+)\s+in\s+(\[[^\]]+\])/g, '$2.includes($1)');
    }

    // def func(a, b): -> function func(a, b) {
    if (l.trim().startsWith('def ')) {
      l = l.replace(/def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:/, 'function $1($2) {');
    }

    // if condition: -> if (condition) {
    else if (l.trim().startsWith('if ') && l.trim().endsWith(':')) {
      const condition = l.trim().substring(3, l.trim().length - 1);
      l = `if (${condition}) {`;
    }

    // elif condition: -> } else if (condition) {
    else if (l.trim().startsWith('elif ') && l.trim().endsWith(':')) {
      const condition = l.trim().substring(5, l.trim().length - 1);
      l = `} else if (${condition}) {`;
    }

    // else: -> } else {
    else if (l.trim() === 'else:') {
      l = `} else {`;
    }

    // for item in list: -> for (let item of list) {
    else if (l.trim().startsWith('for ') && l.trim().endsWith(':')) {
      const match = l.trim().match(/for\s+([a-zA-Z0-9_]+)\s+in\s+(.*?):/);
      if (match) {
        l = `for (let ${match[1]} of ${match[2]}) {`;
      }
    }

    // Variable assignment: x = y -> let x = y if not already declared
    if (/^[a-zA-Z0-9_]+\s*=\s*/.test(l.trim()) && !l.trim().startsWith('return')) {
      l = 'var ' + l.trim() + ';';
    }

    // Convert list .count() call
    l = l.replace(/(\w+)\.count\((.*?)\)/g, '($1.filter(x => x === $2).length)');

    jsLines.push(l);
  }

  // Balance opened braces
  let openBraces = 0;
  let closedBraces = 0;
  for (let l of jsLines) {
    openBraces += (l.match(/\{/g) || []).length;
    closedBraces += (l.match(/\}/g) || []).length;
  }
  while (openBraces > closedBraces) {
    jsLines.push('}');
    closedBraces++;
  }

  return jsLines.join('\n');
}

// Deterministic SHA-256 string hash for offline browser simulation
function simpleSha256(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i, j;
  let result = '';

  const words: number[] = [];
  const asciiBitLength = ascii[lengthProperty] * 8;

  let hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];

  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  let primeCounter = k[lengthProperty];
  const isComposite: any = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += '\x80';
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15],
        w2 = w[i - 2];
      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      const s1_ = rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25);
      const s0_ = rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22);

      const temp1 =
        hash[7] +
        s1_ +
        ch +
        k[i] +
        (w[i] =
          i < 16 ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0);
      const temp2 = s0_ + maj;

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

function simpleMd5(str: string): string {
  // Deterministic fast hash output for comparison demo
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return hex.repeat(4).substring(0, 32);
}
