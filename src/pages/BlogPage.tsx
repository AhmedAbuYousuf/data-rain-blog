import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import BlogModal from '@/components/BlogModal';
import DemoForm from '@/components/DemoForm';
import MatrixRain from '@/components/MatrixRain';
import type { BlogPost } from '@/components/BlogCard';
import { homePosts, latestPosts, hotPosts } from '@/data/blogPosts';

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const [showBlackTransition, setShowBlackTransition] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingPost, setPendingPost] = useState<BlogPost | null>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
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
  }, []);

  const handlePostClick = (post: BlogPost) => {
    console.log('Blog card clicked, starting transition...', post.title);
    setPendingPost(post);
    setIsTransitioning(true);
    setShowBlackTransition(true);
    console.log('Black transition started');
    
    // Start Matrix rain after black fade completes
    setTimeout(() => {
      console.log('Starting matrix rain animation');
      setShowMatrixRain(true);
    }, 600);
  };

  const handleMatrixComplete = () => {
    setShowMatrixRain(false);
    setShowBlackTransition(false);
    setIsTransitioning(false);
    setSelectedPost(pendingPost);
    setIsModalOpen(true);
    setPendingPost(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
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
      <Header onDemoClick={handleDemoClick} />
      
      {/* Black Transition Overlay */}
      <div className={`page-transition ${showBlackTransition ? 'active' : ''}`} />
      
      {/* Matrix Rain Animation */}
      <MatrixRain isVisible={showMatrixRain} onComplete={handleMatrixComplete} />
      
      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-primary bg-clip-text text-transparent">
                TechBlog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the latest in technology, innovation, and digital transformation. 
              Stay ahead of the curve with insights from industry leaders.
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

      {/* Blog Modal */}
      <BlogModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Demo Form */}
      <DemoForm
        isOpen={isDemoFormOpen}
        onClose={handleCloseDemoForm}
      />
    </div>
  );
};

export default BlogPage;