import { TableHead } from '../TableHead/TableHead';
import { ProductList } from '../ProductList/ProductList';

export const Table = ({ products }) => (
  <table
    data-cy="ProductTable"
    className="table is-striped is-narrow is-fullwidth"
  >
    <TableHead />

    <tbody>
      <ProductList productList={products} />
    </tbody>
  </table>
);
