import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Em um ambiente real, você faria uma requisição para buscar os posts
    // Por enquanto, vamos simular com dados estáticos ou carregar de um JSON
    const fetchPosts = async () => {
      // Simular carregamento de posts de arquivos markdown
      // No ambiente de desenvolvimento, você pode usar require.context ou similar
      // Para produção, os posts seriam pré-processados ou carregados via API
      const dummyPosts = [
        {
          slug: 'primeiro-post',
          title: 'Meu Primeiro Post no Blog',
          date: '2025-07-20',
          author: 'Nilson da Silva Brites',
          thumbnail: '/images/blog/post1.jpg',
          preview: 'Este é o preview do meu primeiro post. Ele fala sobre as novidades do QAPlay e como estamos evoluindo. Fique ligado para mais conteúdos em breve!',
        },
        {
          slug: 'dicas-de-qa',
          title: 'Dicas Essenciais para Testadores de Software',
          date: '2025-07-25',
          author: 'Nilson da Silva Brites',
          thumbnail: '/images/blog/post2.jpg',
          preview: 'Descubra as melhores práticas e ferramentas para se tornar um testador de software de elite. Abordamos desde testes funcionais até automação.',
        },
        {
          slug: 'automacao-com-cypress',
          title: 'Introdução à Automação de Testes com Cypress',
          date: '2025-07-30',
          author: 'Nilson da Silva Brites',
          thumbnail: '/images/blog/post3.jpg',
          preview: 'Aprenda os fundamentos do Cypress para automatizar seus testes de interface. Um guia completo para iniciantes e dicas avançadas.',
        },
      ];
      setPosts(dummyPosts);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Blog QAPlay</h1>
      
      <div className="max-w-xl mx-auto mb-8 flex space-x-2">
        <Input
          type="text"
          placeholder="Buscar posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button><Search className="h-4 w-4 mr-2" />Buscar</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Card key={post.slug} className="overflow-hidden">
              <Link to={`/blog/${post.slug}`}>
                {post.thumbnail && (
                  <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover" />
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-semibold hover:text-primary transition-colors duration-200">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">Por {post.author} em {post.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{post.preview}...</p>
                </CardContent>
              </Link>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">Nenhum post encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;


