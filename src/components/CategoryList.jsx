import React from 'react';
import { CategoryCard } from './CategoryCard';

export const CategoryList = ({ categories }) => (
  categories.map(category => (
    <CategoryCard category={category} key={category.id} />
  )));
