import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Clock } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  views: number;
  readTime: string;
  content: string;
  author: string;
  publishedAt: string;
}

interface BlogCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

const BlogCard = ({ post, onClick }: BlogCardProps) => {
  return (
    <Card 
      className="blog-card cursor-pointer overflow-hidden border-border hover:border-primary/50"
      onClick={() => onClick(post)}
    >
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {post.category}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-foreground">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <span>{post.publishedAt}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;