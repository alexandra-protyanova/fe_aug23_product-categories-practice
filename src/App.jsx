/* eslint-disable jsx-a11y/accessible-emoji */
import { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

function getCategory(categoryId) {
  return categoriesFromServer.find(category => category.id === categoryId)
    || null;
}

function getUser(categoryId) {
  const category = categoriesFromServer.find(category => category.id === categoryId)
  return usersFromServer.find(user => user.id === category.ownerId)
    || null;
}
const products = productsFromServer.map((product) => ({
  ...product,
  category: getCategory(product.categoryId),
  user: getUser(product.categoryId),
}));

function preparedArray(array, filterBy, categoryBy, queryBy) {
  let copy = [...array];

  if (filterBy !== '') {
    copy = copy.filter((el) => {
      const { user } = el;

      return user.name === filterBy;
    });
  };

  if (categoryBy !== '') {
    copy = copy.filter((el) => {
      const { category } = el;

      return category.name === categoryBy;
    });
  };

  if (queryBy !== '') {
    copy = copy.filter(el => el.name.toLowerCase()
      .includes(queryBy.toLowerCase()));
  }

  return copy;
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [query, setQuery] = useState('');
  const preparedProducts = preparedArray(products, selectedUser,
    selectedCategory, query);

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
                onClick={() => setSelectedUser('')}
              >
                All
              </a>
              {usersFromServer.map(user =>
              (<>
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({'is-active': user.name === selectedUser,})}
                  key={user.id}
                  onClick={() => setSelectedUser(user.name)}
                >
                  {user.name}
                </a>
              </>
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
                  onChange={e => setQuery(e.target.value)}
                />

                  <span className="icon is-left"

                  >
                    <i className="fas fa-search" aria-hidden="true" />
                  </span>

              {query &&
                <span className="icon is-right">
                   <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onclick={() => setQuery('')}
                  />
                </span>}

              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
            <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
                onClick={() => setSelectedCategory('')}
              >
                All
              </a>
              {categoriesFromServer.map(category => (
                <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
                key={category.id}
                onClick={() => setSelectedCategory(category.title)}
              >
                {category.title}
              </a>
              )
                )}

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
              {preparedProducts.map((product) => {
                const { id, name, category, user } = product;

                return (
                  <>
                    <tr data-cy="Product" key={product.id}>
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {id}
                      </td>

                      <td data-cy="ProductName">{name}</td>
                      <td data-cy="ProductCategory">{category.icon}-{category.title}</td>

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
                  </>

                );
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
