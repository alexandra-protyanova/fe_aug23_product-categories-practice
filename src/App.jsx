/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function getCategoryFromId(categoryId) {
  return categoriesFromServer.find(category => category.id === categoryId);
}

function getUserFromId(ownerId) {
  return usersFromServer.find(user => user.id === ownerId);
}

function getFiltered(filterBy, query) {
  let filteredProducts = [...products];

  if (filterBy !== '') {
    filteredProducts = filteredProducts
      .filter(product => product.user.name === filterBy);
  }

  if (query !== '') {
    const normalizedQuery = query.toLowerCase();

    filteredProducts
      .find(product => product.name.toLowerCase().includes(normalizedQuery));
  }

  return filteredProducts;
}

const products = productsFromServer.map((product) => {
  const getCategory = getCategoryFromId(product.categoryId); // find by product.categoryId
  const getUser = getUserFromId(getCategory.ownerId); // find by category.ownerId

  return {
    ...product,
    category: getCategory,
    user: getUser,
  };
});

export const App = () => {
  const [filterByUserName, setFilterByUserName] = useState('');
  const [filterByProductName, setFilterByProductName] = useState('');

  const visibleProducts = getFiltered(filterByUserName, filterByProductName);

  // eslint-disable-next-line no-console
  console.log(visibleProducts);

  return (
    (
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
                  className={cn(
                    { 'is-active': filterByUserName === '' },
                  )}
                  onClick={() => setFilterByUserName('')}
                >
                  All
                </a>

                {usersFromServer.map((user) => {
                  function isSelected() {
                    if (user.name === filterByUserName) {
                      return true;
                    }

                    return false;
                  }

                  return (
                    <a
                      data-cy="FilterUser"
                      href="#/"
                      className={cn(
                        { 'is-active': isSelected() },
                      )}
                      onClick={() => setFilterByUserName(user.name)}
                    >
                      {user.name}
                    </a>
                  );
                })}
              </p>

              <div className="panel-block">
                <p className="control has-icons-left has-icons-right">
                  <input
                    data-cy="SearchField"
                    type="text"
                    className="input"
                    placeholder="Search"
                    onChange={(ivent) => {
                      setFilterByProductName(ivent.target.value);
                    }}
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

                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  Category 1
                </a>

                <a
                  data-cy="Category"
                  className="button mr-2 my-1"
                  href="#/"
                >
                  Category 2
                </a>

                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  Category 3
                </a>
                <a
                  data-cy="Category"
                  className="button mr-2 my-1"
                  href="#/"
                >
                  Category 4
                </a>
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
                {visibleProducts.map(product => (
                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      1
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">
                      {`${product.category.icon} - ${product.category.title}`}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={cn(
                        { 'has-text-link': product.user.sex === 'm' },
                        { 'has-text-danger': product.user.sex === 'f' },
                      )}
                    >
                      {product.user.name}
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
};
