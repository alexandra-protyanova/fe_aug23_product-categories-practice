export const Product = () => (
  <tr data-cy="Product">
    <td className="has-text-weight-bold" data-cy="ProductId">
      1
    </td>

    <td data-cy="ProductName">Milk</td>
    <td data-cy="ProductCategory">🍺 - Drinks</td>

    <td
      data-cy="ProductUser"
      className="has-text-link"
    >
      Max
    </td>
  </tr>
);
