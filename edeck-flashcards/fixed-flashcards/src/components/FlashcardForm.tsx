import React, { useState, FormEvent } from 'react';
import { FlashcardInput } from '../types';

interface FlashcardFormProps {
  onSubmit: (data: FlashcardInput) => Promise<void>;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      setError('Pergunta e resposta são obrigatórias');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await onSubmit({ question: question.trim(), answer: answer.trim() });
      setQuestion('');
      setAnswer('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2800);
    } catch {
      setError('Falha ao criar flashcard. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = question.trim().length > 0 && answer.trim().length > 0;

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50">
          <h2 className="text-sm font-bold text-slate-700 tracking-wide">NOVO FLASHCARD</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Preencha a pergunta e a resposta abaixo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Question */}
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-semibold text-slate-600 mb-1.5"
            >
              Pergunta
            </label>
            <textarea
              id="question"
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-slate-700 text-sm placeholder-slate-400 resize-none border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              placeholder="O que você quer memorizar? Ex: O que é repetição espaçada?"
              disabled={isSubmitting}
            />
          </div>

          {/* Answer */}
          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-semibold text-slate-600 mb-1.5"
            >
              Resposta
            </label>
            <textarea
              id="answer"
              rows={3}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-slate-700 text-sm placeholder-slate-400 resize-none border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
              placeholder="A resposta correta ou explicação..."
              disabled={isSubmitting}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 px-3 py-2.5 rounded-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              role="status"
              className="flex items-center gap-2 text-emerald-700 text-sm bg-emerald-50 border border-emerald-200 px-3 py-2.5 rounded-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              Flashcard criado com sucesso!
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || !canSubmit}
            className={`w-full font-bold text-sm py-3 px-4 rounded-lg transition-all duration-200 text-white disabled:cursor-not-allowed ${
              canSubmit && !isSubmitting
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm hover:shadow-md'
                : 'bg-indigo-200 opacity-60'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                    className="opacity-75"
                  />
                </svg>
                Criando...
              </span>
            ) : (
              '+ Criar Flashcard'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlashcardForm;
