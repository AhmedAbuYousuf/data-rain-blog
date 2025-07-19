import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DemoForm from '@/components/DemoForm';
import { useState } from 'react';
import { homePosts, latestPosts, hotPosts } from '@/data/blogPosts';
import type { BlogPost as BlogPostType } from '@/components/BlogCard';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);

  // Find the blog post by slug (using title as slug for now)
  const allPosts = [...homePosts, ...latestPosts, ...hotPosts];
  const post = allPosts.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header onDemoClick={() => setIsDemoFormOpen(true)} />
        <div className="pt-20 container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Button onClick={() => navigate('/')} variant="default">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
        <Footer />
        <DemoForm isOpen={isDemoFormOpen} onClose={() => setIsDemoFormOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onDemoClick={() => setIsDemoFormOpen(true)} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="container mx-auto px-6 py-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <div className="text-foreground leading-relaxed space-y-6">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <DemoForm isOpen={isDemoFormOpen} onClose={() => setIsDemoFormOpen(false)} />
    </div>
  );
};

export default BlogPost;