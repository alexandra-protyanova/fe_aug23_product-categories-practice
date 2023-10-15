export const ResetButton = ({ setSortProducts }) => (
  <div className="panel-block">
    <a
      data-cy="ResetAllButton"
      href="#/"
      className="button is-link is-outlined is-fullwidth"
      onClick={() => setSortProducts({
        user: null,
        searchedProduct: null,
        category: [],
        sortingOptions: {
          sortType: null,
          sortingColumn: null,
        },
      })}
    >
      Reset all filters
    </a>
  </div>
);
