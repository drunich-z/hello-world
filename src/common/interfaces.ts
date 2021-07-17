export interface Card {
  id: number,
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
