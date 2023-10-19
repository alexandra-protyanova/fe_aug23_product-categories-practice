/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import { users } from './api/users';
import { categories } from './api/categories';
import { productsFromServer } from './api/products';
import { Product } from './types/Product';
import { ColumnNames } from './types/ColumnNames';
import { PeopleTable } from './components/PeopleTable';
import { Filters } from './components/Filters';

const products: Product[] = productsFromServer.map((product) => {
  const category = categories.find(c => c.id === product.categoryId)
    || null;
  const user = users.find(u => u.id === category?.ownerId)
    || null;

  return {
    ...product,
    category,
    user,
  };
});

interface ProductsFilterOptions {
  goods: Product[],
  selectedUserId: number,
  query: string,
  selectedCategoriesIds: number[],
  sortBy?: ColumnNames,
  isReversed: boolean,
}

const getVisibleProducts = ({
  goods,
  selectedUserId,
  query,
  selectedCategoriesIds,
  sortBy,
  isReversed,
}: ProductsFilterOptions): Product[] => {
  let visibleProducts = [...goods];

  if (selectedUserId) {
    visibleProducts = visibleProducts.filter(product => (
      product.user?.id === selectedUserId
    ));
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visibleProducts = visibleProducts.filter(product => (
      product.name.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (selectedCategoriesIds.length > 0) {
    visibleProducts = visibleProducts.filter(product => (
      selectedCategoriesIds.includes(product.categoryId)
    ));
  }

  if (sortBy) {
    visibleProducts.sort((a, b) => {
      switch (sortBy) {
        case ColumnNames.ID:
          return a.id - b.id;

        case ColumnNames.Products:
          return a.name.localeCompare(b.name);

        case ColumnNames.Category:
          if (!a.category || !b.category) {
            return 0;
          }

          return a.category.title.localeCompare(b.category.title);

        case ColumnNames.User:
          if (!a.user || !b.user) {
            return 0;
          }

          return a.user.name.localeCompare(b.user.name);

        default:
          return 0;
      }
    });

    if (isReversed) {
      visibleProducts.reverse();
    }
  }

  return visibleProducts;
};

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<
  number[]
  >([]);
  const [sortBy, setSortBy] = useState<ColumnNames>();
  const [isReversed, setIsReversed] = useState(false);

  const visibleProducts = getVisibleProducts({
    goods: products,
    selectedUserId,
    query,
    selectedCategoriesIds,
    sortBy,
    isReversed,
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Filters
            selectedUserId={selectedUserId}
            selectedCategoriesIds={selectedCategoriesIds}
            setQuery={setQuery}
            query={query}
            setSelectedCategoriesIds={setSelectedCategoriesIds}
            setSelectedUserId={setSelectedUserId}
          />
        </div>

        <div className="box table-container">
          {visibleProducts.length > 0 ? (
            <PeopleTable
              products={visibleProducts}
              sortBy={sortBy}
              isReversed={isReversed}
              setIsReversed={setIsReversed}
              setSortBy={setSortBy}
            />
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
