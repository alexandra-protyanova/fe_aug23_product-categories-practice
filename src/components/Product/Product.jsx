import cn from 'classnames';

export const Product = ({ product }) => {
  const {
    id,
    name,
    category,
    owner,
  } = product;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {id}
      </td>

      <td data-cy="ProductName">{name}</td>
      <td data-cy="ProductCategory">{`${category.icon} - ${category.title}`}</td>

      <td
        data-cy="ProductUser"
        className={cn({
          'has-text-link': owner.sex === 'm',
          'has-text-danger': owner.sex === 'f',
        })}
      >
        {owner.name}
      </td>
    </tr>
  );
};
