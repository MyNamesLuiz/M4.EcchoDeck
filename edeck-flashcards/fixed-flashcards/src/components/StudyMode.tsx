import React, { useState, useEffect, useCallback } from 'react';
import { Flashcard } from '../types';

interface StudyModeProps {
  flashcards: Flashcard[];
  onUpdateMastery: (id: string, level: number) => Promise<void>;
  onExit: () => void;
}

const confidenceOptions = [
  { level: 1, label: 'Não sei', className: 'bg-red-500 hover:bg-red-600 text-white' },
  { level: 2, label: 'Pouco', className: 'bg-orange-500 hover:bg-orange-600 text-white' },
  { level: 3, label: 'Razoável', className: 'bg-yellow-400 hover:bg-yellow-500 text-indigo-950' },
  { level: 4, label: 'Bom', className: 'bg-emerald-500 hover:bg-emerald-600 text-white' },
  { level: 5, label: 'Excelente', className: 'bg-emerald-700 hover:bg-emerald-800 text-white' },
];

const StudyMode: React.FC<StudyModeProps> = ({ flashcards, onUpdateMastery, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [studiedCount, setStudiedCount] = useState(0);

  const isComplete = currentIndex >= flashcards.length;
  const current = flashcards[currentIndex];
  const progress = flashcards.length > 0 ? (currentIndex / flashcards.length) * 100 : 0;

  const flip = useCallback(() => {
    if (!isAnimating && !isComplete) {
      setIsFlipped((f) => !f);
    }
  }, [isAnimating, isComplete]);

  const handleRating = useCallback(
    async (level: number) => {
      if (!current) return;
      await onUpdateMastery(current.id, level);
      setStudiedCount((c) => c + 1);
      setIsAnimating(true);
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setIsAnimating(false);
      }, 320);
    },
    [current, onUpdateMastery]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        flip();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [flip]);

  return (
    <div className="fixed inset-0 flex flex-col z-50 bg-[#0f0a1e]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07] flex-shrink-0">
        <button
          onClick={onExit}
          aria-label="Sair do modo de estudo"
          className="flex items-center gap-2 transition-colors text-sm font-medium text-slate-400 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Sair
        </button>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">
            {Math.min(currentIndex + 1, flashcards.length)} / {flashcards.length}
          </span>
          <div className="w-48 h-1.5 rounded-full overflow-hidden bg-white/10">
            <div
              className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className="text-sm text-slate-500">{studiedCount} estudados</span>
      </div>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {isComplete ? (
          /* Completion screen */
          <div className="text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Sessão concluída!</h2>
            <p className="text-slate-400 mb-8">
              {studiedCount} cards estudados nesta sessão
            </p>
            <button
              onClick={onExit}
              className="font-semibold px-8 py-3 rounded-full text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 transition-all"
            >
              Voltar ao Deck
            </button>
          </div>
        ) : (
          <>
            {/* Flip card */}
            <div
              className="w-full max-w-2xl cursor-pointer select-none"
              style={{ perspective: '1200px' }}
              onClick={flip}
            >
              <div
                className="relative w-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  minHeight: '240px',
                }}
              >
                {/* Front – Question */}
                <div
                  className="absolute inset-0 rounded-2xl p-8 flex flex-col bg-white shadow-2xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-xs font-bold uppercase tracking-widest mb-5 text-indigo-500">
                    Pergunta
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-slate-800 text-xl font-medium text-center leading-relaxed">
                      {current?.question}
                    </p>
                  </div>
                  <div className="text-center text-slate-400 text-sm mt-4">
                    Clique ou pressione{' '}
                    <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono border border-slate-200">
                      Espaço
                    </kbd>{' '}
                    para revelar
                  </div>
                </div>

                {/* Back – Answer */}
                <div
                  className="absolute inset-0 rounded-2xl p-8 flex flex-col bg-white shadow-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="text-xs font-bold uppercase tracking-widest mb-5 text-purple-500">
                    Resposta
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-slate-800 text-xl font-medium text-center leading-relaxed">
                      {current?.answer}
                    </p>
                  </div>
                  <div className="text-center text-slate-400 text-sm mt-4">
                    Clique para voltar à pergunta
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence rating */}
            <div
              className={`mt-8 text-center transition-all duration-300 ${
                isFlipped ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <p className="text-sm mb-4 text-slate-400">Como foi seu desempenho?</p>
              <div className="flex gap-2.5 justify-center flex-wrap">
                {confidenceOptions.map(({ level, label, className }) => (
                  <button
                    key={level}
                    onClick={() => handleRating(level)}
                    disabled={isAnimating}
                    className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
                  >
                    {level} – {label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudyMode;
