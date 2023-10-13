/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(cat => cat.id
    === product.categoryId); // find by product.categoryId
  const user = usersFromServer.find(usr => usr.id === category.ownerId); // find by category.ownerId

  return {
    ...product,
    category: category,
    user: user,
  };
});

const getFilteredByCategory = (newCategory) => {
  if (newCategory === '') {
    return products;
  }

  return products.filter(product => product.category.title === newCategory);
};

const getFilteredByUser = (newUser) => {
  if (newUser === '') {
    return products;
  }

  return [...products].filter(product => product.user.name === newUser);
};

export const App = () => {
  const [newCategory, setNewCategory] = useState('');
  const [newUser, setNewUser] = useState('');

  console.log(newUser, newCategory);

  // console.log(getFilteredByCategory('Grocery'));
  // console.log(getFilteredByUser('Anna'));

  // const getFilteredProducts = (categoryType, userName) => {
  //   let array = [...products];

  //   if (!categoryType) {
  //     array = getFilteredByCategory(categoryType);
  //   }

  //   if (!userName) {
  //     array = getFilteredByUser(userName);
  //   }

  //   return array;
  // };

  // const receivedProducts = getFilteredByUser(newUser);
  const receivedProducts = getFilteredByCategory(newCategory);

  console.log(receivedProducts);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                onClick={() => setNewUser('')}
                className={cn({
                  'is-active': newUser === '',
                })}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={cn({
                    'is-active': user.name === newUser,
                  })}
                  onClick={() => setNewUser(user.name)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button mr-6 is-outlined is-success', {
                  'is-active': newCategory === '',
                })}
                onClick={() => setNewCategory('')}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  href="#/"
                  data-cy="Category"
                  key={category.id}
                  className={cn('button mr-2 my-1',
                    { 'is-info': category.title === newCategory })}
                  onClick={() => setNewCategory(category.title)}
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setNewCategory('');
                  setNewUser('');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {receivedProducts.length === 0 && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          {receivedProducts.length !== 0 && (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User

                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {receivedProducts.map(product => (
                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>

                    <td
                      data-cy="ProductUser"
                      className="has-text-link"
                    >
                      {product.user.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
