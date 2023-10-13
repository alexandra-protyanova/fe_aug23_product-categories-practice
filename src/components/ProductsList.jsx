/*eslint-disable*/

export const ProductsList = ({products}) => {
  return (
    <>
    {products.map(product => (
      <tr data-cy="Product">
        <td className="has-text-weight-bold" data-cy="ProductId">
          {product.id}
        </td>

        <td data-cy="ProductName">{product.name}</td>
        <td data-cy="ProductCategory">{product.category.icon} - {product.category.title}</td>

        <td
          data-cy="ProductUser"
          className="has-text-link"
        >
          {product.user}
        </td>
      </tr>
    ))}
  </>
  )
}
