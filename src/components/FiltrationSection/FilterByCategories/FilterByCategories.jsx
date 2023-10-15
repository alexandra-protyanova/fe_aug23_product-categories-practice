import cn from 'classnames';

import categoriesFromServer from '../../../api/categories';

export const FilterByCategories = ({ sortProducts, updateSortProductsKey }) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      href="#/"
      data-cy="AllCategories"
      className={cn('button is-success mr-6', {
        'is-outlined': sortProducts.category.length,
      })}
      onClick={() => updateSortProductsKey('category', [])}
    >
      All
    </a>

    {categoriesFromServer.map(category => (
      <a
        data-cy="Category"
        className={cn('button mr-2 my-1', {
          'is-info': sortProducts.category.includes(category.id),
        })}
        href="#/"
        onClick={() => updateSortProductsKey('category', category.id)}
      >
        {category.title}
      </a>
    ))}
  </div>
);
