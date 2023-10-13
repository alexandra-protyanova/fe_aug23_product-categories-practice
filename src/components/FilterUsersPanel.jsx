import React, { useState } from 'react';
import usersFromServer from '../api/users';

const FilterUsersPanel = ({ currentList, setCurrentList, products }) => {
  const [filterByName, setFilterByName] = useState(null);

  const handlerFilterByName = (userId) => {
    if (filterByName === userId) {
      setFilterByName(null);
      setCurrentList(products);
    } else {
      const filterName = currentList.filter(item => item.user
        && item.user.id === userId);

      setFilterByName(userId);
      setCurrentList(filterName);
    }
  };

  const handlerShowAll = () => {
    setCurrentList(products);
  };
  // user.user.id === userId

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
          onClick={() => handlerFilterByName(user.id)}
        >
          {user.name}
        </a>

      ))}
    </p>
  );
};

export default FilterUsersPanel;
