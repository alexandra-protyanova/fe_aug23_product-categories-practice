import cn from 'classnames';

export const Category = ({
  categoriesFromServer,
  currentCategories,
  setCurrentCategories,
}) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      onClick={() => setCurrentCategories([])}
      href="#/"
      data-cy="AllCategories"
      className={cn(
        'button',
        'is-success',
        'mr-6',
        { 'is-outlined': currentCategories.length !== 0 },
      )
      }
    >
      All
    </a>

    {categoriesFromServer.map(category => (
      <a
        key={category.id}
        onClick={() => setCurrentCategories(
          currentCategories.includes(category.title)
            ? currentCategories.filter(categ => categ !== category.title)
            : [
              ...currentCategories,
              category.title,
            ],
        )}
        data-cy="Category"
        href="#/"
        className={cn(
          'button',
          'mr-2',
          'my-1',
          {
            'is-info': currentCategories.includes(category.title),
          },
        )}
      >
        {category.title}
      </a>
    ))}
  </div>
);
