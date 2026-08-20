export type AppTab = 
  | 'tutor'
  | 'redes'
  | 'linux'
  | 'python'
  | 'cybersecurity'
  | 'osint'
  | 'wireshark'
  | 'labs'
  | 'visualizations'
  | 'exercises'
  | 'glossary'
  | 'progress';

export type StudentLevel = 'INICIANTE' | 'BÁSICO' | 'INTERMEDIÁRIO' | 'AVANÇADO';

export type TrackId =
  | 'python'
  | 'linux'
  | 'networks'
  | 'cyber_fundamentals'
  | 'app_sec'
  | 'web_protocols'
  | 'vuln_analysis'
  | 'defensive_sec'
  | 'pentest_ethics'
  | 'sec_automation';

export type ProgressionStage =
  | 'fundamentos'
  | 'conceitos'
  | 'exemplos'
  | 'exercicio_basico'
  | 'exercicio_intermediario'
  | 'projeto_pratico'
  | 'avaliacao'
  | 'revisao';

export interface ProgressionStageInfo {
  id: ProgressionStage;
  step: number;
  title: string;
  shortDesc: string;
  badge: string;
}

export const PROGRESSION_STAGES: ProgressionStageInfo[] = [
  { id: 'fundamentos', step: 1, title: '1. Fundamentos', shortDesc: 'Base e introdução intuitiva sem presunção de conhecimento', badge: 'Etapa 1' },
  { id: 'conceitos', step: 2, title: '2. Conceitos Essenciais', shortDesc: 'Estruturas formais e regras técnicas aprofundadas', badge: 'Etapa 2' },
  { id: 'exemplos', step: 3, title: '3. Exemplos & Linha por Linha', shortDesc: 'Análise de código e comandos linha por linha', badge: 'Etapa 3' },
  { id: 'exercicio_basico', step: 4, title: '4. Exercícios Básicos', shortDesc: 'Fixação de sintaxe e lógica elementar', badge: 'Etapa 4' },
  { id: 'exercicio_intermediario', step: 5, title: '5. Exercícios Intermediários', shortDesc: 'Desafios com restrições e casos de borda', badge: 'Etapa 5' },
  { id: 'projeto_pratico', step: 6, title: '6. Projeto Prático', shortDesc: 'Construção de ferramenta/script funcional completo', badge: 'Etapa 6' },
  { id: 'avaliacao', step: 7, title: '7. Avaliação', shortDesc: 'Verificação rigorosa de domínio antes de avançar', badge: 'Etapa 7' },
  { id: 'revisao', step: 8, title: '8. Revisão', shortDesc: 'Conexão com áreas anteriores e consolidação', badge: 'Etapa 8' },
];

export interface TrackInfo {
  id: TrackId;
  number: number;
  title: string;
  shortDescription: string;
  officialTopics: string[];
  icon: string;
  color: string;
  badge: string;
  modulesCount: number;
}

export interface LineExplanation {
  line: number;
  code: string;
  explanation: string;
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticalExercise {
  id: string;
  title: string;
  stage: ProgressionStage;
  objective: string;
  instructions: string[];
  starterCode: string;
  expectedOutputHint?: string;
  hint1: string;
  hint2: string;
  solutionCode: string;
  solutionExplanation: string;
}

export interface LessonModule {
  id: string;
  trackId: TrackId;
  stage: ProgressionStage;
  title: string;
  level: StudentLevel;
  topicsCovered: string[];
  conceptSummary: string;
  detailedExplanation: string;
  codeExample?: string;
  lineByLineExplanation?: LineExplanation[];
  comprehensionQuestion: ComprehensionQuestion;
  exercise: PracticalExercise;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor' | 'system';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  checkQuestion?: ComprehensionQuestion;
  exerciseContext?: {
    title: string;
    starterCode: string;
  };
  hintsAvailable?: {
    hint1: string;
    hint2: string;
    solution?: string;
  };
  hintsRevealed?: number; // 0, 1, 2, 3
  isErrorAnalysis?: boolean;
}

export interface DiagnosticQuestion {
  id: number;
  area: string;
  question: string;
  options: { label: string; levelWeight: StudentLevel }[];
}

export interface PythonRunResult {
  stdout: string;
  stderr: string;
  hasError: boolean;
  errorType?: 'SyntaxError' | 'LogicError' | 'RuntimeError' | 'SecurityWarning';
  errorDetails?: string;
  executionTimeMs: number;
}
