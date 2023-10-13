/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const SEX = {
  MALE: 'm',
  FEMALE: 'f',
};

const prepareProducts = (
  products,
  users,
  categories,
  {
    selectedUser,
    selectedCategories,
    query,
  },
) => {
  let preparedProducts = products.reduce((acc, product) => {
    const category = categories.find(item => item.id === product.categoryId);
    const user = users.find(person => person.id === category.ownerId);

    return [
      ...acc,
      {
        ...product,
        category,
        user,
      },
    ];
  }, []);

  if (selectedUser) {
    preparedProducts = preparedProducts
      .filter(product => product.user.id === selectedUser);
  }

  if (query !== '') {
    preparedProducts = preparedProducts
      .filter(product => product.name
        .toLowerCase()
        .includes(query.toLowerCase()));
  }

  if (selectedCategories.length !== 0) {
    preparedProducts = preparedProducts
      .filter(product => selectedCategories.includes(product.category.id));
  }

  return preparedProducts;
};

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [query, setQuery] = useState('');

  const preparedProducts = prepareProducts(
    productsFromServer,
    usersFromServer,
    categoriesFromServer,
    {
      selectedUser,
      selectedCategories,
      query,
    },
  );

  const reset = () => {
    setQuery('');
    setSelectedUser(0);
    setSelectedCategories([]);
  };

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
                className={classNames({
                  'is-active': selectedUser === 0,
                })}
                onClick={() => setSelectedUser(0)}
              >
                All
              </a>

              {
                usersFromServer.map(({ id, name }) => (
                  <a
                    data-cy="FilterUser"
                    href="#/"
                    key={id}
                    className={classNames({
                      'is-active': selectedUser === id,
                    })}
                    onClick={() => setSelectedUser(id)}
                  >
                    {name}
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
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {
                  query !== '' && (
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
                className={classNames('button is-success mr-6', {
                  'is-outlined': selectedCategories.length !== 0,
                })}
                onClick={() => setSelectedCategories([])}
              >
                All
              </a>

              {
                categoriesFromServer.map(({ id, title }) => (
                  <a
                    data-cy="Category"
                    href="#/"
                    key={id}
                    className={classNames('button mr-2 my-1', {
                      'is-info': selectedCategories.includes(id),
                    })}
                    onClick={() => {
                      if (!selectedCategories.includes(id)) {
                        setSelectedCategories(prevState => [...prevState, id]);

                        return;
                      }

                      setSelectedCategories(prevState => prevState
                        .filter(item => item !== id));
                    }}
                  >
                    {title}
                  </a>
                ))
              }

            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={reset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">

          {
            preparedProducts.length === 0
              ? (
                <p data-cy="NoMatchingMessage">
                  No products matching selected criteria
                </p>
              )
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
                      preparedProducts.map(({ id, name, category, user }) => (
                        <tr data-cy="Product" key={id}>
                          <td
                            className="has-text-weight-bold"
                            data-cy="ProductId"
                          >
                            {id}
                          </td>

                          <td data-cy="ProductName">{name}</td>
                          <td data-cy="ProductCategory">{`${category.icon} - ${category.title}`}</td>

                          <td
                            data-cy="ProductUser"
                            className={classNames({
                              'has-text-link': user.sex === SEX.MALE,
                              'has-text-danger': user.sex === SEX.FEMALE,
                            })}
                          >
                            {user.name}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              )
          }
        </div>
      </div>
    </div>
  );
};
