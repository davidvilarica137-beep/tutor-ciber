import React from 'react';
import {
  Terminal,
  Cpu,
  Network,
  Shield,
  Lock,
  Globe,
  Search,
  ShieldAlert,
  Crosshair,
  Code2,
  CheckCircle2,
  Layers,
  Sparkles,
  Zap,
  BookOpen,
} from 'lucide-react';
import { TrackId, StudentLevel, ProgressionStage, PROGRESSION_STAGES } from '../types';
import { TRACKS } from '../data/curriculum';

interface TrackNavigatorProps {
  activeTrackId: TrackId;
  onSelectTrack: (trackId: TrackId) => void;
  activeStage: ProgressionStage;
  onSelectStage: (stage: ProgressionStage) => void;
  completedLessons: string[];
  studentLevel: StudentLevel;
}

export const TrackNavigator: React.FC<TrackNavigatorProps> = ({
  activeTrackId,
  onSelectTrack,
  activeStage,
  onSelectStage,
  completedLessons,
  studentLevel,
}) => {
  const activeTrack = TRACKS.find((t) => t.id === activeTrackId) || TRACKS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'Terminal':
        return <Terminal className="w-4 h-4" />;
      case 'Network':
        return <Network className="w-4 h-4" />;
      case 'Shield':
        return <Shield className="w-4 h-4" />;
      case 'Lock':
        return <Lock className="w-4 h-4" />;
      case 'Globe':
        return <Globe className="w-4 h-4" />;
      case 'Search':
        return <Search className="w-4 h-4" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4" />;
      case 'Crosshair':
        return <Crosshair className="w-4 h-4" />;
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-3 sm:p-4 space-y-3.5 shadow-md">
      {/* 10 Areas Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
        <div className="flex items-center space-x-2">
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Currículo Oficial: 10 Áreas Principais DNF</span>
          </h3>
        </div>
        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <span className="text-slate-400">
            Nível: <strong className="text-emerald-400 font-bold">{studentLevel}</strong>
          </span>
          <span className="text-slate-400 hidden md:inline">
            Progresso: <strong className="text-cyan-400">{completedLessons.length} itens dominados</strong>
          </span>
        </div>
      </div>

      {/* Grid of 10 Official Areas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-1.5">
        {TRACKS.map((track) => {
          const isActive = track.id === activeTrackId;
          const isCompleted = completedLessons.some((id) => id.includes(track.id));

          return (
            <button
              key={track.id}
              id={`track-btn-${track.id}`}
              onClick={() => onSelectTrack(track.id)}
              className={`text-left p-2.5 rounded-lg border transition-all relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800/95 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-950/60'
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500" />
              )}

              <div className="flex items-center justify-between w-full mb-1">
                <span
                  className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {track.number}
                </span>

                <span
                  className={`${
                    isActive ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {getIcon(track.icon)}
                </span>
              </div>

              <div className="space-y-0.5">
                <div
                  className={`text-[11px] font-bold line-clamp-1 ${
                    isActive ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {track.title.split(':')[0]}
                </div>
                <div className="text-[9px] text-slate-400 truncate">
                  {track.badge}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Area Topics & 8-Stage Progression Strip */}
      <div className="p-3 bg-slate-950/90 rounded-lg border border-slate-800/80 space-y-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 bg-emerald-950/80 rounded border border-emerald-800">
              Área {activeTrack.number}
            </span>
            <h4 className="text-xs font-bold text-white">
              {activeTrack.title}
            </h4>
          </div>

          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xl">
            {activeTrack.shortDescription}
          </p>
        </div>

        {/* 8-Stage Progression Tabs */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
            <span>8 Etapas de Progressão Metodológica DNF:</span>
            <span className="text-emerald-400">Etapa Ativa: {activeStage}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
            {PROGRESSION_STAGES.map((stg) => {
              const isStageActive = stg.id === activeStage;
              return (
                <button
                  key={stg.id}
                  onClick={() => onSelectStage(stg.id)}
                  title={stg.shortDesc}
                  className={`p-1.5 rounded text-left border text-[11px] transition-all flex flex-col justify-between ${
                    isStageActive
                      ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500 font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-[9px] font-mono text-slate-500 block mb-0.5">
                    {stg.badge}
                  </span>
                  <span className="truncate block font-semibold text-[10px]">
                    {stg.title.replace(/^\d+\.\s*/, '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Official Topic Tags */}
        <div className="pt-1 flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0">
            Tópicos Oficiais:
          </span>
          <div className="flex flex-wrap gap-1">
            {activeTrack.officialTopics.map((topic, tIdx) => {
              const isMastered = completedLessons.includes(`topic-${activeTrack.id}-${tIdx}`);
              return (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 border border-slate-700/80 text-slate-300 flex items-center space-x-1 whitespace-nowrap"
                >
                  {isMastered && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 inline" />}
                  <span>{topic}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
