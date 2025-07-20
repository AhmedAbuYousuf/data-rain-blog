import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import type { BlogPost } from '@/components/BlogCard';
import { homePosts, latestPosts, hotPosts } from '@/data/blogPosts';

const AllBlogs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Combine all blog posts
  const allPosts = [...homePosts, ...latestPosts, ...hotPosts];

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allPosts.map(post => post.category)));
    return uniqueCategories;
  }, [allPosts]);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allPosts, searchTerm, selectedCategory]);

  const handlePostClick = (post: BlogPost) => {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    navigate(`/blog/${slug}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onDemoClick={() => {}} />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-primary/10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                All Blog Posts
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our complete collection of insights, tutorials, and thought leadership articles
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search blog posts by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Clear Filters Button */}
                {(searchTerm || selectedCategory) && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Category Filter Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <div className="flex items-center gap-2 mr-4">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filter by category:</span>
                </div>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Results Count */}
              <div className="text-center mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredPosts.length} of {allPosts.length} blog posts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="animate-on-scroll"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <BlogCard post={post} onClick={handlePostClick} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">No posts found</h3>
                <p className="text-muted-foreground mb-8">
                  Try adjusting your search criteria or browse all posts
                </p>
                <Button onClick={clearFilters}>
                  View All Posts
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AllBlogs;