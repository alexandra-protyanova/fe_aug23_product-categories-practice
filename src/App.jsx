import React, { useState } from 'react';
import './App.scss';

import { SORT_TYPE, products } from './variables';
import { getPreparedProducts } from './helpers';

// eslint-disable-next-line max-len
import { FiltrationSection } from './components/FiltrationSection/FiltrationSection';
import { ProductsTable } from './components/ProductsTable/ProductsTable';

export const App = () => {
  const [sortProducts, setSortProducts] = useState({
    user: null,
    searchedProduct: null,
    category: [],
    sortingOptions: {
      sortType: null,
      sortingColumn: null,
    },
  });
  const visibleProducts = getPreparedProducts(products, sortProducts);

  const updateSortProductsKey = (key, newValue) => {
    setSortProducts((currentSortProducts) => {
      const updateProducts = { ...currentSortProducts };

      if (key === 'category' && !(newValue instanceof Array)) {
        updateProducts[key] = updateProducts[key].includes(newValue)
          ? updateProducts[key].filter(value => value !== newValue)
          : [...updateProducts[key], newValue];

        return updateProducts;
      }

      if (key === 'sortingOptions') {
        const isColumnChange = updateProducts[key].sortingColumn !== newValue
          && updateProducts[key].sortingColumn !== null;

        if (isColumnChange) {
          updateProducts[key].sortType = null;
        }

        if (updateProducts[key].sortType === null) {
          updateProducts[key].sortType = SORT_TYPE.UP;
        } else if (updateProducts[key].sortType === SORT_TYPE.UP) {
          updateProducts[key].sortType = SORT_TYPE.DOWN;
        } else {
          updateProducts[key].sortType = null;
        }

        updateProducts[key].sortingColumn = newValue;

        return updateProducts;
      }

      updateProducts[key] = newValue;

      return updateProducts;
    });
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <FiltrationSection
          visibleProducts={visibleProducts}
          sortProducts={sortProducts}
          updateSortProductsKey={updateSortProductsKey}
          setSortProducts={setSortProducts}
        />

        <ProductsTable
          visibleProducts={visibleProducts}
          sortProducts={sortProducts}
          updateSortProductsKey={updateSortProductsKey}
        />
      </div>
    </div>
  );
};
