import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const preProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(x => x.id === product.categoryId);
  const user = usersFromServer.find(u => u.id === category.ownerId);

  return {
    product: { ...product },
    category: { ...category },
    user: { ...user },
    sortUser: user.id,
    sortCategory: category.id,
  };
});

const SORT_BY_ID = 'id';
const SORT_BY_PRODUCT = 'product';
const SORT_BY_CATEGORY = 'category';
const SORT_BY_USER = 'user';

export const App = () => {
  const [sortUserId, getSortUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [sortCategory, setSortCategory] = useState([]);
  const [sort, setSort] = useState(SORT_BY_ID);
  const [reverse, setReverse] = useState(false);
  let products = [...preProducts];
  const users = [...usersFromServer];
  const categories = [...categoriesFromServer];

  if (sortUserId) {
    if (sortUserId > 0 && sortUserId <= users.length) {
      products = products.filter(x => x.sortUser === sortUserId);
    }
  }

  if (query) {
    const filterQuery = query.trim().toLowerCase();

    products = products
      .filter(({ product }) => product.name
        .toLowerCase()
        .includes(filterQuery));
  }

  if (sortCategory.length) {
    products = products.filter(x => sortCategory.includes(x.sortCategory));
  }

  if (sort) {
    products.sort((a, b) => {
      let result;

      switch (sort) {
        case SORT_BY_ID:
          result = a.product.id - b.product.id;
          break;

        case SORT_BY_PRODUCT:
          result = a.product.name.localeCompare(b.product.name);
          break;

        case SORT_BY_CATEGORY:
          result = a.sortCategory - b.sortCategory;
          break;

        case SORT_BY_USER:
          result = a.sortUser - b.sortUser;
          break;

        default:
          return 0;
      }

      if (reverse) {
        return -result;
      }

      return result;
    });
  }

  const reset = () => {
    getSortUserId(0);
    setQuery('');
    setSortCategory([]);
    setSort(SORT_BY_ID);
    setReverse(false);
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
                onClick={() => getSortUserId(0)}
                href="#/"
                className={cn({ 'is-active': sortUserId === 0 })}
              >
                All
              </a>

              {users.map(u => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => getSortUserId(u.id)}
                  className={cn({ 'is-active': sortUserId === u.id })}
                  key={u.id}
                >
                  {u.name}
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
                  onChange={event => setQuery(event.currentTarget.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query !== '' && (
                  <span className="icon is-right">
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
                  'button is-success mr-6',
                  { 'is-outlined': sortCategory.length },
                )}
                onClick={() => setSortCategory([])}
              >
                All
              </a>

              {categories.map(category => (
                <a
                  data-cy="Category"
                  className={cn(
                    'button mr-2 my-1',
                    { 'is-info': sortCategory.includes(category.id) },
                  )}
                  href="#/"
                  onClick={() => {
                    if (!sortCategory.includes(category.id)) {
                      setSortCategory(prev => prev.concat(category.id));
                    } else {
                      setSortCategory(prev => prev
                        .filter(id => id !== category.id));
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
                onClick={reset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {products.length ? (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID

                      <a
                        href="#/"
                        onClick={() => {
                          if (sort !== SORT_BY_ID) {
                            setSort(SORT_BY_ID);
                          } else if (sort === SORT_BY_ID && !reverse) {
                            setReverse(true);
                          } else {
                            setSort(SORT_BY_ID);
                            setReverse(false);
                          }
                        }}
                      >
                        <span className="icon">
                          <i
                            data-cy="SortIcon"
                            className={cn(
                              'fas',
                              { 'fa-sort': sort !== SORT_BY_ID },
                              { 'fa-sort-up': sort === SORT_BY_ID && reverse },
                              { 'fa-sort-down':
                                  sort === SORT_BY_ID && !reverse },
                            )}
                          />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product

                      <a
                        href="#/"
                        onClick={() => {
                          if (sort !== SORT_BY_PRODUCT) {
                            setSort(SORT_BY_PRODUCT);
                          } else if (sort === SORT_BY_PRODUCT && !reverse) {
                            setReverse(true);
                          } else {
                            setSort(SORT_BY_ID);
                            setReverse(false);
                          }
                        }}
                      >
                        <span className="icon">
                          <i
                            data-cy="SortIcon"
                            className={cn(
                              'fas',
                              { 'fa-sort': sort !== SORT_BY_PRODUCT },
                              { 'fa-sort-up':
                                  sort === SORT_BY_PRODUCT && reverse },
                              { 'fa-sort-down':
                                  sort === SORT_BY_PRODUCT && !reverse },
                            )}
                          />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category

                      <a
                        href="#/"
                        onClick={() => {
                          if (sort !== SORT_BY_CATEGORY) {
                            setSort(SORT_BY_CATEGORY);
                          } else if (sort === SORT_BY_CATEGORY && !reverse) {
                            setReverse(true);
                          } else {
                            setSort(SORT_BY_ID);
                            setReverse(false);
                          }
                        }}
                      >
                        <span className="icon">
                          <i
                            data-cy="SortIcon"
                            className={cn(
                              'fas',
                              { 'fa-sort': sort !== SORT_BY_CATEGORY },
                              { 'fa-sort-up':
                                  sort === SORT_BY_CATEGORY && reverse },
                              { 'fa-sort-down':
                                  sort === SORT_BY_CATEGORY && !reverse },
                            )}
                          />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User

                      <a
                        href="#/"
                        onClick={() => {
                          if (sort !== SORT_BY_USER) {
                            setSort(SORT_BY_USER);
                          } else if (sort === SORT_BY_USER && !reverse) {
                            setReverse(true);
                          } else {
                            setSort(SORT_BY_ID);
                            setReverse(false);
                          }
                        }}
                      >
                        <span className="icon">
                          <i
                            data-cy="SortIcon"
                            className={cn(
                              'fas',
                              { 'fa-sort': sort !== SORT_BY_USER },
                              { 'fa-sort-up':
                                  sort === SORT_BY_USER && reverse },
                              { 'fa-sort-down':
                                  sort === SORT_BY_USER && !reverse },
                            )}
                          />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map(({ product, category, user }) => (
                  <tr data-cy="Product" key={product.id}>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">
                      {category.icon}
                      {` - `}
                      {category.title}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={cn(
                        { 'has-text-danger': user.sex === 'f' },
                        { 'has-text-link': user.sex === 'm' },
                      )}
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
