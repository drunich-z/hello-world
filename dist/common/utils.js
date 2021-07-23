"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExt = exports.getFileName = exports.reset = exports.getNewId = exports.writeToFile = exports.readFromFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const INITIAL_ID_COUNTER = './storage/initial/data/data-id-counter.json';
const INITIAL_DATA_CATEGORIES = './storage/initial/data/data-categories.json';
const INITIAL_DATA_CARDS = './storage/initial/data/data-cards.json';
const DATA_ID_COUNTER = './storage/data/data-id-counter.json';
const DATA_CATEGORIES = './storage/data/data-categories.json';
const DATA_CARDS = './storage/data/data-cards.json';
const PUBLIC_PICTS = path_1.default.resolve(__dirname, '../../public/media/img/');
const PUBLIC_SOUNDS = path_1.default.resolve(__dirname, '../../public/media/audio/');
const INITIAL_PICTS = path_1.default.resolve(__dirname, '../../storage/initial/media/img/');
const INITIAL_SOUNDS = path_1.default.resolve(__dirname, '../../storage/initial/media/audio/');
const removeDir = (dirPath, removeSelf = false) => {
    let files;
    try {
        files = fs_1.default.readdirSync(dirPath);
    }
    catch (e) {
        return;
    }
    if (files.length > 0) {
        let filePath;
        for (let i = 0; i < files.length; i++) {
            filePath = `${dirPath}/${files[i]}`;
            if (fs_1.default.statSync(filePath).isFile()) {
                fs_1.default.unlinkSync(filePath);
            }
            else {
                removeDir(filePath);
            }
        }
    }
    if (removeSelf)
        fs_1.default.rmdirSync(dirPath);
};
const copyFiles = (dirPathFrom, dirPathTo) => {
    let files;
    try {
        files = fs_1.default.readdirSync(dirPathFrom);
    }
    catch (e) {
        return;
    }
    if (files.length > 0) {
        let filePathFrom;
        let filePathTo;
        for (let i = 0; i < files.length; i++) {
            filePathFrom = path_1.default.join(dirPathFrom, files[i]);
            filePathTo = path_1.default.join(dirPathTo, files[i]);
            if (fs_1.default.statSync(filePathFrom).isFile()) {
                fs_1.default.copyFile(filePathFrom, filePathTo, (error) => {
                    if (error)
                        throw error;
                });
            }
        }
    }
};
const readFromFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const contents = yield fs_1.default.promises.readFile(filePath, 'utf8');
    let list = [];
    try {
        const parsedList = JSON.parse(contents);
        if (!Array.isArray(list)) {
            throw new TypeError();
        }
        list = parsedList;
    }
    catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }
        console.warn(`There was error while file-read: ${error.message}`);
    }
    return list;
});
exports.readFromFile = readFromFile;
const writeToFile = (filePath, list) => __awaiter(void 0, void 0, void 0, function* () {
    const stringifiedList = JSON.stringify(list);
    yield fs_1.default.promises.writeFile(filePath, stringifiedList, 'utf8');
    return list;
});
exports.writeToFile = writeToFile;
const getNewId = (what) => __awaiter(void 0, void 0, void 0, function* () {
    let [counter] = yield readFromFile(DATA_ID_COUNTER);
    let newId = -1;
    if (what === 'idCategory') {
        newId = counter.idCategory + 1;
        counter = Object.assign(Object.assign({}, counter), { idCategory: newId });
    }
    else {
        newId = counter.idCard + 1;
        counter = Object.assign(Object.assign({}, counter), { idCard: newId });
    }
    yield writeToFile(DATA_ID_COUNTER, [counter]);
    return newId;
});
exports.getNewId = getNewId;
const reset = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let temp = yield readFromFile(INITIAL_ID_COUNTER);
        yield writeToFile(DATA_ID_COUNTER, temp);
        temp = yield readFromFile(INITIAL_DATA_CATEGORIES);
        yield writeToFile(DATA_CATEGORIES, temp);
        temp = yield readFromFile(INITIAL_DATA_CARDS);
        yield writeToFile(DATA_CARDS, temp);
        removeDir(PUBLIC_PICTS);
        removeDir(PUBLIC_SOUNDS);
        copyFiles(INITIAL_PICTS, PUBLIC_PICTS);
        copyFiles(INITIAL_SOUNDS, PUBLIC_SOUNDS);
    }
    catch (error) {
        console.warn('there was an error:', error.message);
    }
});
exports.reset = reset;
const getFileName = (fullPath) => {
    const index = fullPath.lastIndexOf('/');
    return fullPath.slice(index + 1);
};
exports.getFileName = getFileName;
const getFileExt = (file) => {
    const index = file.lastIndexOf('.');
    return file.slice(index);
};
exports.getFileExt = getFileExt;
//# sourceMappingURL=utils.js.map