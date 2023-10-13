/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';

import categoriesFromServer from '../api/categories';

const FilterByUser = (productsFromServer) => {
  const [selectedOwner, setSelectedOwner] = useState(null);

  const filteredProducts = selectedOwner
    ? productsFromServer.filter(product => product.ownerId === selectedOwner)
    : productsFromServer;

  const owners = Array.from(new Set(productsFromServer
    .map(product => product.ownerId)));

  const handleOwnerFilter = (ownerId) => {
    setSelectedOwner(ownerId === 'all' ? null : ownerId);
  };

  return (
    <>
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => handleOwnerFilter('all')}
      >
        All
      </a>
      {owners.map(ownerId => (
        <button
          type="button"
          key={ownerId}
          className={`button ${selectedOwner === ownerId ? 'is-active' : ''}`}
          onClick={() => handleOwnerFilter(ownerId)}
        >
          {ownerId}
        </button>
      ))}
      {filteredProducts.map(product => (
        <tr data-cy="Product" key={product.id}>
          <td className="has-text-weight-bold" data-cy="ProductId">
            {product.id}
          </td>

          <td data-cy="ProductName">{product.name}</td>
          <td data-cy="ProductCategory">{`${categoriesFromServer.icon} - ${categoriesFromServer.title}`}</td>

          <td
            data-cy="ProductUser"
            className={owners.sex === 'm'
              ? 'has-text-link'
              : 'has-text-danger'}
          >
            {owners.name}
          </td>
        </tr>
      ))}
      ;
    </>
  );
};

export default FilterByUser;
