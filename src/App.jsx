/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function getCategoryById(categoryId) {
  return (
    categoriesFromServer.find(category => category.id === categoryId) || null
  );
}

function getOwnerById(ownerId) {
  return usersFromServer.find(owner => owner.id === ownerId) || null;
}

export const newProducts = productsFromServer.map(item => ({
  ...item,
  category: getCategoryById(item.categoryId),
  owner: item.categoryId
    ? getOwnerById(getCategoryById(item.categoryId).ownerId)
    : null,
}));

export const App = () => {
  // console.log(newProducts);

  const [selectedUser, setSelectedUser] = useState('all');

  const filtredByUser = selectedUser === 'all'
    ? newProducts
    : newProducts.filter(prod => prod.owner.name === selectedUser);

  // console.log(filtredByUser);

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
                className={selectedUser === 'all' ? 'is-active' : ''}
                onClick={() => setSelectedUser('all')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={selectedUser === user.name ? 'is-active' : ''}
                  onClick={() => setSelectedUser(user.name)}
                >
                  {user.name}
                </a>
              ))}

              {/* <a data-cy="FilterUser" href="#/" className="is-active">
                User 2
              </a> */}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

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
              {filtredByUser.map(prod => (
                <tr data-cy="Product" key={prod.id}>
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {prod.id}
                  </td>

                  <td data-cy="ProductName">{prod.name}</td>
                  <td data-cy="ProductCategory">{`${prod.category.icon} - ${prod.category.title}`}</td>

                  <td
                    data-cy="ProductUser"
                    className={
                      prod.owner.sex === 'm'
                        ? 'has-text-link'
                        : 'has-text-danger'
                    }
                  >
                    {prod.owner.name}
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
