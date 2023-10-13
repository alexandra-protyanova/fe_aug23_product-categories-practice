/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Users } from './components/Users/Users';
import { InputField } from './components/InputField/InputField';
import { Category } from './components/Category/Category';
import { Products } from './components/Products/Products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(categ => product.categoryId === categ.id);

  const user = usersFromServer
    .find(human => category.ownerId === human.id);

  return {
    product,
    category,
    user,
  };
});

const filterProducts = (goods, query, categories, user) => {
  let goodsArray = [...goods];

  if (query) {
    goodsArray = goodsArray.filter(good => good.product.name
      .toLowerCase().includes(query.toLowerCase().trim()));
  }

  if (categories.length !== 0) {
    goodsArray = goodsArray
      .filter(good => categories.includes(good.category.title));
  }

  if (user) {
    goodsArray = goodsArray.filter(good => good.user.name === user);
  }

  return goodsArray;
};

const sortProducts = (productsArray, sortType) => {
  const array = [...productsArray];

  if (Object.keys(sortType).length === 0) {
    return array;
  }

  if (sortType.ID) {
    if (sortType.ID === 'ASC') {
      array.sort((a, b) => a.product.id - b.product.id);
    } else {
      array.sort((a, b) => b.product.id - a.product.id);
    }
  }

  if (sortType.Product) {
    if (sortType.Product === 'ASC') {
      array.sort((a, b) => a.product.name.localeCompare(b.product.name));
    } else {
      array.sort((a, b) => b.product.name.localeCompare(a.product.name));
    }
  }

  if (sortType.Category) {
    if (sortType.Category === 'ASC') {
      array.sort((a, b) => a.category.title.localeCompare(b.category.title));
    } else {
      array.sort((a, b) => b.category.title.localeCompare(a.category.title));
    }
  }

  if (sortType.User) {
    if (sortType.User === 'ASC') {
      array.sort((a, b) => a.user.name.localeCompare(b.user.name));
    } else {
      array.sort((a, b) => b.user.name.localeCompare(a.user.name));
    }
  }

  return array;
};

export const App = () => {
  const [query, setQuery] = useState('');
  const [currentCategories, setCurrentCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  const [sortType, setSortType] = useState({});

  const resetFilters = () => {
    setCurrentUser('');
    setQuery('');
    setCurrentCategories([]);
  };

  const visibleProducts = sortProducts(
    filterProducts(
      products,
      query,
      currentCategories,
      currentUser,
    ),

    sortType,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>
            <Users
              users={usersFromServer}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />

            <InputField query={query} setQuery={setQuery} />

            <Category
              categoriesFromServer={categoriesFromServer}
              currentCategories={currentCategories}
              setCurrentCategories={setCurrentCategories}
            />

            <div className="panel-block">
              <a
                onClick={() => resetFilters()}
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>
        {/* products */}
        <Products
          products={visibleProducts}
          sortType={sortType}
          setSortType={setSortType}
        />
      </div>
    </div>
  );
};
