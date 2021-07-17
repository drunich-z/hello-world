import { promises as fsp } from 'fs';

const ID_COUNTER_FILE = './storage/fs/id-counter.json';

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
  console.warn('fileread');
  return list;
};

const writeToFile = async (filePath: string, list: any[]): Promise<any[]> => {
  const stringifiedList = JSON.stringify(list);

  await fsp.writeFile(filePath, stringifiedList, 'utf8');

  return list;
};

const getNewId = async (what: 'idCategory' | 'idCard'): Promise<number> => {
  let [counter] = await readFromFile(ID_COUNTER_FILE);
  let newId = -1;

  if (what === 'idCategory') {
    newId = counter.idCategory + 1;
    counter = { ...counter, idCategory: newId };
  } else {
    newId = counter.idCard + 1;
    counter = { ...counter, idCard: newId };
  }

  await writeToFile(ID_COUNTER_FILE, [counter]);
  return newId;
};

export {
  readFromFile,
  writeToFile,
  getNewId,
};
