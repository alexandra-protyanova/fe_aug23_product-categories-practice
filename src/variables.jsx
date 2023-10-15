import { v4 as uuidv4 } from 'uuid';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const SORT_TYPE = {
  UP: 'ASC',
  DOWN: 'DESC',
};

export const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(group => group.id === product.categoryId) || null;

  return ({
    ...product,
    category,
    user: usersFromServer
      .find(user => user.id === category.ownerId) || null,
  });
});

export const sortOptions = [
  { id: uuidv4(), name: 'ID' },
  { id: uuidv4(), name: 'Product' },
  { id: uuidv4(), name: 'Category' },
  { id: uuidv4(), name: 'User' },
];
