import React from 'react';
import MasteryCircle from './MasteryCircle';

interface DeckHeaderProps {
  cardCount: number;
  studiedCount: number;
  masteryPercentage: number;
  onStudy: () => void;
}

const DeckHeader: React.FC<DeckHeaderProps> = ({
  cardCount,
  studiedCount,
  masteryPercentage,
  onStudy,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 px-8 py-7">
      <div className="flex items-center gap-6">
        {/* Deck thumbnail */}
        <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 bg-gradient-to-br from-violet-600 to-pink-600">
          <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12 opacity-90">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9zM12 5.36L18.5 9 12 12.64 5.5 9 12 5.36zM5 13.99l7 3.82 7-3.82v-4.17L12 14.64 5 10.82v3.17z" />
          </svg>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Eccho Deck</h1>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              Certificado
            </span>
          </div>

          <p className="text-slate-500 text-sm mb-4">
            Cards estudados:{' '}
            <span className="font-semibold text-slate-700">
              {studiedCount} de {cardCount}
            </span>
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            {/* STUDY button */}
            <button
              onClick={onStudy}
              disabled={cardCount === 0}
              className="flex items-center gap-2 font-bold text-sm px-7 py-2.5 rounded-full shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white tracking-wider hover:brightness-110 active:brightness-90"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M8 5v14l11-7z" />
              </svg>
              ESTUDAR
            </button>

            {/* Share button */}
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-semibold text-sm px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-all">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              COMPARTILHAR
            </button>

            {/* More options */}
            <button
              aria-label="Mais opções"
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <circle cx="5" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="19" cy="12" r="1.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mastery circle */}
        <div className="flex-shrink-0">
          <MasteryCircle percentage={masteryPercentage} size={104} />
        </div>
      </div>
    </div>
  );
};

export default DeckHeader;
