const Header = () => {
  return (
    <header className="pt-16 md:pt-24 pb-8 md:pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 opacity-0 animate-fade-up font-body">
          Video Editor
        </p>
        <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
          Selected Works
        </h1>
        <p className="text-body text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
          A curated collection of video editing projects spanning various styles and narratives.
        </p>
      </div>
    </header>
  );
};

export default Header;
