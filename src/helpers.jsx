import { SORT_TYPE } from './variables';

export function getPreparedProducts(
  items,
  {
    user,
    searchedProduct,
    category,
    sortingOptions: { sortType, sortingColumn },
  },
) {
  let preparedProducts = [...items];

  if (user) {
    preparedProducts = preparedProducts
      .filter(product => product.user.id === user);
  }

  if (searchedProduct) {
    const normalizedSearchedProduct = searchedProduct.trim().toLowerCase();

    preparedProducts = preparedProducts
      .filter(product => product.name
        .toLowerCase().includes(normalizedSearchedProduct));
  }

  if (category.length !== 0) {
    preparedProducts = preparedProducts
      .filter(product => category.includes(product.categoryId));
  }

  if (sortingColumn) {
    preparedProducts = preparedProducts.sort((a, b) => {
      switch (sortingColumn) {
        case 'ID':
          return getSortedProducts(a, b, sortType, 'id');

        case 'Product':
          return getSortedProducts(a, b, sortType, 'name');

        case 'Category':
          return getSortedProducts(a.category, b.category, sortType, 'title');

        case 'User':
          return getSortedProducts(a.user, b.user, sortType, 'name');

        default:
          return 0;
      }
    });
  }

  return preparedProducts;
}

function getSortedProducts(product1, product2, sortType, key) {
  if (sortType === SORT_TYPE.UP) {
    return typeof product1[key] === 'number'
      ? product1[key] - product2[key]
      : product1[key].localeCompare(product2[key]);
  }

  if (sortType === SORT_TYPE.DOWN) {
    return typeof product1[key] === 'number'
      ? product2[key] - product1[key]
      : product2[key].localeCompare(product1[key]);
  }

  return 0;
}
