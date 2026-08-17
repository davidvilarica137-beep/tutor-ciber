import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Globe,
  Database,
  Key,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SecurityPlaygroundProps {
  onExerciseCompleted: (id: string) => void;
}

export const SecurityPlayground: React.FC<SecurityPlaygroundProps> = ({ onExerciseCompleted }) => {
  const [activeLab, setActiveLab] = useState<'sqli' | 'hashing' | 'headers' | 'portscan'>('sqli');

  // SQLi state
  const [sqliInput, setSqliInput] = useState("admin' OR '1'='1");

  // Hashing state
  const [passwordInput, setPasswordInput] = useState('senha123');
  const [saltEnabled, setSaltEnabled] = useState(true);

  // Headers state
  const [headersState, setHeadersState] = useState({
    hsts: true,
    csp: true,
    xframe: true,
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  // Port scan state
  const [selectedPort, setSelectedPort] = useState<number | null>(443);

  // Simplified hashing simulation for visual demonstration
  const getSimpleHash = (str: string, algo: 'md5' | 'sha256') => {
    let hash = 0;
    const finalStr = algo === 'sha256' && saltEnabled ? `$salt_dnf_2026$${str}` : str;
    for (let i = 0; i < finalStr.length; i++) {
      hash = (hash << 5) - hash + finalStr.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return algo === 'md5' ? hex.repeat(4).substring(0, 32) : hex.repeat(8).substring(0, 64);
  };

  const calculateHeaderScore = () => {
    const total = Object.values(headersState).filter(Boolean).length;
    return Math.round((total / 6) * 100);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] min-h-[580px] bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
      {/* Playground Sub-Header Navigation */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveLab('sqli')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeLab === 'sqli'
                ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>SQL Injection vs Prepared Statements</span>
          </button>

          <button
            onClick={() => setActiveLab('hashing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeLab === 'hashing'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Criptografia & Hashes (MD5 vs SHA-256)</span>
          </button>

          <button
            onClick={() => setActiveLab('headers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeLab === 'headers'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Headers HTTP & Proteção de Cookies</span>
          </button>

          <button
            onClick={() => setActiveLab('portscan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeLab === 'portscan'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Scanner TCP & Handshake 3-Way</span>
          </button>
        </div>
      </div>

      {/* Lab Content Area */}
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto font-sans">
        {/* LAB 1: SQL INJECTION */}
        {activeLab === 'sqli' && (
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Database className="w-5 h-5 text-rose-400" />
                <span>Simulador: SQL Injection vs Consultas Parametrizadas</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Veja visualmente por que a concatenação direta quebra a sintaxe da consulta e como as queries preparadas neutralizam o ataque.
              </p>
            </div>

            {/* Input Test Bench */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="text-xs font-mono text-slate-300 block">
                Entrada do Usuário (Teste diferentes payloads maliciosos ou logins comuns):
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={sqliInput}
                  onChange={(e) => setSqliInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-emerald-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  placeholder="Ex: admin' OR '1'='1"
                />
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setSqliInput("admin' OR '1'='1")}
                    className="px-2.5 py-1 text-xs rounded bg-slate-800 text-rose-300 border border-rose-800/60 hover:bg-slate-700"
                  >
                    Payload ' OR '1'='1
                  </button>
                  <button
                    onClick={() => setSqliInput("usuario_legitimo")}
                    className="px-2.5 py-1 text-xs rounded bg-slate-800 text-emerald-300 border border-emerald-800/60 hover:bg-slate-700"
                  >
                    Login Normal
                  </button>
                </div>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vulnerable Concatenation */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/60 space-y-3">
                <div className="flex items-center justify-between text-rose-400 font-bold text-xs">
                  <span className="flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Inseguro: Concatenação de Strings</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-900/60 text-[10px] font-mono text-rose-200">
                    VULNERÁVEL
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs overflow-x-auto text-slate-300 border border-slate-800">
                  <span className="text-slate-500">Query gerada no banco:</span>
                  <div className="mt-1">
                    SELECT * FROM users WHERE user = '
                    <span className="text-rose-400 font-bold bg-rose-950 px-1 rounded">{sqliInput}</span>
                    ' AND pass = '***';
                  </div>
                </div>

                <div className="text-xs text-rose-200 space-y-1">
                  {sqliInput.includes("'") ? (
                    <div className="p-2.5 rounded bg-rose-950/80 border border-rose-700 text-rose-200">
                      🚨 <strong>Ataque Bem-Sucedido!</strong> A aspa simples fechou a string e o comando <code>OR '1'='1'</code> fez a condição ser sempre verdadeira, autenticando sem senha.
                    </div>
                  ) : (
                    <p className="text-slate-400">Nenhuma aspa injetada, mas o código permanece vulnerável a qualquer payload futuro.</p>
                  )}
                </div>
              </div>

              {/* Secure Prepared Statement */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/60 space-y-3">
                <div className="flex items-center justify-between text-emerald-400 font-bold text-xs">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Defensivo: Prepared Statements</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-[10px] font-mono text-emerald-200">
                    SEGURO
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs overflow-x-auto text-slate-300 border border-slate-800">
                  <span className="text-slate-500">Query compilada prévia:</span>
                  <div className="mt-1 text-emerald-300">
                    SELECT * FROM users WHERE user = ? AND pass = ?;
                  </div>
                  <span className="text-slate-500 block mt-2">Parâmetro tratado como dado literal:</span>
                  <div className="text-cyan-300 truncate">
                    param[0] = "{sqliInput}"
                  </div>
                </div>

                <div className="p-2.5 rounded bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-200">
                  🛡️ <strong>100% Protegido!</strong> O banco busca literalmente por um usuário cujo nome seja exatamente o texto digitado. O código nunca é executado como instrução SQL.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAB 2: HASHING & PASSWORDS */}
        {activeLab === 'hashing' && (
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Key className="w-5 h-5 text-amber-400" />
                <span>Simulador: Funções Hash, Salt Criptográfico & Rainbow Tables</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Entenda o impacto do salt e por que o MD5 não deve mais ser usado para armazenamento de credenciais.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="text-xs font-mono text-slate-300 block">
                Digite uma senha de exemplo para calcular os hashes:
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="flex-1 w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={saltEnabled}
                    onChange={(e) => setSaltEnabled(e.target.checked)}
                    className="rounded border-slate-700 text-amber-500 focus:ring-0"
                  />
                  <span>Adicionar Salt Criptográfico</span>
                </label>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* MD5 */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-900/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400">MD5 (Inseguro para senhas):</span>
                  <span className="text-[10px] text-rose-300 px-2 py-0.5 bg-rose-950 rounded">Vulnerável a Rainbow Tables</span>
                </div>
                <div className="p-2 bg-slate-900 rounded text-rose-300 break-all">
                  {getSimpleHash(passwordInput, 'md5')}
                </div>
              </div>

              {/* SHA-256 */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-900/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">SHA-256 {saltEnabled ? '+ Salt' : '(Sem Salt)'}:</span>
                  <span className="text-[10px] text-emerald-300 px-2 py-0.5 bg-emerald-950 rounded">Forte para Integridade</span>
                </div>
                <div className="p-2 bg-slate-900 rounded text-emerald-300 break-all">
                  {getSimpleHash(passwordInput, 'sha256')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAB 3: HEADERS & COOKIES */}
        {activeLab === 'headers' && (
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <span>Auditor Interativo de Cabeçalhos HTTP & Cookies</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ative ou desative as diretivas para ver o impacto na postura de segurança da aplicação.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">Pontuação de Segurança</span>
                <div className="text-lg font-mono font-bold text-emerald-400">
                  {calculateHeaderScore()}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'hsts', title: 'Strict-Transport-Security (HSTS)', desc: 'Força tráfego estritamente HTTPS.' },
                { key: 'csp', title: 'Content-Security-Policy (CSP)', desc: 'Neutraliza ataques de injeção XSS.' },
                { key: 'xframe', title: 'X-Frame-Options: DENY', desc: 'Previne ataques de Clickjacking em iframes.' },
                { key: 'httpOnly', title: 'Cookie Flag: HttpOnly', desc: 'Impede leitura da sessão via JavaScript.' },
                { key: 'secure', title: 'Cookie Flag: Secure', desc: 'Transmite cookies apenas via conexões criptografadas.' },
                { key: 'sameSite', title: 'Cookie Flag: SameSite=Strict', desc: 'Protege contra requisições falsificadas (CSRF).' },
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() =>
                    setHeadersState((prev: any) => ({ ...prev, [item.key]: !prev[item.key] }))
                  }
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer select-none transition-all flex items-start justify-between ${
                    (headersState as any)[item.key]
                      ? 'bg-emerald-950/30 border-emerald-600 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="space-y-1 pr-2">
                    <strong className="font-semibold block text-white">{item.title}</strong>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center text-xs shrink-0 ${
                      (headersState as any)[item.key]
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {(headersState as any)[item.key] ? '✓' : '✕'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LAB 4: PORT SCANNER */}
        {activeLab === 'portscan' && (
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>Simulador: Varredura de Portas TCP & Handshake de 3 Vias</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Selecione uma porta para inspecionar a troca de pacotes SYN, SYN-ACK e ACK em ambiente autorizado.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { port: 22, name: 'SSH (Porta 22)', status: 'OPEN', color: 'emerald' },
                { port: 80, name: 'HTTP (Porta 80)', status: 'OPEN - INSEGURO', color: 'amber' },
                { port: 443, name: 'HTTPS (Porta 443)', status: 'OPEN - SEGURO', color: 'emerald' },
                { port: 3306, name: 'MySQL (Porta 3306)', status: 'CLOSED', color: 'slate' },
              ].map((p) => (
                <button
                  key={p.port}
                  onClick={() => setSelectedPort(p.port)}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    selectedPort === p.port
                      ? 'bg-slate-800 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="font-bold text-white mb-1">{p.name}</div>
                  <div className="font-mono text-[10px] text-emerald-400">{p.status}</div>
                </button>
              ))}
            </div>

            {selectedPort && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
                <h4 className="text-emerald-400 font-bold">
                  Sequência do 3-Way Handshake TCP na Porta {selectedPort}:
                </h4>

                <div className="space-y-2 text-slate-300">
                  <div className="p-2 bg-slate-900 rounded flex items-center space-x-2">
                    <span className="text-cyan-400 font-bold">1. Cliente &rarr; Servidor:</span>
                    <span>[SYN] Seq=1000 &middot; Solicitação de abertura de conexão</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">2. Servidor &rarr; Cliente:</span>
                    <span>[SYN-ACK] Seq=5000 Ack=1001 &middot; Conexão autorizada</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded flex items-center space-x-2">
                    <span className="text-amber-400 font-bold">3. Cliente &rarr; Servidor:</span>
                    <span>[ACK] Seq=1001 Ack=5001 &middot; Conexão TCP Estabelecida (ESTABLISHED)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
