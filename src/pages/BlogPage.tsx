
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
    console.log('Blog card clicked, opening modal...', post.title);
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleMatrixComplete = () => {
    console.log('Matrix rain completed, showing content');
    setShowMatrixRain(false);
    setShowContent(true);
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
      {/* Matrix Rain Animation on initial load */}
      <MatrixRain isVisible={showMatrixRain} onComplete={handleMatrixComplete} />
      
      {/* Main Content with fade-in */}
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Header onDemoClick={handleDemoClick} />
        
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
      </div>

      {/* Blog Modal with simple fade transition */}
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
