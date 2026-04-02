export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  masteryLevel: number; // 1 a 5, onde 5 é domínio completo
  createdAt: string;
  updatedAt: string;
}

export interface FlashcardInput {
  question: string;
  answer: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
