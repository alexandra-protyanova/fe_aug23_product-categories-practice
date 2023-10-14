/* eslint-disable jsx-a11y/accessible-emoji */
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const SORT_TYPE = {
  UP: 'ASC',
  DOWN: 'DESC',
};

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(group => group.id === product.categoryId) || null;

  return ({
    ...product,
    category,
    user: usersFromServer
      .find(user => user.id === category.ownerId) || null,
  });
});

const sortOptions = [
  { id: uuidv4(), name: 'ID' },
  { id: uuidv4(), name: 'Product' },
  { id: uuidv4(), name: 'Category' },
  { id: uuidv4(), name: 'User' },
];

function getPreparedProducts(
  items,
  {
    user,
    searchedProduct,
    category,
    sortingOptions: { sortType, sortingColumn },
  },
) {
  let preparedProducts = [...items];

  if (user) {
    preparedProducts = preparedProducts
      .filter(product => product.user.id === user);
  }

  if (searchedProduct) {
    const normalizedSearchedProduct = searchedProduct.trim().toLowerCase();

    preparedProducts = preparedProducts
      .filter(product => product.name
        .toLowerCase().includes(normalizedSearchedProduct));
  }

  if (category.length !== 0) {
    preparedProducts = preparedProducts
      .filter(product => category.includes(product.categoryId));
  }

  if (sortingColumn) {
    preparedProducts = preparedProducts.sort((a, b) => {
      switch (sortingColumn) {
        case 'ID':
          return getSortedProducts(a, b, sortType, 'id');

        case 'Product':
          return getSortedProducts(a, b, sortType, 'name');

        case 'Category':
          return getSortedProducts(a.category, b.category, sortType, 'title');

        case 'User':
          return getSortedProducts(a.user, b.user, sortType, 'name');

        default:
          return 0;
      }
    });
  }

  return preparedProducts;
}

function getSortedProducts(product1, product2, sortType, key) {
  if (sortType === SORT_TYPE.UP) {
    return typeof product1[key] === 'number'
      ? product1[key] - product2[key]
      : product1[key].localeCompare(product2[key]);
  }

  if (sortType === SORT_TYPE.DOWN) {
    return typeof product1[key] === 'number'
      ? product2[key] - product1[key]
      : product2[key].localeCompare(product1[key]);
  }

  return 0;
}

export const App = () => {
  const [sortProducts, setSortProducts] = useState({
    user: null,
    searchedProduct: null,
    category: [],
    sortingOptions: {
      sortType: null,
      sortingColumn: null,
    },
  });
  const visibleProducts = getPreparedProducts(products, sortProducts);

  const updateSortProductsKey = (key, newValue) => {
    setSortProducts((currentSortProducts) => {
      const updateProducts = { ...currentSortProducts };

      if (key === 'category' && !(newValue instanceof Array)) {
        updateProducts[key] = updateProducts[key].includes(newValue)
          ? updateProducts[key].filter(value => value !== newValue)
          : [...updateProducts[key], newValue];

        return updateProducts;
      }

      if (key === 'sortingOptions') {
        const isColumnChange = updateProducts[key].sortingColumn !== newValue
          && updateProducts[key].sortingColumn !== null;

        if (isColumnChange) {
          updateProducts[key].sortType = null;
        }

        if (updateProducts[key].sortType === null) {
          updateProducts[key].sortType = SORT_TYPE.UP;
        } else if (updateProducts[key].sortType === SORT_TYPE.UP) {
          updateProducts[key].sortType = SORT_TYPE.DOWN;
        } else {
          updateProducts[key].sortType = null;
        }

        updateProducts[key].sortingColumn = newValue;

        return updateProducts;
      }

      updateProducts[key] = newValue;

      return updateProducts;
    });
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
                className={cn({
                  'is-active': !sortProducts.user,
                })}
                onClick={() => updateSortProductsKey('user', null)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={cn({
                    'is-active': user.id === sortProducts.user,
                  })}
                  onClick={() => updateSortProductsKey('user', user.id)}
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
                  value={sortProducts.searchedProduct || ''}
                  onChange={event => updateSortProductsKey(
                    'searchedProduct', event.currentTarget.value,
                  )}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {sortProducts.searchedProduct && (
                    <button
                      data-cy="ClearButton"
                      id="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => {
                        updateSortProductsKey('searchedProduct', null);
                      }}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button is-success mr-6', {
                  'is-outlined': sortProducts.category.length,
                })}
                onClick={() => updateSortProductsKey('category', [])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={cn('button mr-2 my-1', {
                    'is-info': sortProducts.category.includes(category.id),
                  })}
                  href="#/"
                  onClick={() => updateSortProductsKey('category', category.id)}
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
                onClick={() => setSortProducts({
                  user: null,
                  searchedProduct: null,
                  category: [],
                  sortingOptions: {
                    sortType: null,
                    sortingColumn: null,
                  },
                })}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length === 0
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
                    {sortOptions.map(sortOption => (
                      <th key={sortOption.id}>
                        <span className="is-flex is-flex-wrap-nowrap">
                          {sortOption.name}

                          <a
                            href="#/"
                            onClick={() => updateSortProductsKey(
                              'sortingOptions', sortOption.name,
                            )}
                          >
                            <span className="icon">
                              <i
                                data-cy="SortIcon"
                                className={cn('fas', {
                                  'fa-sort': sortProducts
                                    .sortingOptions.sortType === null
                                    || sortProducts.sortingOptions
                                      .sortingColumn !== sortOption.name,
                                  'fa-sort-up': sortProducts
                                    .sortingOptions.sortType === SORT_TYPE.UP
                                    && sortProducts.sortingOptions
                                      .sortingColumn === sortOption.name,
                                  'fa-sort-down': sortProducts
                                    .sortingOptions.sortType === SORT_TYPE.DOWN
                                    && sortProducts.sortingOptions
                                      .sortingColumn === sortOption.name,
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
                  {visibleProducts.map(product => (
                    <tr
                      data-cy="Product"
                      key={product.id}
                    >
                      <td className="has-text-weight-bold" data-cy="ProductId">
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
