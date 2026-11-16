export type MainCategory = 'all' | 'women' | 'kids' | 'home';

export type SubCategory =
  | 'all'
  // Women
  | 'western-wear'
  | 'ethnic-wear'
  | 'kurta-sets'
  | 'anarkali'
  | 'designer-suits'
  | 'party-wear'
  // Kids
  | 'kids-wear'
  | 'cardigans'
  | 'kids-towels'
  | 'kids-bedsheets'
  // Home & Living
  | 'towels'
  | 'bedsheets';

export interface Product {
  id: string;
  name: string;
  mainCategory: 'women' | 'kids' | 'home';
  subCategory: SubCategory;
  categoryLabel: string;
  subCategoryLabel: string;
  badge?: string; // e.g. "Handcrafted" | "Pure Linen" | "Pure Cotton" | "New Edition"
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  fabric: string;
  sizes?: string[];
  colors?: string[];
  details?: string[];
}

export interface CategoryCardInfo {
  id: SubCategory;
  mainCategory: MainCategory;
  title: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
}
