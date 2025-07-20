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
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Company Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="TechBlog" className="w-12 h-12" />
              <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                TechBlog
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Your trusted source for cutting-edge technology insights, trends, and solutions 
              that drive business forward. Stay ahead of the curve with expert analysis and 
              innovative perspectives.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <span className="text-primary text-sm">📧</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <span className="text-primary text-sm">💼</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <span className="text-primary text-sm">🐦</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('latest')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Latest Posts
              </button>
              <button
                onClick={() => scrollToSection('hot')}
                className="text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Hot Topics
              </button>
              <a
                href="/blogs"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                All Blogs
              </a>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-foreground">
              Categories
            </h3>
            <nav className="flex flex-col space-y-3">
              <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Featured
              </span>
              <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Latest
              </span>
              <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Hot Topics
              </span>
              <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Technology Trends
              </span>
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