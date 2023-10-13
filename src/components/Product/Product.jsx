import cn from 'classnames';

export const Product = ({ product }) => {
  const {
    productId = product.product.id,
    productName = product.product.name,
    productCategory = `${product.category.icon} - ${product.category.title}`,
    productUser = product.user.name,
    productUserSex = product.user.sex,
  } = product;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {productId}
      </td>

      <td data-cy="ProductName">{productName}</td>
      <td data-cy="ProductCategory">{productCategory}</td>

      <td
        data-cy="ProductUser"
        className={cn({
          'has-text-danger': productUserSex === 'f',
          'has-text-link': productUserSex === 'm',
        })}
      >
        {productUser}
      </td>
    </tr>
  );
};
