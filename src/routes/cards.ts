import path from 'path';
import Formidable, { Fields } from 'formidable';
import { Router } from 'express';
import { StatusCodes } from '../common';
import { getFileName, getFileExt } from '../common/utils';
import {
  createCard,
  deleteCard,
  getCardByWord,
  getAllCards,
  getCardsByCategoryId,
  // updateCard,

} from '../storage/fs';
// from '../storage/repository';
import { Card } from '../common/interfaces';

// import { getCategoryById } from '../category/repository';

const router = Router();

// const pictsPath = path.resolve(__dirname, '../../public/media/img');
// const soundsPath = path.resolve(__dirname, '../../public/media/audio');
const UPLOAD_PATH = path.resolve(__dirname, '../../public/upload');
const PUBLIC_SOUND_PATH = 'https://efk-srv.herokuapp.com/media/audio/';
const PUBLIC_PICTURE_PATH = 'https://efk-srv.herokuapp.com/media/img/';

//  get all cards
router.get('/', async (req, res) => {
  try {
    const data = await getAllCards();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(data);
  } catch (error) {
    return res.status(StatusCodes.BadRequest).send(error.message);
  }
});

// get all cards of the category
router.get('/category/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id && id !== 0) return res.sendStatus(StatusCodes.NotFound);
    const data = await getCardsByCategoryId(id);
    if (!data) return res.sendStatus(StatusCodes.NotFound);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(data);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

// get card by name (i guess that name is uniq)
router.get('/:name', async (req, res) => {
  try {
    const data = await getCardByWord(req.params.name);
    if (!data) return res.sendStatus(StatusCodes.NotFound);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(data);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

// delete card by name
router.delete('/:name', async (req, res) => {
  const delWord = req.params.name;
  try {
    const data = await deleteCard(delWord);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(data);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e.message);
  }
});

// create new card
router.post('/', async (req, res) => {
  const formData = Formidable({ multiples: true, uploadDir: UPLOAD_PATH });

  const newCard: Card = {
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
    formData.parse(req, async (err, fields, files) => {
      if (err) throw new Error(err);

      if (!Array.isArray(fields.word) && fields.word
          && !Array.isArray(fields.translation) && fields.translation
          && !Array.isArray(fields.categoryId) && fields.categoryId
          && !Array.isArray(files.picture) && files.picture && files.picture.name && files.picture.path
          && !Array.isArray(files.sound) && files.sound && files.sound.name && files.sound.path) {
        newCard.word = fields.word;
        newCard.translation = fields.translation;
        newCard.categoryId = Number(fields.categoryId);
        newCard.audio = `${PUBLIC_SOUND_PATH}${newCard.word}${getFileExt(files.sound.name)}`;
        newCard.image = `${PUBLIC_PICTURE_PATH}${newCard.word}${getFileExt(files.picture.name)}`;
        uploadPicture = files.picture.path;
        uploadedSound = files.sound.path;
      } else {
        throw new Error('smt wrong with parsing formdata');
      }
      try {
        const data = await createCard(newCard, uploadPicture, uploadedSound);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(data);
      } catch (error) {
        return res.status(StatusCodes.BadRequest).send(error.message);
      }
    });
  } catch (error) {
    return res.status(StatusCodes.BadRequest).send(error.message);
  }
});

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

export default router;
