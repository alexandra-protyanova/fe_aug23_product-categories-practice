/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

let areNoneResultsVisible = false;
// let isAllCategoriesSelected = true;
// const ALL_CATEGORIES = categoriesFromServer.map(category => category.title);

function getCategoryById(categoryId) {
  return categories.find(category => category.id === categoryId)
      || null;
}

function getUserById(ownerId) {
  return usersFromServer.find(user => user.id === ownerId)
      || null;
}

const categories = categoriesFromServer.map(category => ({
  ...category,
  user: getUserById(category.ownerId),
}));

const products = productsFromServer.map(product => ({
  ...product,
  category: getCategoryById(product.categoryId),
}));

function getFilteredProducts(
  productsRecieved,
  { filterOwner,
    query },
) {
  let preparedProducts = [...productsRecieved];
  const queryOrganised = query.trim().toLowerCase();

  areNoneResultsVisible = false;

  if (filterOwner && filterOwner !== 'All') {
    preparedProducts = preparedProducts
      .filter(product => product.category.user.name === filterOwner);
  }

  if (query) {
    preparedProducts = preparedProducts
      .filter(product => product.name.toLowerCase().includes(queryOrganised));
  }

  // if (filterCategories) {
  //   // isAllCategoriesSelected = false;
  //   preparedProducts = preparedProducts
  //     .filter(product => filterCategories.includes(product.category.title));
  // }

  if (preparedProducts.length === 0) {
    areNoneResultsVisible = true;
  }

  return preparedProducts;
}

export const App = () => {
  const [filterOwner, setFilterOwner] = useState('All');
  const [query, setQuery] = useState('');
  // const [filterCategories, setFilterCategories] = useState(ALL_CATEGORIES);
  const visibleProducts = getFilteredProducts(
    products,
    { filterOwner,
      query },
  );

  function styleUserBySex(userSex) {
    return (
      userSex === 'f'
        ? 'has-text-danger'
        : 'has-text-link'
    );
  }

  function resetAllFilters() {
    setFilterOwner('All');
    setQuery('');
  }

  // function setCategoryButtonAction(categoryTitle) {
  //   if (filterCategories.includes(categoryTitle)) {
  //     return setFilterCategories(filterCategories
  //       .filter(seletedCategory => seletedCategory.title !== categoryTitle));
  //   }

  //   return setFilterCategories(filterCategories.push(categoryTitle));
  // }

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
                onClick={() => setFilterOwner('All')}
                href="#/"
                className={cn({ 'is-active': filterOwner === 'All' })}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  onClick={() => setFilterOwner(`${user.name}`)}
                  href="#/"
                  className={cn({ 'is-active': filterOwner === user.name })}
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
                  onChange={(event) => {
                    setQuery(event.currentTarget.value);
                  }}
                  value={query}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {query
                  && (
                  <button
                    data-cy="ClearButton"
                    type="button"
                    onClick={() => setQuery('')}
                    className="delete"
                  />
                  )}
                </span>
              </p>
            </div>

            {/* <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
                onClick={() => setFilterCategories(ALL_CATEGORIES)}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={`button mr-2 my-1 ${cn({ 'is-info': filterCategories.includes(category.title) && !isAllSelected })})`}
                  href="#/"
                  onClick={() => setCategoryButtonAction(category.title)}
                >
                  {category.title}
                </a>
              ))}
            </div> */}

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetAllFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {areNoneResultsVisible
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
                  {visibleProducts.map(product => (
                    <tr data-cy="Product" key={product.id}>
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">
                        {`${product.category.icon} - ${product.category.title}`}
                      </td>
                      <td
                        data-cy="ProductUser"
                        className={styleUserBySex(product.category.user.sex)}
                      >
                        {product.category.user.name}
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
