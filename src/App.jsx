/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import { products, findOwners, filterByOwner, filterByName } from './utils';
import { Table } from './components/Table/Table';
import { FilterUserList } from './components/FilterUserList/FilterUserList';
import { FilterByInput } from './components/FilterByInput/FilterByInput';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('All');
  const [query, setQuery] = useState('');
  const owners = findOwners(products);
  const ownersList = ['All', ...owners, 'John'];
  const filteredByUser = filterByOwner(products, selectedUser);
  const filteredProducts = filterByName(filteredByUser, query);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <FilterUserList
                owners={ownersList}
                selectedUser={selectedUser}
                onSelectedUser={user => setSelectedUser(user)}
              />
            </p>

            <FilterByInput
              filterBy={newQuery => setQuery(newQuery)}
              query={query}
              onClearButton={() => setQuery('')}
            />

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

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setSelectedUser('All');
                  setQuery('');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {!filteredProducts.length
            ? (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
            : <Table products={filteredProducts} />
          }
        </div>
      </div>
    </div>
  );
};
