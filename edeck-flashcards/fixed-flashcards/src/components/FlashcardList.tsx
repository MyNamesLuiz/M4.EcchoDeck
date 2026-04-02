import React, { useState, useMemo } from 'react';
import { Flashcard } from '../types';
import FlashcardItem from './FlashcardItem';

interface FlashcardListProps {
  flashcards: Flashcard[];
  onUpdateMastery: (id: string, newLevel: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

type SortMode = 'recent' | 'mastery_asc' | 'random';

const FlashcardList: React.FC<FlashcardListProps> = ({
  flashcards,
  onUpdateMastery,
  onDelete,
}) => {
  const [sortMode, setSortMode] = useState<SortMode>('recent');

  const sorted = useMemo(() => {
    const copy = [...flashcards];
    if (sortMode === 'mastery_asc') return copy.sort((a, b) => a.masteryLevel - b.masteryLevel);
    if (sortMode === 'random') return copy.sort(() => Math.random() - 0.5);
    return copy.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [flashcards, sortMode]);

  const avgMastery = useMemo(
    () =>
      flashcards.length > 0
        ? flashcards.reduce((s, c) => s + c.masteryLevel, 0) / flashcards.length
        : 0,
    [flashcards]
  );

  if (flashcards.length === 0) {
    return (
      <section className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-8 h-8 text-slate-400"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </div>
        <p className="text-slate-500 font-semibold">Nenhum flashcard ainda</p>
        <p className="text-slate-400 text-sm mt-1">
          Crie seu primeiro card na aba{' '}
          <span className="text-indigo-500 font-medium">Criar Novo</span>
        </p>
      </section>
    );
  }

  return (
    <section>
      {/* Controls row */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">{flashcards.length}</span> cards ·
          domínio médio{' '}
          <span className="font-semibold text-slate-700">{avgMastery.toFixed(1)}/5</span>
        </p>

        <div className="flex items-center gap-1.5">
          {(
            [
              { id: 'recent', label: 'Recentes' },
              { id: 'mastery_asc', label: 'Domínio' },
              { id: 'random', label: 'Aleatório' },
            ] as { id: SortMode; label: string }[]
          ).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSortMode(id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                sortMode === id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Card rows */}
      <div className="space-y-2">
        {sorted.map((card, idx) => (
          <FlashcardItem
            key={card.id}
            flashcard={card}
            index={idx}
            onUpdateMastery={onUpdateMastery}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default FlashcardList;
