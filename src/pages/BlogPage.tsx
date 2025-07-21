
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
          
          {/* Animated Background Overlay - Full Coverage */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="relative w-full h-full opacity-25">
              {/* Main central tech orb */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-4 border-primary/20 flex items-center justify-center animate-slow-spin">
                <div className="w-[500px] h-[500px] rounded-full border-2 border-accent/30 flex items-center justify-center animate-pulse">
                  <div className="w-[400px] h-[400px] rounded-full gradient-primary flex items-center justify-center opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <div className="w-[300px] h-[300px] rounded-full border border-primary/10 flex items-center justify-center">
                      <div className="w-[200px] h-[200px] rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/60">TECH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner tech orbs */}
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-primary/15 flex items-center justify-center animate-pulse">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary/60 font-bold">AI</span>
                </div>
              </div>
              
              <div className="absolute top-20 right-16 w-28 h-28 rounded-full border-2 border-accent/15 flex items-center justify-center animate-pulse" style={{ animationDelay: '1s' }}>
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent/60 text-2xl">⚡</span>
                </div>
              </div>

              <div className="absolute bottom-16 left-20 w-24 h-24 rounded-full border-2 border-electric-blue/15 flex items-center justify-center animate-pulse" style={{ animationDelay: '2s' }}>
                <div className="w-16 h-16 rounded-full bg-electric-blue/10 flex items-center justify-center">
                  <span className="text-electric-blue/60 text-xl">🚀</span>
                </div>
              </div>

              <div className="absolute bottom-20 right-12 w-26 h-26 rounded-full border-2 border-secondary/15 flex items-center justify-center animate-pulse" style={{ animationDelay: '1.5s' }}>
                <div className="w-18 h-18 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-secondary/60 text-lg">💡</span>
                </div>
              </div>

              {/* Floating particles across the section */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-primary/20 animate-bounce"></div>
              <div className="absolute top-3/4 right-1/3 w-3 h-3 rounded-full bg-accent/20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-electric-blue/20 animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-secondary/20 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Large orbit rings spanning the section */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/5 animate-spin" style={{ animationDuration: '30s' }}></div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-accent/5 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }}></div>
              
              {/* Multiple background glow effects */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-3xl"></div>
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-radial from-accent/10 via-transparent to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-radial from-electric-blue/10 via-transparent to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center justify-center min-h-[70vh] w-full">
              {/* Centered Content */}
              <div className="animate-on-scroll relative z-20 text-center w-full max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-foreground/90">Beyond the Surface:</span>
                  <span className="block gradient-primary bg-clip-text text-transparent opacity-95">
                    Explore, Learn, Grow
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground/80 mb-8 leading-relaxed backdrop-blur-sm max-w-3xl mx-auto">
                  Explore a world of insightful articles, thoughtful discussions, and inspiring stories. 
                  Our blog is dedicated to bringing you fresh perspectives on technology, helping you stay informed and inspired.
                </p>
                <div className="flex justify-center">
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
