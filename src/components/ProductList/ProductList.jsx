import { Product } from '../Product/Product';

export const ProductList = ({ productList }) => (
  productList.map(product => <Product product={product} key={product.id} />)
);
