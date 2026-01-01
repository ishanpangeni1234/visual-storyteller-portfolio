import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="text-center mb-12 px-6">
      <h2 className={`heading-display text-3xl md:text-5xl gradient-text scroll-fade-up ${isVisible ? 'visible' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-body text-muted-foreground mt-4 scroll-fade-up stagger-1 ${isVisible ? 'visible' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
