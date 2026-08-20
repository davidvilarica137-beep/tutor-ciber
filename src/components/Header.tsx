import React from 'react';
import {
  Award,
  BookOpen,
  Sparkles,
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { StudentLevel, TrackId } from '../types';
import { TRACKS } from '../data/curriculum';
import { useAuth } from '../contexts/AuthContext';

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
  const { user, login, logout } = useAuth();

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
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Header context (removed logo since it's in sidebar now) */}
          <div className="flex items-center space-x-3">
             <div className="hidden sm:block">
              <span className="font-mono text-sm text-slate-400">
                Professor Virtual &middot; Aprendizado Interativo
              </span>
            </div>
          </div>

          {/* Level Badge, XP & Methodology button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user ? (
              <button
                onClick={logout}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors flex items-center space-x-1.5"
                title="Sair da conta"
              >
                <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-4 h-4 rounded-full" />
                <span className="hidden md:inline">Sair</span>
              </button>
            ) : (
              <button
                onClick={login}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors flex items-center space-x-1.5"
                title="Entrar com Google"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Entrar</span>
              </button>
            )}

            <button
              id="btn-methodology"
              onClick={onOpenMethodology}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors flex items-center space-x-1.5"
              title="Ver as 10 regras metodológicas pedagógicas"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Metodologia</span>
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
              <span className="hidden md:inline">Nível: </span>
              <span>{studentLevel}</span>
            </button>

            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs font-mono text-amber-400">
              <Award className="w-3.5 h-3.5" />
              <span>{xpPoints} XP</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
