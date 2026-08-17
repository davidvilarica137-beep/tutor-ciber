import React from 'react';
import { BookOpen, X, CheckCircle2, Shield, Lightbulb, Code2 } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    { num: 1, title: 'Conceito em Linguagem Simples', desc: 'Explica a ideia sem jargões complexos prematuros, usando analogias claras.' },
    { num: 2, title: 'Exemplo Prático', desc: 'Apresenta um cenário real de aplicação em código ou configuração.' },
    { num: 3, title: 'Explicação Linha por Linha', desc: 'Disseca cada comando e palavra-chave do exemplo de código.' },
    { num: 4, title: 'Pergunta de Fixação', desc: 'Verifica a compreensão imediata antes de partir para a prática.' },
    { num: 5, title: 'Exercício Desafiador', desc: 'Propõe uma atividade compatível com o nível para consolidação ativa.' },
    { num: 6, title: 'Aguardar Resposta do Aluno', desc: 'Incentiva a tentativa autônoma no editor e console.' },
    { num: 7, title: 'Análise Pedagógica', desc: 'Avalia a lógica e a sintaxe com rigor e incentivo construtivo.' },
    { num: 8, title: 'Explicação de Erros', desc: 'Explica o motivo do erro (Syntax vs Logic) e por que aconteceu.' },
    { num: 9, title: 'Nova Oportunidade com Dicas', desc: 'Dica 1 (conceitual) -> Dica 2 (estrutura) -> Solução só em último caso.' },
    { num: 10, title: 'Avanço com Evidência', desc: 'Avança de módulo apenas quando há domínio demonstrado.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-5 py-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold text-white">
                Metodologia Pedagógica DNF Cyber Tutor
              </h2>
              <p className="text-xs text-slate-400">
                Os 10 passos estruturados para aprendizagem progressiva de Python e Cibersegurança.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3 text-xs">
          <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/60 text-emerald-200 flex items-start space-x-2 mb-4">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong>Regra de Ouro:</strong> Nunca entregar a solução imediatamente. Fornecer primeiro a Dica 1, depois a Dica 2 e priorizar o ambiente ético, legal e defensivo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start space-x-2.5"
              >
                <span className="w-6 h-6 rounded-md bg-slate-800 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs shrink-0 border border-slate-700">
                  {step.num}
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-white">{step.title}</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-3 bg-slate-800/80 border-t border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs transition-colors"
          >
            Entendido, Continuar Aulas
          </button>
        </div>
      </div>
    </div>
  );
};
