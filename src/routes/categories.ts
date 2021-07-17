import { Router } from 'express';

import { StatusCodes } from '../common/status-codes';

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}
  from '../storage/fs';

import { Category } from '../common/interfaces';

const router = Router();

// Get all categories
router.get('/', async (req, res) => {
  const allCategories = await getAllCategories();
  return res.json(allCategories);
});

// Get by id
router.get('/:id', async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!categoryId && categoryId !== 0) {
    return res.sendStatus(StatusCodes.BadRequest);
  }
  const category = await getCategoryById(categoryId);
  if (!category) {
    return res.sendStatus(StatusCodes.NotFound);
  }
  return res.json(category);
});

// Create new category
router.put('/', async (req, res) => {
  const data = req.body as Category;
  if (!data.name) return res.sendStatus(StatusCodes.BadRequest);
  try {
    const newCategory = await createCategory(data);
    return res.json(newCategory);
  } catch (error) {
    return res.status(StatusCodes.BadRequest).send(error.message);
  }
});

// Update category
router.post('/:id', async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!categoryId && categoryId !== 0) {
    return res.sendStatus(StatusCodes.BadRequest);
  }
  const data = req.body as Category;
  if (!data.name) return res.sendStatus(StatusCodes.BadRequest);
  try {
    const updCategory = await updateCategory(data, categoryId);
    return res.json(updCategory);
  } catch (error) {
    return res.status(StatusCodes.BadRequest).send(error.message);
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!categoryId && categoryId !== 0) {
    return res.sendStatus(StatusCodes.BadRequest);
  }

  try {
    await deleteCategory(categoryId);
    return res.status(StatusCodes.Ok).send(`category with id = ${categoryId} is deleted`);
  } catch (error) {
    return res.status(StatusCodes.BadRequest).send(error.message);
  }
});

export default router;
