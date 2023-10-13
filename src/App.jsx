/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { ProductsTable } from './components/ProductsTable';

function getFilteredProducts(products, query, queryInput, queryCategory) {
  let preparedProducts = [...products];

  if (query !== '') {
    preparedProducts = [...preparedProducts]
      .filter(product => product.category.ownerId === query);
  }

  if (queryInput) {
    preparedProducts = [...preparedProducts]
      .filter(product => product.name
        .toLowerCase()
        .includes(queryInput.toLowerCase()
          .trim()));
  }

  return preparedProducts;
}

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(cat => cat.id === product.categoryId);
  const user = usersFromServer.find(person => category.ownerId === person.id);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [filteredBy, setFilteredBy] = useState('');
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredProducts = getFilteredProducts(
    products,
    filteredBy,
    query,
  );

  const inputFilter = (newQuery) => {
    setQuery(newQuery);
  };

  const resetFilters = () => {
    setFilterCategory('');
    setFilteredBy('');
    setQuery('');
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
                  'is-active': filteredBy === '',
                })}
                onClick={() => setFilteredBy('')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({
                    'is-active': user.id === filteredBy,
                  })}
                  onClick={() => setFilteredBy(user.id)}
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
                  onChange={event => inputFilter(event.currentTarget.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {query.length !== 0 && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => {
                        setQuery('');
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
                className="button is-success mr-6 is-outlined"
                onClick={() => setFilterCategory('')}
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
                    { 'is-info': filterCategory === category.title },
                  )}
                  href="#/"
                  onClick={() => setFilterCategory(category.title)}
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
                onClick={resetFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            {filteredProducts.length === 0 && (
              'No products matching selected criteria'
            )}
          </p>

          <ProductsTable products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};
