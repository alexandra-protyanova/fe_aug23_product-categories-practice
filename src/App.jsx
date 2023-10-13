/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(categoryData => categoryData.id === product.categoryId);

  const user = usersFromServer
    .find(userData => userData.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

const users = [{ id: 0, name: 'All' }, ...usersFromServer];

const getPreparedProducts = (
  productsData,
  owner,
  query,
  selectedCategories,
) => {
  let resultData = [...productsData];

  if (owner) {
    if (owner === 'All') {
      resultData = [...products];
    } else {
      resultData = resultData.filter(({ user }) => user.name === owner);
    }
  }

  if (query) {
    resultData = resultData
      .filter(({ name }) => name.toLowerCase().startsWith(query.toLowerCase()));
  }

  if (selectedCategories.length > 0) {
    if (selectedCategories.includes('All')) {
      resultData = [...products];
    } else {
      resultData = resultData
        .filter(({ category }) => selectedCategories.includes(category.title));
    }
  }

  return resultData;
};

export const App = () => {
  const [filterByOwner, setFilterByOwner] = useState('All');
  const [filterByCategories, setFilterByCategories] = useState(['All']);
  const [query, setQuery] = useState('');

  const filteredProducts = getPreparedProducts(
    products,
    filterByOwner,
    query,
    filterByCategories,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              {users.map((user) => {
                const {
                  id,
                  name,
                } = user;

                return (
                  <a
                    key={id}
                    data-cy={id === 0 ? 'FilterAllUsers' : 'FilterUser'}
                    href="#/"
                    className={cn({
                      'is-active': name === filterByOwner,
                    })}
                    onClick={() => setFilterByOwner(name)}
                  >
                    {name}
                  </a>
                );
              })}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  value={query}
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  onChange={event => setQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                data-cy="AllCategories"
                className={`button is-success mr-6 ${filterByCategories.includes('All') ? 'is-outlined' : ''}`}
                href="#/"
                onClick={() => {
                  setFilterByCategories(['All']);
                }}
              >
                All
              </a>

              {categoriesFromServer.map((category) => {
                const {
                  id,
                  title,
                } = category;

                const activeClass = filterByCategories.includes(title)
                  ? 'is-info'
                  : '';

                return (
                  <a
                    key={id}
                    data-cy="Category"
                    className={`button mr-2 my-1 ${activeClass}`}
                    href="#/"
                    onClick={() => {
                      setFilterByCategories(
                        [...(filterByCategories
                          .filter(prev => prev !== 'All')), title],
                      );
                    }}
                  >
                    {title}
                  </a>
                );
              })}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setFilterByOwner('All');
                  setQuery('');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0
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
                  {filteredProducts.map((product) => {
                    const {
                      id,
                      name,
                      category: { icon, title },
                      user: { name: userName, sex },
                    } = product;

                    return (
                      <tr data-cy="Product" key={id}>
                        <td
                          className="has-text-weight-bold"
                          data-cy="ProductId"
                        >
                          {id}
                        </td>

                        <td data-cy="ProductName">{name}</td>
                        <td data-cy="ProductCategory">
                          {`${icon} - ${title}`}
                        </td>

                        <td
                          data-cy="ProductUser"
                          className={cn({
                            'has-text-link': sex === 'm',
                            'has-text-danger': sex === 'f',
                          })}
                        >
                          {userName}
                        </td>
                      </tr>
                    );
                  })}

                  {/* <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      1
                    </td>

                    <td data-cy="ProductName">Milk</td>
                    <td data-cy="ProductCategory">🍺 - Drinks</td>

                    <td
                      data-cy="ProductUser"
                      className="has-text-link"
                    >
                      Max
                    </td>
                  </tr>

                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      2
                    </td>

                    <td data-cy="ProductName">Bread</td>
                    <td data-cy="ProductCategory">🍞 - Grocery</td>

                    <td
                      data-cy="ProductUser"
                      className="has-text-danger"
                    >
                      Anna
                    </td>
                  </tr>

                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      3
                    </td>

                    <td data-cy="ProductName">iPhone</td>
                    <td data-cy="ProductCategory">💻 - Electronics</td>

                    <td
                      data-cy="ProductUser"
                      className="has-text-link"
                    >
                      Roma
                    </td>
                  </tr> */}
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </div>
  );
};
