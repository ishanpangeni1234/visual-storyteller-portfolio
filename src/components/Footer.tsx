import { useScrollAnimation, useMousePosition } from '@/hooks/useScrollAnimation';

const Footer = () => {
  const { ref, isVisible } = useScrollAnimation();
  const mouse = useMousePosition();

  return (
    <footer className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background elements */}
      <div 
        className="orb w-[600px] h-[600px] bg-accent bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ 
          transform: `translate(calc(-50% + ${mouse.x * 40}px), ${mouse.y * 40}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      
      <div ref={ref} className="relative max-w-4xl mx-auto text-center">
        <div className={`scroll-scale ${isVisible ? 'visible' : ''}`}>
          <h2 className="heading-display text-5xl md:text-7xl mb-6">
            <span className="gradient-text glow-text">Let's Create</span>
            <br />
            <span className="text-foreground">Together</span>
          </h2>
        </div>
        
        <p className={`text-body text-lg text-muted-foreground mb-12 scroll-fade-up stagger-1 ${isVisible ? 'visible' : ''}`}>
          Available for freelance projects and collaborations.
        </p>
        
        <a 
          href="mailto:hello@editor.com" 
          className={`group inline-flex items-center gap-3 px-8 py-4 glass-card-hover rounded-full text-sm tracking-[0.15em] uppercase magnetic-hover scroll-fade-up stagger-2 ${isVisible ? 'visible' : ''}`}
        >
          <span>Get in Touch</span>
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
      
      <div className={`relative text-center mt-24 scroll-fade-up stagger-3 ${isVisible ? 'visible' : ''}`}>
        <p className="text-xs text-muted-foreground tracking-[0.2em]">
          © {new Date().getFullYear()} · CRAFTED WITH PASSION
        </p>
      </div>
    </footer>
  );
};

export default Footer;
