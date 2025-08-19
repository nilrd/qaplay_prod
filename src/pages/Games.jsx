import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Trophy, Clock, Users, Star } from 'lucide-react'

const Games = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const games = [




    {
      id: 'automation-master',
      title: 'Mestre da Automação',
      description: 'Teste seus conhecimentos sobre automação de testes, frameworks e boas práticas.',
      icon: '⚙️',
      difficulty: 'Avançado',
      estimatedTime: '20-30 min',
      players: '10+',
      rating: 4.9,
      status: 'available',
      color: 'from-blue-500 to-purple-600'
    },
  ]

  const difficulties = ['all', 'Iniciante', 'Intermediário', 'Avançado']

  const filteredGames = selectedDifficulty === 'all' 
    ? games 
    : games.filter(game => game.difficulty === selectedDifficulty)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800'
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800'
      case 'Avançado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Jogos QAPlay
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Aprenda Quality Assurance através de jogos interativos e divertidos. 
          Escolha seu nível e comece a jogar agora mesmo!
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{games.length}</div>
            <p className="text-sm text-muted-foreground">Jogos Disponíveis</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">3.2k+</div>
            <p className="text-sm text-muted-foreground">Jogadores Ativos</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">15k+</div>
            <p className="text-sm text-muted-foreground">Partidas Jogadas</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">4.7</div>
            <p className="text-sm text-muted-foreground">Avaliação Média</p>
          </CardContent>
        </Card>
      </section>

      {/* Filters */}
      <section className="flex flex-wrap gap-2 justify-center">
        {difficulties.map((difficulty) => (
          <Button
            key={difficulty}
            variant={selectedDifficulty === difficulty ? "default" : "outline"}
            onClick={() => setSelectedDifficulty(difficulty)}
            className="capitalize"
          >
            {difficulty === 'all' ? 'Todos os Níveis' : difficulty}
          </Button>
        ))}
      </section>

      {/* Games Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGames.map((game) => (
          <Card key={game.id} className="hover:shadow-lg transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${game.color} flex items-center justify-center text-2xl`}>
                    {game.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {game.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {game.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="text-base">
                {game.description}
              </CardDescription>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {game.estimatedTime}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {game.players} jogadores
                </div>
              </div>
              
              <Button 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                size="lg"
                disabled={game.status !== 'available'}
                asChild={game.id === 'intelligent-quiz' || game.id === 'qa-quiz' || game.id === 'programming-challenge' || game.id === 'bdd-challenge' || game.id === 'logic-programming' || game.id === 'automation-master'}
              >
                {game.id === 'intelligent-quiz' ? (
                  <Link to="/jogos/intelligent-quiz">
                    <Play className="mr-2 h-4 w-4" />
                    Jogar Agora
                  </Link>
                ) : game.id === 'qa-quiz' ? (
                  <Link to="/jogos/quiz">
                    <Play className="mr-2 h-4 w-4" />
                    Jogar Agora
                  </Link>
                ) : game.id === 'programming-challenge' ? (
                  <Link to="/jogos/programming-challenge">
                    <Play className="mr-2 h-4 w-4" />
                    Jogar Agora
                  </Link>
                ) : game.id === 'bdd-challenge' ? (
                  <Link to="/jogos/bdd-challenge">
                    <Play className="mr-2 h-4 w-4" />
                    Jogar Agora
                  </Link>
                ) : game.id === 'logic-programming' ? (
                  <Link to="/jogos/logic-programming">
                    <Play className="mr-2 h-4 w-4" />
                    Jogar Agora
                  </Link>
                ) : game.id === 'automation-master' ? (
                  <Link to="/jogos/automation-master">
                    <Play className="mr-2 h-4 w-4" />
                    Jogar Agora
                  </Link>
                ) : null}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>


    </div>
  )
}

export default Games


