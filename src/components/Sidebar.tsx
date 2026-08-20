import React from 'react';
import { 
  Bot, 
  Globe, 
  Terminal, 
  Code2, 
  Shield, 
  Search, 
  Package, 
  FlaskConical, 
  BarChart3, 
  FileEdit, 
  BookMarked, 
  LineChart 
} from 'lucide-react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const MENU_ITEMS = [
  { id: 'tutor', label: 'Tutor IA', icon: Bot },
  { id: 'redes', label: 'Redes', icon: Globe },
  { id: 'linux', label: 'Linux', icon: Terminal },
  { id: 'python', label: 'Python', icon: Code2 },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: Shield },
  { id: 'osint', label: 'OSINT', icon: Search },
  { id: 'wireshark', label: 'Wireshark', icon: Package },
  { id: 'labs', label: 'Laboratórios', icon: FlaskConical },
  { id: 'visualizations', label: 'Visualizações', icon: BarChart3 },
  { id: 'exercises', label: 'Exercícios', icon: FileEdit },
  { id: 'glossary', label: 'Glossário', icon: BookMarked },
  { id: 'progress', label: 'Meu progresso', icon: LineChart },
] as const;

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full flex-shrink-0">
      <div className="p-4 border-b border-slate-800 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
            <Shield className="w-4 h-4 text-slate-950 font-bold" />
          </div>
          <span className="font-mono font-bold text-sm text-white tracking-wide">
            CYBER <span className="text-emerald-400">TUTOR</span>
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AppTab)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
