import { useScrollAnimation, useParallax, useMousePosition } from '@/hooks/useScrollAnimation';

const Header = () => {
  const { ref, isVisible } = useScrollAnimation();
  const scrollY = useParallax();
  const mouse = useMousePosition();

  return (
    <header className="relative pt-32 md:pt-48 pb-16 md:pb-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Animated background orbs */}
      <div 
        className="orb w-[500px] h-[500px] bg-accent -top-64 -left-32 pointer-events-none"
        style={{ 
          transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="orb w-[400px] h-[400px] bg-[hsl(200,100%,60%)] -top-32 right-0 pointer-events-none"
        style={{ 
          animationDelay: '-5s',
          transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      
      <div 
        ref={ref}
        className="relative max-w-5xl mx-auto text-center"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className={`scroll-fade-up ${isVisible ? 'visible' : ''}`}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs tracking-[0.3em] uppercase text-muted-foreground glass-card rounded-full">
            Video Editor
          </span>
        </div>
        
        <h1 
          className={`heading-display text-6xl md:text-8xl lg:text-9xl mb-8 scroll-fade-up stagger-1 ${isVisible ? 'visible' : ''}`}
        >
          <span className="gradient-text glow-text">Selected</span>
          <br />
          <span className="text-foreground">Works</span>
        </h1>
        
        <p 
          className={`text-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto scroll-fade-up stagger-2 ${isVisible ? 'visible' : ''}`}
        >
          A curated collection of video editing projects spanning various styles and narratives.
        </p>

        {/* Scroll indicator */}
        <div className={`mt-16 scroll-fade-up stagger-3 ${isVisible ? 'visible' : ''}`}>
          <div className="w-6 h-10 mx-auto rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 bg-accent rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
