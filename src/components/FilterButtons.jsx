import categoriesFromServer from '../api/categories';

export const FilterButtons = (
  {
    setVisibleProducts,
    currentButton,
    setCurrentButton,
    products,
    isSelected,
    filterByCategory,
  },
) => (
  <>
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className="button is-success mr-6 is-outlined"
        onClick={() => setVisibleProducts([...products])}
      >
        All
      </a>

      {categoriesFromServer.map(category => (
        <a
          data-cy="Category"
          className={`button mr-2 my-1 ${isSelected(currentButton, category.title) && ' is-info'}`}
          href="#/"
          key={category.id}
          onClick={() => {
            setVisibleProducts(filterByCategory(category.title));
            setCurrentButton(category.title);
          }
          }
        >
          {category.title}
        </a>
      ))}
    </div>
    <div className="panel-block">
      <a
        data-cy="ResetAllButton"
        href="#/"
        className="button is-link is-outlined is-fullwidth"
        onClick={() => setVisibleProducts([...products])}
      >
        Reset all filters
      </a>
    </div>
  </>
);
