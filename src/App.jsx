/* eslint-disable jsx-a11y/accessible-emoji */
import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const USERS = {
  ALL: 'All',
  ROMA: 'Roma',
  ANNA: 'Anna',
  MAX: 'Max',
  JOHN: 'John',
};

const CATEGORY = {
  ALL: 'All',
  GROCERY: 'Grocery',
  DRINKS: 'Drinks',
  FRUITS: 'Fruits',
  ELECTRONICS: 'Electronics',
  CLOTHES: 'Clothes',
};

function getCategory(CatagoryId) {
  return categoriesFromServer.find(
    categories => categories.id === CatagoryId,
  ) || null;
}

function getUser(OwnerId) {
  return usersFromServer.find(users => users.id === OwnerId);
}

const products = productsFromServer.map((product) => {
  const category = getCategory(product.categoryId); // find by product.categoryId
  const user = getUser(category.ownerId);// find by category.ownerId

  return {
    ...product,
    category,
    user,
  };
});

function getFIlteredProducts(
  product, { filterProducts, qwery, filterCategories },
) {
  let copiedProduct = [...product];

  if (filterProducts) {
    if (filterProducts !== USERS.ALL) {
      copiedProduct = copiedProduct.filter(
        copieProduct => copieProduct.user.name === filterProducts,
      );
    }
  }

  if (qwery) {
    const normalizedQwery = qwery.toLowerCase();

    copiedProduct = copiedProduct.filter(
      copieProduct => copieProduct.name.toLowerCase().includes(normalizedQwery),
    );
  }

  if (filterCategories) {
    if (filterCategories !== CATEGORY.ALL) {
      copiedProduct = copiedProduct.filter(
        copieProduct => copieProduct.category.title === filterCategories,
      );
    }
  }

  return copiedProduct;
}

export const App = () => {
  const [filterProducts, setfilterProducts] = useState(USERS.ALL);
  const [qwery, setQwery] = useState('');
  const [filterCategories, setFilterCategories] = useState(CATEGORY.ALL);

  const handleReset = () => {
    setfilterProducts('');
    setQwery('');
    setFilterCategories('');
  };

  const filteredProducts = getFIlteredProducts(
    products, { filterProducts, qwery, filterCategories },
  );

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
                onClick={() => setfilterProducts(USERS.ALL)}
                className={`${filterProducts === USERS.ALL ? 'is-active' : ''}`}
              >
                All
              </a>

              <a
                data-cy="FilterAllUsers"
                href="#/"
                onClick={() => setfilterProducts(USERS.ROMA)}
                className={`${filterProducts === USERS.ROMA ? 'is-active' : ''}`}
              >
                Roma
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => setfilterProducts(USERS.ANNA)}
                className={`${filterProducts === USERS.ANNA ? 'is-active' : ''}`}
              >
                Anna
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => setfilterProducts(USERS.MAX)}
                /* eslint-disable */
                className={`${filterProducts === USERS.MAX ? 'is-active' : ''}`}
              >
                Max
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => setfilterProducts(USERS.JOHN)}
                className={`${filterProducts === USERS.JOHN ? 'is-active' : ''}`}
              >
                John
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={`${qwery === '' ? '' : qwery}`}
                  onChange={(event) => {
                    setQwery(event.target.value);
                  }}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {qwery && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQwery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={`button is-success mr-6 ${filterCategories === CATEGORY.ALL ? '' : 'is-outlined'}`}
                onClick={() => setFilterCategories('')}
              >
                All
              </a>

              <a
                data-cy="Category"
                className={`button mr-2 my-1 ${filterCategories === CATEGORY.GROCERY ? 'is-info' : ''}`}
                href="#/"
                onClick={() => setFilterCategories(CATEGORY.GROCERY)}
              >
                Grocery
              </a>

              <a
                data-cy="Category"
                className={`button mr-2 my-1 ${filterCategories === CATEGORY.DRINKS ? 'is-info' : ''}`}
                href="#/"
                onClick={() => setFilterCategories(CATEGORY.DRINKS)}
              >
                Drink
              </a>

              <a
                data-cy="Category"
                className={`button mr-2 my-1 ${filterCategories === CATEGORY.FRUITS ? 'is-info' : ''}`}
                href="#/"
                onClick={() => setFilterCategories(CATEGORY.FRUITS)}
              >
                Fruits
              </a>

              <a
                data-cy="Category"
                className={`button mr-2 my-1 ${filterCategories === CATEGORY.ELECTRONICS ? 'is-info' : ''}`}
                href="#/"
                onClick={() => setFilterCategories(CATEGORY.ELECTRONICS)}
              >
                Electronics
              </a>

              <a
                data-cy="Category"
                className={`button mr-2 my-1 ${filterCategories === CATEGORY.CLOTHES ? 'is-info' : ''}`}
                href="#/"
                onClick={() => setFilterCategories(CATEGORY.CLOTHES)}
              >
                Clothes
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => handleReset()}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

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
            {filteredProducts.map(product => (
              <tbody key={product.id}>
                <tr data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {`${product.category.icon} - ${product.category.title}`}
                  </td>
                  <td
                    data-cy="ProductUser"
                    className={`has-text-link ${product.user.sex === 'f' ? 'has-text-danger' : 'has-text-link'}`}
                  >
                    {product.user.name}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
