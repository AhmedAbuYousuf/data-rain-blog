import logo from '@/assets/logo.png';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="TechBlog" className="w-12 h-12" />
              <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                TechBlog
              </span>
            </div>
          </div>

          {/* Tagline Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Empowering Innovation
            </h3>
            <p className="text-muted-foreground">
              Your trusted source for cutting-edge technology insights, 
              trends, and solutions that drive business forward.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="nav-link text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('latest')}
                className="nav-link text-muted-foreground hover:text-primary transition-colors"
              >
                Latest
              </button>
              <button
                onClick={() => scrollToSection('hot')}
                className="nav-link text-muted-foreground hover:text-primary transition-colors"
              >
                Hot
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2024 TechBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;