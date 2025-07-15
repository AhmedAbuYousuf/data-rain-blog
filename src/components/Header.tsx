import { useState } from 'react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

interface HeaderProps {
  onDemoClick: () => void;
}

const Header = ({ onDemoClick }: HeaderProps) => {
  const [activeNav, setActiveNav] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="TechBlog" className="w-10 h-10" />
          <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            TechBlog
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('home')}
            className={`nav-link ${activeNav === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('latest')}
            className={`nav-link ${activeNav === 'latest' ? 'active' : ''}`}
          >
            Latest
          </button>
          <button
            onClick={() => scrollToSection('hot')}
            className={`nav-link ${activeNav === 'hot' ? 'active' : ''}`}
          >
            Hot
          </button>
        </nav>

        {/* Demo Button */}
        <Button onClick={onDemoClick} variant="demo">
          Book a Demo
        </Button>
      </div>
    </header>
  );
};

export default Header;