/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import productsFromServer from './api/products';
import Product from './components/Product';
import FilterUsersPanel from './components/FilterUsersPanel';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';

const products = productsFromServer.map((product) => {
  const categories = categoriesFromServer.find(
    category => category.id === product.categoryId,
  ) || null;

  const user = usersFromServer.find(
    u => u.id === categories.ownerId,
  ) || null;

  return {
    ...product,
    categories,
    user,
  };
});

export const App = () => {
  const [currentList, setCurrentList] = useState([...products]);
  const [query, setQuery] = useState('');
  const inputSymbols = query.trim().toLowerCase();

  const searchInput = currentList.filter((elem) => {
    const findObj = elem.name.trim().toLowerCase().includes(inputSymbols);

    return findObj;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <FilterUsersPanel
              currentList={currentList}
              setCurrentList={setCurrentList}
              products={products}
            />

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
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
                    onClick={() => setQuery('')}
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
              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
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
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {searchInput.length === 0 && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            {searchInput.length > 0 && (
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
            )}
            <tbody>
              {searchInput.map(product => (
                <Product key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
