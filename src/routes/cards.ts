import Formidable from 'formidable';
import path from 'path';
// import { promises as fsp, fs } from 'fs';
import fs from 'fs';
import { Router } from 'express';
import { StatusCodes } from '../common';
import {
  createCard,
  deleteCard,
  getCardByName,
  getAllCards,
  updateCard,
  getCategoryById,
} from '../storage/repository';
import { Card } from '../common/interfaces';

// import { getCategoryById } from '../category/repository';

const router = Router();

const pictsPath = path.resolve(__dirname, '../public/media/img');
const soundsPath = path.resolve(__dirname, '../public/media/audio');

router.get('/', async (req, res) => {
  try {
    const data = await getAllCards();
    return res.json(data);
  } catch (error) {
    return res.status(StatusCodes.BadRequest).send(error.message);
  }
});

router.get('/:name', async (req, res) => {
  try {
    const data = await getCardByName(req.params.name);
    if (!data) return res.sendStatus(StatusCodes.NotFound);
    return res.json(data);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

router.delete('/:name', async (req, res) => {
  try {
    await deleteCard(req.params.name);
    return res.sendStatus(StatusCodes.Ok);
  } catch (e) {
    return res.status(StatusCodes.NotFound).send(e);
  }
});

router.post('/', async (req, res) => {
  const formData = Formidable({ multiples: true });
  console.warn('POST FORM DATA');

  formData.parse(req, (err, fields, files) => {
    console.warn('fields:', fields);
    console.warn('files:', files);
    console.warn('fileparse', files.picture);
    console.warn('fileparse', files.path);
    const fff = (files.picture as unknown) as Formidable.File;
    // сonst test = (files.picture as unknown) as Formidable.File;
    console.warn(fff.path);

     console.warn('POST FORM DATA');
    // fs.rename()

    // fs.createReadStream(files.picture.path).pipe(fs.createWriteStream(`${pictsPath}/${files.picture.name}`));
    // if (err) {
    //   return res.status(StatusCodes.BadRequest).send(err.message);
    // }
    // res.json({ fields, files });
    // return res.status(StatusCodes.Ok).send(err.message);
  });

  return res.json({ result: 'ppp' });
});

router.put('/', async (req, res) => {
  const data = req.body as Card;
  const category = await getCategoryById(data.categoryId);
  if (!category) {
    return res.status(StatusCodes.BadRequest).send('Invalid category ID');
  }
  try {
    const newData = await updateCard(data);
    return res.json(newData);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

export default router;
