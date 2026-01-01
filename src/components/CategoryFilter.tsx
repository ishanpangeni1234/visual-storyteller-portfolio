interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <nav className="flex flex-wrap justify-center gap-6 md:gap-10 py-8 md:py-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`category-btn ${activeCategory === category ? 'active' : ''}`}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default CategoryFilter;
