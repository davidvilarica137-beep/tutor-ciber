import React, { useState } from 'react';
import { Sparkles, X, Check, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DIAGNOSTIC_QUESTIONS } from '../data/diagnostics';
import { StudentLevel } from '../types';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: StudentLevel;
  onUpdateLevel: (newLevel: StudentLevel) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  currentLevel,
  onUpdateLevel,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, StudentLevel>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultSummary, setResultSummary] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelect = (questionId: number, level: StudentLevel) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: level }));
  };

  const calculateDiagnosedLevel = (): StudentLevel => {
    const counts: Record<StudentLevel, number> = {
      INICIANTE: 0,
      BÁSICO: 0,
      INTERMEDIÁRIO: 0,
      AVANÇADO: 0,
    };

    Object.values(selectedAnswers).forEach((lvl) => {
      const levelKey = lvl as StudentLevel;
      if (counts[levelKey] !== undefined) {
        counts[levelKey] = counts[levelKey] + 1;
      }
    });

    if (counts['AVANÇADO'] >= 3) return 'AVANÇADO';
    if (counts['INTERMEDIÁRIO'] >= 2 || counts['AVANÇADO'] >= 1) return 'INTERMEDIÁRIO';
    if (counts['BÁSICO'] >= 2) return 'BÁSICO';
    return 'INICIANTE';
  };

  const handleFinishDiagnostic = async () => {
    setIsSubmitting(true);
    const diagnosedLevel = calculateDiagnosedLevel();

    try {
      const response = await fetch('/api/tutor/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: selectedAnswers,
          suggestedLevel: diagnosedLevel,
        }),
      });

      const data = await response.json();
      setResultSummary(data.diagnosis || `Nível calibrado com sucesso para ${diagnosedLevel}!`);
    } catch {
      setResultSummary(`Nível calibrado com sucesso para ${diagnosedLevel}!`);
    } finally {
      setIsSubmitting(false);
      onUpdateLevel(diagnosedLevel);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === DIAGNOSTIC_QUESTIONS.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold text-white">
                Teste Diagnóstico: Calibragem de Nível
              </h2>
              <p className="text-xs text-slate-400">
                O DNF Cyber Tutor adapta a complexidade das explicações ao seu perfil.
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

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {resultSummary ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-white">
                Diagnóstico Concluído pelo Tutor!
              </h3>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-left text-slate-200 whitespace-pre-wrap leading-relaxed">
                {resultSummary}
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
              >
                Começar os Estudos com o DNF Tutor
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {DIAGNOSTIC_QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 font-mono font-bold flex items-center justify-center text-[10px]">
                      {q.id}
                    </span>
                    <span className="font-bold text-white text-xs">{q.question}</span>
                    <span className="text-[10px] font-mono text-slate-500">({q.area})</span>
                  </div>

                  <div className="space-y-1.5 pl-7">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[q.id] === opt.levelWeight;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelect(q.id, opt.levelWeight)}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ml-2 ${
                              isSelected
                                ? 'bg-emerald-500 text-slate-950 font-bold'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {opt.levelWeight}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!resultSummary && (
          <div className="px-5 py-3 bg-slate-800/80 border-t border-slate-700 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {Object.keys(selectedAnswers).length} de {DIAGNOSTIC_QUESTIONS.length} respondidas
            </span>

            <button
              onClick={handleFinishDiagnostic}
              disabled={!isAllAnswered || isSubmitting}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 hover:bg-emerald-400 disabled:opacity-40 transition-all shadow-md shadow-emerald-500/20"
            >
              <span>{isSubmitting ? 'Calibrando...' : 'Finalizar e Aplicar Nível'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
