/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const getPreparedProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(c => (
    c.id === product.categoryId
  ));

  const user = usersFromServer.find(u => u.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

const BY__NAME = {
  ALL: 'All',
  ROMA: 'Roma',
  ANNA: 'Anna',
  MAX: 'Max',
  JOHN: 'John',
};

const BY__CATEGORY = {
  ALL: 'All',
  GROSERY: 'Grocery',
  DRINKS: 'Drinks',
  FRUITS: 'Fruits',
  ELECTONICS: 'Electronics',
  CLOTHES: 'Clothes',
};

const filteredByName = (products, { filteredBy, query, isSelected }) => {
  const copyProducts = [...products];

  if (query) {
    return copyProducts.filter(product => (
      product.name.toLowerCase().includes(query.toLowerCase())
    ));
  }

  if (filteredBy) {
    switch (filteredBy) {
      case BY__NAME.ALL:
        return copyProducts;

      case BY__NAME.ROMA:
        return copyProducts.filter(p => p.user.name === 'Roma');

      case BY__NAME.ANNA:
        return copyProducts.filter(p => p.user.name === 'Anna');

      case BY__NAME.MAX:
        return copyProducts.filter(p => p.user.name === 'Max');

      default: return copyProducts;
    }
  }

  return copyProducts;
};

const filteredByCategories = (filtered, { isSelected }) => {
  const copyProducts = [...filtered];

  if (isSelected) {
    switch (isSelected) {
      case BY__CATEGORY.ALL:
        return copyProducts;

      case BY__CATEGORY.GROSERY:
        return copyProducts.filter(p => (
          p.category.title === BY__CATEGORY.GROSERY
        ));

      case BY__CATEGORY.DRINKS:
        return copyProducts.filter(p => (
          p.category.title === BY__CATEGORY.DRINKS
        ));

      case BY__CATEGORY.FRUITS:
        return copyProducts.filter(p => (
          p.category.title === BY__CATEGORY.FRUITS
        ));

      case BY__CATEGORY.ELECTONICS:
        return copyProducts.filter(p => (
          p.category.title === BY__CATEGORY.ELECTONICS
        ));

      case BY__CATEGORY.CLOTHES:
        return copyProducts.filter(p => (
          p.category.title === BY__CATEGORY.CLOTHES
        ));

      default: return copyProducts;
    }
  }

  return copyProducts;
};

export const App = () => {
  const [filteredBy, setFilteredBy] = useState('');
  const [query, setQuery] = useState('');
  const [isSelected, setIsSelected] = useState('');

  const products = [...getPreparedProducts];

  const filtered = filteredByName(products, { filteredBy, query, isSelected });

  const fullFiltered = filteredByCategories(filtered, { isSelected });

  const filtereByQuery = (newQuery) => {
    setQuery(newQuery);
  };

  const handleFilterByCategories = (newSelect) => {
    setIsSelected(!isSelected ? newSelect : '');
  };

  const classForCategories = select => (
    `button mr-2 my-1 ${isSelected === select && 'is-info'}`
  );

  const classForNames = name => (
    filteredBy === name && 'is-active'
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            {/* Name filter button */}
            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                // eslint-disable-next-line max-len
                className={(filteredBy === '' || filteredBy === BY__NAME.ALL) && 'is-active'}
                onClick={() => {
                  setFilteredBy(BY__NAME.ALL);
                }}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={classForNames(user.name)}
                  onClick={() => {
                    setFilteredBy(user.name);
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
                  onChange={event => filtereByQuery(event.target.value)}
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
                      onClick={() => filtereByQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            {/* Category filter button */}
            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6"
                onClick={() => handleFilterByCategories(BY__CATEGORY.ALL)}
              >
                All
              </a>
              {categoriesFromServer.map(el => (
                <a
                  data-cy="Category"
                  className={classForCategories(el.title)}
                  href="#/"
                  onClick={() => handleFilterByCategories(el.title)}
                >
                  {el.title}
                </a>
              ))}

            </div>

            {/* Reset button */}
            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setFilteredBy('');
                  setIsSelected('');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        {/* Text when we don`t have the product */}
        <div className="box table-container">
          {filtered.length === 0 && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          {/* Products */}
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
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
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
              {fullFiltered.map(product => (
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
                    className={
                      product.user.sex === 'm'
                        ? 'has-text-link'
                        : 'has-text-danger'
                      }
                  >
                    {product.user.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
