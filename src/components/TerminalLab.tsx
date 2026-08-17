import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Shield,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Play,
  FileCode,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  INITIAL_TERMINAL_STATE,
  TerminalState,
  executeTerminalCommand,
} from '../lib/terminalSimulator';

interface TerminalLabProps {
  onExerciseCompleted: (id: string) => void;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  suggestedCmd: string;
  expectedOutputSnippet: string;
  completed: boolean;
}

export const TerminalLab: React.FC<TerminalLabProps> = ({ onExerciseCompleted }) => {
  const [terminalState, setTerminalState] = useState<TerminalState>(INITIAL_TERMINAL_STATE);
  const [historyLines, setHistoryLines] = useState<
    Array<{ type: 'input' | 'output'; text: string }>
  >([
    {
      type: 'output',
      text:
        'Bem-vindo ao DNF Linux & CyberLab Simulator v2.0 (Ubuntu 24.04 LTS)\n' +
        'Digite "help" para ver os comandos disponíveis ou execute uma das missões práticas abaixo.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 'mission-perm',
      title: '1. Auditoria de Permissões',
      description: 'Proteja a chave privada/configuração alterando suas permissões para 600.',
      suggestedCmd: 'chmod 600 config_secreta.env',
      expectedOutputSnippet: 'Permissões de \'config_secreta.env\' atualizadas para 600',
      completed: false,
    },
    {
      id: 'mission-grep',
      title: '2. Análise Defensiva de Logs',
      description: 'Filtre tentativas de login falhas no arquivo de autenticação.',
      suggestedCmd: 'grep Failed auth.log',
      expectedOutputSnippet: 'Failed password',
      completed: false,
    },
    {
      id: 'mission-nmap',
      title: '3. Varredura de Portas Autorizada',
      description: 'Simule um scan de portas TCP para auditar serviços abertos.',
      suggestedCmd: 'nmap 127.0.0.1',
      expectedOutputSnippet: 'PORT     STATE SERVICE',
      completed: false,
    },
    {
      id: 'mission-headers',
      title: '4. Inspeção de Headers HTTP',
      description: 'Verifique se o servidor web retorna cabeçalhos de segurança e cookies seguros.',
      suggestedCmd: 'curl -I http://localhost',
      expectedOutputSnippet: 'Strict-Transport-Security',
      completed: false,
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historyLines]);

  const handleCommandSubmit = (customCmd?: string) => {
    const cmdToRun = customCmd || inputVal;
    if (!cmdToRun.trim()) return;

    const { output, newState } = executeTerminalCommand(cmdToRun, terminalState);

    if (output === '__CLEAR__') {
      setHistoryLines([]);
    } else {
      const newLines: Array<{ type: 'input' | 'output'; text: string }> = [
        ...historyLines,
        {
          type: 'input',
          text: `${terminalState.user}@${terminalState.hostname}:${terminalState.currentPath}$ ${cmdToRun}`,
        },
      ];
      if (output) {
        newLines.push({ type: 'output', text: output });
      }
      setHistoryLines(newLines);
    }

    setTerminalState(newState);
    if (!customCmd) setInputVal('');
    setHistoryIndex(-1);

    // Check Missions completion
    missions.forEach((m) => {
      if (!m.completed && output.includes(m.expectedOutputSnippet)) {
        setMissions((prev) =>
          prev.map((item) => (item.id === m.id ? { ...item, completed: true } : item))
        );
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
        onExerciseCompleted(m.id);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommandSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (terminalState.history.length === 0) return;
      const nextIndex =
        historyIndex === -1
          ? terminalState.history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(terminalState.history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= terminalState.history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(terminalState.history[nextIndex]);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-14rem)] min-h-[580px]">
      {/* Terminal Sandbox Column */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="lg:col-span-8 flex flex-col bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl font-mono cursor-text"
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs text-slate-400 font-semibold pl-2">
              aluno@dnf-cyberlab: {terminalState.currentPath}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setHistoryLines([]);
              setTerminalState(INITIAL_TERMINAL_STATE);
            }}
            className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 px-2 py-1 rounded bg-slate-800"
            title="Resetar terminal"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Limpar</span>
          </button>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs leading-relaxed">
          {historyLines.map((line, idx) => (
            <div key={idx}>
              {line.type === 'input' ? (
                <div className="text-emerald-400 font-semibold">{line.text}</div>
              ) : (
                <div className="text-slate-300 whitespace-pre-wrap">{line.text}</div>
              )}
            </div>
          ))}

          {/* Interactive Input Prompt */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-emerald-400 font-bold shrink-0">
              {terminalState.user}@{terminalState.hostname}:{terminalState.currentPath}$
            </span>
            <input
              ref={inputRef}
              id="terminal-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white focus:outline-none caret-emerald-400 font-mono text-xs"
              autoFocus
              spellCheck={false}
            />
          </div>
          <div ref={terminalEndRef} />
        </div>

        {/* Fast Action Quick Commands */}
        <div className="p-2 bg-slate-900/90 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto text-[11px] scrollbar-none">
          <span className="text-slate-500 uppercase tracking-wider shrink-0">Comandos rápidos:</span>
          {['ls -l', 'cat config_secreta.env', 'nmap 127.0.0.1', 'grep Failed auth.log', 'curl -I http://localhost', 'help'].map(
            (cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommandSubmit(cmd);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 whitespace-nowrap transition-colors"
              >
                {cmd}
              </button>
            )
          )}
        </div>
      </div>

      {/* Guided Security Missions Column */}
      <div className="lg:col-span-4 flex flex-col bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-4 overflow-y-auto">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Missões Práticas no Terminal</h3>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Execute os comandos no terminal para praticar segurança em ambientes autorizados e cumprir cada missão:
        </p>

        <div className="space-y-3">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`p-3 rounded-lg border text-xs transition-all ${
                mission.completed
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold">{mission.title}</span>
                {mission.completed ? (
                  <span className="flex items-center text-emerald-400 font-mono text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Concluída
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">Pendente</span>
                )}
              </div>

              <p className="text-slate-400 mb-2">{mission.description}</p>

              <div className="flex items-center justify-between bg-slate-950/80 p-2 rounded border border-slate-800 font-mono text-[11px]">
                <code className="text-cyan-300">{mission.suggestedCmd}</code>
                <button
                  onClick={() => handleCommandSubmit(mission.suggestedCmd)}
                  className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 flex items-center space-x-1"
                >
                  <Play className="w-3 h-3" />
                  <span>Auto</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
