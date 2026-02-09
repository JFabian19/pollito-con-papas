import React from 'react';
import { MenuCategory } from '../types';

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="sticky top-[60px] z-40 w-full bg-brand-black/95 py-3 backdrop-blur-md border-b border-white/10">
      <div className="flex w-full gap-3 overflow-x-auto px-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.categoria}
            onClick={() => onSelectCategory(cat.categoria)}
            className={`shrink-0 rounded-full border px-4 py-1.5 font-heading text-sm font-bold italic transition-all duration-300
              ${
                activeCategory === cat.categoria
                  ? 'bg-white text-brand-black border-white scale-105'
                  : 'border-white/30 text-white/70 hover:border-brand-primary hover:text-white bg-brand-card/50'
              }
            `}
          >
            {cat.categoria.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
