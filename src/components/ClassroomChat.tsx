import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  HelpCircle,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Terminal,
  Play,
  RotateCcw,
  BookOpen,
  Check,
  X,
  Target,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChatMessage, TrackId, StudentLevel, ProgressionStage, ComprehensionQuestion, PROGRESSION_STAGES } from '../types';
import { TRACKS, CURRICULUM_MODULES } from '../data/curriculum';

interface ClassroomChatProps {
  activeTrackId: TrackId;
  activeStage: ProgressionStage;
  onSelectStage: (stage: ProgressionStage) => void;
  studentLevel: StudentLevel;
  onSendCodeToEditor: (code: string) => void;
  onExerciseCompleted: (exerciseId: string) => void;
}

export const ClassroomChat: React.FC<ClassroomChatProps> = ({
  activeTrackId,
  activeStage,
  onSelectStage,
  studentLevel,
  onSendCodeToEditor,
  onExerciseCompleted,
}) => {
  const currentTrack = TRACKS.find((t) => t.id === activeTrackId) || TRACKS[0];
  const activeModule =
    CURRICULUM_MODULES.find((m) => m.trackId === activeTrackId) || CURRICULUM_MODULES[0];
  const stageInfo = PROGRESSION_STAGES.find((s) => s.id === activeStage) || PROGRESSION_STAGES[0];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [answerFeedback, setAnswerFeedback] = useState<Record<string, { correct: boolean; explanation: string }>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, number>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reload when track or stage changes
  useEffect(() => {
    loadStageContent();
  }, [activeTrackId, activeStage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, answerFeedback, revealedHints]);

  const loadStageContent = () => {
    const mod = activeModule;
    let stageTitle = stageInfo.title;
    let stageIntro = '';

    switch (activeStage) {
      case 'fundamentos':
        stageIntro = `## 🎓 Área ${currentTrack.number}: ${currentTrack.title}\n\n**Etapa 1: Fundamentos** | **Nível Alvo:** \`${studentLevel}\`\n\n---\n\n### 1. Introdução Sem Presunção de Conhecimento Prévio\n${mod.conceptSummary}\n\n${mod.detailedExplanation}\n\n### Tópicos Oficiais Desta Trilha:\n${currentTrack.officialTopics.map(t => `- \`${t}\``).join('\n')}`;
        break;
      case 'conceitos':
        stageIntro = `## 📐 Área ${currentTrack.number}: Conceitos Essenciais e Aprofundados\n\n**Etapa 2: Estrutura Técnica e Regras Formais**\n\n---\n\n### Princípios de Funcionamento e Modelagem\n${mod.detailedExplanation}\n\n**Por que isso importa na segurança defensiva e ofensiva ética:**\nA compreensão matemática e conceitual das estruturas de dados e protocolos impede a introdução acidental de vulnerabilidades durante o desenvolvimento e auditoria de sistemas.`;
        break;
      case 'exemplos':
        stageIntro = `## 💻 Área ${currentTrack.number}: Exemplo Prático & Análise Linha por Linha\n\n**Etapa 3: Passo a Passo do Código / Configuração**\n\n---\n\nObserve o código defensivo abaixo e expanda a explicação minuciosa de cada instrução:`;
        break;
      case 'exercicio_basico':
        stageIntro = `## ✏️ Área ${currentTrack.number}: Exercício Básico de Fixação\n\n**Etapa 4: Fixação de Sintaxe e Lógica Elementar**\n\n---\n\nResolva a questão conceitual e pratique a lógica no editor interativo. Lembre-se: o DNF Cyber Tutor fornece dicas progressivas sem entregar a resposta imediata!`;
        break;
      case 'exercicio_intermediario':
        stageIntro = `## ⚡ Área ${currentTrack.number}: Exercício Intermediário com Casos de Borda\n\n**Etapa 5: Validação Robusta e Tratamento de Exceções**\n\n---\n\n**Desafio:** Adicione tratamento de erros (\`try/except\` ou sanitização) para que seu script não falhe diante de dados maliciosos ou inesperados.`;
        break;
      case 'projeto_pratico':
        stageIntro = `## 🛠️ Área ${currentTrack.number}: Projeto Prático Aplicado\n\n**Etapa 6: Construção de Script ou Auditor Funcional**\n\n---\n\n**Objetivo do Projeto:** Desenvolver um script completo de automação ou análise defensiva aplicável ao mundo real em ambiente de laboratório.`;
        break;
      case 'avaliacao':
        stageIntro = `## 🏆 Área ${currentTrack.number}: Avaliação de Domínio Técnico\n\n**Etapa 7: Verificação Rigorosa de Aprendizagem**\n\n---\n\nO DNF Cyber Tutor só considera o módulo concluído quando o aluno demonstra compreensão através de perguntas e código funcional. Responda à verificação de domínio abaixo:`;
        break;
      case 'revisao':
        stageIntro = `## 🔄 Área ${currentTrack.number}: Revisão e Conexão Interdisciplinar\n\n**Etapa 8: Síntese e Próximos Passos**\n\n---\n\nParabéns por explorar esta área! Você consolidou os seguintes conceitos oficiais:\n${currentTrack.officialTopics.slice(0, 8).map(t => `✅ \`${t}\``).join('\n')}\n\nPronto para avançar para a próxima área de ensino do currículo oficial?`;
        break;
    }

    const initialMsg: ChatMessage = {
      id: `lesson-${mod.id}-${activeStage}-${Date.now()}`,
      sender: 'tutor',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: stageIntro,
      codeSnippet: mod.codeExample,
      checkQuestion: mod.comprehensionQuestion,
      exerciseContext: {
        title: `${stageTitle}: ${mod.exercise.title}`,
        starterCode: mod.exercise.starterCode,
      },
      hintsAvailable: {
        hint1: mod.exercise.hint1,
        hint2: mod.exercise.hint2,
        solution: mod.exercise.solutionCode,
      },
    };

    setMessages([initialMsg]);
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-5),
          studentLevel,
          activeTrack: `${currentTrack.number}. ${currentTrack.title} [Etapa: ${stageInfo.title}]`,
          currentCode: activeModule.exercise.starterCode,
        }),
      });

      const data = await response.json();

      const tutorReply: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: data.reply || 'Excelente pergunta! Vamos analisar o conceito com rigor e clareza didática.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, tutorReply]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `tutor-local-${Date.now()}`,
        sender: 'tutor',
        text: `Compreendido! Na Área de **${currentTrack.title}**, o princípio fundamental é garantir que cada instrução tenha propósito defensivo claro. Você pode testar e validar o código no editor ao lado!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerQuestion = (question: ComprehensionQuestion, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
    const isCorrect = optionIndex === question.correctIndex;

    setAnswerFeedback((prev) => ({
      ...prev,
      [question.id]: {
        correct: isCorrect,
        explanation: question.explanation,
      },
    }));

    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
      onExerciseCompleted(question.id);
    }
  };

  const handleRevealHint = (messageId: string) => {
    setRevealedHints((prev) => {
      const current = prev[messageId] || 0;
      return { ...prev, [messageId]: Math.min(current + 1, 3) };
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] min-h-[580px] bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
      {/* Classroom Sub-Header */}
      <div className="px-4 py-2.5 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex items-center space-x-2">
            <h2 className="text-xs font-bold text-white">
              {currentTrack.number}. {currentTrack.title}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-700 font-mono">
              {stageInfo.title}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={loadStageContent}
            className="px-2.5 py-1 text-[11px] font-mono text-slate-300 hover:text-white bg-slate-700/60 hover:bg-slate-700 rounded border border-slate-600 flex items-center space-x-1"
            title="Reiniciar aula desta etapa"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Recarregar Etapa</span>
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1 px-1">
              <span className="text-[11px] font-mono font-bold text-slate-400">
                {msg.sender === 'user' ? 'Aluno' : msg.sender === 'tutor' ? 'DNF Cyber Tutor' : 'Sistema'}
              </span>
              <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-3xl rounded-xl p-4 text-xs sm:text-sm leading-relaxed border ${
                msg.sender === 'user'
                  ? 'bg-cyan-950/40 text-cyan-100 border-cyan-800/60 shadow-sm'
                  : msg.sender === 'system'
                  ? 'bg-amber-950/30 text-amber-200 border-amber-800/40'
                  : 'bg-slate-800/95 text-slate-200 border-slate-700/80 shadow-md'
              }`}
            >
              {/* Message Markdown rendering */}
              <div className="prose prose-invert max-w-none text-xs sm:text-sm space-y-2.5">
                {msg.text.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={idx} className="text-sm sm:text-base font-bold text-white border-b border-slate-700 pb-1 mt-1">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-xs sm:text-sm font-bold text-emerald-400 mt-2">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-1 pl-1 text-slate-300 text-xs">
                        {paragraph.split('\n').map((li, lIdx) => (
                          <li key={lIdx}>{li.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} className="text-slate-200 whitespace-pre-line leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Code Snippet Box */}
              {msg.codeSnippet && (
                <div className="mt-3.5 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
                  <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Exemplo de Código & Análise</span>
                    </span>
                    <button
                      onClick={() => onSendCodeToEditor(msg.codeSnippet!)}
                      className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 flex items-center space-x-1 transition-colors"
                    >
                      <Play className="w-3 h-3" />
                      <span>Abrir no Editor Python</span>
                    </button>
                  </div>
                  <pre className="p-3 text-emerald-400 overflow-x-auto">
                    <code>{msg.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Line-by-Line Breakdown Accordion */}
              {activeModule.lineByLineExplanation && (
                <details className="mt-3 bg-slate-900/70 rounded-lg border border-slate-700/60 p-2.5 group">
                  <summary className="text-xs font-mono font-medium text-emerald-400 cursor-pointer flex items-center space-x-1.5 hover:text-emerald-300">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ver Explicação Linha por Linha do Código (Passo 3 da Metodologia)</span>
                  </summary>
                  <div className="mt-2.5 space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
                    {activeModule.lineByLineExplanation.map((item) => (
                      <div key={item.line} className="grid grid-cols-12 gap-2 bg-slate-950/80 p-2 rounded border border-slate-800">
                        <span className="col-span-1 text-slate-500 font-bold text-right">L{item.line}:</span>
                        <span className="col-span-5 text-cyan-300 truncate">{item.code}</span>
                        <span className="col-span-6 text-slate-300 font-sans">{item.explanation}</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}

              {/* Comprehension Check Question */}
              {msg.checkQuestion && (
                <div className="mt-4 bg-slate-900/90 rounded-xl border border-emerald-500/40 p-3.5 shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono uppercase font-bold text-emerald-400 tracking-wider">
                      Pergunta de Fixação (Passo 4: Verificação de Compreensão)
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white mb-3">
                    {msg.checkQuestion.question}
                  </p>

                  <div className="space-y-2">
                    {msg.checkQuestion.options.map((option, optIdx) => {
                      const isSelected = selectedAnswers[msg.checkQuestion!.id] === optIdx;
                      const feedback = answerFeedback[msg.checkQuestion!.id];

                      let btnClass = 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-300';
                      if (isSelected) {
                        if (feedback?.correct) {
                          btnClass = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                        } else {
                          btnClass = 'bg-rose-950/90 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          id={`cq-opt-${msg.checkQuestion!.id}-${optIdx}`}
                          onClick={() => handleAnswerQuestion(msg.checkQuestion!, optIdx)}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${btnClass}`}
                        >
                          <span>{option}</span>
                          {isSelected && feedback?.correct && (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                          )}
                          {isSelected && !feedback?.correct && (
                            <X className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {answerFeedback[msg.checkQuestion.id] && (
                    <div
                      className={`mt-3 p-2.5 rounded-lg text-xs flex items-start space-x-2 border ${
                        answerFeedback[msg.checkQuestion.id].correct
                          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/80'
                          : 'bg-rose-950/40 text-rose-300 border-rose-800/80'
                      }`}
                    >
                      {answerFeedback[msg.checkQuestion.id].correct ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <strong className="block mb-0.5">
                          {answerFeedback[msg.checkQuestion.id].correct
                            ? 'Correto! Compreensão validada com sucesso.'
                            : 'Não exatamente. Tente novamente ou leia a justificativa:'}
                        </strong>
                        <p>{answerFeedback[msg.checkQuestion.id].explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Proposed Practical Challenge & Progressive Hints Ladder */}
              {msg.exerciseContext && (
                <div className="mt-4 bg-slate-950/90 rounded-xl border border-cyan-500/30 p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        Passo 5: Desafio Prático Proposto
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                      {activeModule.exercise.title}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-3">
                    {activeModule.exercise.objective}
                  </p>

                  <ul className="text-xs text-slate-400 space-y-1 mb-3 list-disc list-inside">
                    {activeModule.exercise.instructions.map((inst, iIdx) => (
                      <li key={iIdx}>{inst}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => onSendCodeToEditor(activeModule.exercise.starterCode)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs flex items-center space-x-1.5 hover:bg-cyan-400 transition-colors shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Resolver no Editor Python</span>
                    </button>

                    {/* Progressive Hint Button */}
                    <button
                      onClick={() => handleRevealHint(msg.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-300 hover:bg-slate-700 border border-amber-500/40 text-xs flex items-center space-x-1.5 transition-colors"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        {(revealedHints[msg.id] || 0) === 0
                          ? 'Pedir Dica 1 (Conceitual)'
                          : (revealedHints[msg.id] || 0) === 1
                          ? 'Pedir Dica 2 (Estrutura)'
                          : 'Ver Solução Explicada'}
                      </span>
                    </button>
                  </div>

                  {/* Revealed Hints */}
                  {(revealedHints[msg.id] || 0) >= 1 && (
                    <div className="mt-3 p-2.5 rounded-lg bg-amber-950/30 border border-amber-700/50 text-xs text-amber-200 animate-fadeIn">
                      <div className="flex items-center space-x-1.5 font-bold mb-1 text-amber-300">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Dica Pedagógica 1 (Direcionamento):</span>
                      </div>
                      <p>{activeModule.exercise.hint1}</p>
                    </div>
                  )}

                  {(revealedHints[msg.id] || 0) >= 2 && (
                    <div className="mt-2 p-2.5 rounded-lg bg-amber-950/40 border border-amber-600/70 text-xs text-amber-200 animate-fadeIn">
                      <div className="flex items-center space-x-1.5 font-bold mb-1 text-amber-300">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Dica Pedagógica 2 (Estrutura Lógica):</span>
                      </div>
                      <p>{activeModule.exercise.hint2}</p>
                    </div>
                  )}

                  {(revealedHints[msg.id] || 0) >= 3 && (
                    <div className="mt-2 p-2.5 rounded-lg bg-slate-900 border border-emerald-600 text-xs text-emerald-200 animate-fadeIn">
                      <div className="flex items-center space-x-1.5 font-bold mb-1 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Solução Completa e Por Que Funciona:</span>
                      </div>
                      <pre className="p-2 bg-slate-950 rounded font-mono text-emerald-300 overflow-x-auto my-1">
                        <code>{activeModule.exercise.solutionCode}</code>
                      </pre>
                      <p className="text-slate-300 mt-1">{activeModule.exercise.solutionExplanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono p-3 bg-slate-800/40 rounded-lg border border-slate-800 w-fit">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>DNF Cyber Tutor formulando orientação pedagógica...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0">
          Perguntas rápidas:
        </span>
        <button
          onClick={() => handleSendMessage('Explique este conceito com uma analogia simples do mundo real sem jargões.')}
          className="px-2.5 py-1 text-[11px] rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 whitespace-nowrap transition-colors"
        >
          💡 Explicar com analogia simples
        </button>
        <button
          onClick={() => handleSendMessage('Como este conceito é aplicado na prática pelo Blue Team e em auditorias de segurança?')}
          className="px-2.5 py-1 text-[11px] rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 whitespace-nowrap transition-colors"
        >
          🛡️ Aplicação defensiva no Blue Team
        </button>
        <button
          onClick={() => handleSendMessage('Quais são os erros mais comuns cometidos por iniciantes neste assunto?')}
          className="px-2.5 py-1 text-[11px] rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 whitespace-nowrap transition-colors"
        >
          ⚠️ Erros comuns a evitar
        </button>
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            id="tutor-chat-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Faça uma pergunta ao DNF Cyber Tutor sobre esta etapa do currículo oficial..."
            className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />

          <button
            id="btn-send-chat"
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-500/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
};
