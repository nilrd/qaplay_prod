import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Trophy, Clock, Users, Star, BookOpen } from 'lucide-react'
import { useState } from 'react'

const QuizCard = ({ quiz }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Cores padronizadas para todos os quizzes
  const getQuizColors = (quizId) => {
    // Cores unificadas - azul/roxo para todos os quizzes
    const baseColors = {
      primary: 'from-blue-500 to-purple-600',
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: 'text-blue-600'
    }

    // Diferenciação sutil por dificuldade
    switch (quizId) {
      case 'automation-master':
        return {
          ...baseColors,
          badge: 'bg-purple-100 text-purple-800 border-purple-200', // Avançado - roxo
          icon: 'text-purple-600'
        }
      case 'ctfl-100-quiz':
        return {
          ...baseColors,
          badge: 'bg-blue-100 text-blue-800 border-blue-200', // Intermediário - azul
          icon: 'text-blue-600'
        }
      default:
        return baseColors
    }
  }

  const colors = getQuizColors(quiz.id)

  return (
    <Card 
      className={`relative overflow-hidden border-2 transition-all duration-500 flex flex-col h-full group ${
        quiz.status === 'available' 
          ? 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer' 
          : 'opacity-60 cursor-not-allowed'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${quiz.color}`}></div>
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`text-4xl transition-colors duration-300 ${colors.icon}`}>
              {quiz.icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl text-foreground">
                {quiz.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                {quiz.description}
              </CardDescription>
            </div>
          </div>
          <Badge 
            className={`transition-all duration-300 ${colors.badge}`}
          >
            {quiz.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow space-y-4">
        {/* Seção de Tags - Tópicos/Recursos */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span>{quiz.sectionTitle || 'Tópicos abordados'}</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {quiz.features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 group/tag"
              >
                <span className="text-blue-600 group-hover/tag:scale-105 transition-transform duration-150">✓</span>
                <span className="ml-1">{feature}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Metadados compactos na parte inferior */}
        <div className="mt-auto space-y-4">
          {/* Linha de metadados horizontal */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{quiz.estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">{quiz.questions}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium">{quiz.rating}</span>
            </div>
          </div>

          {/* Botão de ação */}
          <div className="pt-2">
            {quiz.status === 'available' ? (
              <Button 
                asChild
                className={`w-full bg-gradient-to-r ${quiz.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                size="lg"
              >
                <Link to={quiz.route}>
                  <Play className="mr-2 h-5 w-5" />
                  Iniciar Desafio
                </Link>
              </Button>
            ) : (
              <Button 
                disabled 
                className="w-full" 
                size="lg"
              >
                <Clock className="mr-2 h-5 w-5" />
                Em Breve
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuizCard
