/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const productCategory = categoriesFromServer
    .find(el => product.categoryId === el.id);
  const productUser = usersFromServer
    .find(currUser => productCategory.ownerId === currUser.id);

  return {
    ...product,
    category: productCategory,
    user: productUser,
  };
});

function filterProducts(productsTable, filterByUser, filterByCategory, query) {
  let filteredProducts = [...productsTable];

  if (query) {
    const lowerQuery = query.toLowerCase();

    filteredProducts = productsTable
      .filter(product => product.name.toLowerCase().includes(lowerQuery));
  }

  if (filterByUser !== 'all') {
    filteredProducts = filteredProducts
      .filter(product => product.user.id === filterByUser);
  }

  if (filterByCategory.length !== 0) {
    filteredProducts = filteredProducts
      .filter(product => filterByCategory.includes(product.categoryId));
  }

  return filteredProducts;
}

function sortProducts(visibleProducts, sortByColumn, isSortReversed) {
  const sortedProducts = [...visibleProducts];

  if (sortByColumn) {
    sortedProducts.sort((product1, product2) => {
      switch (sortByColumn) {
        case 'id':
          return product1.id - product2.id;
        case 'product':
          return product1.name.localeCompare(product2.name);
        case 'category':
          return product1.category.title.localeCompare(product2.category.title);
        case 'user':
          return product1.user.name.localeCompare(product2.user.name);
        default: return 0;
      }
    });
  }

  return isSortReversed ? sortedProducts.reverse() : sortedProducts;
}

export const App = () => {
  const [filterByUser, setFilterByUser] = useState('all');
  const [filterByCategories, setFilterByCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [sortByColumn, setSortByColumn] = useState('');
  const [isSortReversed, setIsSortReversed] = useState(false);

  const visibleProducts
    = filterProducts(products, filterByUser, filterByCategories, query);

  const productsToRender
    = sortProducts(visibleProducts, sortByColumn, isSortReversed);

  const handleCategoriesClick = (categId) => {
    if (filterByCategories.includes(categId)) {
      setFilterByCategories(filterByCategories.filter(el => el !== categId));
    } else {
      setFilterByCategories([
        ...filterByCategories,
        categId,
      ]);
    }
  };

  const handleSortClick = (sortBy) => {
    if (sortByColumn === sortBy) {
      setIsSortReversed(true);
    }

    if (isSortReversed) {
      setSortByColumn('');
      setIsSortReversed(false);
    }

    setSortByColumn(sortBy);
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
                className={cn({ 'is-active': filterByUser === 'all' })}
                onClick={() => setFilterByUser('all')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({ 'is-active': filterByUser === user.id })}
                  onClick={() => setFilterByUser(user.id)}
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
                  onChange={(event => setQuery(event.target.value))}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query
                  && (
                    <span className="icon is-right">
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <button
                        data-cy="ClearButton"
                        type="button"
                        className="delete"
                        onClick={() => setQuery('')}
                      />
                    </span>
                  )
                }
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button', 'is-success', 'mr-6',
                  { 'is-outlined': filterByCategories.length !== 0 })}
                onClick={() => setFilterByCategories([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className={cn('button', 'mr-2', 'my-1',
                    { 'is-info': filterByCategories.includes(category.id) })}
                  href="#/"
                  onClick={() => handleCategoriesClick(category.id)}
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
                onClick={() => {
                  setFilterByCategories([]);
                  setFilterByUser('all');
                  setQuery('');
                }}
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
                            <i
                              data-cy="SortIcon"
                              className="fas fa-sort"
                              role="presentation"
                              onClick={() => handleSortClick('id')}
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
                              className="fas fa-sort"
                              role="presentation"
                              onClick={() => handleSortClick('product')}
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
                              className="fas fa-sort"
                              role="presentation"
                              onClick={() => handleSortClick('category')}
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
                              role="presentation"
                              onClick={() => handleSortClick('user')}
                            />
                          </span>
                        </a>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {productsToRender.map((product) => {
                    const {
                      id,
                      name,
                    } = product;

                    return (
                      <tr data-cy="Product" key={id}>
                        <td
                          className="has-text-weight-bold"
                          data-cy="ProductId"
                        >
                          {id}
                        </td>

                        <td data-cy="ProductName">{name}</td>
                        <td data-cy="ProductCategory">
                          {`${product.category.icon} - ${product.category.title}`}
                        </td>

                        <td
                          data-cy="ProductUser"
                          className={cn('has-text-link', {
                            'has-text-danger': product.user.sex === 'f',
                          })}
                        >
                          {product.user.name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </div>
  );
};
