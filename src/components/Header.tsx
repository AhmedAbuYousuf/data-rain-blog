import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

interface HeaderProps {
  onDemoClick: () => void;
}

const Header = ({ onDemoClick }: HeaderProps) => {
  const [activeNav, setActiveNav] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      // If we're on the home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If we're on another page, navigate to home
      navigate('/');
    }
    setActiveNav('home');
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If on home page, scroll directly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveNav(sectionId);
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
            onClick={handleHomeClick}
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

        {/* Navigation CTA */}
        <Button 
          onClick={() => navigate('/blogs')} 
          variant="outline"
          className="hidden md:block"
        >
          All Blogs
        </Button>
      </div>
    </header>
  );
};

export default Header;