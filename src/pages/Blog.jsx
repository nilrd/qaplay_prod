import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Calendar, Clock, Search, Tag, ArrowRight, BookOpen } from 'lucide-react'
import postsData from "../data/blogPosts.json"

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const posts = postsData;

  const categories = ['all', 'Carreira', 'Técnico', 'Ferramentas', 'Educação']

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = posts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Carreira': return 'bg-blue-100 text-blue-800'
      case 'Técnico': return 'bg-green-100 text-green-800'
      case 'Ferramentas': return 'bg-purple-100 text-purple-800'
      case 'Educação': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Blog QAPlay
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Artigos, tutoriais e insights sobre Quality Assurance, carreira em tecnologia e 
          as últimas tendências da área.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === 'all' ? 'Todas as Categorias' : category}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'all' && !searchTerm && (
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookOpen className="mr-2 h-6 w-6" />
            Artigo em Destaque
          </h2>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="h-48 md:h-full bg-gradient-to-r from-primary/20 to-blue-600/20 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary/50" />
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getCategoryColor(featuredPost.category)}>
                      {featuredPost.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Destaque</span>
                  </div>
                  <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
                    {featuredPost.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <CardDescription className="text-base">
                    {featuredPost.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(featuredPost.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Button asChild>
                      <Link to={`/blog/${featuredPost.id}`}>
                        Ler Artigo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Posts Grid */}
      <section>
        {regularPosts.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-6">
              {searchTerm || selectedCategory !== 'all' ? 'Resultados da Busca' : 'Artigos Recentes'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow group">
                  <div className="h-48 bg-gradient-to-r from-muted to-muted/50 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.date)}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      <Link to={`/blog/${post.id}`}>
                        Ler Mais
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum artigo encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar sua busca ou explorar outras categorias.
            </p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-muted/50 rounded-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Não Perca Nenhum Artigo</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Receba notificações sobre novos artigos, tutoriais e conteúdos exclusivos 
          diretamente no seu email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input placeholder="Seu melhor email" className="flex-1" />
          <Button>Inscrever-se</Button>
        </div>
      </section>
    </div>
  )
}

export default Blog

