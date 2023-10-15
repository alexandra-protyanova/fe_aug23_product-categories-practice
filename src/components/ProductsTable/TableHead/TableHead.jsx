import cn from 'classnames';

import { SORT_TYPE } from '../../../variables';

export const TableHead = ({
  sortOption,
  sortProducts,
  updateSortProductsKey,
}) => (
  <th>
    <span className="is-flex is-flex-wrap-nowrap">
      {sortOption.name}

      <a
        href="#/"
        onClick={() => updateSortProductsKey(
          'sortingOptions', sortOption.name,
        )}
      >
        <span className="icon">
          <i
            data-cy="SortIcon"
            className={cn('fas', {
              'fa-sort': sortProducts
                .sortingOptions.sortType === null
                || sortProducts.sortingOptions
                  .sortingColumn !== sortOption.name,
              'fa-sort-up': sortProducts
                .sortingOptions.sortType === SORT_TYPE.UP
                && sortProducts.sortingOptions
                  .sortingColumn === sortOption.name,
              'fa-sort-down': sortProducts
                .sortingOptions.sortType === SORT_TYPE.DOWN
                && sortProducts.sortingOptions
                  .sortingColumn === sortOption.name,
            })}
          />
        </span>
      </a>
    </span>
  </th>
);
