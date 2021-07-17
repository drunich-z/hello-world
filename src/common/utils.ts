import { promises as fsp } from 'fs';

const INITIAL_ID_COUNTER = './storage/initial/data/data-id-counter.json';
const INITIAL_DATA_CATEGORIES = './storage/initial/data/data-categories.json';
const INITIAL_DATA_CARDS = './storage/initial/data/data-cards.json';
const DATA_ID_COUNTER = './storage/data/data-id-counter.json';
const DATA_CATEGORIES = './storage/data/data-categories.json';
const DATA_CARDS = './storage/data/data-cards.json';

const readFromFile = async (filePath: string): Promise<any[]> => {
  const contents = await fsp.readFile(filePath, 'utf8');

  let list: any[] = [];

  try {
    const parsedList = JSON.parse(contents);

    if (!Array.isArray(list)) {
      throw new TypeError();
    }

    list = parsedList;
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      throw error;
    }

    console.warn(`There was error while file-read: ${error.message}`);
  }
  return list;
};

const writeToFile = async (filePath: string, list: any[]): Promise<any[]> => {
  const stringifiedList = JSON.stringify(list);

  await fsp.writeFile(filePath, stringifiedList, 'utf8');

  return list;
};

const getNewId = async (what: 'idCategory' | 'idCard'): Promise<number> => {
  let [counter] = await readFromFile(DATA_ID_COUNTER);
  let newId = -1;

  if (what === 'idCategory') {
    newId = counter.idCategory + 1;
    counter = { ...counter, idCategory: newId };
  } else {
    newId = counter.idCard + 1;
    counter = { ...counter, idCard: newId };
  }

  await writeToFile(DATA_ID_COUNTER, [counter]);
  return newId;
};

const reset = async (): Promise<void> => {
  try {
    let temp = await readFromFile(INITIAL_ID_COUNTER);
    await writeToFile(DATA_ID_COUNTER, temp);

    temp = await readFromFile(INITIAL_DATA_CATEGORIES);
    await writeToFile(DATA_CATEGORIES, temp);

    temp = await readFromFile(INITIAL_DATA_CARDS);
    await writeToFile(DATA_CARDS, temp);
  } catch (error) {
    console.warn('there was an error:', error.message);
  }
};

export {
  readFromFile,
  writeToFile,
  getNewId,
  reset,
};
