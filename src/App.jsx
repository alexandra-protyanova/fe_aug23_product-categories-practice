/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function getSortPeople(array, selectedUser, query) {
  let filterGoods = [...array];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filterGoods = filterGoods
      .filter(good => good.name.toLowerCase().includes(normalizedQuery));
  }

  if (selectedUser !== 'all') {
    filterGoods = filterGoods.filter(good => good.user.id === selectedUser);
  }

  return filterGoods;
}

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(categ => categ.id === product.categoryId); // find by product.categoryId
  const user = usersFromServer
    .find(u => u.id === category.ownerId); // find by category.ownerId

  return ({
    ...product,
    category,
    user,
  });
});

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('all');
  const [query, setQuery] = useState('');
  const sortedByUser = getSortPeople(products, selectedUser, query);

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
                onClick={() => setSelectedUser('all')}
                className={cn({
                  'is-active': selectedUser === 'all',
                })}
              >
                All
              </a>

              {
                usersFromServer.map((user) => {
                  const userId = user.id;

                  return (
                    <a
                      data-cy="FilterUser"
                      href={`#${userId}`}
                      onClick={() => setSelectedUser(userId)}
                      className={cn({
                        'is-active': selectedUser === user.id,
                      })}
                    >
                      {user.name}
                    </a>
                  );
                })
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

                {
                  query && (
                    <span className="icon is-right">
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <button
                        data-cy="ClearButton"
                        type="button"
                        className="delete"
                        onClick={() => setQuery('')}
                      />

                    </span>
                  )
                }
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
                onClick={() => {
                  setSelectedUser('all');
                  setQuery('');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            {
              selectedUser && sortedByUser.length === 0
                ? (' No products matching selected criteria')
                : (
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
                                <i
                                  data-cy="SortIcon"
                                  className="fas fa-sort-down"
                                />
                              </span>
                            </a>
                          </span>
                        </th>

                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Category

                            <a href="#/">
                              <span className="icon">
                                <i
                                  data-cy="SortIcon"
                                  className="fas fa-sort-up"
                                />
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
                        sortedByUser.map(product => (
                          <tr data-cy="Product" key={product.id}>
                            <td
                              className="has-text-weight-bold"
                              data-cy="ProductId"
                            >
                              {product.id}
                            </td>

                            <td data-cy="ProductName">
                              {product.name}
                            </td>
                            <td data-cy="ProductCategory">
                              {`${product.category.icon} - ${product.category.title}`}
                            </td>

                            <td
                              data-cy="ProductUser"
                              className={cn({
                                'has-text-link': product.user.sex === 'm',
                                'has-text-danger': product.user.sex === 'f',
                              })}
                            >
                              {product.user.name}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )
            }
          </p>
        </div>
      </div>
    </div>
  );
};
