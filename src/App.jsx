import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import { CategoryList } from './components/CategoryList';

const preparedCatagories = categoriesFromServer.map(category => ({
  ...category,
  owner: findUserById(category.ownerId),
  products: findProductsByCategoryId(category.id),
}));

function findProductsByCategoryId(categoryId) {
  return productsFromServer.filter(product => (
    categoryId === product.categoryId
  ));
}

function findUserById(id) {
  return usersFromServer.find(user => (
    id === user.id
  ));
}

export const App = () => (
  <div className="container">
    <CategoryList categories={preparedCatagories} />
  </div>
);
