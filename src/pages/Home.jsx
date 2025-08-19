import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Trophy, Users, BookOpen, Target, Gamepad2, User, Award, Code, Lightbulb, ArrowRight, Star, Clock, CheckCircle } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Layout Desktop Centralizado */}
      <section className="text-center py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Badge e Título Principal */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold border border-primary/20">
              <Gamepad2 className="w-4 h-4" />
              <span className="text-gray-800 dark:text-gray-200 font-semibold">🎮 Plataforma Gamificada de QA</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Bem-vindo ao QAPlay
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Uma plataforma gamificada e gratuita para aprender Quality Assurance de forma prática, 
              divertida e eficiente. Desenvolvida para estudantes e profissionais que querem evoluir na área de QA.
            </p>
          </div>
          
          {/* Botões de Ação Melhorados */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
            <Button size="lg" className="px-6 py-3 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <Link to="/jogos/automation-master">
                <Play className="mr-2 h-5 w-5" />
                Jogar Mestre da Automação
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-6 py-3 text-lg border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300" asChild>
              <Link to="/treinar">
                <Target className="mr-2 h-5 w-5" />
                Treinar
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Layout Principal - Seções Específicas */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Primeira Linha: Criador (Esquerda) + Jogos (Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          
          {/* Seção Sobre o Criador - Esquerda */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 border-blue-200/50 dark:border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-16 h-16 rounded-full overflow-hidden mb-3 ring-3 ring-blue-200/50 dark:ring-blue-500/20">
                <img 
                  src="/nilson-photo.png" 
                  alt="Nilson Brites" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-muted rounded-full flex items-center justify-center" style={{display: 'none'}}>
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <CardTitle className="text-xl text-foreground">Sobre o Criador</CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Conheça quem está por trás do QAPlay
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center space-y-2">
                <h3 className="text-base font-semibold text-foreground">Nilson Brites</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Quality Assurance Engineer apaixonado por ensinar e compartilhar conhecimento. 
                  Especialista em automação de testes e metodologias ágeis, criador do QAPlay.
                </p>
                
                {/* Badges de especialidades */}
                <div className="flex flex-wrap justify-center gap-1.5 pt-1.5">
                  <Badge variant="secondary" className="text-xs">QA Expert</Badge>
                  <Badge variant="secondary" className="text-xs">Mentor</Badge>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300" asChild>
                <Link to="/sobre">
                  <User className="mr-2 h-4 w-4" />
                  Ver Currículo Completo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Seção Jogos - Direita */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-500/10 dark:to-blue-500/10 border-green-200/50 dark:border-green-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <Gamepad2 className="h-7 w-7 text-gray-900 dark:text-white" />
              </div>
              <CardTitle className="text-xl text-foreground">Jogos Interativos</CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Aprenda QA jogando e se divertindo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">QA Quiz com 100+ perguntas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">Mestre da Automação</span>
                </div>
              </div>
              
              <div className="bg-white/50 dark:bg-card/50 p-3 rounded-lg border border-green-200/50 dark:border-green-500/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Jogadores ativos:</span>
                  <span className="font-semibold text-foreground">3.2k+</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Partidas jogadas:</span>
                  <span className="font-semibold text-foreground">15k+</span>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300" asChild>
                <Link to="/jogos">
                  <Play className="mr-2 h-4 w-4" />
                  Começar a Jogar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Segunda Linha: Treinar (Esquerda) + Programar (Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Seção Treinar - Esquerda */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-500/10 dark:to-red-500/10 border-orange-200/50 dark:border-orange-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <Target className="h-7 w-7 text-gray-900 dark:text-white" />
              </div>
              <CardTitle className="text-xl text-foreground">Desafio do Conhecimento QA</CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Prepare-se para certificações e avalie seu nível
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">30 questões em 30 minutos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">Baseado no CTFL 4.0</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">Certificado personalizado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">Compartilhamento no LinkedIn</span>
                </div>
              </div>
              
              <div className="bg-white/50 dark:bg-card/50 p-3 rounded-lg border border-orange-200/50 dark:border-orange-500/20">
                <h4 className="font-semibold text-foreground mb-2">Níveis de Classificação:</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expert:</span>
                    <span className="text-purple-600 font-medium">80-100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avançado:</span>
                    <span className="text-blue-600 font-medium">70-79%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Intermediário:</span>
                    <span className="text-green-600 font-medium">60-69%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Precisa Estudar:</span>
                    <span className="text-red-600 font-medium">&lt; 60%</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all duration-300" asChild>
                <Link to="/treinar">
                  <Target className="mr-2 h-4 w-4" />
                  Iniciar Treinamento
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>


        </div>
      </section>

      {/* Seção de Estatísticas */}
      <section className="bg-muted/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">QAPlay em Números</h2>
            <p className="text-muted-foreground text-lg">
              Veja o impacto da nossa plataforma na comunidade de QA.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <Card className="p-4 bg-card/50 border border-border/50 shadow-sm">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-primary mb-1">4+</div>
                <CardDescription className="text-sm text-muted-foreground">Jogos Interativos</CardDescription>
              </CardContent>
            </Card>
            <Card className="p-4 bg-card/50 border border-border/50 shadow-sm">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-primary mb-1">3.2k+</div>
                <CardDescription className="text-sm text-muted-foreground">Jogadores Ativos</CardDescription>
              </CardContent>
            </Card>
            <Card className="p-4 bg-card/50 border border-border/50 shadow-sm">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-primary mb-1">15k+</div>
                <CardDescription className="text-sm text-muted-foreground">Partidas Jogadas</CardDescription>
              </CardContent>
            </Card>
            <Card className="p-4 bg-card/50 border border-border/50 shadow-sm">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-primary mb-1">4.7/5</div>
                <CardDescription className="text-sm text-muted-foreground">Avaliação Média</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de Chamada para Ação - Blog */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Fique por Dentro das Novidades em QA!</h2>
          <p className="text-lg opacity-90">
            Acompanhe nosso blog para artigos, tutoriais e as últimas tendências em Quality Assurance.
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-4 text-lg text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
            <Link to="/blog">
              <BookOpen className="mr-2 h-5 w-5" />
              Acessar o Blog
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home


