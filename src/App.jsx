/* eslint-disable jsx-a11y/accessible-emoji */
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const FILTERBYSEX = {
  ALL: 'all',
  M: 'm',
  F: 'f',
};

const getPreparedProducts = () => {
  const products = productsFromServer.map((product) => {
    const category = categoriesFromServer.find(
      cat => cat.id === product.categoryId,
    );
    const categoryOwner = usersFromServer.find(
      user => user.id === category.ownerId,
    );

    return { ...product, category, user: categoryOwner };
  });

  return products;
};

const getFilteredByUser = (byUser, products) => {
  const filteredProducts = [...products];

  if (!byUser) {
    return filteredProducts;
  }

  return filteredProducts.filter(product => product.user.name === byUser);
};

const getFilteredByProductName = (byProductName, products = []) => {
  if (!byProductName || products.length === 0) {
    return products;
  }

  const preparedProductName = byProductName.toLowerCase();

  const returnedProducts = products.filter((product) => {
    if (product.name) {
      return product.name.toLowerCase().includes(preparedProductName);
    }

    return false;
  });

  return returnedProducts;
};

export const App = () => {
  const [byUser, setByUser] = useState('');
  const [byProductName, setByProductName] = useState('');
  const [byCategory, setByCategory] = useState(['ALL']);
  const preparedProducts = getPreparedProducts();
  const filteredByProductName = getFilteredByProductName(
    byProductName,
    preparedProducts,
  );
  const productsToDisplay = getFilteredByUser(byUser, filteredByProductName);
  const noResults = productsToDisplay.length === 0;

  const resetHandler = () => {
    setByUser('');
    setByProductName('');
    setByCategory(['ALL']);
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
                onClick={() => setByUser('')}
                className={cn({
                  'is-active': byUser === '',
                })}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  onClick={() => setByUser(user.name)}
                  className={cn({
                    'is-active': user.name === byUser,
                  })}
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
                  onChange={e => setByProductName(e.target.value)}
                  value={byProductName}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {byProductName.length > 0 && (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setByProductName('')}
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn({
                  'button is-success mr-6 is-outlined': byCategory === ['ALL'],
                })}
                onClick={() => setByCategory(['ALL'])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={cn({
                    'is-info': byCategory.find(x => x === category.title),
                  })}
                  href="#/"
                  key={category.id}
                  onClick={() => setByCategory([...byCategory, category.title])}
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
                onClick={resetHandler}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {noResults && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          {!noResults && (
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
                {productsToDisplay.map(product => (
                  <tr key={product.id} data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">
                      {`${product.category.icon} - ${product.category.title}`}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={cn({
                        'has-text-danger': product.user.sex === FILTERBYSEX.F,
                        'has-text-link': product.user.sex === FILTERBYSEX.M,
                      })}
                    >
                      {product.user.name}
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
