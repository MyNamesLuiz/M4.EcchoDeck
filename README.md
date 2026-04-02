# Eccho Deck

Aplicação de estudo com flashcards baseada em repetição espaçada.

## Problema resolvido

Estudantes universitários e de cursos técnicos esquecem o conteúdo estudado por falta de revisão sistemática. O **Eccho Deck** permite criar flashcards de pergunta e resposta, estudar com flip de carta e registrar o nível de domínio (1–5) para cada card — dando visibilidade ao que ainda precisa de atenção.

Leia o [PRD.md](./PRD.md) para a definição completa do problema, usuário e decisões técnicas.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | React 18 + TypeScript |
| Estilização | Tailwind CSS |
| Estado e lógica | React Hooks (`useState`, `useEffect`, `useCallback`) |
| API local | json-server |
| Build | Vite |

---

## Estrutura do projeto

```
flashcards/
├── db.json                          # Banco de dados local (json-server)
├── PRD.md                           # Mini Product Requirements Document
└── src/
    ├── App.tsx                      # Componente raiz — layout e roteamento de views
    ├── types/
    │   └── index.ts                 # Interfaces: Flashcard, FlashcardInput, ApiError
    ├── services/
    │   └── api.ts                   # Camada de comunicação HTTP (fetch)
    ├── hooks/
    │   └── useFlashcards.ts         # Custom hook: estado e operações CRUD
    └── components/
        ├── Sidebar.tsx              # Navegação lateral
        ├── DeckHeader.tsx           # Cabeçalho do deck com stats e botão ESTUDAR
        ├── MasteryCircle.tsx        # Indicador circular de domínio (SVG)
        ├── StudyMode.tsx            # Modo de estudo full-screen com flip 3D
        ├── FlashcardList.tsx        # Lista de cards com ordenação
        ├── FlashcardItem.tsx        # Card individual com flip e avaliação
        ├── FlashcardForm.tsx        # Formulário de criação
        └── ConfirmationModal.tsx    # Modal de confirmação de remoção
```

---

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- npm

### Instalação

```bash
npm install
```

### Rodar a API (json-server)

```bash
npx json-server --watch db.json --port 3001
```

### Rodar o frontend (em outro terminal)

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

> A API precisa estar rodando na porta **3001** antes de iniciar o frontend.

---

## Deploy

Link do deploy: **[a preencher após publicação na Vercel]**

> Para fazer o deploy: publicar a API no Railway ou Render, atualizar `API_BASE_URL` em `src/services/api.ts` com a URL pública, e então fazer deploy do frontend na Vercel.

---

## Funcionalidades

- Criar flashcards com pergunta e resposta
- Modo de estudo full-screen com flip de carta (animação 3D)
- Avaliação de domínio de 1 a 5 após cada card estudado
- Visualização de todos os cards com barra de progresso individual
- Ordenação por data, domínio ou aleatório
- Indicador circular de domínio médio do deck
- Remoção de cards com confirmação

## Por que a confirmação de remoção?

A remoção é irreversível (DELETE na API sem soft delete). O modal evita cliques acidentais num botão de ação destrutiva, especialmente em dispositivos touch.
