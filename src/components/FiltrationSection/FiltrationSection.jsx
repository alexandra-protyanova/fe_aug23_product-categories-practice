import { FilterByUsers } from './FilterByUsers/FilterByUsers';
import { SearchByProduct } from './SearchByProduct/SearchByProduct';
import { FilterByCategories } from './FilterByCategories/FilterByCategories';
import { ResetButton } from './ResetButton/ResetButton';

export const FiltrationSection = ({
  sortProducts,
  updateSortProductsKey,
  setSortProducts,
}) => (
  <div className="block">
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterByUsers
        sortProducts={sortProducts}
        updateSortProductsKey={updateSortProductsKey}
      />

      <SearchByProduct
        sortProducts={sortProducts}
        updateSortProductsKey={updateSortProductsKey}
      />

      <FilterByCategories
        sortProducts={sortProducts}
        updateSortProductsKey={updateSortProductsKey}
      />

      <ResetButton setSortProducts={setSortProducts} />
    </nav>
  </div>
);
