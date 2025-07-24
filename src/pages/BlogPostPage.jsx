import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postsData from '../data/blogPosts.json';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Markdown from 'react-markdown';

const BlogPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = postsData.find(p => p.id === postId);
    setPost(foundPost);
  }, [postId]);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-red-500">Post não encontrado</h1>
        <p className="text-muted-foreground mt-4">O artigo que você está procurando não existe ou foi removido.</p>
        <Button asChild className="mt-6">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Blog
          </Link>
        </Button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button asChild variant="outline" className="mb-6">
        <Link to="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o Blog
        </Link>
      </Button>

      <article className="prose lg:prose-xl dark:prose-invert mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4 text-muted-foreground text-sm mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-8" />
        )}
        <Markdown className="markdown-content">
          {post.content}
        </Markdown>
      </article>
    </div>
  );
};

export default BlogPostPage;


