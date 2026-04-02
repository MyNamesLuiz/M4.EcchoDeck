import React, { useState, useCallback } from 'react';
import { Flashcard } from '../types';
import ConfirmationModal from './ConfirmationModal';

interface FlashcardItemProps {
  flashcard: Flashcard;
  index: number;
  onUpdateMastery: (id: string, newLevel: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const masteryLabels = ['Não sei', 'Pouco', 'Razoável', 'Bom', 'Excelente'];

// Full Tailwind class strings — must be complete for JIT to include them
const masteryDotClass = [
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-400',
  'bg-emerald-500',
  'bg-emerald-700',
];

const masteryBtnActiveClass = [
  'bg-red-500 text-white',
  'bg-orange-500 text-white',
  'bg-yellow-400 text-indigo-950',
  'bg-emerald-500 text-white',
  'bg-emerald-700 text-white',
];

const FlashcardItem: React.FC<FlashcardItemProps> = ({
  flashcard,
  index,
  onUpdateMastery,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // masteryLevel 1–5 → 0–100%
  const masteryPct = ((flashcard.masteryLevel - 1) / 4) * 100;
  const colorClass = masteryDotClass[flashcard.masteryLevel - 1];

  const handleMasteryUpdate = useCallback(
    async (newLevel: number) => {
      setIsUpdating(true);
      try {
        await onUpdateMastery(flashcard.id, newLevel);
      } finally {
        setIsUpdating(false);
      }
    },
    [flashcard.id, onUpdateMastery]
  );

  const handleDelete = useCallback(async () => {
    try {
      await onDelete(flashcard.id);
    } finally {
      setShowDeleteConfirm(false);
    }
  }, [flashcard.id, onDelete]);

  const toggleExpand = () => {
    setIsExpanded((v) => !v);
    setIsFlipped(false);
  };

  return (
    <>
      <article className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-shadow hover:shadow-md">
        {/* Row */}
        <div className="flex items-center gap-4 px-5 py-3.5">
          {/* Mastery dot + index */}
          <div className="flex items-center gap-2 w-14 flex-shrink-0">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${colorClass}`} />
            <span className="text-xs font-semibold text-slate-400">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Question + progress bar */}
          <div className="flex-1 min-w-0">
            <p className="text-slate-700 text-sm font-medium truncate">
              {flashcard.question}
            </p>
            <div className="mt-1.5 h-1 rounded-full overflow-hidden bg-slate-100 max-w-xs">
              <div
                className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                style={{ width: `${masteryPct}%` }}
              />
            </div>
          </div>

          {/* Mastery label (desktop) */}
          <span className="hidden sm:block text-xs text-slate-400 flex-shrink-0 w-16 text-right">
            {masteryLabels[flashcard.masteryLevel - 1]}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={toggleExpand}
              title={isExpanded ? 'Recolher' : 'Expandir'}
              aria-label={isExpanded ? 'Recolher card' : 'Expandir card'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isExpanded
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                {isExpanded ? (
                  <path d="M19 13H5v-2h14v2z" />
                ) : (
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                )}
              </svg>
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              title="Remover flashcard"
              aria-label="Remover flashcard"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/70">
            {/* Flip card */}
            <div
              style={{ perspective: '900px' }}
              className="cursor-pointer"
              onClick={() => setIsFlipped((f) => !f)}
            >
              <div
                className="relative rounded-lg bg-white border border-slate-200 overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
                  minHeight: '90px',
                }}
              >
                {/* Front */}
                <div className="p-5" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2 text-indigo-500">
                    Pergunta
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {flashcard.question}
                  </p>
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 p-5 bg-white rounded-lg"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="text-xs font-bold uppercase tracking-widest mb-2 text-purple-500">
                    Resposta
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {flashcard.answer}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 text-center">
                Clique para {isFlipped ? 'ver a pergunta' : 'revelar a resposta'}
              </p>
            </div>

            {/* Mastery rating */}
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <span className="text-sm text-slate-500 font-medium">Domínio:</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleMasteryUpdate(level)}
                    disabled={isUpdating}
                    title={masteryLabels[level - 1]}
                    aria-label={`Avaliar domínio como ${masteryLabels[level - 1]}`}
                    className={`w-8 h-8 rounded-full text-xs font-bold transition-all disabled:opacity-50 ${
                      flashcard.masteryLevel >= level
                        ? masteryBtnActiveClass[level - 1]
                        : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-400">
                {masteryLabels[flashcard.masteryLevel - 1]}
              </span>
            </div>
          </div>
        )}
      </article>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Remover Flashcard"
        message="Tem certeza que deseja remover este flashcard? Esta ação não pode ser desfeita."
      />
    </>
  );
};

export default FlashcardItem;
