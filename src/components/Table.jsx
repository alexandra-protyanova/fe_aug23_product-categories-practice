import cn from 'classnames';
// import { useState } from 'react';

const QUERY = {
  ID: 'ID',
  PRODUCT: 'PRODUCT',
  CATEGORY: 'CATEGORY',
  USER: 'USER',
};

const sorter = (products, query) => {
  const sortedProducts = structuredClone(products);

  if (!Object.keys(query).length) {
    return sortedProducts;
  }

  const [property] = Object.entries(query);
  const [key, value] = property;

  switch (key) {
    case QUERY.ID:
      sortedProducts.sort((a, b) => (
        value === 'ASC'
          ? a.id - b.id
          : b.id - a.id
      ));
      break;

    case QUERY.USER:
      sortedProducts.sort((a, b) => (
        value === 'ASC'
          ? a.user.name.localeCompare(b.user.name)
          : b.user.name.localeCompare(a.user.name)
      ));
      break;

    case QUERY.CATEGORY:
      sortedProducts.sort((a, b) => (
        value === 'ASC'
          ? a.category.title.localeCompare(b.category.title)
          : b.category.title.localeCompare(a.category.title)
      ));
      break;

    case QUERY.PRODUCT:
      sortedProducts.sort((a, b) => (
        value === 'ASC'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      ));
      break;

    default:
      return sortedProducts;
  }

  return sortedProducts;
};

export const Table = ({ products, query, setQuery }) => {
  // const [query, setQuery] = useState({});

  const sortedProducts = sorter(products, query);

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID

              <a
                href="#/"
                onClick={() => setQuery(() => {
                  if (query[QUERY.ID] === 'DESC') {
                    return {};
                  }

                  return ({
                    [QUERY.ID]: query[QUERY.ID] ? 'DESC' : 'ASC',
                  });
                })}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn(
                      'fas',
                      {
                        'fas fa-sort': !query[QUERY.ID],
                        'fas fa-sort-down': query[QUERY.ID] === 'DESC',
                        'fas fa-sort-up': query[QUERY.ID] === 'ASC',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product

              <a
                href="#/"
                onClick={() => setQuery(() => {
                  if (query[QUERY.PRODUCT] === 'DESC') {
                    return {};
                  }

                  return ({
                    [QUERY.PRODUCT]: query[QUERY.PRODUCT] ? 'DESC' : 'ASC',
                  });
                })}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn(
                      'fas',
                      {
                        'fas fa-sort': !query[QUERY.PRODUCT],
                        'fas fa-sort-down': query[QUERY.PRODUCT] === 'DESC',
                        'fas fa-sort-up': query[QUERY.PRODUCT] === 'ASC',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category

              <a
                href="#/"
                onClick={() => setQuery(() => {
                  if (query[QUERY.CATEGORY] === 'DESC') {
                    return {};
                  }

                  return ({
                    [QUERY.CATEGORY]: query[QUERY.CATEGORY] ? 'DESC' : 'ASC',
                  });
                })}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn(
                      'fas',
                      {
                        'fas fa-sort': !query[QUERY.CATEGORY],
                        'fas fa-sort-down': query[QUERY.CATEGORY] === 'DESC',
                        'fas fa-sort-up': query[QUERY.CATEGORY] === 'ASC',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User

              <a
                href="#/"
                onClick={() => setQuery(() => {
                  if (query[QUERY.USER] === 'DESC') {
                    return {};
                  }

                  return ({
                    [QUERY.USER]: query[QUERY.USER] ? 'DESC' : 'ASC',
                  });
                })}
              >
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn(
                      'fas',
                      {
                        'fas fa-sort': !query[QUERY.USER],
                        'fas fa-sort-down': query[QUERY.USER] === 'DESC',
                        'fas fa-sort-up': query[QUERY.USER] === 'ASC',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedProducts.map(product => (
          <tr
            data-cy="Product"
            key={product.id}
          >
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>

            <td data-cy="ProductName">
              {product.name}
            </td>
            <td data-cy="ProductCategory">
              {`${product.category.icon} - ${product.category.title}`}
            </td>

            <td
              data-cy="ProductUser"
              className={product.user.sex === 'm'
                ? 'has-text-link'
                : 'has-text-danger'
              }
            >
              {product.user.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
