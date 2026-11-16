import React from 'react';
import { MainCategory, SubCategory } from '../types/store';

interface CategoryNavProps {
  activeMainCategory: MainCategory;
  activeSubCategory: SubCategory;
  onSelectMainCategory: (main: MainCategory) => void;
  onSelectSubCategory: (sub: SubCategory) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeMainCategory,
  activeSubCategory,
  onSelectMainCategory,
  onSelectSubCategory,
}) => {
  const mainCategories: { id: MainCategory; label: string }[] = [
    { id: 'all', label: 'All Collections' },
    { id: 'women', label: 'Women' },
    { id: 'kids', label: 'Kids' },
    { id: 'home', label: 'Home & Living' },
  ];

  const subCategoriesByMain: Record<MainCategory, { id: SubCategory; label: string }[]> = {
    all: [
      { id: 'all', label: 'All Items' },
      { id: 'western-wear', label: 'Western Wear' },
      { id: 'ethnic-wear', label: 'Ethnic Wear' },
      { id: 'kurta-sets', label: 'Kurta Sets' },
      { id: 'anarkali', label: 'Anarkali' },
      { id: 'designer-suits', label: 'Designer Suits' },
      { id: 'party-wear', label: 'Party Wear' },
      { id: 'kids-wear', label: 'Kids Wear' },
      { id: 'cardigans', label: 'Cardigans' },
      { id: 'towels', label: 'Towels' },
      { id: 'bedsheets', label: 'Bedsheets' },
    ],
    women: [
      { id: 'all', label: 'All Women' },
      { id: 'western-wear', label: 'Western Wear' },
      { id: 'ethnic-wear', label: 'Ethnic Wear' },
      { id: 'kurta-sets', label: 'Kurta Sets' },
      { id: 'anarkali', label: 'Anarkali' },
      { id: 'designer-suits', label: 'Designer Suits' },
      { id: 'party-wear', label: 'Party Wear' },
    ],
    kids: [
      { id: 'all', label: 'All Kids' },
      { id: 'kids-wear', label: 'Kids Wear' },
      { id: 'cardigans', label: 'Cardigans' },
      { id: 'kids-towels', label: 'Towels' },
      { id: 'kids-bedsheets', label: 'Bedsheets' },
    ],
    home: [
      { id: 'all', label: 'All Home & Living' },
      { id: 'towels', label: 'Towels' },
      { id: 'bedsheets', label: 'Bedsheets' },
    ],
  };

  const currentSubList = subCategoriesByMain[activeMainCategory] || subCategoriesByMain.all;

  return (
    <div className="w-full bg-white border-y border-warm-200/80 py-4 px-4 sticky top-[73px] sm:top-[77px] z-30 shadow-sm backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Level 1: Main Category Segmented Bar */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar space-x-2 pb-1 sm:pb-0">
          {mainCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectMainCategory(cat.id);
                onSelectSubCategory('all');
              }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all whitespace-nowrap ${
                activeMainCategory === cat.id
                  ? 'bg-warm-900 text-cream-50 font-semibold shadow-sm'
                  : 'bg-cream-100 text-warm-700 hover:bg-cream-200 hover:text-warm-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Level 2: Subcategory Quick Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar space-x-1.5 pt-1">
          {currentSubList.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSelectSubCategory(sub.id)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-sans tracking-wide transition-all whitespace-nowrap border ${
                activeSubCategory === sub.id
                  ? 'bg-blush-100 border-blush-300 text-blush-700 font-medium shadow-xs'
                  : 'bg-white border-warm-200 text-warm-600 hover:border-warm-300 hover:text-warm-900'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
