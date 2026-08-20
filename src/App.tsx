/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TrackNavigator } from './components/TrackNavigator';
import { ClassroomChat } from './components/ClassroomChat';
import { PythonLab } from './components/PythonLab';
import { TerminalLab } from './components/TerminalLab';
import { SecurityPlayground } from './components/SecurityPlayground';
import { DiagnosticModal } from './components/DiagnosticModal';
import { MethodologyModal } from './components/MethodologyModal';
import { StudentLevel, TrackId, ProgressionStage, AppTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('tutor');

  const [activeTrackId, setActiveTrackId] = useState<TrackId>('python');
  const [activeStage, setActiveStage] = useState<ProgressionStage>('fundamentos');

  const [studentLevel, setStudentLevel] = useState<StudentLevel>(() => {
    const saved = localStorage.getItem('dnf_student_level');
    return (saved as StudentLevel) || 'INICIANTE';
  });

  const [completedExercises, setCompletedExercises] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dnf_completed_exercises');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [xpPoints, setXpPoints] = useState<number>(() => {
    const saved = localStorage.getItem('dnf_xp_points');
    return saved ? parseInt(saved, 10) : 100;
  });

  const [editorCode, setEditorCode] = useState<string | undefined>(undefined);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dnf_student_level', studentLevel);
  }, [studentLevel]);

  useEffect(() => {
    localStorage.setItem('dnf_completed_exercises', JSON.stringify(completedExercises));
  }, [completedExercises]);

  useEffect(() => {
    localStorage.setItem('dnf_xp_points', xpPoints.toString());
  }, [xpPoints]);

  const handleExerciseCompleted = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises((prev) => [...prev, exerciseId]);
      setXpPoints((prev) => prev + 50);
    }
  };

  const handleSendCodeToEditor = (code: string) => {
    setEditorCode(code);
    setActiveTab('python');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans selection:bg-emerald-900/60 selection:text-emerald-200">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top Header */}
        <Header
          activeTab={activeTab as any}
          setActiveTab={setActiveTab as any}
          studentLevel={studentLevel}
          onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
          onOpenMethodology={() => setIsMethodologyOpen(true)}
          activeTrackId={activeTrackId}
          onSelectTrack={(trackId) => {
            setActiveTrackId(trackId);
            setActiveStage('fundamentos');
          }}
          completedExercisesCount={completedExercises.length}
          xpPoints={xpPoints}
        />

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 space-y-4">
          {/* Official 10-Area Track & 8-Stage Progression Navigator */}
          <TrackNavigator
            activeTrackId={activeTrackId}
            onSelectTrack={(trackId) => {
              setActiveTrackId(trackId);
              setActiveStage('fundamentos');
            }}
            activeStage={activeStage}
            onSelectStage={setActiveStage}
            completedLessons={completedExercises}
            studentLevel={studentLevel}
          />

          {/* Active Tab View */}
          {activeTab === 'tutor' && (
            <ClassroomChat
              activeTrackId={activeTrackId}
              activeStage={activeStage}
              onSelectStage={setActiveStage}
              studentLevel={studentLevel}
              onSendCodeToEditor={handleSendCodeToEditor}
              onExerciseCompleted={handleExerciseCompleted}
            />
          )}

          {activeTab === 'python' && (
            <PythonLab
              key={editorCode || 'default'}
              initialCode={editorCode}
              studentLevel={studentLevel}
              onExerciseCompleted={handleExerciseCompleted}
            />
          )}

          {activeTab === 'linux' && (
            <TerminalLab onExerciseCompleted={handleExerciseCompleted} />
          )}

          {activeTab === 'cybersecurity' && (
            <SecurityPlayground onExerciseCompleted={handleExerciseCompleted} />
          )}

          {['redes', 'osint', 'wireshark', 'labs', 'visualizations', 'exercises', 'glossary', 'progress'].includes(activeTab) && (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500">
              <div className="text-center">
                <h3 className="text-lg font-medium text-slate-300">Módulo em Desenvolvimento</h3>
                <p className="mt-2 text-sm">A nova plataforma interativa está sendo construída (Fase 2).</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        currentLevel={studentLevel}
        onUpdateLevel={(newLevel) => setStudentLevel(newLevel)}
      />

      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
