export interface Card {
  word: string,
  translation: string,
  image: string,
  audio: string,
  categoryId: number
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}
