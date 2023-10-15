import { sortOptions } from '../../variables';
import { TableHead } from './TableHead/TableHead';
import { TableBody } from './TableBody/TableBody';

export const ProductsTable = ({
  visibleProducts,
  sortProducts,
  updateSortProductsKey,
}) => (
  <div className="box table-container">
    {visibleProducts.length === 0
      ? (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      )
      : (
        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {sortOptions.map(sortOption => (
                <TableHead
                  key={sortOption.id}
                  sortOption={sortOption}
                  sortProducts={sortProducts}
                  updateSortProductsKey={updateSortProductsKey}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleProducts.map(product => (
              <TableBody product={product} />
            ))}
          </tbody>
        </table>
      )
    }
  </div>
);
