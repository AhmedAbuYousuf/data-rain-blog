
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
        
        {/* Hero Section - Inspired by techstringit.com */}
        <section id="home" className="relative pt-20 pb-32 overflow-hidden">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
              {/* Left Content */}
              <div className="animate-on-scroll">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Beyond the Surface:
                  <span className="block gradient-primary bg-clip-text text-transparent">
                    Explore, Learn, Grow
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                  Explore a world of insightful articles, thoughtful discussions, and inspiring stories. 
                  Our blog is dedicated to bringing you fresh perspectives on technology, helping you stay informed and inspired.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-4"
                    onClick={() => navigate('/blogs')}
                  >
                    Read More
                  </Button>
                </div>
              </div>

              {/* Right Content - Enhanced Tech Visual */}
              <div className="animate-on-scroll relative" style={{ animationDelay: '0.3s' }}>
                <div className="relative w-full h-[500px] flex items-center justify-center">
                  {/* Main animated tech orb - significantly larger */}
                  <div className="relative w-96 h-96 rounded-full border-4 border-primary/30 flex items-center justify-center animate-slow-spin">
                    <div className="w-80 h-80 rounded-full border-2 border-accent/40 flex items-center justify-center animate-pulse">
                      <div className="w-64 h-64 rounded-full gradient-primary flex items-center justify-center opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}>
                        <div className="w-48 h-48 rounded-full border border-primary/20 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">TECH</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced floating tech icons with better positioning */}
                    <div className="absolute -top-4 right-12 w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center animate-bounce shadow-lg">
                      <span className="text-primary font-bold text-lg">AI</span>
                    </div>
                    <div className="absolute bottom-8 -left-8 w-14 h-14 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '1s' }}>
                      <span className="text-accent text-xl">⚡</span>
                    </div>
                    <div className="absolute top-20 -left-6 w-12 h-12 rounded-full bg-electric-blue/30 border-2 border-electric-blue/50 animate-bounce shadow-lg" style={{ animationDelay: '2s' }}>
                      <span className="text-electric-blue text-sm">🚀</span>
                    </div>
                    <div className="absolute -bottom-6 right-16 w-12 h-12 rounded-full bg-secondary/30 border-2 border-secondary/50 animate-bounce shadow-lg" style={{ animationDelay: '1.5s' }}>
                      <span className="text-secondary">💡</span>
                    </div>
                    
                    {/* Additional orbit rings */}
                    <div className="absolute inset-0 w-full h-full rounded-full border border-primary/10 animate-spin" style={{ animationDuration: '20s' }}></div>
                    <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-full border border-accent/10 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                  </div>
                  
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-xl"></div>
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
