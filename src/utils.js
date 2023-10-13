import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const products = productsFromServer.map((product) => {
  const category1 = categoriesFromServer
    .find(c => c.id === product.categoryId);
  const user = usersFromServer.find(u => u.id === category1.ownerId);

  return {
    id: product.id,
    name: product.name,
    category: category1,
    owner: user,
  };
});

// get list of owners
export function findOwners(productsList) {
  const listOfOwners = [];

  productsList.forEach((product) => {
    const {
      owner,
    } = product;

    if (!listOfOwners.includes(owner.name)) {
      listOfOwners.push(owner.name);
    }
  });

  return listOfOwners;
}

// filter by user function
export function filterByOwner(productList, selectedUser) {
  if (selectedUser === 'All') {
    return productList;
  }

  return productList.filter((product) => {
    const {
      owner,
    } = product;

    return owner.name === selectedUser;
  });
}

// filter by name function
export function filterByName(productList, name) {
  return productList
    .filter(product => product.name.toLowerCase()
      .includes(name.toLowerCase().trim()));
}
