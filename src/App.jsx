import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const handleUserFilter = (userId) => {
    setSelectedUser(userId);
  };

  const handleSearchInputChange = (search) => {
    setSearchValue(search.target.value);
  };

  const clearSearchInput = () => {
    setSearchValue('');
  };

  const resetAllFilters = () => {
    setSelectedUser(null);
    setSearchValue('');
  };

  const filteredProducts = productsFromServer.filter((product) => {
    const { categoryId } = product;

    if (selectedUser !== null
      && selectedUser !== categoriesFromServer
        .find(
          categoryFromServer => categoryFromServer.id === categoryId
        ).ownerId) {
      return false;
    }

    return product.name.toLowerCase()
      .includes(searchValue.toLowerCase());
  });

  const products = filteredProducts.map((product) => {
    const { id, name, categoryId } = product;
    const category = categoriesFromServer
      .find(categoryFromServer => categoryFromServer.id === categoryId);
    const user = usersFromServer
      .find(userFromServer => userFromServer.id === category.ownerId);
    const ownerTextColor = user.sex === 'm'
      ? 'has-text-link'
      : 'has-text-danger';

    return (
      <tr key={id} data-cy="Product">
        <td className="has-text-weight-bold" data-cy="ProductId">{id}</td>
        <td data-cy="ProductName">{name}</td>
        <td data-cy="ProductCategory">
          {`${category.icon} - ${category.title}`}
        </td>
        <td data-cy="ProductUser" className={ownerTextColor}>
          {user.name}
        </td>
      </tr>
    );
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">
          Product Categories
        </h1>
        <div className="box table-container">
          <nav className="panel">

            <p className="panel-tabs has-text-weight-bold">
              <a
                href="#/"
                onClick={() => handleUserFilter(null)}
                data-cy="FilterAllUsers"
                className={`data-cy="FilterAllUsers"
                  ${selectedUser === null
                  ? 'is-active'
                  : ''}`}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  href="#/"
                  onClick={() => handleUserFilter(user.id)}
                  data-cy="FilterUser"
                  className={`data-cy="FilterUser"
                    ${selectedUser === user.id
                    ? 'is-active'
                    : ''}`}
                >
                  {user.name}
                </a>
              ))}
            </p>

          </nav>
          <div className="panel-block">

            <p className="control has-icons-left has-icons-right">
              <input
                data-cy="SearchField"
                type="text"
                className="input"
                placeholder="Search"
                value={searchValue}
                onChange={handleSearchInputChange}
              />
              {searchValue && (
                <span className="icon is-right">
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={clearSearchInput}
                  />
                </span>
              )}
            </p>

          </div>
          <div className="panel-block">

            <a
              data-cy="ResetAllButton"
              href="#/"
              className="button is-link is-outlined is-fullwidth"
              onClick={resetAllFilters}
            >
              Reset All Filters
            </a>

          </div>
          {products.length > 0 ? (
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
                          <i
                            data-cy="SortIcon"
                            className="fas fa-sort-up"
                          />
                        </span>
                      </a>
                    </span>

                  </th>
                  <th>

                    <span className="is-flex is-flex-wrap-nowrap">
                      User
                      <a href="#/">
                        <span className="icon">
                          <i
                            data-cy="SortIcon"
                            className="fas fa-sort"
                          />
                        </span>
                      </a>
                    </span>

                  </th>
                </tr>
              </thead>
              <tbody>
                {products}
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
