import cn from 'classnames';

import usersFromServer from '../../../api/users';

export const FilterByUsers = ({ sortProducts, updateSortProductsKey }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      data-cy="FilterAllUsers"
      href="#/"
      className={cn({
        'is-active': !sortProducts.user,
      })}
      onClick={() => updateSortProductsKey('user', null)}
    >
      All
    </a>

    {usersFromServer.map(user => (
      <a
        data-cy="FilterUser"
        href="#/"
        key={user.id}
        className={cn({
          'is-active': user.id === sortProducts.user,
        })}
        onClick={() => updateSortProductsKey('user', user.id)}
      >
        {user.name}
      </a>
    ))}
  </p>
);
