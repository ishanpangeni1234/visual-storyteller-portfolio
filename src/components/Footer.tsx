const Footer = () => {
  return (
    <footer className="py-16 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="heading-display text-3xl md:text-4xl mb-4">
          Let's Work Together
        </h2>
        <p className="text-body text-muted-foreground mb-8">
          Available for freelance projects and collaborations.
        </p>
        <a 
          href="mailto:hello@editor.com" 
          className="inline-block text-sm tracking-[0.2em] uppercase border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-300"
        >
          Get in Touch
        </a>
      </div>
      <div className="text-center mt-16">
        <p className="text-xs text-muted-foreground tracking-widest">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
