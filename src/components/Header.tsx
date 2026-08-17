import React from 'react';
import {
  Terminal,
  Shield,
  Award,
  BookOpen,
  Code2,
  Cpu,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { StudentLevel, TrackId } from '../types';
import { TRACKS } from '../data/curriculum';

interface HeaderProps {
  activeTab: 'classroom' | 'python_lab' | 'terminal_lab' | 'security_playground';
  setActiveTab: (tab: 'classroom' | 'python_lab' | 'terminal_lab' | 'security_playground') => void;
  studentLevel: StudentLevel;
  onOpenDiagnostic: () => void;
  onOpenMethodology: () => void;
  activeTrackId: TrackId;
  onSelectTrack: (trackId: TrackId) => void;
  completedExercisesCount: number;
  xpPoints: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  studentLevel,
  onOpenDiagnostic,
  onOpenMethodology,
  activeTrackId,
  onSelectTrack,
  completedExercisesCount,
  xpPoints,
}) => {
  const currentTrack = TRACKS.find((t) => t.id === activeTrackId) || TRACKS[0];

  const getLevelColor = (level: StudentLevel) => {
    switch (level) {
      case 'INICIANTE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'BÁSICO':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'INTERMEDIÁRIO':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'AVANÇADO':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
              <Shield className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-lg text-white tracking-wide">
                  DNF <span className="text-emerald-400">Cyber Tutor</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded">
                  v2.0 Didático
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Professor Virtual &middot; Python & Cibersegurança
              </p>
            </div>
          </div>

          {/* Level Badge, XP & Methodology button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              id="btn-methodology"
              onClick={onOpenMethodology}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors flex items-center space-x-1.5"
              title="Ver as 10 regras metodológicas pedagógicas"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Metodologia DNF</span>
            </button>

            <button
              id="btn-level-badge"
              onClick={onOpenDiagnostic}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all flex items-center space-x-1.5 hover:brightness-125 ${getLevelColor(
                studentLevel
              )}`}
              title="Clique para refazer a calibragem de nível"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nível: {studentLevel}</span>
            </button>

            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs font-mono text-amber-400">
              <Award className="w-3.5 h-3.5" />
              <span>{xpPoints} XP</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">{completedExercisesCount} Concluídos</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 border-t border-slate-800/80 scrollbar-none">
          <button
            id="nav-tab-classroom"
            onClick={() => setActiveTab('classroom')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'classroom'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Sala de Aula & Tutor</span>
          </button>

          <button
            id="nav-tab-python"
            onClick={() => setActiveTab('python_lab')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'python_lab'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Editor Python & Testes</span>
          </button>

          <button
            id="nav-tab-terminal"
            onClick={() => setActiveTab('terminal_lab')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'terminal_lab'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Terminal Linux & Logs</span>
          </button>

          <button
            id="nav-tab-playground"
            onClick={() => setActiveTab('security_playground')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'security_playground'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Laboratório de Cibersegurança</span>
          </button>
        </div>
      </div>
    </header>
  );
};
