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
const path_1 = __importDefault(require("path"));
const formidable_1 = __importDefault(require("formidable"));
const express_1 = require("express");
const common_1 = require("../common");
const utils_1 = require("../common/utils");
const fs_1 = require("../storage/fs");
// import { getCategoryById } from '../category/repository';
const router = express_1.Router();
// const pictsPath = path.resolve(__dirname, '../../public/media/img');
// const soundsPath = path.resolve(__dirname, '../../public/media/audio');
const UPLOAD_PATH = path_1.default.resolve(__dirname, '../../public/upload');
const PUBLIC_SOUND_PATH = 'https://efk-srv.herokuapp.com/media/audio/';
const PUBLIC_PICTURE_PATH = 'https://efk-srv.herokuapp.com/media/img/';
//  get all cards
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.getAllCards();
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(data);
    }
    catch (error) {
        return res.status(common_1.StatusCodes.BadRequest).send(error.message);
    }
}));
// get all cards of the category
router.get('/category/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (!id && id !== 0)
            return res.sendStatus(common_1.StatusCodes.NotFound);
        const data = yield fs_1.getCardsByCategoryId(id);
        if (!data)
            return res.sendStatus(common_1.StatusCodes.NotFound);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(data);
    }
    catch (e) {
        return res.status(common_1.StatusCodes.BadRequest).send(e);
    }
}));
// get card by name (i guess that name is uniq)
router.get('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.getCardByWord(req.params.name);
        if (!data)
            return res.sendStatus(common_1.StatusCodes.NotFound);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(data);
    }
    catch (e) {
        return res.status(common_1.StatusCodes.BadRequest).send(e);
    }
}));
// delete card by name
router.delete('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const delWord = req.params.name;
    try {
        const data = yield fs_1.deleteCard(delWord);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(data);
    }
    catch (e) {
        return res.status(common_1.StatusCodes.BadRequest).send(e.message);
    }
}));
// create new card
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = formidable_1.default({ multiples: true, uploadDir: UPLOAD_PATH });
    const newCard = {
        word: '',
        translation: '',
        image: '',
        audio: '',
        categoryId: -1,
    };
    let uploadPicture = '';
    let uploadedSound = '';
    // как то чз промис переписать бы
    try {
        formData.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw new Error(err);
            if (!Array.isArray(fields.word) && fields.word
                && !Array.isArray(fields.translation) && fields.translation
                && !Array.isArray(fields.categoryId) && fields.categoryId
                && !Array.isArray(files.picture) && files.picture && files.picture.name && files.picture.path
                && !Array.isArray(files.sound) && files.sound && files.sound.name && files.sound.path) {
                newCard.word = fields.word;
                newCard.translation = fields.translation;
                newCard.categoryId = Number(fields.categoryId);
                newCard.audio = `${PUBLIC_SOUND_PATH}${newCard.word}${utils_1.getFileExt(files.sound.name)}`;
                newCard.image = `${PUBLIC_PICTURE_PATH}${newCard.word}${utils_1.getFileExt(files.picture.name)}`;
                uploadPicture = files.picture.path;
                uploadedSound = files.sound.path;
            }
            else {
                throw new Error('smt wrong with parsing formdata');
            }
            try {
                const data = yield fs_1.createCard(newCard, uploadPicture, uploadedSound);
                res.setHeader('Access-Control-Allow-Origin', '*');
                return res.json(data);
            }
            catch (error) {
                return res.status(common_1.StatusCodes.BadRequest).send(error.message);
            }
        }));
    }
    catch (error) {
        return res.status(common_1.StatusCodes.BadRequest).send(error.message);
    }
}));
// update card (word = name)
// router.put('/:name', async (req, res) => {
//   const data = req.body as Card;
//   const category = await getCategoryById(data.categoryId);
//   if (!category) {
//     return res.status(StatusCodes.BadRequest).send('Invalid category ID');
//   }
//   try {
//     const newData = await updateCard(data);
//     return res.json(newData);
//   } catch (e) {
//     return res.status(StatusCodes.BadRequest).send(e);
//   }
// });
exports.default = router;
//# sourceMappingURL=cards.js.map