
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
                    className="btn-demo text-lg px-8 py-4"
                    onClick={() => setIsDemoFormOpen(true)}
                  >
                    Get Started Today
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-4"
                    onClick={() => document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Read More
                  </Button>
                </div>
              </div>

              {/* Right Content - Globe/Tech Visual */}
              <div className="animate-on-scroll relative" style={{ animationDelay: '0.3s' }}>
                <div className="relative w-full h-96 flex items-center justify-center">
                  {/* Animated tech orb */}
                  <div className="relative w-80 h-80 rounded-full border-4 border-primary/30 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full border-2 border-accent/40 flex items-center justify-center animate-pulse">
                      <div className="w-48 h-48 rounded-full gradient-primary flex items-center justify-center opacity-20"></div>
                    </div>
                    {/* Floating tech icons */}
                    <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center animate-bounce">
                      <span className="text-primary font-bold">AI</span>
                    </div>
                    <div className="absolute bottom-12 left-6 w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center" style={{ animationDelay: '1s' }}>
                      <span className="text-accent text-sm">⚡</span>
                    </div>
                    <div className="absolute top-16 left-16 w-8 h-8 rounded-full bg-electric-blue/20 border border-electric-blue/40" style={{ animationDelay: '2s' }}></div>
                  </div>
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
