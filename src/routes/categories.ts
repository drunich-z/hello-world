import { Router } from 'express';

import { StatusCodes } from '../common/status-codes';

import {
  getAllCategories,
} from '../storage/fs';

import { Category } from '../common/interfaces';

const router = Router();

// Get all categories
router.get('/', async (req, res) => {
  const allCategories = await getAllCategories();
  return res.json(allCategories);
});

// Get by id
router.get('/:id', async (req, res) => {
  res.json([]);
  // const categoryId = Number(req.params.id);
  // if (!categoryId) {
  //   return res.status(StatusCodes.BadRequest);
  // }
  // const category = await getCategoryById(categoryId);
  // if (!category) {
  //   return res.sendStatus(StatusCodes.NotFound);
  // }
  // return res.json(category);
});

// Get by name
router.get('/:name', async (req, res) => {
  res.json([]);
  // const categoryId = Number(req.params.id);
  // if (!categoryId) {
  //   return res.status(StatusCodes.BadRequest);
  // }
  // const category = await getCategoryById(categoryId);
  // if (!category) {
  //   return res.sendStatus(StatusCodes.NotFound);
  // }
  // return res.json(category);
});

// Create new category
router.post('/', async (req, res) => {
  res.json([]);
  // const data = req.body as Category;
  // if (!data.name) return res.sendStatus(StatusCodes.BadRequest);
  // try {
  //   const newCategory = await createCategory(data);
  //   return res.json(newCategory);
  // } catch (e) {
  //   return res.status(StatusCodes.BadRequest).send(e);
  // }
});

// Update category
router.put('/:id', async (req, res) => {
  res.json([]);
  // const data = req.body as Category;
  // if (!data.name) return res.sendStatus(StatusCodes.BadRequest);
  // try {
  //   const newCategory = await createCategory(data);
  //   return res.json(newCategory);
  // } catch (e) {
  //   return res.status(StatusCodes.BadRequest).send(e);
  // }
});

// Delete categories
router.delete('/', async (req, res) => {
  res.json([]);
  // const categoryId = Number(req.params.id);
  // if (!categoryId) {
  //   return res.status(StatusCodes.BadRequest);
  // }
  // try {
  //   await deleteCategory(categoryId);
  //   return res.sendStatus(StatusCodes.Ok);
  // } catch (e) {
  //   return res.status(StatusCodes.BadRequest).send(e);
  // }
});

// Delete category
router.delete('/:id', async (req, res) => {
  res.json([]);
  // const categoryId = Number(req.params.id);
  // if (!categoryId) {
  //   return res.status(StatusCodes.BadRequest);
  // }
  // try {
  //   await deleteCategory(categoryId);
  //   return res.sendStatus(StatusCodes.Ok);
  // } catch (e) {
  //   return res.status(StatusCodes.BadRequest).send(e);
  // }
});

export default router;
