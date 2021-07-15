import { Category, Item } from '../common/interfaces';
// import { Item } from './interfaces';

const categories: Category[] = [
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

export function getCategories(): Promise<Category[]> {
  return Promise.resolve<Category[]>(categories);
}

export function getCategoryById(categoryId: number): Promise<Category | undefined> {
  return Promise.resolve(categories.find((cat) => cat.id === categoryId));
}

export function createCategory(category: Category): Promise<Category> {
  const isExist = typeof categories
    .find((cat) => cat.name.toLowerCase() === category.name.toLowerCase()) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Category with name ${category.name} is already exists`));
  }

  const id = categories.length + 1;
  const model = { ...category, id };
  categories.push(model);

  return Promise.resolve(model);
}

export function deleteCategory(id: number): Promise<void> {
  const index = categories.findIndex((cat) => cat.id === id);
  if (index < 0) {
    Promise.reject(new Error('Category not found'));
  }
  categories.splice(index, 1);
  return Promise.resolve();
}

// ***********************************************************

const items: Item[] = [
  {
    name: 'Test item',
    price: 100,
    description: 'test description',
    categoryId: 1,
  },
];

export function getItems(): Promise<Item[]> {
  return Promise.resolve<Item[]>(items);
}

export function getItemByName(name: string): Promise<Item | undefined> {
  return Promise.resolve(items.find((it) => it.name.toLowerCase() === name.toLowerCase()));
}

export function createItem(item: Item): Promise<Item> {
  const isExist = typeof items.find((it) => it.name.toLowerCase() === item.name.toLowerCase()) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Item with name ${item.name} is already exists.`));
  }
  items.push(item);
  return Promise.resolve(item);
}

export function updateItem(item: Item): Promise<Item> {
  const itemIndex = items.findIndex((it) => it.name.toLowerCase() === item.name.toLowerCase());
  if (itemIndex < 0) {
    return Promise.reject(new Error('Item not found'));
  }
  const existsItem = items.splice(itemIndex, 1)[0];
  const newItem: Item = {
    ...existsItem,
    ...item,
  };
  items.push(newItem);
  return Promise.resolve(newItem);
}

export function deleteItem(name: string): Promise<void> {
  const index = items.findIndex((it) => it.name.toLowerCase() === name.toLowerCase());
  if (index < 0) {
    Promise.reject(new Error('Item not found.'));
  }
  items.splice(index, 1);
  return Promise.resolve();
}
