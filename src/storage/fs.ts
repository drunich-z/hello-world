import fs from 'fs';
import path from 'path';

import { Category, Card } from '../common/interfaces';
import {
  readFromFile,
  writeToFile,
  getNewId,
  getFileName,
} from '../common/utils';

const DATA_CATEGORIES = './storage/data/data-categories.json';
const DATA_CARDS = './storage/data/data-cards.json';

const pictsPath = path.resolve(__dirname, '../../public/media/img/');
const soundsPath = path.resolve(__dirname, '../../public/media/audio/');

const PUBLIC_SOUND_PATH = 'https://efk-srv.herokuapp.com/media/audio/';
const PUBLIC_PICTURE_PATH = 'https://efk-srv.herokuapp.com/media/img/';

// ***************************************************************************

const getAllCards = async (): Promise<Card[]> => {
  const result = Promise.resolve<Card[]>(await readFromFile(DATA_CARDS));
  return result;
};

const getCardByWord = async (word: string): Promise<Card | undefined> => {
  const result = Promise.resolve((await getAllCards()).find((card) => card.word === word));
  return result;
};

const createCard = async (newCard: Card, uploadedPicture: string,
  uploadedSound: string): Promise<Card> => {
  const cards = await getAllCards();
  const isExist = typeof cards
    .find((card) => card.word.toLowerCase() === newCard.word.toLowerCase()) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Card with word ${newCard.word} is already exists`));
  }

  const soundToCreate = path.join(soundsPath, getFileName(newCard.audio));
  const pictureToCreate = path.join(pictsPath, getFileName(newCard.image));

  try {
    cards.push(newCard);
    await writeToFile(DATA_CARDS, cards);
    fs.copyFile(uploadedPicture, pictureToCreate, (error) => {
      if (error) throw error;
    });
    fs.copyFile(uploadedSound, soundToCreate, (error) => {
      if (error) throw error;
    });
    // fs.rename(uploadedPicture, pictureToCreate, (error) => {
    //   if (error) throw error;
    // });
    // fs.rename(uploadedSound, soundToCreate, (error) => {
    //   if (error) throw error;
    // });
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(newCard);
};

const deleteCard = async (wordParam: string): Promise<Card> => {
  const cards = await getAllCards();
  const delCard = cards.find((card) => card.word.toLowerCase() === wordParam.toLowerCase());
  if (!delCard) {
    return Promise.reject(new Error(`Card with word = "${wordParam}" is not exists`));
  }

  const soundToDel = path.join(soundsPath, getFileName(delCard.audio));
  const pictureToDel = path.join(pictsPath, getFileName(delCard.image));

  try {
    const index = cards.findIndex((card) => card.word === wordParam);
    cards.splice(index, 1);
    await writeToFile(DATA_CARDS, cards);
    fs.unlink(soundToDel, (error) => {
      if (error) return Promise.reject(error);
      return ('file deleted');
    });
    fs.unlink(pictureToDel, (error) => {
      if (error) return Promise.reject(error);
      return ('file deleted');
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(delCard);
};
// ***************************************************************************************
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

const getCardsByCategoryId = async (catId: number): Promise<Card[] | undefined> => {
  const result = Promise.resolve((await getAllCards()).filter((card) => card.categoryId === catId));
  return result;
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
  const cardsToDel = await getCardsByCategoryId(categoryId);
  console.warn(cardsToDel);
  // cardsToDel.map((card) => deleteCard(card.word));
  for (let i = 0; i < cardsToDel.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await deleteCard(cardsToDel[i].word);
  }

  return Promise.resolve(delCategory);
};

// *****************************************************

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCards,
  getCardByWord,
  getCardsByCategoryId,
  createCard,
  deleteCard,
};
