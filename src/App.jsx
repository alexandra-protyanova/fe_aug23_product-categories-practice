/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(oneCategory => product.categoryId
      === oneCategory.id);
  const user = usersFromServer.find(owner => category.ownerId
    === owner.id);

  return {
    ...product,
    category,
    user,
  };
});

const users = [
  { id: 0, name: 'All' },
  ...usersFromServer,
];

const categories = [
  {
    id: 0,
    title: 'All',
  },
  ...categoriesFromServer,
];

const filterProducts = (selectedUser, query) => {
  let filteredProducts = [...products];

  if (selectedUser.name !== 'All') {
    filteredProducts = products.filter(product => product.user.id
      === selectedUser.id);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    filteredProducts = filteredProducts.filter(product => product.name
      .toLowerCase().includes(normalizedQuery));
  }

  return filteredProducts;
};

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(categories[0]);

  const productsToRender = filterProducts(selectedUser, query);

  const onCategoryHandler = (category) => {
    if (category.name === 'All') {
      return setSelectedCategories(categories[0]);
    }

    if (selectedCategories.includes(category)) {
      const index = selectedCategories.indexOf(category);

      selectedCategories.splice(index);

      if (!selectedCategories.length) {
        return setSelectedCategories(categories[0]);
      }

      return selectedCategories(selectedCategories);
    }

    return setSelectedCategories([...selectedCategories, category]);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">

              {
                users.map(user => (
                  <a
                    data-cy={user.name === 'All'
                      ? 'FilterAllUsers'
                      : 'FilterUser'
                    }
                    href="#/"
                    className={cn({
                      'is-active': selectedUser.id === user.id,
                    })}
                    onClick={() => selectedUser.id !== user.id
                      && setSelectedUser(user)
                    }
                  >
                    {user.name}
                  </a>
                ))
              }
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
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
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">

              {
                categories.map(category => (
                  <a
                    href="#/"
                    data-cy={category.title === 'All'
                      ? 'AllCategories'
                      : 'Category'
                    }
                    className="button  mr-6 is-outlined"
                    // className={cn('button', {
                    //   'is-succes': category.title === 'All'
                    //     && selectedCategories === category,
                    //   'mr-6': category.title === 'All',
                    //   'is-outlined': category.title === 'All',
                    //   'mr-2': category.title !== 'All',
                    //   'my-1': category.title !== 'All',
                    //   'iis-info': category.title === 'All',
                    // })}
                    onClick={() => onCategoryHandler(category)}
                  >
                    {category.title}
                  </a>
                ))
              }
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setSelectedUser(users[0]);
                  setQuery('');
                  setSelectedCategories(categories[0]);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">

          {!productsToRender.length
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
                  {
                    productsToRender.map(product => (
                      <tr data-cy="Product" key={product.id}>
                        <td
                          className="has-text-weight-bold"
                          data-cy="ProductId"
                        >
                          {product.id}
                        </td>

                        <td data-cy="ProductName">{product.name}</td>
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
                    ))
                  }
                </tbody>
              </table>
            )
          }

        </div>
      </div>
    </div>
  );
};
