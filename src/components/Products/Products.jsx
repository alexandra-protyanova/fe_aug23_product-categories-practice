import cn from 'classnames';
import { Product } from '../Product/Product';

const ProductSorts = [
  'ID',
  'Product',
  'Category',
  'User',
];

export const Products = ({ products, sortType, setSortType }) => (
  <div className="box table-container">
    {products.length === 0
      ? (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      ) : (
        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {ProductSorts.map(sort => (
                <th key={sort}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {sort}

                    <a
                      href="#/"
                      onClick={() => setSortType(
                        sortType[sort] === 'DESC'
                          ? {}
                          : {
                            [sort]: sortType[sort] ? 'DESC' : 'ASC',
                          },
                      )}
                    >

                      <span className="icon">
                        <i
                          data-cy="SortIcon"
                          className={cn(
                            'fas',
                            {
                              'fa-sort': !sortType[sort],
                              'fa-sort-down': sortType[sort] === 'DESC',
                              'fa-sort-up': sortType[sort] === 'ASC',
                            },
                          )}
                        />
                      </span>
                    </a>
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <Product
                product={product}
                key={product.product.id}
              />
            ))}
          </tbody>
        </table>
      )
    }
  </div>
);
