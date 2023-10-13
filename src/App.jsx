/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import { Users } from './components/Users';
import { Input } from './components/Input';
import { FilterButtons } from './components/FilterButtons';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(({ id }) => product.categoryId === id);
  const user = usersFromServer.find(({ id }) => id === category.ownerId);

  return {
    product,
    category,
    user,
  };
});

const filterByUser = (userId) => {
  const userCategories = (categoriesFromServer
    .filter(category => category.ownerId === userId));

  if (userCategories.length === 0) {
    return [];
  }

  const currentProducts = products
    .filter(item => item.product.categoryId === userCategories[0].id);

  return currentProducts;
};

const filterByInput = value => products
  .filter(({ product }) => product.name.toLowerCase().includes(value));

const isSelected = (curr, prev) => curr === prev;

const filterByCategory = title => products
  .filter(({ category }) => category.title === title);

export const App = () => {
  const [currentButton, setCurrentButton] = useState('all');
  const [currentInput, setCurrentInput] = useState('');
  const [visibleProducts, setVisibleProducts] = useState([...products]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>
            {/* <Users
              isSelected={isSelected}
              currentButton={currentButton}
              setCurrentButton={setCurrentInput}
              setVisibleProducts={setVisibleProducts}
              products={products}
              filterByUser={filterByUser}
            /> */}
            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={isSelected(currentButton, 'all') ? 'is-active' : ''}
                onClick={() => {
                  setCurrentButton('all');
                  setVisibleProducts([...products]);
                }}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={
                    isSelected(currentButton, user.id)
                      ? 'is-active'
                      : ''
                  }
                  onClick={() => {
                    setCurrentButton(user.id);
                    setVisibleProducts(filterByUser(user.id));
                  }}
                >
                  {user.name}
                </a>
              ))
              }

            </p>

            <Input
              currentInput={currentInput}
              setCurrentInput={setCurrentInput}
              setVisibleProducts={setVisibleProducts}
              filterByInput={filterByInput}
            />

            <FilterButtons
              setVisibleProducts={setVisibleProducts}
              currentButton={currentButton}
              setCurrentButton={setCurrentButton}
              products={products}
              isSelected={isSelected}
              filterByCategory={filterByCategory}
            />
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
                  {visibleProducts.length !== 0
                    && visibleProducts.map((prod) => {
                      const { user, category, product } = prod;

                      return (
                        <tr data-cy="Product" key={product.id}>
                          <td
                            className="has-text-weight-bold"
                            data-cy="ProductId"
                          >
                            {product.id}
                          </td>

                          <td data-cy="ProductName">{product.name}</td>
                          <td data-cy="ProductCategory">
                            {category.icon}
                            {' - '}
                            {category.title}
                          </td>

                          <td
                            data-cy="ProductUser"
                            className={user.sex === 'm'
                              ? 'has-text-link'
                              : 'has-text-danger'}
                          >
                            {user.name}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )
          }

        </div>
      </div>
    </div>
  );
};
