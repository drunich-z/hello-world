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
exports.deleteCard = exports.createCard = exports.getCardsByCategoryId = exports.getCardByWord = exports.getAllCards = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../common/utils");
const DATA_CATEGORIES = './storage/data/data-categories.json';
const DATA_CARDS = './storage/data/data-cards.json';
const pictsPath = path_1.default.resolve(__dirname, '../../public/media/img/');
const soundsPath = path_1.default.resolve(__dirname, '../../public/media/audio/');
const PUBLIC_SOUND_PATH = 'https://efk-srv.herokuapp.com/media/audio/';
const PUBLIC_PICTURE_PATH = 'https://efk-srv.herokuapp.com/media/img/';
// ***************************************************************************
const getAllCards = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = Promise.resolve(yield utils_1.readFromFile(DATA_CARDS));
    return result;
});
exports.getAllCards = getAllCards;
const getCardByWord = (word) => __awaiter(void 0, void 0, void 0, function* () {
    const result = Promise.resolve((yield getAllCards()).find((card) => card.word === word));
    return result;
});
exports.getCardByWord = getCardByWord;
const createCard = (newCard, uploadedPicture, uploadedSound) => __awaiter(void 0, void 0, void 0, function* () {
    const cards = yield getAllCards();
    const isExist = typeof cards
        .find((card) => card.word.toLowerCase() === newCard.word.toLowerCase()) !== 'undefined';
    if (isExist) {
        return Promise.reject(new Error(`Card with word ${newCard.word} is already exists`));
    }
    const soundToCreate = path_1.default.join(soundsPath, utils_1.getFileName(newCard.audio));
    const pictureToCreate = path_1.default.join(pictsPath, utils_1.getFileName(newCard.image));
    try {
        cards.push(newCard);
        yield utils_1.writeToFile(DATA_CARDS, cards);
        fs_1.default.copyFile(uploadedPicture, pictureToCreate, (error) => {
            if (error)
                throw error;
        });
        fs_1.default.copyFile(uploadedSound, soundToCreate, (error) => {
            if (error)
                throw error;
        });
        // fs.rename(uploadedPicture, pictureToCreate, (error) => {
        //   if (error) throw error;
        // });
        // fs.rename(uploadedSound, soundToCreate, (error) => {
        //   if (error) throw error;
        // });
    }
    catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(newCard);
});
exports.createCard = createCard;
const deleteCard = (wordParam) => __awaiter(void 0, void 0, void 0, function* () {
    const cards = yield getAllCards();
    const delCard = cards.find((card) => card.word.toLowerCase() === wordParam.toLowerCase());
    if (!delCard) {
        return Promise.reject(new Error(`Card with word = "${wordParam}" is not exists`));
    }
    const soundToDel = path_1.default.join(soundsPath, utils_1.getFileName(delCard.audio));
    const pictureToDel = path_1.default.join(pictsPath, utils_1.getFileName(delCard.image));
    try {
        const index = cards.findIndex((card) => card.word === wordParam);
        cards.splice(index, 1);
        yield utils_1.writeToFile(DATA_CARDS, cards);
        fs_1.default.unlink(soundToDel, (error) => {
            if (error)
                return Promise.reject(error);
            return ('file deleted');
        });
        fs_1.default.unlink(pictureToDel, (error) => {
            if (error)
                return Promise.reject(error);
            return ('file deleted');
        });
    }
    catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(delCard);
});
exports.deleteCard = deleteCard;
// ***************************************************************************************
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = Promise.resolve(yield utils_1.readFromFile(DATA_CATEGORIES));
    return result;
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = Promise.resolve((yield getAllCategories()).find((cat) => cat.id === id));
    return result;
});
exports.getCategoryById = getCategoryById;
const createCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield getAllCategories();
    const isExist = typeof categories
        .find((cat) => cat.name.toLowerCase() === category.name.toLowerCase()) !== 'undefined';
    if (isExist) {
        return Promise.reject(new Error(`Category with name ${category.name} is already exists`));
    }
    const id = yield utils_1.getNewId('idCategory');
    const description = category.description === undefined ? '' : category.description;
    const model = Object.assign(Object.assign({}, category), { id, description });
    categories.push(model);
    yield utils_1.writeToFile(DATA_CATEGORIES, categories);
    return Promise.resolve(model);
});
exports.createCategory = createCategory;
const updateCategory = (category, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield getAllCategories();
    const updCategory = yield getCategoryById(categoryId);
    if (!updCategory) {
        return Promise.reject(new Error(`Category with id = '${categoryId}' is not exists`));
    }
    const checkNameExist = categories.find((cat) => cat.name === category.name);
    if (checkNameExist && checkNameExist.id !== categoryId) {
        return Promise.reject(new Error(`Category with name ${category.name} is already exists and has another ID`));
    }
    const index = categories.findIndex((cat) => cat.id === categoryId);
    categories[index] = Object.assign(Object.assign({}, category), { id: categoryId });
    yield utils_1.writeToFile(DATA_CATEGORIES, categories);
    return Promise.resolve(categories[index]);
});
exports.updateCategory = updateCategory;
const getCardsByCategoryId = (catId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = Promise.resolve((yield getAllCards()).filter((card) => card.categoryId === catId));
    return result;
});
exports.getCardsByCategoryId = getCardsByCategoryId;
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield getAllCategories();
    const delCategory = yield getCategoryById(categoryId);
    if (!delCategory) {
        return Promise.reject(new Error(`Category with id = '${categoryId}' is not exists`));
    }
    const index = categories.findIndex((cat) => cat.id === categoryId);
    categories.splice(index, 1);
    yield utils_1.writeToFile(DATA_CATEGORIES, categories);
    const cardsToDel = yield getCardsByCategoryId(categoryId);
    console.warn(cardsToDel);
    // cardsToDel.map((card) => deleteCard(card.word));
    for (let i = 0; i < cardsToDel.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        yield deleteCard(cardsToDel[i].word);
    }
    return Promise.resolve(delCategory);
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=fs.js.map