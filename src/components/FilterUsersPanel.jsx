import React from 'react';
import usersFromServer from '../api/users';

const FilterUsersPanel = ({ setCurrentList, currentList, products }) => {
  const filterUserId = (userId) => {
    const cloneList = [...products];

    const filter = cloneList.filter(item => item.user
      && item.user.id === userId);

    setCurrentList(filter);
  };

  const handlerShowAll = () => {
    setCurrentList(products);
  };

  return (

    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={handlerShowAll}
      >
        All
      </a>
      {usersFromServer.map(user => (
        <a
          data-cy="FilterUser"
          href="#/"
          onClick={() => filterUserId(user.id)}
        >
          {user.name}
        </a>

      ))}
    </p>
  );
};

export default FilterUsersPanel;
