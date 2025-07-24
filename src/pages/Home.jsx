import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Trophy, Users, BookOpen, Target, Gamepad2, User, Award, Code, Lightbulb, ArrowRight, Star, Clock, CheckCircle } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Layout Desktop Centralizado */}
      <section className="text-center py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Badge e Título Principal */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20">
              <Gamepad2 className="w-4 h-4" />
              <span>🎮 Plataforma Gamificada de QA</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Bem-vindo ao QAPlay
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Uma plataforma gamificada e gratuita para aprender Quality Assurance de forma prática, 
              divertida e eficiente. Desenvolvida para estudantes e profissionais que querem evoluir na área de QA.
            </p>
          </div>
          
          {/* Botões de Ação Melhorados */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <Link to="/jogos">
                <Play className="mr-2 h-5 w-5" />
                Jogar Agora
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300" asChild>
              <Link to="/treinar">
                <Target className="mr-2 h-5 w-5" />
                Treinar
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Layout Principal - Seções Específicas */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Primeira Linha: Criador (Esquerda) + Jogos (Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Seção Sobre o Criador - Esquerda */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 border-blue-200/50 dark:border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-blue-200/50 dark:ring-blue-500/20">
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
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl text-foreground">Sobre o Criador</CardTitle>
              <CardDescription className="text-muted-foreground">
                Conheça quem está por trás do QAPlay
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Nilson Brites</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Quality Assurance Engineer apaixonado por ensinar e compartilhar conhecimento. 
                  Especialista em automação de testes e metodologias ágeis, criador do QAPlay.
                </p>
                
                {/* Badges de especialidades */}
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <Badge variant="secondary" className="text-xs">QA Expert</Badge>
                  <Badge variant="secondary" className="text-xs">CTFL Certified</Badge>
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
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-foreground">Jogos Interativos</CardTitle>
              <CardDescription className="text-muted-foreground">
                Aprenda QA jogando e se divertindo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">QA Quiz com 100+ perguntas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Desafios de Interface Quebrada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Programação e Automação</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Desafios BDD e Gherkin</span>
                </div>
              </div>
              
              <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border border-green-200/50 dark:border-green-500/20">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Seção Treinar - Esquerda */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-500/10 dark:to-red-500/10 border-orange-200/50 dark:border-orange-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-foreground">Modo Treinamento</CardTitle>
              <CardDescription className="text-muted-foreground">
                Prepare-se para certificações e avalie seu nível
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">30 questões em 60 minutos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Baseado no CTFL 4.0</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Certificado personalizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Compartilhamento no LinkedIn</span>
                </div>
              </div>
              
              <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border border-orange-200/50 dark:border-orange-500/20">
                <h4 className="font-semibold text-foreground mb-2">Níveis de Classificação:</h4>
                <div className="space-y-1 text-sm">
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

          {/* Seção Programar - Direita */}
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-500/10 dark:to-indigo-500/10 border-purple-200/50 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Code className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-foreground">Desafios de Programação</CardTitle>
              <CardDescription className="text-muted-foreground">
                Desenvolva habilidades em automação de testes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Lógica de programação aplicada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lightbulb className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Automação de testes práticos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Desafios progressivos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Trophy className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Ranking de desenvolvedores</span>
                </div>
              </div>
              
              <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border border-purple-200/50 dark:border-purple-500/20">
                <h4 className="font-semibold text-foreground mb-2">Tecnologias Abordadas:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs border-purple-300 text-purple-700 dark:border-purple-500 dark:text-purple-300">JavaScript</Badge>
                  <Badge variant="outline" className="text-xs border-purple-300 text-purple-700 dark:border-purple-500 dark:text-purple-300">Python</Badge>
                  <Badge variant="outline" className="text-xs border-purple-300 text-purple-700 dark:border-purple-500 dark:text-purple-300">Selenium</Badge>
                  <Badge variant="outline" className="text-xs border-purple-300 text-purple-700 dark:border-purple-500 dark:text-purple-300">Cypress</Badge>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300" asChild>
                <Link to="/programar">
                  <Code className="mr-2 h-4 w-4" />
                  Começar Desafios
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Seção de Estatísticas */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">QAPlay em Números</h2>
            <p className="text-muted-foreground">Uma comunidade crescente de profissionais de QA</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">Jogos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">3.2k+</div>
              <div className="text-sm text-muted-foreground">Jogadores Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15k+</div>
              <div className="text-sm text-muted-foreground">Partidas Jogadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.7</div>
              <div className="text-sm text-muted-foreground">Avaliação Média</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

