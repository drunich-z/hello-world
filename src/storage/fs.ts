import { promises as fsp } from 'fs';

import { Category, Card } from '../common/interfaces';
import { readFromFile, writeToFile, getNewId } from '../common/utils';

const CATEGORIES_DATA_FILE_PATH = './storage/fs/data-categories.json';
// const categoryFileName = 'data-categories.json';
// const categoryFilePath = `${__dirname}/fs/${categoryFileName}`;

const getAllCategories = async (): Promise<Category[]> => {
  const result = (await readFromFile(CATEGORIES_DATA_FILE_PATH)) as Category[];
  return result;
};

const getCategoryById = async (id: number) => {};

const getCategoryByName = async (name: string) => {};

const createCategory = async (category: Category) => {};

const updateCategory = async (category: Category) => {};

const removeCategory = async () => {};

// async getCategories(): Promise<Category[]> {
//   const response = await fetch(BASE_CATEGORIES);
//   const categories = await response.json();
//   return categories;
// };

// async getCategoryByName(name: string): Promise<Category> {
//   const response = await fetch(BASE_CATEGORIES);
//   const categories = await response.json();
//   const [result] = categories.filter((item: Category) => item.name === name);
//   return result;
// };

// async getCategoryById(id: number): Promise<Category> {
//   const response = await fetch(BASE_CATEGORIES);
//   const [categories] = await response.json();
//   const [result] = Array(categories).filter((item) => item.id === id);
//   return result;
// };
export {
  getAllCategories,
};
