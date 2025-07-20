
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import DemoForm from '@/components/DemoForm';
import MatrixRain from '@/components/MatrixRain';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/components/BlogCard';
import { homePosts, latestPosts, hotPosts } from '@/data/blogPosts';

const BlogPage = () => {
  const navigate = useNavigate();
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Show matrix rain on initial load
  useEffect(() => {
    console.log('BlogPage loaded, starting matrix rain...');
    setShowMatrixRain(true);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!showContent) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [showContent]);

  const handlePostClick = (post: BlogPost) => {
    console.log('Blog card clicked, navigating to post...', post.title);
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    navigate(`/blog/${slug}`);
  };

  const handleMatrixComplete = () => {
    console.log('Matrix rain completed, showing content');
    setShowMatrixRain(false);
    setShowContent(true);
  };


  const handleDemoClick = () => {
    setIsDemoFormOpen(true);
  };

  const handleCloseDemoForm = () => {
    setIsDemoFormOpen(false);
  };

  const handleBlogCardClick = (post: BlogPost) => {
    handlePostClick(post);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Matrix Rain Animation on initial load */}
      <MatrixRain isVisible={showMatrixRain} onComplete={handleMatrixComplete} />
      
      {/* Main Content with fade-in */}
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Header onDemoClick={handleDemoClick} />
        
        {/* Hero Section with Overlay Animation */}
        <section id="home" className="relative pt-20 pb-32 overflow-hidden">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10"></div>
          
          {/* Animated Background Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full flex items-center justify-center opacity-30">
              {/* Main animated tech orb as background overlay */}
              <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-96 h-96 rounded-full border-4 border-primary/20 flex items-center justify-center animate-slow-spin">
                <div className="w-80 h-80 rounded-full border-2 border-accent/30 flex items-center justify-center animate-pulse">
                  <div className="w-64 h-64 rounded-full gradient-primary flex items-center justify-center opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <div className="w-48 h-48 rounded-full border border-primary/10 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary/60">TECH</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating tech icons in background */}
                <div className="absolute -top-4 right-12 w-16 h-16 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center animate-bounce shadow-lg">
                  <span className="text-primary/70 font-bold text-lg">AI</span>
                </div>
                <div className="absolute bottom-8 -left-8 w-14 h-14 rounded-full bg-accent/15 border-2 border-accent/30 flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '1s' }}>
                  <span className="text-accent/70 text-xl">⚡</span>
                </div>
                <div className="absolute top-20 -left-6 w-12 h-12 rounded-full bg-electric-blue/20 border-2 border-electric-blue/40 animate-bounce shadow-lg" style={{ animationDelay: '2s' }}>
                  <span className="text-electric-blue/70 text-sm">🚀</span>
                </div>
                <div className="absolute -bottom-6 right-16 w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary/40 animate-bounce shadow-lg" style={{ animationDelay: '1.5s' }}>
                  <span className="text-secondary/70">💡</span>
                </div>
                
                {/* Additional orbit rings */}
                <div className="absolute inset-0 w-full h-full rounded-full border border-primary/5 animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-full border border-accent/5 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
              </div>
              
              {/* Background glow effect */}
              <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-96 h-96 bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
              {/* Left Content - Text with transparency */}
              <div className="animate-on-scroll relative z-20">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-foreground/90">Beyond the Surface:</span>
                  <span className="block gradient-primary bg-clip-text text-transparent opacity-95">
                    Explore, Learn, Grow
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground/80 mb-8 leading-relaxed backdrop-blur-sm">
                  Explore a world of insightful articles, thoughtful discussions, and inspiring stories. 
                  Our blog is dedicated to bringing you fresh perspectives on technology, helping you stay informed and inspired.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-4 bg-background/80 backdrop-blur-sm border-primary/50 hover:bg-background/90"
                    onClick={() => navigate('/blogs')}
                  >
                    Read More
                  </Button>
                </div>
              </div>

              {/* Right side - mostly empty to let background animation show */}
              <div className="animate-on-scroll relative z-10" style={{ animationDelay: '0.3s' }}>
                <div className="relative w-full h-[400px] flex items-center justify-center">
                  {/* Subtle accent elements */}
                  <div className="absolute top-20 left-20 w-6 h-6 rounded-full bg-primary/30 animate-pulse"></div>
                  <div className="absolute bottom-32 right-16 w-8 h-8 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-1/3 w-4 h-4 rounded-full bg-electric-blue/30 animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Featured Posts
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our most popular and insightful articles
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homePosts.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-on-scroll"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <BlogCard post={post} onClick={handleBlogCardClick} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Section */}
        <section id="latest" className="py-16 bg-card/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Latest Posts
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fresh insights and breaking news from the world of technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-on-scroll"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <BlogCard post={post} onClick={handleBlogCardClick} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hot Section */}
        <section id="hot" className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Hot Topics
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The most popular and trending content our readers can't get enough of
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-on-scroll"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <BlogCard post={post} onClick={handleBlogCardClick} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Demo Form */}
      <DemoForm
        isOpen={isDemoFormOpen}
        onClose={handleCloseDemoForm}
      />
    </div>
  );
};

export default BlogPage;
