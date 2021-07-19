import { Category, Card } from '../common/interfaces';

const categories: Category[] = [
  {
    id: 1,
    name: 'First category',
    description: 'test',
  },
  {
    id: 2,
    name: 'Second category',
  },
];

export function getCategories(): Promise<Category[]> {
  return Promise.resolve<Category[]>(categories);
}

export function getCategoryById(categoryId: number): Promise<Category | undefined> {
  return Promise.resolve(categories.find((cat) => cat.id === categoryId));
}

export function createCategory(category: Category): Promise<Category> {
  const isExist = typeof categories
    .find((cat) => cat.name.toLowerCase() === category.name.toLowerCase()) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Category with name ${category.name} is already exists`));
  }

  const id = categories.length + 1;
  const model = { ...category, id };
  categories.push(model);

  return Promise.resolve(model);
}

export function deleteCategory(id: number): Promise<void> {
  const index = categories.findIndex((cat) => cat.id === id);
  if (index < 0) {
    Promise.reject(new Error('Category not found'));
  }
  categories.splice(index, 1);
  return Promise.resolve();
}

// ***********************************************************

const items: Card[] = [
  {
    word: 'cry',
    translation: 'плакать',
    image: 'https://efk-srv.herokuapp.com/media/img/cry.jpg',
    audio: 'https://efk-srv.herokuapp.com/media/audio/cry.mp3',
    categoryId: 0,
  },
];

export function getAllCards(): Promise<Card[]> {
  return Promise.resolve<Card[]>(items);
}

export function getCardByName(name: string): Promise<Card | undefined> {
  return Promise.resolve(items.find((it) => it.word.toLowerCase() === name.toLowerCase()));
}

export function createCard(item: Card): Promise<Card> {
  const isExist = typeof items.find((it) => it.word.toLowerCase() === item.word.toLowerCase()) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Card with name ${item.word} is already exists.`));
  }
  items.push(item);
  return Promise.resolve(item);
}

export function updateCard(item: Card): Promise<Card> {
  const itemIndex = items.findIndex((it) => it.word.toLowerCase() === item.word.toLowerCase());
  if (itemIndex < 0) {
    return Promise.reject(new Error('Card not found'));
  }
  const existsCard = items.splice(itemIndex, 1)[0];
  const newCard: Card = {
    ...existsCard,
    ...item,
  };
  items.push(newCard);
  return Promise.resolve(newCard);
}

export function deleteCard(name: string): Promise<void> {
  const index = items.findIndex((it) => it.word.toLowerCase() === name.toLowerCase());
  if (index < 0) {
    Promise.reject(new Error('Card not found.'));
  }
  items.splice(index, 1);
  return Promise.resolve();
}
