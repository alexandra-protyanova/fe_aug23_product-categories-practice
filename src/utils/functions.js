import usersFromServer from '../api/users';
import categoriesFromServer from '../api/categories';

export function getCategoryId(categoryId) {
  return categoriesFromServer.filter(category => category.id === categoryId);
}

export function getUseryId(userId) {
  return usersFromServer.find(user => user.id === userId) || null;
}
