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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const status_codes_1 = require("../common/status-codes");
const fs_1 = require("../storage/fs");
const router = express_1.Router();
// Get all categories
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allCategories = yield fs_1.getAllCategories();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(allCategories);
}));
// Get by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = Number(req.params.id);
    if (!categoryId && categoryId !== 0) {
        return res.sendStatus(status_codes_1.StatusCodes.BadRequest);
    }
    const category = yield fs_1.getCategoryById(categoryId);
    if (!category) {
        return res.sendStatus(status_codes_1.StatusCodes.NotFound);
    }
    let cardsCount = 0;
    const cards = yield fs_1.getCardsByCategoryId(categoryId);
    if (cards)
        cardsCount = cards.length;
    res.setHeader('cardsCount', cardsCount);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(category);
}));
// Create new category
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.name)
        return res.sendStatus(status_codes_1.StatusCodes.BadRequest);
    try {
        const newCategory = yield fs_1.createCategory(data);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(newCategory);
    }
    catch (error) {
        return res.status(status_codes_1.StatusCodes.BadRequest).send(error.message);
    }
}));
// Update category
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = Number(req.params.id);
    if (!categoryId && categoryId !== 0) {
        return res.sendStatus(status_codes_1.StatusCodes.BadRequest);
    }
    const data = req.body;
    if (!data.name)
        return res.sendStatus(status_codes_1.StatusCodes.BadRequest);
    try {
        const updCategory = yield fs_1.updateCategory(data, categoryId);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(updCategory);
    }
    catch (error) {
        return res.status(status_codes_1.StatusCodes.BadRequest).send(error.message);
    }
}));
// Delete category
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = Number(req.params.id);
    if (!categoryId && categoryId !== 0) {
        return res.sendStatus(status_codes_1.StatusCodes.BadRequest);
    }
    try {
        yield fs_1.deleteCategory(categoryId);
        return res.status(status_codes_1.StatusCodes.Ok).send(`category with id = ${categoryId} is deleted. And all cards of it`);
    }
    catch (error) {
        return res.status(status_codes_1.StatusCodes.BadRequest).send(error.message);
    }
}));
exports.default = router;
//# sourceMappingURL=categories.js.map