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
const common_1 = require("../common");
const repository_1 = require("../storage/repository");
// import { getCategoryById } from '../category/repository';
const router = express_1.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield repository_1.getItems();
        return res.json(data);
    }
    catch (e) {
        return res.status(common_1.StatusCodes.BadRequest).send(e);
    }
}));
router.get('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield repository_1.getItemByName(req.params.name);
        if (!data)
            return res.sendStatus(common_1.StatusCodes.NotFound);
        return res.json(data);
    }
    catch (e) {
        return res.status(common_1.StatusCodes.BadRequest).send(e);
    }
}));
router.delete('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield repository_1.deleteItem(req.params.name);
        return res.sendStatus(common_1.StatusCodes.Ok);
    }
    catch (e) {
        return res.status(common_1.StatusCodes.NotFound).send(e);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const category = yield repository_1.getCategoryById(data.categoryId);
    if (!category) {
        return res.status(common_1.StatusCodes.BadRequest).send('Invalid category ID');
    }
    try {
        const newData = yield repository_1.createItem(data);
        return res.json(newData);
    }
    catch (e) {
        return res.status(common_1.StatusCodes.BadRequest).send(e);
    }
}));
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const category = yield repository_1.getCategoryById(data.categoryId);
    if (!category) {
        return res.status(common_1.StatusCodes.BadRequest).send('Invalid category ID');
    }
    try {
        const newData = yield repository_1.updateItem(data);
        return res.json(newData);
    }
    catch (e) {
        return res.status(common_1.StatusCodes.BadRequest).send(e);
    }
}));
exports.default = router;
//# sourceMappingURL=items.js.map