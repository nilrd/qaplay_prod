import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Gamepad2, Trophy, Users, BookOpen, Play, ArrowRight } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Gamepad2,
      title: 'Jogos Interativos',
      description: 'Aprenda QA através de jogos divertidos e desafiadores'
    },
    {
      icon: Trophy,
      title: 'Sistema de Pontuação',
      description: 'Acompanhe seu progresso e conquiste novos níveis'
    },
    {
      icon: Users,
      title: '100% Gratuito',
      description: 'Acesso completo sem necessidade de cadastro ou pagamento'
    },
    {
      icon: BookOpen,
      title: 'Conteúdo Educativo',
      description: 'Baseado em conceitos reais e práticas da indústria'
    }
  ]

  const games = [
    {
      title: 'QA Quiz',
      description: 'Teste seus conhecimentos com perguntas de múltipla escolha',
      difficulty: 'Iniciante',
      icon: '🧠'
    },
    {
      title: 'Interface Quebrada',
      description: 'Identifique erros reais de interface, fluxo e funcionalidade em mini aplicações web.',
      difficulty: 'Intermediário',
      icon: '⚙️'
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Aprenda QA Jogando
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Domine Quality Assurance através de jogos interativos e divertidos. 
            Uma plataforma gratuita para aprender testes de software na prática.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 hover:shadow-lg transition-all duration-300">
            <Link to="/jogos">
              <Play className="mr-2 h-5 w-5" />
              Começar a Jogar
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300">
            <Link to="/sobre">
              Saiba Mais
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Por que escolher o QAPlay?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma abordagem inovadora para aprender Quality Assurance de forma prática e envolvente
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Games Preview Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Jogos Disponíveis</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nossa coleção de jogos educativos desenvolvidos especificamente para ensinar QA
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{game.icon}</span>
                  <div>
                    <CardTitle className="text-xl">{game.title}</CardTitle>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {game.difficulty}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{game.description}</CardDescription>
                <Button asChild className="w-full hover:shadow-lg transition-all duration-300">
                  <Link to="/jogos">
                    Jogar Agora
                    <Play className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 rounded-lg p-8 text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Pronto para começar?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Junte-se a milhares de pessoas que já estão aprendendo QA de forma divertida e eficaz
          </p>
        </div>
        
        <Button asChild size="lg" className="text-lg px-8 hover:shadow-lg transition-all duration-300">
          <Link to="/jogos">
            <Gamepad2 className="mr-2 h-5 w-5" />
            Começar Agora - É Grátis!
          </Link>
        </Button>
      </section>
    </div>
  )
}

export default Home

