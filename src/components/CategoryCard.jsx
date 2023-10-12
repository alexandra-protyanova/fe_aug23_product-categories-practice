import React from 'react';
import { ProductItem } from './ProductItem';

export const CategoryCard = ({ category }) => (
  <div className="ui card">
    <div className="ui content">
      <div className="ui description">
        <p>
          {`${category.title} - ${category.owner.name}`}
        </p>
        {category.products.length !== 0 ? (
          <ul className="ui list">
            {category.products.map(product => (
              <ProductItem product={product} key={product.id} />
            ))}
          </ul>
        ) : (
          <b>No products</b>
        )}
      </div>
    </div>
  </div>
);
