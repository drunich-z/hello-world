import fs, { rmdir } from 'fs';
import path from 'path';

const INITIAL_ID_COUNTER = './storage/initial/data/data-id-counter.json';
const INITIAL_DATA_CATEGORIES = './storage/initial/data/data-categories.json';
const INITIAL_DATA_CARDS = './storage/initial/data/data-cards.json';
const DATA_ID_COUNTER = './storage/data/data-id-counter.json';
const DATA_CATEGORIES = './storage/data/data-categories.json';
const DATA_CARDS = './storage/data/data-cards.json';

const PUBLIC_PICTS = path.resolve(__dirname, '../../public/media/img/');
const PUBLIC_SOUNDS = path.resolve(__dirname, '../../public/media/audio/');

const INITIAL_PICTS = path.resolve(__dirname, '../../storage/initial/media/img/');
const INITIAL_SOUNDS = path.resolve(__dirname, '../../storage/initial/media/audio/');

const removeDir = (dirPath: string, removeSelf = false) => {
  let files;
  try {
    files = fs.readdirSync(dirPath);
  } catch (e) {
    return;
  }
  if (files.length > 0) {
    let filePath;
    for (let i = 0; i < files.length; i++) {
      filePath = `${dirPath}/${files[i]}`;
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      } else {
        removeDir(filePath);
      }
    }
  }
  if (removeSelf) fs.rmdirSync(dirPath);
};

const copyFiles = (dirPathFrom: string, dirPathTo: string) => {
  let files;
  try {
    files = fs.readdirSync(dirPathFrom);
  } catch (e) {
    return;
  }
  if (files.length > 0) {
    let filePathFrom;
    let filePathTo;
    for (let i = 0; i < files.length; i++) {
      filePathFrom = path.join(dirPathFrom, files[i]);
      filePathTo = path.join(dirPathTo, files[i]);
      if (fs.statSync(filePathFrom).isFile()) {
        fs.copyFile(filePathFrom, filePathTo, (error) => {
          if (error) throw error;
        });
      }
    }
  }
};

const readFromFile = async (filePath: string): Promise<any[]> => {
  const contents = await fs.promises.readFile(filePath, 'utf8');

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

  await fs.promises.writeFile(filePath, stringifiedList, 'utf8');

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

    removeDir(PUBLIC_PICTS);
    removeDir(PUBLIC_SOUNDS);
    copyFiles(INITIAL_PICTS, PUBLIC_PICTS);
    copyFiles(INITIAL_SOUNDS, PUBLIC_SOUNDS);
  } catch (error) {
    console.warn('there was an error:', error.message);
  }
};

const getFileName = (fullPath: string): string => {
  const index = fullPath.lastIndexOf('/');
  return fullPath.slice(index + 1);
};

const getFileExt = (file: string): string => {
  const index = file.lastIndexOf('.');
  return file.slice(index);
};

// const updateFile = (destination: strin, source: string, word: string): string => {
//   const fileName = file.name as string;
//   const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
//   const fileFrom = file.path;
//   const fileTo = path.join(pathTo, `${word}${fileExtension}`);
//   fs.rename(fileFrom, fileTo, (error) => {
//     if (error) {
//       throw error;
//     }
//     return ('Rename complete!');
//   });
//   return `${word}${fileExtension}`;
// };
// const makeFullFilePath (name: string, )

export {
  readFromFile,
  writeToFile,
  getNewId,
  reset,
  getFileName,
  getFileExt,

};
