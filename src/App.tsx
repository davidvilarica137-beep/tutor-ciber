/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TrackNavigator } from './components/TrackNavigator';
import { ClassroomChat } from './components/ClassroomChat';
import { PythonLab } from './components/PythonLab';
import { TerminalLab } from './components/TerminalLab';
import { SecurityPlayground } from './components/SecurityPlayground';
import { DiagnosticModal } from './components/DiagnosticModal';
import { MethodologyModal } from './components/MethodologyModal';
import { StudentLevel, TrackId, ProgressionStage } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'classroom' | 'python_lab' | 'terminal_lab' | 'security_playground'
  >('classroom');

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
    setActiveTab('python_lab');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-900/60 selection:text-emerald-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 space-y-4">
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
        {activeTab === 'classroom' && (
          <ClassroomChat
            activeTrackId={activeTrackId}
            activeStage={activeStage}
            onSelectStage={setActiveStage}
            studentLevel={studentLevel}
            onSendCodeToEditor={handleSendCodeToEditor}
            onExerciseCompleted={handleExerciseCompleted}
          />
        )}

        {activeTab === 'python_lab' && (
          <PythonLab
            key={editorCode || 'default'}
            initialCode={editorCode}
            studentLevel={studentLevel}
            onExerciseCompleted={handleExerciseCompleted}
          />
        )}

        {activeTab === 'terminal_lab' && (
          <TerminalLab onExerciseCompleted={handleExerciseCompleted} />
        )}

        {activeTab === 'security_playground' && (
          <SecurityPlayground onExerciseCompleted={handleExerciseCompleted} />
        )}
      </main>

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
