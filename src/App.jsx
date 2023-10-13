/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(cCategory => cCategory.id === product.categoryId); // find by product.categoryId
  const user = usersFromServer.find(cUser => cUser.id === category.ownerId); // find by category.ownerId

  return {
    ...product,
    category,
    user,
  };
});

const filterProducts = (
  productList,
  selectedUserId,
  query,
  selectedCategoryIDs,
) => {
  let filteredProducts = [...productList];

  if (selectedUserId) {
    filteredProducts = filteredProducts
      .filter(product => product.user.id === selectedUserId);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredProducts = filteredProducts
      .filter(product => product.name.toLowerCase().includes(normalizedQuery));
  }

  if (selectedCategoryIDs.length > 0) {
    filteredProducts = filteredProducts
      .filter(product => selectedCategoryIDs.includes(product.categoryId));
  }

  return filteredProducts;
};

export const App = () => {
  const [selectedUserId, setSelectedUser] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedCategoryIDs, setSelectedCategoryIDs] = useState([]);

  const filteredProducts = filterProducts(
    products,
    selectedUserId,
    query,
    selectedCategoryIDs,
  );

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
                className={cn({ 'is-active': selectedUserId === 0 })}
                onClick={() => setSelectedUser(0)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({ 'is-active': selectedUserId === user.id })}
                  onClick={() => setSelectedUser(user.id)}
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
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query.length > 0 && (
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
                href="#/"
                data-cy="AllCategories"
                className={cn(
                  'button',
                  'is-success',
                  'mr-6',
                  { 'is-outlined': selectedCategoryIDs.length !== 0 },
                )}
                onClick={() => setSelectedCategoryIDs([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={cn(
                    'button',
                    'mr-2',
                    'my-1',
                    {
                      'is-info': selectedCategoryIDs.includes(category.id),
                    },
                  )
                  }
                  href="#/"
                  onClick={() => {
                    if (selectedCategoryIDs.includes(category.id)) {
                      setSelectedCategoryIDs(
                        selectedCategoryIDs.filter(id => id !== category.id),
                      );
                    } else {
                      setSelectedCategoryIDs(
                        [...selectedCategoryIDs, category.id],
                      );
                    }
                  }}
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
                  setSelectedUser(0);
                  setQuery('');
                  setSelectedCategoryIDs([]);
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
                  {filteredProducts.map(product => (
                    <tr data-cy="Product">
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>

                      <td
                        data-cy="ProductUser"
                        className={
                        `${product.user.sex === 'm'
                          ? 'has-text-link'
                          : 'has-text-danger'
                        }`
                      }
                      >
                        {product.user.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </div>
  );
};
