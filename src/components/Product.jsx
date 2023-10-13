import React from 'react';

const Product = ({ product }) => {
  const { id, name, categories, user } = product;
  let classForUserSex = '';

  if (user) {
    if (user.sex === 'm') {
      classForUserSex = 'has-text-link';
    } else if (user.sex === 'f') {
      classForUserSex = 'has-text-danger';
    }
  }

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">
        {name}
      </td>

      <td data-cy="ProductCategory">
        {`${categories && categories.icon} - ${categories && categories.title}`}
      </td>

      <td
        data-cy="ProductUser"
        className={classForUserSex}
      >
        {user !== null ? user.name : 'empty name'}
      </td>
    </tr>
  );
};

export default Product;
