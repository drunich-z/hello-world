import { promises as fsp } from 'fs';

import { Category, Card } from '../common/interfaces';
import { readFromFile, writeToFile, getNewId } from '../common/utils';

const DATA_CATEGORIES = './storage/data/data-categories.json';

const getAllCategories = async (): Promise<Category[]> => {
  const result = Promise.resolve<Category[]>(await readFromFile(DATA_CATEGORIES));
  return result;
};

const getCategoryById = async (id: number): Promise<Category | undefined> => {
  const result = Promise.resolve((await getAllCategories()).find((cat) => cat.id === id));
  return result;
};

const createCategory = async (category: Category): Promise<Category> => {
  const categories = await getAllCategories();
  const isExist = typeof categories
    .find((cat) => cat.name.toLowerCase() === category.name.toLowerCase()) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Category with name ${category.name} is already exists`));
  }

  const id = await getNewId('idCategory');
  const description = category.description === undefined ? '' : category.description;
  const model = { ...category, id, description };
  categories.push(model);
  await writeToFile(DATA_CATEGORIES, categories);
  return Promise.resolve(model);
};

const updateCategory = async (category: Category, categoryId: number): Promise<Category> => {
  const categories = await getAllCategories();
  const updCategory = await getCategoryById(categoryId);
  if (!updCategory) {
    return Promise.reject(new Error(`Category with id = '${categoryId}' is not exists`));
  }
  const checkNameExist = categories.find((cat) => cat.name === category.name);
  if (checkNameExist && checkNameExist.id !== categoryId) {
    return Promise.reject(new Error(`Category with name ${category.name} is already exists and has another ID`));
  }

  const index = categories.findIndex((cat) => cat.id === categoryId);
  categories[index] = { ...category, id: categoryId };
  await writeToFile(DATA_CATEGORIES, categories);
  return Promise.resolve(categories[index]);
};

const deleteCategory = async (categoryId: number): Promise<Category> => {
  const categories = await getAllCategories();
  const delCategory = await getCategoryById(categoryId);
  if (!delCategory) {
    return Promise.reject(new Error(`Category with id = '${categoryId}' is not exists`));
  }

  const index = categories.findIndex((cat) => cat.id === categoryId);
  categories.splice(index, 1);
  await writeToFile(DATA_CATEGORIES, categories);
  return Promise.resolve(delCategory);
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
