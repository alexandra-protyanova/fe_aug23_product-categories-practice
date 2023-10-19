import React from 'react';
import cn from 'classnames';
import { ColumnNames } from '../types/ColumnNames';
import { Product } from '../types/Product';

type Props = {
  products: Product[];
  sortBy?: ColumnNames;
  isReversed: boolean;
  setSortBy: (value?: ColumnNames) => void;
  setIsReversed: (value: boolean) => void;
};

export const PeopleTable: React.FC<Props> = ({
  products,
  sortBy,
  isReversed,
  setSortBy,
  setIsReversed,
}) => {
  function toggleSortBy(newColumnName: ColumnNames) {
    const firstClick = sortBy !== newColumnName;
    const secondClick = sortBy === newColumnName && isReversed === false;
    const thirdClick = sortBy === newColumnName && isReversed === true;

    if (firstClick) {
      setSortBy(newColumnName);
      setIsReversed(false);
    }

    if (secondClick) {
      setIsReversed(true);
    }

    if (thirdClick) {
      setSortBy(undefined);
      setIsReversed(false);
    }
  }

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(ColumnNames).map(columnName => (
            <th key={columnName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {columnName}

                <a
                  href="#/"
                  onClick={() => {
                    toggleSortBy(columnName);
                  }}
                >
                  <span className="icon">
                    <i
                      data-cy="SortIcon"
                      className={cn('fas', {
                        'fa-sort': sortBy !== columnName,
                        'fa-sort-up': sortBy === columnName
                          && !isReversed,
                        'fa-sort-down': sortBy === columnName
                          && isReversed,
                      })}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {products.map(({ user, category, ...product }) => (
          <tr data-cy="Product" key={product.id}>
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>

            <td data-cy="ProductName">{product.name}</td>
            <td data-cy="ProductCategory">
              {`${category?.icon} - ${category?.title}`}
            </td>

            <td
              data-cy="ProductUser"
              className={cn({
                'has-text-link': user?.sex === 'm',
                'has-text-danger': user?.sex === 'f',
              })}
            >
              {user?.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
