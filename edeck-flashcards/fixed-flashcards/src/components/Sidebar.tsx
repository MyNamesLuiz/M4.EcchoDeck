import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed left-0 top-0 h-full w-16 flex flex-col items-center py-5 z-40 shadow-2xl bg-[#12082b]"
    >
      {/* Logo */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-8 shadow-lg flex-shrink-0 bg-gradient-to-br from-indigo-400 to-purple-500">
        <span className="text-white font-black text-xs tracking-tight select-none">ED</span>
      </div>

      {/* Nav icons */}
      <div className="flex flex-col gap-2 flex-1">
        <SidebarIcon active title="Início" aria-label="Início">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </SidebarIcon>

        <SidebarIcon title="Explorar" aria-label="Explorar">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </SidebarIcon>

        <SidebarIcon title="Meus Decks" aria-label="Meus Decks">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </SidebarIcon>

        <SidebarIcon title="Progresso" aria-label="Progresso">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </SidebarIcon>
      </div>

      {/* Bottom */}
      <SidebarIcon title="Configurações" aria-label="Configurações">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </SidebarIcon>
    </nav>
  );
};

interface SidebarIconProps {
  children: React.ReactNode;
  active?: boolean;
  title: string;
  'aria-label': string;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({
  children,
  active,
  title,
  'aria-label': ariaLabel,
}) => (
  <button
    title={title}
    aria-label={ariaLabel}
    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
      active
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
        : 'text-indigo-300/50 hover:bg-white/10 hover:text-indigo-200'
    }`}
  >
    {children}
  </button>
);

export default Sidebar;
