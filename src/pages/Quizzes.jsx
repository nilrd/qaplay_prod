import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Target } from 'lucide-react'
import QuizCard from '@/components/QuizCard'

const Quizzes = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const quizzes = [
    {
      id: 'ctfl-100-quiz',
      title: 'Desafio do Conhecimento QA - CTFL 4.0',
      description: 'Valide sua base de conhecimento em Quality Assurance. Este desafio é alinhado com o syllabus oficial e é o primeiro passo para provar sua maestria nos fundamentos.',
      icon: '🎯',
      difficulty: 'Intermediário',
      estimatedTime: '30-40 min',
      questions: '200+ Questões',
      rating: 4.8,
      status: 'available',
      color: 'from-blue-500 to-purple-600', // Padronizado
      sectionTitle: 'Recursos do Desafio',
      features: [
        'Baseado no syllabus CTFL 4.0',
        'Banco com 200+ questões',
        'Feedback detalhado por questão',
        'Certificado personalizado ao concluir'
      ],
      route: '/jogos/ctfl-100-quiz'
    },
    {
      id: 'automation-master',
      title: 'Mestre da Automação',
      description: 'Codificar é apenas o começo. Este desafio testa sua habilidade de criar automações robustas, manuteníveis e eficientes com as principais ferramentas do mercado.',
      icon: '⚙️',
      difficulty: 'Avançado',
      estimatedTime: '20-30 min',
      questions: '100 Questões', // Corrigido de 20 para 100
      rating: 4.9,
      status: 'available',
      color: 'from-blue-500 to-purple-600', // Padronizado
      sectionTitle: 'Tópicos Abordados',
      features: [
        'Selenium',
        'Playwright',
        'Cypress',
        'Padrões (POM, BDD)',
        'Boas Práticas de Automação',
        'Java',
        'JavaScript'
      ],
      route: '/jogos/automation-master'
    }
  ]

  const difficulties = ['all', 'Intermediário', 'Avançado']

  const filteredQuizzes = selectedDifficulty === 'all' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.difficulty === selectedDifficulty)

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Desafios de Conhecimento QA
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Valide sua expertise com desafios práticos de Quality Assurance. Encare cenários reais, 
            meça seu conhecimento e destaque-se no mercado.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-6 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                onClick={() => setSelectedDifficulty(difficulty)}
                className="capitalize transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                {difficulty === 'all' ? 'Todos os Níveis' : difficulty}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Quizzes Grid */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredQuizzes.map((quiz) => (
              <div 
                key={quiz.id} 
                className="transition-all duration-500 ease-in-out transform"
              >
                <QuizCard quiz={quiz} />
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Pronto para o Desafio?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Escolha um dos quizzes acima e teste seus conhecimentos em Quality Assurance. 
                  Cada desafio foi cuidadosamente elaborado para proporcionar uma experiência de aprendizado única.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-xl transition-all duration-300">
                    <Link to="/sobre">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Conheça o Criador
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                    <Link to="/blog">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Leia o Blog
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Quizzes
