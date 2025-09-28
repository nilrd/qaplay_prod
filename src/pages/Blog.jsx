import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Clock, User, TrendingUp, Tag } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // SEO Meta Tags
  useSEO({
    title: 'Blog QAPlay | Artigos sobre Quality Assurance e Testes de Software',
    description: 'Blog oficial do QAPlay com artigos sobre Quality Assurance, testes de software, automação e metodologias ágeis. Conteúdo técnico e dicas práticas para profissionais de QA.',
    image: '/qa-play-logo.png',
    url: `${window.location.origin}/blog`,
    type: 'website'
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const dummyPosts = [
        {
          slug: 'paradoxo-do-pesticida',
          title: 'O Paradoxo do Pesticida: Por Que Seus Testes Deixam de Encontrar Bugs e Como Resolver',
          date: '2025-01-15',
          author: 'Nilson Brites',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
          preview: 'Você já se deparou com uma situação em que sua suíte de testes de regressão, que antes era tão eficaz, começa a passar repetidamente sem encontrar nenhum novo defeito?',
          excerpt: 'Descubra como o Paradoxo do Pesticida afeta seus testes e aprenda estratégias para manter sua suíte de testes sempre eficaz na detecção de bugs.',
          category: 'Qualidade de Software',
          readTime: '5 min'
        },
        {
          slug: 'scrum-para-qas',
          title: 'Scrum para QAs: 3 Dicas para se Destacar nas Sprints',
          date: '2025-01-10',
          author: 'Nilson Brites',
          thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&crop=center',
          preview: 'Trabalhar como Analista de QA em um time Scrum vai muito além de "encontrar bugs". É sobre ser um parceiro estratégico na entrega de valor.',
          excerpt: 'Aprenda como se destacar como QA em times ágeis com práticas que vão além da detecção de bugs e te tornam um parceiro estratégico.',
          category: 'Metodologias Ágeis',
          readTime: '4 min'
        },
        {
          slug: 'desvendando-tecnicas-teste-guia-pratico',
          title: 'Desvendando as Técnicas de Teste: Guia Prático para QAs na Era Ágil',
          date: '2025-01-28',
          author: 'Nilson Brites',
          thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center',
          preview: 'Em um cenário de desenvolvimento cada vez mais ágil, conhecer e aplicar as técnicas de teste corretas é o diferencial para qualquer QA. Este guia prático explora as metodologias essenciais para garantir a qualidade do software.',
          excerpt: 'Domine as técnicas de teste essenciais: caixa preta, caixa branca, exploratório e performance. Aprenda como integrá-las ao seu fluxo de trabalho ágil e se tornar um QA estratégico.',
          category: 'Técnicas de Teste',
          readTime: '8 min'
        },
        {
          slug: 'testes-api-ferramentas-essenciais',
          title: 'Testes de API: 3 Ferramentas Essenciais que Todo QA Deve Conhecer',
          date: '2025-01-20',
          author: 'Nilson Brites',
          thumbnail: '/images/testes_api.png',
          preview: 'Enquanto a interface do usuário (UI) é o que o cliente vê, a API (Application Programming Interface) é o motor que faz tudo funcionar nos bastidores.',
          excerpt: 'Descubra as 3 ferramentas essenciais para testes de API: Postman, Insomnia e REST-assured. Domine a camada de serviços e aumente seu valor como QA.',
          category: 'Testes de API',
          readTime: '7 min'
        },
        {
          slug: 'certificacao-ctfl-guia-definitivo',
          title: 'Certificação CTFL: O Guia Definitivo para Passar na Prova',
          date: '2025-01-18',
          author: 'Nilson Brites',
          thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
          preview: 'A certificação CTFL (Certified Tester Foundation Level) do ISTQB é, sem dúvida, o cartão de visitas mais reconhecido para um profissional de Qualidade de Software.',
          excerpt: 'Guia completo para passar na certificação CTFL do ISTQB. Aprenda sobre o syllabus, níveis de conhecimento e estratégias de estudo eficazes.',
          category: 'Carreira e Estudos',
          readTime: '8 min'
        },
        {
          slug: 'jira-para-qas-mais-que-bugs',
          title: 'Jira para QAs: Mais do que Apenas Reportar Bugs',
          date: '2025-01-16',
          author: 'Nilson Brites',
          thumbnail: 'https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?w=800&h=600&fit=crop&crop=center',
          preview: 'Para muitos, o Jira é simplesmente a ferramenta onde se "abre, retesta e fecha bugs". No entanto, para um Analista de QA estratégico, o Jira é uma fonte rica de dados.',
          excerpt: 'Aprenda a usar o Jira como uma ferramenta estratégica de qualidade. Crie bug reports perfeitos, monitore métricas e integre com ferramentas de teste.',
          category: 'Dicas de Ferramentas',
          readTime: '6 min'
        }
      ];

      setPosts(dummyPosts);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Categorias únicas para a sidebar
  const categories = [...new Set(posts.map(post => post.category))];

  // Posts populares (simulado - em produção seria baseado em views/cliques)
  const popularPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog do QA
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Artigos, dicas e reflexões sobre o universo da Qualidade de Software, por Nilson Brites
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            {/* Barra de Busca */}
            <section className="mb-8">
              <div className="max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </section>

            {/* Grid de Posts - Design Slim */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                  <div className="relative h-80 rounded-lg overflow-hidden bg-gray-900">
                    {/* Imagem de Fundo */}
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay Escuro */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Conteúdo Sobreposto */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      {/* Tag de Categoria */}
                      <div className="mb-3">
                        <Badge className="bg-primary text-primary-foreground text-xs font-medium">
                          {post.category}
                        </Badge>
                      </div>
                      
                      {/* Título do Post */}
                      <h3 className="text-white text-lg font-bold mb-3 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      
                      {/* Metadados */}
                      <div className="flex items-center gap-3 text-white/80 text-sm">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </section>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg mb-2 text-muted-foreground">
                  Nenhum artigo encontrado.
                </p>
                <p className="text-muted-foreground">
                  Tente ajustar os termos de busca.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Caixa de Busca */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Buscar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    placeholder="Digite sua busca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Categorias */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Categorias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setSearchTerm(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Posts Populares */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Populares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <Link key={post.slug} to={`/blog/${post.slug}`} className="block group">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                            <img 
                              src={post.thumbnail} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium line-clamp-2 mb-1 group-hover:underline">
                              {post.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {new Date(post.date).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;