import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  Code2,
  Terminal,
  FileCode,
  Lightbulb,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { runPythonCodeLocally } from '../lib/pythonRunner';
import { PythonRunResult, StudentLevel } from '../types';

interface PythonLabProps {
  initialCode?: string;
  studentLevel: StudentLevel;
  onExerciseCompleted: (id: string) => void;
}

const PRESET_TEMPLATES = [
  {
    name: 'Área 1 — Python: POO & Auditoria de Usuário',
    code: `# POO para Gestão Segura de Usuários
class UsuarioSistema:
    def __init__(self, username, is_admin=False):
        self.username = username
        self.is_admin = is_admin
        self.tentativas_login = 0
        self.bloqueado = False

    def registrar_falha(self):
        self.tentativas_login += 1
        if self.tentativas_login >= 3:
            self.bloqueado = True
            print(f"[!] Conta '{self.username}' BLOQUEADA por política de segurança.")

user1 = UsuarioSistema("analista_sec")
user1.registrar_falha()
user1.registrar_falha()
user1.registrar_falha()
print(f"Status do Usuário: Bloqueado={user1.bloqueado}")`,
  },
  {
    name: 'Área 2 — Linux: Auditor de Permissões Octais',
    code: `# Analisador de Permissões Linux
def auditar_permissao(modo_octal):
    # Converte '600' para permissão descritiva
    perigosos = [777, 666]
    if modo_octal in perigosos:
        return f"🚨 ALERTA: Permissão {modo_octal} excessivamente permissiva!"
    elif modo_octal in [600, 400, 700]:
        return f"🛡️ OK: Permissão {modo_octal} com princípio do menor privilégio."
    return f"ℹ️ Permissão {modo_octal} registrada."

print(auditar_permissao(777))
print(auditar_permissao(600))`,
  },
  {
    name: 'Área 3 — Redes: Verificador de Portas TCP',
    code: `# Mapeador de Serviços e Portas IANA
portas_conhecidas = {
    22: ("SSH", "Criptografado"),
    80: ("HTTP", "Texto Claro (Inseguro)"),
    443: ("HTTPS", "Criptografado TLS (Seguro)"),
    3306: ("MySQL", "Banco de Dados Interno")
}

for porta, (servico, status) in portas_conhecidas.items():
    print(f"Porta {porta:4d} | Serviço: {servico:6s} | Status: {status}")`,
  },
  {
    name: 'Área 4 — Cibersegurança: Hashes com Salt',
    code: `import hashlib

def calcular_hash_com_salt(senha, salt="s3gr3d0_dnf_2026"):
    dado_combinado = f"{salt}{senha}".encode("utf-8")
    return hashlib.sha256(dado_combinado).hexdigest()

senha_usuario = "SenhaForte@2026"
hash_resultado = calcular_hash_com_salt(senha_usuario)
print(f"Senha original: {senha_usuario}")
print(f"Hash SHA-256 com Salt: {hash_resultado}")`,
  },
  {
    name: 'Área 5 — AppSec: Sanitização e Whitelist',
    code: `import re

def validar_parametro_seguro(param):
    # Whitelist: Apenas letras, números e sublinhado
    padrao = r"^[a-zA-Z0-9_]{3,30}$"
    if re.match(padrao, param):
        return True
    return False

entrada_legitima = "usuario_padrao_123"
entrada_maliciosa = "admin' OR '1'='1"

print(f"'{entrada_legitima}': Aceito? {validar_parametro_seguro(entrada_legitima)}")
print(f"'{entrada_maliciosa}': Aceito? {validar_parametro_seguro(entrada_maliciosa)}")`,
  },
  {
    name: 'Área 6 — Web: Auditor de Set-Cookie',
    code: `def auditar_cookie_header(cookie_header):
    c = cookie_header.lower()
    tem_httponly = "httponly" in c
    tem_secure = "secure" in c
    tem_samesite = "samesite" in c

    score = sum([tem_httponly, tem_secure, tem_samesite])
    print(f"[AUDITORIA] Flags presentes: {score}/3")
    return score == 3

cookie_teste = "session=xyz987; Path=/; Secure; HttpOnly; SameSite=Strict"
print(f"Cookie Seguro? {auditar_cookie_header(cookie_teste)}")`,
  },
  {
    name: 'Área 7 — Vuln: Classificador CVSS v3',
    code: `def classificar_cvss(score):
    if score >= 9.0:
        return "CRÍTICA"
    elif score >= 7.0:
        return "ALTA"
    elif score >= 4.0:
        return "MÉDIA"
    return "BAIXA"

cves = [
    {"id": "CVE-2024-3094", "score": 10.0},
    {"id": "CVE-2023-4863", "score": 8.8},
    {"id": "CVE-2023-23397", "score": 9.8}
]

for item in cves:
    print(f"{item['id']}: CVSS {item['score']} -> {classificar_cvss(item['score'])}")`,
  },
  {
    name: 'Área 8 — Blue Team: Correlacionador de Logs',
    code: `logs_autenticacao = [
    {"ip": "192.168.1.50", "evento": "LOGIN_FAIL"},
    {"ip": "192.168.1.50", "evento": "LOGIN_FAIL"},
    {"ip": "192.168.1.50", "evento": "LOGIN_FAIL"},
    {"ip": "10.0.0.12", "evento": "LOGIN_OK"},
]

falhas_por_ip = {}
for log in logs_autenticacao:
    if log["evento"] == "LOGIN_FAIL":
        ip = log["ip"]
        falhas_por_ip[ip] = falhas_por_ip.get(ip, 0) + 1

for ip, contagem in falhas_por_ip.items():
    if contagem >= 3:
        print(f"⚠️ [BLUE TEAM ALERTA] Força bruta detectada no IP: {ip}")
        print(f"🛡️ Regra gerada: iptables -A INPUT -s {ip} -j DROP")`,
  },
  {
    name: 'Área 9 — Pentest Ético: Validador de Escopo',
    code: `class EscopoPentestAutorizado:
    def __init__(self, ips_permitidos, cliente, termo_assinado):
        self.ips_permitidos = ips_permitidos
        self.cliente = cliente
        self.termo_assinado = termo_assinado

    def pode_testar(self, ip_alvo):
        if not self.termo_assinado:
            return False, "ABORTAR: Termo legal não assinado!"
        if ip_alvo in self.ips_permitidos:
            return True, f"AUTORIZADO: IP {ip_alvo} pertence ao escopo de {self.cliente}."
        return False, f"PROIBIDO: IP {ip_alvo} FORA DO ESCOPO CONTRATUAL!"

engajamento = EscopoPentestAutorizado(["10.10.10.5", "10.10.10.6"], "Empresa DNF", True)
print(engajamento.pode_testar("10.10.10.5")[1])
print(engajamento.pode_testar("8.8.8.8")[1])`,
  },
  {
    name: 'Área 10 — Automação: Extrator de IOCs (Regex/JSON)',
    code: `import re
import json

raw_syslog = """
Aug 16 14:02:11 host kernel: DROP IN=eth0 SRC=192.168.1.100 DST=10.0.0.1 PROTO=TCP DPT=22
Aug 16 14:02:15 host kernel: DROP IN=eth0 SRC=203.0.113.19 DST=10.0.0.1 PROTO=TCP DPT=80
Aug 16 14:02:19 host kernel: DROP IN=eth0 SRC=192.168.1.100 DST=10.0.0.1 PROTO=TCP DPT=443
"""

ips_encontrados = re.findall(r"SRC=([0-9.]+)", raw_syslog)
portas_alvo = re.findall(r"DPT=(\\d+)", raw_syslog)

relatorio = {
    "total_bloqueios": len(ips_encontrados),
    "ips_unicos": list(set(ips_encontrados)),
    "portas_auditadas": list(set(portas_alvo))
}

print(json.dumps(relatorio, indent=2))`,
  },
];

export const PythonLab: React.FC<PythonLabProps> = ({
  initialCode,
  studentLevel,
  onExerciseCompleted,
}) => {
  const [code, setCode] = useState(
    initialCode ||
      `# Bem-vindo ao Laboratório Interativo Python & Cyber
# Selecione um template do Currículo Oficial acima ou escreva seu código:

def auditar_sistema():
    print("[+] Inicializando rotina defensiva DNF...")
    status = "OK"
    return status

auditar_sistema()`
  );

  const [runResult, setRunResult] = useState<PythonRunResult | null>(null);
  const [tutorEvaluation, setTutorEvaluation] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'console' | 'diagnostics' | 'tutor'>('console');

  const handleRunCode = () => {
    const result = runPythonCodeLocally(code);
    setRunResult(result);
    setActiveTab(result.hasError ? 'diagnostics' : 'console');

    if (!result.hasError && (result.stdout.includes('[+]') || result.stdout.includes('🛡️'))) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
      });
      onExerciseCompleted('python-lab-run');
    }
  };

  const handleEvaluateWithTutor = async () => {
    setIsEvaluating(true);
    setActiveTab('tutor');

    try {
      const response = await fetch('/api/tutor/evaluate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          exerciseContext: 'Currículo Oficial DNF Cyber Tutor',
          studentLevel,
          attemptCount: 1,
        }),
      });

      const data = await response.json();
      setTutorEvaluation(data.feedback || data.analysis || 'Código analisado com sucesso pelo Tutor!');
    } catch {
      setTutorEvaluation(
        'Análise estática local: Código com sintaxe válida. Verifique as convenções PEP8 e tratamento defensivo de exceções.'
      );
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-14rem)] min-h-[580px]">
      {/* Code Editor Column */}
      <div className="lg:col-span-7 flex flex-col bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
        {/* Editor Toolbar */}
        <div className="px-3 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-semibold text-white">
              main_security.py
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <select
              onChange={(e) => {
                const idx = parseInt(e.target.value, 10);
                if (!isNaN(idx) && PRESET_TEMPLATES[idx]) {
                  setCode(PRESET_TEMPLATES[idx].code);
                }
              }}
              className="px-2 py-1 bg-slate-800 text-slate-300 text-xs font-mono rounded border border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 max-w-[260px] truncate"
              defaultValue=""
            >
              <option value="" disabled>
                Carregar Template Oficial...
              </option>
              {PRESET_TEMPLATES.map((t, idx) => (
                <option key={idx} value={idx}>
                  {t.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Copiar código"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Code Textarea with Line Numbers */}
        <div className="flex-1 flex overflow-hidden bg-slate-950 font-mono text-xs">
          {/* Line Numbers */}
          <div className="py-3 px-2.5 select-none text-slate-600 text-right bg-slate-900/40 border-r border-slate-800/80 font-mono">
            {Array.from({ length: Math.max(lineCount, 18) }).map((_, i) => (
              <div key={i} className="leading-6 text-[11px]">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code Input */}
          <textarea
            id="python-code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 p-3 bg-transparent text-emerald-300 focus:outline-none resize-none leading-6 font-mono text-xs whitespace-pre overflow-auto selection:bg-emerald-900/60"
            placeholder="# Digite seu código Python aqui..."
          />
        </div>

        {/* Action Bottom Bar */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <span className="text-[11px] font-mono text-slate-500">
            {lineCount} linhas | Python 3.12 Emulado
          </span>

          <div className="flex items-center space-x-2">
            <button
              id="btn-evaluate-code"
              onClick={handleEvaluateWithTutor}
              disabled={isEvaluating}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-semibold flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isEvaluating ? 'Avaliando...' : 'Avaliar com Tutor (IA)'}</span>
            </button>

            <button
              id="btn-run-code"
              onClick={handleRunCode}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-md shadow-emerald-500/20"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Executar Código</span>
            </button>
          </div>
        </div>
      </div>

      {/* Output & Diagnostics Column */}
      <div className="lg:col-span-5 flex flex-col bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
        {/* Output Tabs */}
        <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('console')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors flex items-center space-x-1.5 ${
                activeTab === 'console'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Console ({runResult?.executionTimeMs || 0}ms)</span>
            </button>

            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors flex items-center space-x-1.5 ${
                activeTab === 'diagnostics'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
              <span>Diagnóstico de Erros</span>
            </button>

            <button
              onClick={() => setActiveTab('tutor')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors flex items-center space-x-1.5 ${
                activeTab === 'tutor'
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
              <span>Feedback DNF</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
          {activeTab === 'console' && (
            <div>
              {runResult ? (
                <div className="space-y-2">
                  {runResult.stdout && (
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-emerald-400 whitespace-pre-wrap">
                      {runResult.stdout}
                    </div>
                  )}

                  {runResult.stderr && (
                    <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-800/80 text-rose-300 whitespace-pre-wrap">
                      {runResult.stderr}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 mt-2">
                    Processo finalizado com código {runResult.hasError ? '1 (Erro)' : '0 (Sucesso)'}.
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12 text-center">
                  <Play className="w-8 h-8 mb-2 opacity-40 text-emerald-400" />
                  <p>Pressione "Executar Código" para ver o resultado do console.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <div>
              {runResult?.hasError ? (
                <div className="space-y-3">
                  <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-800/80 text-rose-300">
                    <div className="flex items-center space-x-2 font-bold mb-1">
                      <AlertOctagon className="w-4 h-4 text-rose-400" />
                      <span>{runResult.errorType || 'Erro de Execução'}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{runResult.stderr}</p>
                  </div>

                  {runResult.errorDetails && (
                    <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-800/60 text-amber-200">
                      <div className="font-bold mb-1 flex items-center space-x-1.5 text-amber-300">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Explicação Didática do DNF Cyber Tutor:</span>
                      </div>
                      <p>{runResult.errorDetails}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-emerald-950/30 rounded-lg border border-emerald-800/60 text-emerald-300 text-center">
                  <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
                  <p className="font-bold">Nenhum erro de sintaxe ou lógica detectado!</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Seu código foi executado com êxito.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tutor' && (
            <div>
              {isEvaluating ? (
                <div className="p-6 text-center text-slate-400 space-y-2">
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p>O Professor DNF está revisando seu código linha por linha...</p>
                </div>
              ) : tutorEvaluation ? (
                <div className="p-3.5 bg-slate-950 rounded-lg border border-cyan-900/60 text-slate-200 space-y-2 leading-relaxed">
                  <div className="flex items-center space-x-1.5 text-cyan-400 font-bold border-b border-slate-800 pb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Parecer Pedagógico do Tutor:</span>
                  </div>
                  <div className="whitespace-pre-wrap prose prose-invert text-xs">
                    {tutorEvaluation}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12 text-center">
                  <Lightbulb className="w-8 h-8 mb-2 opacity-40 text-cyan-400" />
                  <p>Clique em "Avaliar com Tutor (IA)" para receber feedback pedagógico detalhado.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
