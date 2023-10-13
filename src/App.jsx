/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const FILTER_BY = {
  NAME: {
    ALL: 'All',
    ROMA: 'Roma',
    ANNA: 'Anna',
    MAX: 'Max',
    JOHN: 'John',
  },

  CATEGORY: {
    ALL: 'All',
    GROCERY: 'Grocery',
    DRINKS: 'Drinks',
    FRUITS: 'Fruits',
    ELECTRONICS: 'Electronics',
    CLOTHES: 'Clothes',
  },
};

const SORT_BY = {
  ID: 'id',
  PRODUCT: 'product',
  CATEGORY: 'category',
  USER: 'user',
};

const preparedProducts = productsFromServer.map(product => ({
  ...product,
  category: categoriesFromServer.find(
    category => (product.categoryId === category.id),
  ),
  owner: usersFromServer.find(
    user => user.id === categoriesFromServer.find(
      category => product.categoryId === category.id,
    ).ownerId,
  ),
}));

function getFilteredProducts(filterByName, filterByCategory, query, sortBy) {
  let filteredProducts = [...preparedProducts];

  switch (filterByName) {
    case FILTER_BY.NAME.ROMA:
      filteredProducts = filteredProducts.filter(
        product => product.owner.name === FILTER_BY.NAME.ROMA,
      );
      break;
    case FILTER_BY.NAME.ANNA:
      filteredProducts = filteredProducts.filter(
        product => product.owner.name === FILTER_BY.NAME.ANNA,
      );
      break;
    case FILTER_BY.NAME.MAX:
      filteredProducts = filteredProducts.filter(
        product => product.owner.name === FILTER_BY.NAME.MAX,
      );
      break;
    case FILTER_BY.NAME.JOHN:
      filteredProducts = filteredProducts.filter(
        product => product.owner.name === FILTER_BY.NAME.JOHN,
      );
      break;
    case FILTER_BY.NAME.ALL:
      break;
    default:
      break;
  }

  if (filterByCategory.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => filterByCategory.includes(product.category.title),
    );
  }

  if (query) {
    const validQuery = query.trim().toLowerCase();

    filteredProducts = filteredProducts.filter(
      product => product.name.toLowerCase().includes(validQuery),
    );
  }

  return filteredProducts;
}

export const App = () => {
  const [filterByName, setFilterByName] = useState(FILTER_BY.NAME.ALL);
  const [filterByCategory
    , setFilterByCategory] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState({});

  const visibleProducts = getFilteredProducts(
    filterByName,
    filterByCategory,
    query,
    sortBy,
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
                className={cn(
                  { 'is-active': filterByName === FILTER_BY.NAME.ALL },
                )}
                onClick={() => setFilterByName(FILTER_BY.NAME.ALL)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({ 'is-active': filterByName === user.name })}
                  onClick={() => setFilterByName(user.name)}
                  key={user.id}
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

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {query
                  && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  )
                  }
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">

              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button mr-6 is-success',
                  { 'is-outlined':
                    filterByCategory.length !== 0 })}
                onClick={() => setFilterByCategory([])}
              >
                All
              </a>

              {categoriesFromServer.map((category) => {
                const isSelected = filterByCategory.includes(category.title);

                return (
                  <a
                    data-cy="Category"
                    className={cn('button mr-2 my-1',
                      { 'is-info': filterByCategory.includes(category.title) })}
                    href="#/"
                    key={category.id}
                    onClick={() => {
                      if (isSelected) {
                        setFilterByCategory(filterByCategory.filter(
                          categor => categor.title !== category.title,
                        ));
                      }

                      setFilterByCategory(
                        [...filterByCategory, category.title],
                      );
                    }
                }
                  >
                    {category.title}
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
                  setFilterByName(FILTER_BY.NAME.ALL);
                  setFilterByCategory([]);
                  setQuery('');
                }}
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
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        ID

                        <a
                          href="#/"
                          onClick={() => {
                            setSortBy({
                              [SORT_BY.ID]: sortBy[SORT_BY.ID] ? 'DESC' : 'ASC',
                            });
                          }}
                        >
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
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
                            setSortBy({
                              [SORT_BY.PRODUCT]:
                              sortBy[SORT_BY.PRODUCT] ? 'DESC' : 'ASC',
                            });
                          }}
                        >
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className="fas fa-sort"
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
                            setSortBy({
                              [SORT_BY.CATEGORY]:
                              sortBy[SORT_BY.CATEGORY] ? 'DESC' : 'ASC',
                            });
                          }}
                        >
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
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
                            setSortBy({
                              [SORT_BY.USER]:
                              sortBy[SORT_BY.USER] ? 'DESC' : 'ASC',
                            });
                          }}
                        >
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
                    <tr
                      data-cy="Product"
                      key={product.id}
                    >
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>

                      <td
                        data-cy="ProductUser"
                        className={cn('has-text-link',
                          { 'has-text-danger': product.owner.sex === 'f' })}
                      >
                        {product.owner.name}
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
