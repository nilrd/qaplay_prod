import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Target, 
  CheckCircle, 
  Clock, 
  Trophy,
  FileText,
  Bug,
  Settings,
  Zap,
  Shield,
  BarChart3,
  Users,
  Lightbulb
} from 'lucide-react'

const TrainContent = () => {
  const [completedExercises, setCompletedExercises] = useState(new Set())
  const [selectedCategory, setSelectedCategory] = useState('fundamentos')

  const exerciseCategories = [
    {
      id: 'fundamentos',
      name: 'Fundamentos',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-800',
      description: 'Conceitos básicos de QA e testes de software'
    },
    {
      id: 'planejamento',
      name: 'Planejamento',
      icon: Target,
      color: 'bg-green-100 text-green-800',
      description: 'Estratégias e planos de teste'
    },
    {
      id: 'modelagem',
      name: 'Modelagem',
      icon: FileText,
      color: 'bg-purple-100 text-purple-800',
      description: 'Técnicas de design de teste'
    },
    {
      id: 'execucao',
      name: 'Execução',
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-800',
      description: 'Práticas de execução de testes'
    },
    {
      id: 'automacao',
      name: 'Automação',
      icon: Settings,
      color: 'bg-indigo-100 text-indigo-800',
      description: 'Ferramentas e scripts de automação'
    },
    {
      id: 'gerenciamento',
      name: 'Gerenciamento',
      icon: Users,
      color: 'bg-pink-100 text-pink-800',
      description: 'Liderança e coordenação de equipes'
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-800',
      description: 'Testes de carga e stress'
    },
    {
      id: 'seguranca',
      name: 'Segurança',
      icon: Shield,
      color: 'bg-red-100 text-red-800',
      description: 'Testes de vulnerabilidade'
    }
  ]

  const exercises = {
    fundamentos: [
      {
        id: 'fund-001',
        title: 'Identificação de Defeitos vs Falhas',
        description: 'Analise cenários e classifique como defeito, erro ou falha',
        difficulty: 'Iniciante',
        estimatedTime: '15 min',
        points: 10,
        scenario: 'Um usuário tenta fazer login com credenciais válidas, mas o sistema retorna "Usuário não encontrado". Após investigação, descobriu-se que o desenvolvedor digitou incorretamente uma condição no código de autenticação.',
        question: 'Identifique e explique os três elementos presentes neste cenário: erro, defeito e falha.',
        expectedAnswer: 'Erro: Ação humana do desenvolvedor ao digitar incorretamente a condição. Defeito: Código incorreto no sistema de autenticação. Falha: Sistema retornando "Usuário não encontrado" para credenciais válidas.',
        learningObjective: 'Compreender a diferença entre erro (mistake), defeito (defect) e falha (failure) no contexto de qualidade de software.'
      },
      {
        id: 'fund-002',
        title: 'Princípios de Teste na Prática',
        description: 'Aplique os 7 princípios de teste em situações reais',
        difficulty: 'Iniciante',
        estimatedTime: '20 min',
        points: 15,
        scenario: 'Você é responsável por testar um e-commerce que processará milhões de transações. O prazo é apertado e a equipe quer testar "tudo".',
        question: 'Quais princípios de teste você aplicaria para orientar a estratégia de teste? Explique como cada um se aplica.',
        expectedAnswer: 'Teste exaustivo é impossível - focar nas áreas críticas. Teste antecipado - começar desde os requisitos. Agrupamento de defeitos - focar em módulos de pagamento. Paradoxo do pesticida - variar técnicas. Teste depende do contexto - e-commerce tem necessidades específicas.',
        learningObjective: 'Aplicar os princípios fundamentais de teste em cenários práticos de desenvolvimento.'
      }
    ],
    planejamento: [
      {
        id: 'plan-001',
        title: 'Análise de Riscos em Projeto',
        description: 'Identifique e priorize riscos em um projeto de software',
        difficulty: 'Intermediário',
        estimatedTime: '25 min',
        points: 20,
        scenario: 'Projeto de app bancário mobile com integração a APIs legadas, equipe nova em React Native, prazo de 3 meses, alta expectativa de segurança.',
        question: 'Identifique os principais riscos técnicos e de negócio. Como você priorizaria os testes baseado nestes riscos?',
        expectedAnswer: 'Riscos: Segurança (crítico), integração com APIs legadas (alto), experiência da equipe (médio), prazo apertado (alto). Priorização: Focar em testes de segurança, testes de integração, automação para acelerar feedback.',
        learningObjective: 'Desenvolver habilidades de análise de risco e planejamento estratégico de testes.'
      }
    ],
    modelagem: [
      {
        id: 'model-001',
        title: 'Particionamento de Equivalência',
        description: 'Crie casos de teste usando particionamento de equivalência',
        difficulty: 'Intermediário',
        estimatedTime: '30 min',
        points: 25,
        scenario: 'Campo de idade em formulário: aceita valores de 18 a 65 anos, números inteiros apenas.',
        question: 'Defina as classes de equivalência válidas e inválidas. Crie casos de teste representativos.',
        expectedAnswer: 'Válidas: 18-65. Inválidas: <18, >65, não numérico, decimal, vazio. Casos: 17, 18, 35, 65, 66, "abc", 25.5, vazio.',
        learningObjective: 'Dominar a técnica de particionamento de equivalência para otimizar a cobertura de testes.'
      }
    ],
    execucao: [
      {
        id: 'exec-001',
        title: 'Execução de Teste Exploratório',
        description: 'Pratique técnicas de teste exploratório estruturado',
        difficulty: 'Intermediário',
        estimatedTime: '35 min',
        points: 30,
        scenario: 'Você tem 30 minutos para explorar uma funcionalidade de carrinho de compras. Nunca viu o sistema antes.',
        question: 'Descreva sua abordagem de teste exploratório. Que técnicas usaria para maximizar a descoberta de problemas?',
        expectedAnswer: 'Charter definido, time-boxing, técnicas: boundary testing, error guessing, tours (feature tour, data tour), documentação de descobertas, foco em fluxos críticos.',
        learningObjective: 'Desenvolver habilidades de teste exploratório estruturado e eficiente.'
      }
    ],
    automacao: [
      {
        id: 'auto-001',
        title: 'Estratégia de Automação',
        description: 'Defina uma estratégia de automação para um projeto',
        difficulty: 'Avançado',
        estimatedTime: '40 min',
        points: 35,
        scenario: 'Sistema web com frontend React, backend Node.js, banco PostgreSQL, deploy contínuo, equipe de 5 devs.',
        question: 'Proponha uma estratégia de automação seguindo a pirâmide de testes. Justifique suas escolhas.',
        expectedAnswer: 'Base: testes unitários (Jest), meio: testes de integração (API tests), topo: E2E críticos (Cypress). CI/CD integrado, Page Object Model, dados de teste isolados.',
        learningObjective: 'Planejar estratégias de automação eficientes e sustentáveis.'
      }
    ],
    gerenciamento: [
      {
        id: 'ger-001',
        title: 'Comunicação de Defeitos',
        description: 'Pratique a comunicação eficaz de problemas encontrados',
        difficulty: 'Intermediário',
        estimatedTime: '20 min',
        points: 20,
        scenario: 'Você encontrou um bug crítico que pode afetar o lançamento. O desenvolvedor está defensivo e o PM quer minimizar o impacto.',
        question: 'Como você comunicaria este defeito de forma construtiva e eficaz? Que informações incluiria?',
        expectedAnswer: 'Foco em fatos, impacto no usuário, passos para reproduzir, evidências (screenshots/logs), sugestões de solução, tom colaborativo, urgência justificada.',
        learningObjective: 'Desenvolver habilidades de comunicação e relacionamento interpessoal em QA.'
      }
    ],
    performance: [
      {
        id: 'perf-001',
        title: 'Análise de Métricas de Performance',
        description: 'Interprete resultados de testes de carga',
        difficulty: 'Avançado',
        estimatedTime: '30 min',
        points: 30,
        scenario: 'Teste de carga com 1000 usuários simultâneos: tempo de resposta médio 2.5s, 95º percentil 8s, CPU 85%, erro rate 2%.',
        question: 'Analise estes resultados. O sistema está pronto para produção? Que recomendações faria?',
        expectedAnswer: 'Problemas: 95º percentil alto, CPU próximo do limite. Recomendações: investigar gargalos, otimizar queries lentas, considerar scaling horizontal, definir SLAs claros.',
        learningObjective: 'Interpretar métricas de performance e fazer recomendações técnicas.'
      }
    ],
    seguranca: [
      {
        id: 'sec-001',
        title: 'Identificação de Vulnerabilidades',
        description: 'Identifique potenciais vulnerabilidades de segurança',
        difficulty: 'Avançado',
        estimatedTime: '35 min',
        points: 35,
        scenario: 'API REST que aceita uploads de arquivos, sem autenticação em alguns endpoints, dados sensíveis em URLs.',
        question: 'Identifique as vulnerabilidades e proponha testes de segurança específicos.',
        expectedAnswer: 'Vulnerabilidades: upload sem validação, endpoints sem auth, dados em URL. Testes: injeção de malware, bypass de autenticação, exposição de dados, OWASP Top 10.',
        learningObjective: 'Identificar e testar vulnerabilidades comuns de segurança.'
      }
    ]
  }

  const handleCompleteExercise = (exerciseId) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]))
    
    // Save progress
    const progress = JSON.parse(localStorage.getItem('qaplay-train-progress') || '{}')
    progress[exerciseId] = {
      completed: true,
      completedAt: new Date().toISOString()
    }
    localStorage.setItem('qaplay-train-progress', JSON.stringify(progress))
  }

  const getCompletionRate = (categoryId) => {
    const categoryExercises = exercises[categoryId] || []
    const completed = categoryExercises.filter(ex => completedExercises.has(ex.id)).length
    return categoryExercises.length > 0 ? (completed / categoryExercises.length) * 100 : 0
  }

  const getTotalPoints = () => {
    return Array.from(completedExercises).reduce((total, exerciseId) => {
      for (const category of Object.values(exercises)) {
        const exercise = category.find(ex => ex.id === exerciseId)
        if (exercise) return total + exercise.points
      }
      return total
    }, 0)
  }

  const ExerciseCard = ({ exercise }) => {
    const isCompleted = completedExercises.has(exercise.id)
    
    return (
      <Card className={`transition-all ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center">
                {exercise.title}
                {isCompleted && <CheckCircle className="ml-2 h-5 w-5 text-green-600" />}
              </CardTitle>
              <CardDescription className="mt-2">{exercise.description}</CardDescription>
            </div>
            <Badge variant={exercise.difficulty === 'Iniciante' ? 'default' : 
                           exercise.difficulty === 'Intermediário' ? 'secondary' : 'destructive'}>
              {exercise.difficulty}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {exercise.estimatedTime}
            </div>
            <div className="flex items-center">
              <Trophy className="mr-1 h-4 w-4" />
              {exercise.points} pontos
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">📋 Cenário:</h4>
            <p className="text-blue-800 text-sm">{exercise.scenario}</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">❓ Desafio:</h4>
            <p className="text-purple-800 text-sm">{exercise.question}</p>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2">🎯 Objetivo de Aprendizado:</h4>
            <p className="text-amber-800 text-sm">{exercise.learningObjective}</p>
          </div>
          
          {!isCompleted ? (
            <Button 
              onClick={() => handleCompleteExercise(exercise.id)}
              className="w-full"
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              Marcar como Concluído
            </Button>
          ) : (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">✅ Resposta Esperada:</h4>
              <p className="text-green-800 text-sm">{exercise.expectedAnswer}</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Seção Treinar</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pratique suas habilidades em QA com exercícios baseados em cenários reais. 
          Desenvolva competências práticas através de desafios progressivos.
        </p>
        
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{Array.from(completedExercises).length}</div>
            <div className="text-sm text-muted-foreground">Exercícios Concluídos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{getTotalPoints()}</div>
            <div className="text-sm text-muted-foreground">Pontos Ganhos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(Object.values(exercises).reduce((acc, cat) => acc + getCompletionRate(cat[0]?.id?.split('-')[0] || ''), 0) / Object.keys(exercises).length)}%
            </div>
            <div className="text-sm text-muted-foreground">Progresso Geral</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {exerciseCategories.map(category => {
          const Icon = category.icon
          const completionRate = getCompletionRate(category.id)
          
          return (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCategory === category.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-4 text-center space-y-3">
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                </div>
                <div className="space-y-1">
                  <Progress value={completionRate} className="h-2" />
                  <div className="text-xs text-muted-foreground">{Math.round(completionRate)}% concluído</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Exercises */}
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className={`w-8 h-8 rounded-full ${exerciseCategories.find(c => c.id === selectedCategory)?.color} flex items-center justify-center`}>
            {(() => {
              const Icon = exerciseCategories.find(c => c.id === selectedCategory)?.icon
              return Icon ? <Icon className="h-4 w-4" /> : null
            })()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {exerciseCategories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-muted-foreground">
              {exerciseCategories.find(c => c.id === selectedCategory)?.description}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {(exercises[selectedCategory] || []).map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>

        {(!exercises[selectedCategory] || exercises[selectedCategory].length === 0) && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Exercícios para esta categoria estão sendo desenvolvidos.</p>
                <p className="text-sm mt-2">Em breve teremos mais conteúdo prático!</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default TrainContent

