import React, { useState, useMemo } from 'react';
import { useFlashcards } from './hooks/useFlashcards';
import Sidebar from './components/Sidebar';
import DeckHeader from './components/DeckHeader';
import FlashcardList from './components/FlashcardList';
import FlashcardForm from './components/FlashcardForm';
import StudyMode from './components/StudyMode';

type Tab = 'flashcards' | 'criar' | 'sobre';

const masteryLegend = [
  { level: 1, label: 'Não sei', bgClass: 'bg-red-500', desc: 'Precisa revisar urgentemente' },
  { level: 2, label: 'Pouco', bgClass: 'bg-orange-500', desc: 'Lembrei vagamente' },
  { level: 3, label: 'Razoável', bgClass: 'bg-yellow-400', desc: 'Lembrei com esforço' },
  { level: 4, label: 'Bom', bgClass: 'bg-emerald-500', desc: 'Lembrei com facilidade' },
  { level: 5, label: 'Excelente', bgClass: 'bg-emerald-700', desc: 'Domínio completo' },
];

function App() {
  const {
    flashcards,
    loading,
    error,
    addFlashcard,
    updateMastery,
    removeFlashcard,
  } = useFlashcards();

  const [activeTab, setActiveTab] = useState<Tab>('flashcards');
  const [isStudying, setIsStudying] = useState(false);

  const masteryPercentage = useMemo(
    () =>
      flashcards.length > 0
        ? (flashcards.reduce((sum, c) => sum + c.masteryLevel, 0) / (flashcards.length * 5)) * 100
        : 0,
    [flashcards]
  );

  const studiedCount = useMemo(
    () => flashcards.filter((c) => c.masteryLevel > 1).length,
    [flashcards]
  );

  if (isStudying && flashcards.length > 0) {
    return (
      <StudyMode
        flashcards={flashcards}
        onUpdateMastery={updateMastery}
        onExit={() => setIsStudying(false)}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 ml-16">
        {/* Deck header */}
        <DeckHeader
          cardCount={flashcards.length}
          studiedCount={studiedCount}
          masteryPercentage={masteryPercentage}
          onStudy={() => setIsStudying(true)}
        />

        {/* Tab bar */}
        <div className="bg-white border-b border-slate-200 px-8">
          <div className="flex">
            {(
              [
                { id: 'flashcards' as Tab, label: `Flashcards (${flashcards.length})` },
                { id: 'criar' as Tab, label: 'Criar Novo' },
                { id: 'sobre' as Tab, label: 'Sobre' },
              ] as { id: Tab; label: string }[]
            ).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                  activeTab === id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {/* Error banner */}
          {error && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5 flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div
                className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"
                role="status"
                aria-label="Carregando flashcards"
              />
              <p className="ml-3 text-slate-500 text-sm">Carregando flashcards...</p>
            </div>
          )}

          {/* Flashcards tab */}
          {activeTab === 'flashcards' && !loading && (
            <FlashcardList
              flashcards={flashcards}
              onUpdateMastery={updateMastery}
              onDelete={removeFlashcard}
            />
          )}

          {/* Criar tab */}
          {activeTab === 'criar' && <FlashcardForm onSubmit={addFlashcard} />}

          {/* Sobre tab */}
          {activeTab === 'sobre' && (
            <div className="max-w-xl">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500">
                    <span className="text-white font-black text-xs">ED</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-800">Eccho Deck</h2>
                    <p className="text-xs text-slate-500">Repetição Espaçada Inteligente</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  O <strong>Eccho Deck</strong> usa o método de repetição espaçada para ajudá-lo
                  a memorizar conteúdo de forma eficiente. Avalie seu nível de domínio em cada
                  card de 1 a 5 para que o sistema registre seu progresso.
                </p>
                <div className="space-y-2.5">
                  {masteryLegend.map(({ level, label, bgClass, desc }) => (
                    <div key={level} className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${bgClass}`}
                      >
                        {level}
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-700">{label}</span>
                        <span className="text-xs text-slate-400 ml-2">{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
