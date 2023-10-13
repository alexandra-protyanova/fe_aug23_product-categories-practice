/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';
import { Table } from './components';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const productsPrepared = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(cat => product.categoryId === cat.id);
  const user = usersFromServer
    .find(person => category.ownerId === person.id);

  return {
    ...product,
    category,
    user,
  };
});

const productFilter = (
  products,
  selectedUserId,
  inputValue,
  setSelectedCategories,
) => {
  let filteredProducts = structuredClone(products);

  if (selectedUserId) {
    filteredProducts = filteredProducts
      .filter(product => product.user.id === selectedUserId);
  }

  if (inputValue) {
    const lowerInputValue = inputValue.toLowerCase().trim();

    filteredProducts = filteredProducts.filter((product) => {
      const title = product.name.toLowerCase();

      if (title.includes(lowerInputValue)) {
        return true;
      }

      return false;
    });
  }

  if (setSelectedCategories.length !== 0) {
    filteredProducts = filteredProducts
      .filter(product => setSelectedCategories.includes(product.category.id));
  }

  return filteredProducts;
};

export const App = () => {
  const [selectedUserId, setselectedUserId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [query, setQuery] = useState({});

  const productsToRender = productFilter(
    productsPrepared,
    selectedUserId,
    inputValue,
    selectedCategories,
  );

  const resetAllFilters = () => {
    setselectedUserId(null);
    setInputValue('');
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
                className={cn({ 'is-active': !selectedUserId })}
                onClick={() => setselectedUserId(null)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({ 'is-active': user.id === selectedUserId })}
                  onClick={() => setselectedUserId(user.id)}
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
                  value={inputValue}
                  onChange={({ target }) => setInputValue(target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {inputValue && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setInputValue('')}
                    />
                  )}
                </span>
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
                  { 'is-outlined': selectedCategories.length !== 0 },
                )}
                onClick={() => setSelectedCategories([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  key={category.id}
                  href="#/"
                  className={cn(
                    'button',
                    'mr-2',
                    'mr-1',
                    { 'is-info': selectedCategories.includes(category.id) },
                  )}
                  onClick={() => setSelectedCategories(() => {
                    if (selectedCategories.includes(category.id)) {
                      return selectedCategories.filter(catId => catId
                        !== category.id);
                    }

                    return [...selectedCategories, category.id];
                  })}
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
                onClick={() => resetAllFilters()}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {productsToRender.length === 0
            ? (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            ) : (
              <Table
                products={productsToRender}
                query={query}
                setQuery={setQuery}
              />
            )}
        </div>
      </div>
    </div>
  );
};
