/* eslint-disable jsx-a11y/accessible-emoji */
/*eslint-disable*/
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductsList } from './components/ProductsList';
import { SearchBlock } from './components/SearchBlock';


function getCategoryById(categoryId) {
  return categoriesFromServer.find(category => category.id === categoryId);
}

function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId)
}

const owners = categoriesFromServer.map(own => ({
  user: getUserById(own.ownerId)
}));

function getOwnUsersById(userId) {
  return owners.filter(ownUser => ownUser.user.id === userId)
    || null;
}

const products = productsFromServer.map(product => ({
  ...product,
  category: getCategoryById(product.categoryId),
  user: getOwnUsersById(product.userId)
}));


function getFilterProducts(products, query) {
  let productFilter = [...products];

  if (query) {
    const normalizeQuery = query.toLowerCase().trim();

    productFilter = productFilter.filter(product => (
      product.name.toLowerCase().startsWith(normalizeQuery)
    ));
  }

  return productFilter;
}

console.log(products)

export const App = () => {
  // const category = products.map(category => category.name)
  // console.log(category)
  // const [sorted, setSorted] = useState(category)
  const [select, setSelected] = useState('')
  const [query, setQuery] = useState('');

  const productForRendering = getFilterProducts(products, query);

  const sortByGrocery = () => {
    setSelected('Grocery')
  }

  const sortByDrinks = () => {
    setSelected('Drinks')
  }

  const sortByFruits = () => {
    setSelected('Fruits')
  }

  const sortByElectronics = () => {
    setSelected('Electronics')
  }

  const sortByClothes = () => {
    setSelected('Clothes')
  }


  const deleteBtn = () => {
    setQuery('')
  }

  const sortByAll = () => {
    setSelected('All')
  }

  const sortByRoma = () => {
    setSelected('Roma')
  }

  const sortByAnna = () => {
    setSelected('Anna')
  }

  const sortByMax = () => {
    setSelected('Max')
  }

  const sortByJohn = () => {
    setSelected('John')
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                onClick={sortByAll}
                className={select === 'All' ? "is-active" : ""}
                data-cy="FilterAllUsers"
                href="#/"
              >
                All
              </a>

              <a
                onClick={sortByRoma}
                className={select === 'Roma' ? "is-active" : ""}
                data-cy="FilterUser"
                href="#/"
              >
                Roma
              </a>

              <a
                onClick={sortByAnna}
                className={select === 'Anna' ? "is-active" : ""}
                data-cy="FilterUser"
                href="#/"
              >
                Anna
              </a>

              <a
                onClick={sortByMax}
                className={select === 'Max' ? "is-active" : ""}
                data-cy="FilterUser"
                href="#/"
              >
                Max
              </a>

              <a
                onClick={sortByJohn}
                className={select === 'John' ? "is-active" : ""}
                data-cy="FilterUser"
                href="#/"
              >
                John
              </a>
            </p>

            <div className="panel-block">
              <SearchBlock deleteBtn={deleteBtn} setQuery={setQuery}/>
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
              // is-info
                onClick={sortByGrocery}
                data-cy="Category"
                className={select === 'Grocery' ? "button mr-2 my-1 is-info" : "button mr-2 my-1"}
                href="#/"
              >
                Grocery
              </a>

              <a
                onClick={sortByDrinks}
                data-cy="Category"
                className={select === 'Drinks' ? "button mr-2 my-1 is-info" : "button mr-2 my-1"}
                href="#/"
              >
                Drinks
              </a>

              <a
                onClick={sortByFruits}
                data-cy="Category"
                className={select === 'Fruits' ? "button mr-2 my-1 is-info" : "button mr-2 my-1"}
                href="#/"
              >
                Fruits
              </a>
              <a
                onClick={sortByElectronics}
                data-cy="Category"
                className={select === 'Electronics' ? "button mr-2 my-1 is-info" : "button mr-2 my-1"}
                href="#/"
              >
                Electronics
              </a>

              <a
                onClick={sortByClothes}
                data-cy="Category"
                className={select === 'Clothes' ? "button mr-2 my-1 is-info" : "button mr-2 my-1"}
                href="#/"
              >
                Clothes
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
            <ProductsList products={productForRendering} />
            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
};
