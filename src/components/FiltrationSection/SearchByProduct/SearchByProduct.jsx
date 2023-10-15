export const SearchByProduct = ({ sortProducts, updateSortProductsKey }) => (
  <div className="panel-block">
    <p className="control has-icons-left has-icons-right">
      <input
        data-cy="SearchField"
        type="text"
        className="input"
        placeholder="Search"
        value={sortProducts.searchedProduct || ''}
        onChange={event => updateSortProductsKey(
          'searchedProduct', event.currentTarget.value,
        )}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>

      <span className="icon is-right">
        {sortProducts.searchedProduct && (
          <button
            data-cy="ClearButton"
            id="ClearButton"
            type="button"
            className="delete"
            onClick={() => {
              updateSortProductsKey('searchedProduct', null);
            }}
          />
        )}
      </span>
    </p>
  </div>
);
