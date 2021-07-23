"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.updateCard = exports.createCard = exports.getCardByName = exports.getAllCards = exports.deleteCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const categories = [
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
function getCategories() {
    return Promise.resolve(categories);
}
exports.getCategories = getCategories;
function getCategoryById(categoryId) {
    return Promise.resolve(categories.find((cat) => cat.id === categoryId));
}
exports.getCategoryById = getCategoryById;
function createCategory(category) {
    const isExist = typeof categories
        .find((cat) => cat.name.toLowerCase() === category.name.toLowerCase()) !== 'undefined';
    if (isExist) {
        return Promise.reject(new Error(`Category with name ${category.name} is already exists`));
    }
    const id = categories.length + 1;
    const model = Object.assign(Object.assign({}, category), { id });
    categories.push(model);
    return Promise.resolve(model);
}
exports.createCategory = createCategory;
function deleteCategory(id) {
    const index = categories.findIndex((cat) => cat.id === id);
    if (index < 0) {
        Promise.reject(new Error('Category not found'));
    }
    categories.splice(index, 1);
    return Promise.resolve();
}
exports.deleteCategory = deleteCategory;
// ***********************************************************
const items = [
    {
        word: 'cry',
        translation: 'плакать',
        image: 'https://efk-srv.herokuapp.com/media/img/cry.jpg',
        audio: 'https://efk-srv.herokuapp.com/media/audio/cry.mp3',
        categoryId: 0,
    },
];
function getAllCards() {
    return Promise.resolve(items);
}
exports.getAllCards = getAllCards;
function getCardByName(name) {
    return Promise.resolve(items.find((it) => it.word.toLowerCase() === name.toLowerCase()));
}
exports.getCardByName = getCardByName;
function createCard(item) {
    const isExist = typeof items.find((it) => it.word.toLowerCase() === item.word.toLowerCase()) !== 'undefined';
    if (isExist) {
        return Promise.reject(new Error(`Card with name ${item.word} is already exists.`));
    }
    items.push(item);
    return Promise.resolve(item);
}
exports.createCard = createCard;
function updateCard(item) {
    const itemIndex = items.findIndex((it) => it.word.toLowerCase() === item.word.toLowerCase());
    if (itemIndex < 0) {
        return Promise.reject(new Error('Card not found'));
    }
    const existsCard = items.splice(itemIndex, 1)[0];
    const newCard = Object.assign(Object.assign({}, existsCard), item);
    items.push(newCard);
    return Promise.resolve(newCard);
}
exports.updateCard = updateCard;
function deleteCard(name) {
    const index = items.findIndex((it) => it.word.toLowerCase() === name.toLowerCase());
    if (index < 0) {
        Promise.reject(new Error('Card not found.'));
    }
    items.splice(index, 1);
    return Promise.resolve();
}
exports.deleteCard = deleteCard;
//# sourceMappingURL=repository.js.map