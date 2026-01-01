import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <nav 
      ref={ref}
      className="sticky top-0 z-50 py-6 md:py-8 backdrop-blur-xl bg-background/60 border-b border-border/50"
    >
      <div className={`flex flex-wrap justify-center gap-3 md:gap-4 px-4 scroll-fade-up ${isVisible ? 'visible' : ''}`}>
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`category-btn magnetic-hover stagger-${index + 1} ${activeCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default CategoryFilter;
