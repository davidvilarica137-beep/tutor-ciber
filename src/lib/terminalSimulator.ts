export interface VirtualFile {
  name: string;
  type: 'file' | 'dir';
  permissions: string; // e.g. "rw-r--r--" or "rwx------"
  owner: string;
  size: number;
  content?: string;
}

export interface TerminalState {
  currentPath: string;
  user: string;
  hostname: string;
  history: string[];
  files: Record<string, VirtualFile[]>; // path -> files
}

export const INITIAL_TERMINAL_STATE: TerminalState = {
  currentPath: '/home/aluno',
  user: 'aluno',
  hostname: 'dnf-cyberlab',
  history: [],
  files: {
    '/home/aluno': [
      {
        name: 'script_defensivo.py',
        type: 'file',
        permissions: 'rw-r--r--',
        owner: 'aluno',
        size: 248,
        content: `# Script de Auditoria DNF\nimport hashlib\n\nprint("[+] Verificando integridade...")`,
      },
      {
        name: 'config_secreta.env',
        type: 'file',
        permissions: 'rw-------',
        owner: 'aluno',
        size: 84,
        content: `DB_HOST=127.0.0.1\nDB_PORT=5432\nAPI_SECRET_KEY=super_secret_cyber_key_2026`,
      },
      {
        name: 'auth.log',
        type: 'file',
        permissions: 'rw-r--r--',
        owner: 'aluno',
        size: 1024,
        content: `Aug 16 14:02:11 dnf-lab sshd[124]: Failed password for invalid user root from 192.168.1.100 port 55214 ssh2\nAug 16 14:02:14 dnf-lab sshd[126]: Failed password for invalid user admin from 192.168.1.100 port 55218 ssh2\nAug 16 14:02:17 dnf-lab sshd[129]: Failed password for invalid user test from 192.168.1.100 port 55220 ssh2\nAug 16 14:05:00 dnf-lab sshd[135]: Accepted publickey for aluno from 192.168.1.50 port 44321 ssh2`,
      },
      {
        name: 'labs',
        type: 'dir',
        permissions: 'rwxr-xr-x',
        owner: 'aluno',
        size: 4096,
      },
    ],
    '/home/aluno/labs': [
      {
        name: 'port_scanner.py',
        type: 'file',
        permissions: 'rwxr-xr-x',
        owner: 'aluno',
        size: 512,
        content: `# Port scanner de laboratorio autorizado\nprint("Escaneando 127.0.0.1 nas portas 22, 80, 443...")`,
      },
    ],
  },
};

export function executeTerminalCommand(
  cmdLine: string,
  state: TerminalState
): { output: string; newState: TerminalState } {
  const trimmed = cmdLine.trim();
  if (!trimmed) {
    return { output: '', newState: state };
  }

  const parts = trimmed.split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  const updatedHistory = [...state.history, trimmed];
  let newState: TerminalState = { ...state, history: updatedHistory };

  switch (command) {
    case 'clear':
      return { output: '__CLEAR__', newState };

    case 'pwd':
      return { output: state.currentPath, newState };

    case 'whoami':
      return { output: state.user, newState };

    case 'id':
      return {
        output: `uid=1000(${state.user}) gid=1000(${state.user}) groups=1000(${state.user}),27(sudo),4(adm)`,
        newState,
      };

    case 'uname':
      if (args.includes('-a')) {
        return {
          output: 'Linux dnf-cyberlab 6.8.0-security #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
          newState,
        };
      }
      return { output: 'Linux', newState };

    case 'ls': {
      const currentFiles = state.files[state.currentPath] || [];
      if (args.includes('-l') || args.includes('-la') || args.includes('-al')) {
        let lines = [`total ${currentFiles.length * 4}`];
        for (const file of currentFiles) {
          const typeChar = file.type === 'dir' ? 'd' : '-';
          lines.push(
            `${typeChar}${file.permissions}  1 ${file.owner} ${file.owner}  ${file.size.toString().padStart(5, ' ')} Aug 16 17:20 ${file.name}`
          );
        }
        return { output: lines.join('\n'), newState };
      }
      const names = currentFiles.map((f) => (f.type === 'dir' ? `${f.name}/` : f.name)).join('  ');
      return { output: names || '(diretório vazio)', newState };
    }

    case 'cd': {
      const target = args[0] || '/home/aluno';
      if (target === '..') {
        if (state.currentPath === '/home/aluno/labs') {
          newState.currentPath = '/home/aluno';
          return { output: '', newState };
        }
        return { output: '', newState };
      }
      if (target === 'labs' && state.currentPath === '/home/aluno') {
        newState.currentPath = '/home/aluno/labs';
        return { output: '', newState };
      }
      if (target === '/home/aluno' || target === '~') {
        newState.currentPath = '/home/aluno';
        return { output: '', newState };
      }
      return { output: `cd: ${target}: Diretório não encontrado`, newState };
    }

    case 'cat': {
      if (!args[0]) {
        return { output: 'Uso: cat <nome_do_arquivo>', newState };
      }
      const currentFiles = state.files[state.currentPath] || [];
      const file = currentFiles.find((f) => f.name === args[0]);
      if (!file) {
        return { output: `cat: ${args[0]}: Arquivo não encontrado`, newState };
      }
      if (file.type === 'dir') {
        return { output: `cat: ${args[0]}: É um diretório`, newState };
      }
      return { output: file.content || '(arquivo vazio)', newState };
    }

    case 'chmod': {
      if (args.length < 2) {
        return { output: 'Uso: chmod <modo_octal> <arquivo> (ex: chmod 600 arquivo.env)', newState };
      }
      const mode = args[0];
      const targetFile = args[1];
      const currentFiles = state.files[state.currentPath] || [];
      const fileIndex = currentFiles.findIndex((f) => f.name === targetFile);
      if (fileIndex === -1) {
        return { output: `chmod: impossível acessar '${targetFile}': Arquivo não encontrado`, newState };
      }

      // Convert octal mode to string permissions representation
      let permStr = 'rw-r--r--';
      if (mode === '600') permStr = 'rw-------';
      if (mode === '777') permStr = 'rwxrwxrwx';
      if (mode === '755') permStr = 'rwxr-xr-x';
      if (mode === '644') permStr = 'rw-r--r--';

      const updatedFiles = [...currentFiles];
      updatedFiles[fileIndex] = { ...updatedFiles[fileIndex], permissions: permStr };
      newState.files = { ...newState.files, [state.currentPath]: updatedFiles };

      let warning = '';
      if (mode === '777') {
        warning = '\n⚠️ [ALERTA DE SEGURANÇA]: chmod 777 concede permissão total para qualquer usuário no sistema.';
      } else if (mode === '600') {
        warning = '\n🛡️ [BOA PRÁTICA]: chmod 600 garante acesso estrito apenas ao proprietário.';
      }

      return {
        output: `Permissões de '${targetFile}' atualizadas para ${mode} (${permStr}).${warning}`,
        newState,
      };
    }

    case 'grep': {
      if (args.length < 2) {
        return { output: 'Uso: grep <termo> <arquivo> (ex: grep Failed auth.log)', newState };
      }
      const term = args[0].replace(/['"]/g, '');
      const filename = args[1];
      const currentFiles = state.files[state.currentPath] || [];
      const file = currentFiles.find((f) => f.name === filename);
      if (!file) {
        return { output: `grep: ${filename}: Arquivo não encontrado`, newState };
      }
      const matches = (file.content || '')
        .split('\n')
        .filter((line) => line.toLowerCase().includes(term.toLowerCase()));
      return { output: matches.join('\n') || `Nenhuma correspondência para '${term}'`, newState };
    }

    case 'nmap': {
      const target = args.find((a) => !a.startsWith('-')) || '127.0.0.1';
      return {
        output: `Iniciando Nmap 7.94 no alvo autorizado ${target}...\n` +
          `Host is up (0.00045s latency).\n` +
          `PORT     STATE SERVICE     VERSION\n` +
          `22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu\n` +
          `80/tcp   open  http        Nginx 1.18.0 (Alerta: Texto Claro)\n` +
          `443/tcp  open  ssl/https   Nginx 1.18.0 (TLS 1.3 Seguro)\n` +
          `3306/tcp closed mysql\n\n` +
          `Nmap scan report completed: 1 IP address (1 host up) scanned in 0.42 seconds.`,
        newState,
      };
    }

    case 'curl': {
      if (args.includes('-I') || args.includes('--head')) {
        return {
          output: `HTTP/1.1 200 OK\n` +
            `Date: Sun, 16 Aug 2026 17:20:00 GMT\n` +
            `Server: DNF-Secure-Server/2.4\n` +
            `Content-Type: text/html; charset=UTF-8\n` +
            `Strict-Transport-Security: max-age=31536000; includeSubDomains\n` +
            `X-Frame-Options: DENY\n` +
            `X-Content-Type-Options: nosniff\n` +
            `Content-Security-Policy: default-src 'self'\n` +
            `Set-Cookie: session=xyz98765; Secure; HttpOnly; SameSite=Strict`,
          newState,
        };
      }
      return {
        output: `<!DOCTYPE html>\n<html>\n<head><title>DNF Cyber Lab</title></head>\n<body><h1>Ambiente de Ensino Seguro DNF</h1></body>\n</html>`,
        newState,
      };
    }

    case 'ping': {
      const host = args[0] || '127.0.0.1';
      return {
        output: `PING ${host} (127.0.0.1) 56(84) bytes of data.\n` +
          `64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.034 ms\n` +
          `64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms\n` +
          `--- ${host} estatísticas de ping ---\n2 pacotes transmitidos, 2 recebidos, 0% perda de pacotes`,
        newState,
      };
    }

    case 'history':
      return {
        output: updatedHistory.map((h, i) => `${(i + 1).toString().padStart(4, ' ')}  ${h}`).join('\n'),
        newState,
      };

    case 'help':
      return {
        output: `Comandos suportados no DNF CyberLab:\n` +
          `  ls [-l]       - Lista arquivos e permissões\n` +
          `  pwd           - Exibe o diretório de trabalho atual\n` +
          `  cd <pasta>    - Altera de diretório\n` +
          `  cat <arquivo> - Exibe o conteúdo de um arquivo\n` +
          `  chmod <modo>  - Altera permissões octais (ex: chmod 600 config.env)\n` +
          `  grep <termo>  - Busca padrões e termos em arquivos de log\n` +
          `  nmap <alvo>   - Simula varredura autorizada de portas\n` +
          `  curl -I <url> - Inspeciona cabeçalhos HTTP e cookies de segurança\n` +
          `  ping <alvo>   - Testa conectividade de rede\n` +
          `  whoami, id    - Exibe usuário e grupos do sistema\n` +
          `  clear         - Limpa a tela do terminal`,
        newState,
      };

    default:
      return {
        output: `bash: ${command}: comando não encontrado. Digite 'help' para ver os comandos de laboratório.`,
        newState,
      };
  }
}
