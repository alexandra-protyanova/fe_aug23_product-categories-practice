/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId);
}

function getCategoryByid(categoryId) {
  return categoriesFromServer.find(category => category.id === categoryId);
}

const productscategories = productsFromServer.map(product => (
  { ...product, category: getCategoryByid(product.categoryId) }

));

const products = productscategories.map(product => (
  { ...product, user: getUserById(product.category.ownerId) }
));

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

function getPreparedProducts(productss, name, query) {
  let preparedProducts = [...productss];

  if (name) {
    preparedProducts = preparedProducts.filter(
      product => product.user.name === name,
    );
  }

  preparedProducts = preparedProducts.filter(
    product => product.name.toLowerCase().includes(query.toLowerCase()),

  );

  return preparedProducts;
}

export const App = () => {
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const displayProducts = getPreparedProducts(products, name, query);

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
                onClick={() => setName('')}
              >
                All
              </a>
              {
                usersFromServer.map(user => (
                  <a
                    data-cy="FilterUser"
                    href="#/"
                    onClick={() => {
                      setName(user.name);
                    }}
                  >
                    {user.name}
                  </a>
                ))

              }
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  onChange={event => setQuery(event.target.value)}

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
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>
              {
                categoriesFromServer.map(category => (
                  <a
                    data-cy="Category"
                    className="button mr-2 my-1 is-info"
                    href="#/"
                  >
                    {category.title}
                  </a>
                ))
              }
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

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

              {
                displayProducts.map(product => (
                  <>
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
                  </>
                ))

              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
