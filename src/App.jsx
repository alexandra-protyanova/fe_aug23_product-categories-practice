/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import cn from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(c => c.id === product.categoryId)
    || null;
  const user = usersFromServer.find(u => u.id === category.ownerId)
    || null;

  return {
    ...product,
    category,
    user,
  };
});

const columns = [
  'ID',
  'Product',
  'Category',
  'User',
];

const getVisibleProducts = ({
  goods,
  selectedUserId,
  query,
  selectedCategoriesIds,
  sortBy,
  isReversed,
}) => {
  let visibleProducts = [...goods];

  if (selectedUserId) {
    visibleProducts = visibleProducts.filter(product => (
      product.user.id === selectedUserId
    ));
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visibleProducts = visibleProducts.filter(product => (
      product.name.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (selectedCategoriesIds.length > 0) {
    visibleProducts = visibleProducts.filter(product => (
      selectedCategoriesIds.includes(product.categoryId)
    ));
  }

  if (sortBy) {
    visibleProducts.sort((a, b) => {
      switch (sortBy) {
        case 'ID':
          return a.id - b.id;

        case 'Product':
          return a.name.localeCompare(b.name);

        case 'Category':
          return a.category.title.localeCompare(b.category.title);

        case 'User':
          return a.user.name.localeCompare(b.user.name);

        default:
          return 0;
      }
    });

    if (isReversed) {
      visibleProducts.reverse();
    }
  }

  return visibleProducts;
};

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  function toggleCategories(categoryId) {
    if (selectedCategoriesIds.includes(categoryId)) {
      setSelectedCategoriesIds(selectedCategoriesIds.filter(id => (
        id !== categoryId
      )));
    } else {
      setSelectedCategoriesIds([...selectedCategoriesIds, categoryId]);
    }
  }

  function resetAll() {
    if (selectedUserId) {
      setSelectedUserId(0);
    }

    if (query) {
      setQuery('');
    }

    if (selectedCategoriesIds.length) {
      setSelectedCategoriesIds([]);
    }
  }

  function toggleSortBy(newColumnName) {
    const firstClick = sortBy !== newColumnName;
    const secondClick = sortBy === newColumnName && isReversed === false;
    const thirdClick = sortBy === newColumnName && isReversed === true;

    if (firstClick) {
      setSortBy(newColumnName);
      setIsReversed(false);
    }

    if (secondClick) {
      setIsReversed(true);
    }

    if (thirdClick) {
      setSortBy('');
      setIsReversed(false);
    }
  }

  const visibleProducts = getVisibleProducts({
    goods: products,
    selectedUserId,
    query,
    selectedCategoriesIds,
    sortBy,
    isReversed,
  });

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
                className={cn({
                  'is-active': !selectedUserId,
                })}
                onClick={() => {
                  setSelectedUserId(0);
                }}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={cn({
                    'is-active': user.id === selectedUserId,
                  })}
                  onClick={() => {
                    setSelectedUserId(user.id);
                  }}
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
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
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
                      onClick={() => {
                        setQuery('');
                      }}
                    />
                  </span>
                )}

              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button is-success mr-6', {
                  'is-outlined': selectedCategoriesIds.length > 0,
                })}
                onClick={() => {
                  setSelectedCategoriesIds([]);
                }}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={cn('button mr-2 my-1', {
                    'is-info': selectedCategoriesIds.includes(category.id),
                  })}
                  href="#/"
                  key={category.id}
                  onClick={() => {
                    toggleCategories(category.id);
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
                className={cn('button is-fullwidth is-outlined', {
                  'is-link': selectedUserId || query
                    || selectedCategoriesIds.length !== 0,
                })}
                onClick={resetAll}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length > 0 ? (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {columns.map(columnName => (
                    <th key={columnName}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {columnName}

                        <a
                          href="#/"
                          onClick={() => {
                            toggleSortBy(columnName);
                          }}
                        >
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className={cn('fas', {
                                'fa-sort': sortBy !== columnName,
                                'fa-sort-up': sortBy === columnName
                                  && !isReversed,
                                'fa-sort-down': sortBy === columnName
                                  && isReversed,
                              })}
                            />
                          </span>
                        </a>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map(({ user, category, ...product }) => (
                  <tr data-cy="Product" key={product.id}>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">
                      {`${category.icon} - ${category.title}`}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={cn({
                        'has-text-link': user.sex === 'm',
                        'has-text-danger': user.sex === 'f',
                      })}
                    >
                      {user.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
