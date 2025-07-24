import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Triangle, CheckCircle, XCircle, RotateCcw, Trophy, Clock, Target, ArrowUp, ArrowDown } from 'lucide-react'

const TestPyramidGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [userPyramid, setUserPyramid] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes
  const [gameStarted, setGameStarted] = useState(false)

  const levels = [
    {
      id: 1,
      title: "Pirâmide Básica",
      description: "Monte a pirâmide de testes tradicional com os três níveis principais",
      difficulty: "Iniciante",
      availableTests: [
        { id: 'unit', name: 'Testes Unitários', level: 'base', description: 'Testam componentes individuais' },
        { id: 'integration', name: 'Testes de Integração', level: 'middle', description: 'Testam interação entre componentes' },
        { id: 'e2e', name: 'Testes E2E', level: 'top', description: 'Testam fluxos completos' },
        { id: 'manual', name: 'Testes Manuais', level: 'top', description: 'Testes executados manualmente' },
        { id: 'performance', name: 'Testes de Performance', level: 'middle', description: 'Testam velocidade e carga' }
      ],
      correctPyramid: [
        { level: 'base', tests: ['unit'] },
        { level: 'middle', tests: ['integration'] },
        { level: 'top', tests: ['e2e'] }
      ],
      explanation: "A pirâmide tradicional tem testes unitários na base (mais rápidos e baratos), testes de integração no meio, e testes E2E no topo (mais lentos e caros)."
    },
    {
      id: 2,
      title: "Pirâmide Expandida",
      description: "Inclua diferentes tipos de teste na pirâmide considerando custo e velocidade",
      difficulty: "Intermediário",
      availableTests: [
        { id: 'unit', name: 'Testes Unitários', level: 'base', description: 'Testam componentes individuais' },
        { id: 'component', name: 'Testes de Componente', level: 'base', description: 'Testam componentes isolados' },
        { id: 'integration', name: 'Testes de Integração', level: 'middle', description: 'Testam interação entre componentes' },
        { id: 'contract', name: 'Testes de Contrato', level: 'middle', description: 'Testam APIs e contratos' },
        { id: 'e2e', name: 'Testes E2E', level: 'top', description: 'Testam fluxos completos' },
        { id: 'ui', name: 'Testes de UI', level: 'top', description: 'Testam interface do usuário' },
        { id: 'manual', name: 'Testes Manuais', level: 'top', description: 'Testes executados manualmente' },
        { id: 'exploratory', name: 'Testes Exploratórios', level: 'top', description: 'Investigação livre' }
      ],
      correctPyramid: [
        { level: 'base', tests: ['unit', 'component'] },
        { level: 'middle', tests: ['integration', 'contract'] },
        { level: 'top', tests: ['e2e', 'ui'] }
      ],
      explanation: "Uma pirâmide expandida inclui mais tipos de teste, mantendo o princípio de mais testes rápidos na base e menos testes lentos no topo."
    },
    {
      id: 3,
      title: "Pirâmide Moderna",
      description: "Monte uma pirâmide considerando arquiteturas modernas (microserviços, APIs, etc.)",
      difficulty: "Avançado",
      availableTests: [
        { id: 'unit', name: 'Testes Unitários', level: 'base', description: 'Testam componentes individuais' },
        { id: 'component', name: 'Testes de Componente', level: 'base', description: 'Testam componentes isolados' },
        { id: 'integration', name: 'Testes de Integração', level: 'middle', description: 'Testam interação entre serviços' },
        { id: 'contract', name: 'Testes de Contrato', level: 'middle', description: 'Testam APIs e contratos' },
        { id: 'api', name: 'Testes de API', level: 'middle', description: 'Testam endpoints REST/GraphQL' },
        { id: 'e2e', name: 'Testes E2E', level: 'top', description: 'Testam jornadas completas' },
        { id: 'visual', name: 'Testes Visuais', level: 'top', description: 'Testam regressão visual' },
        { id: 'accessibility', name: 'Testes de Acessibilidade', level: 'middle', description: 'Testam conformidade WCAG' },
        { id: 'security', name: 'Testes de Segurança', level: 'middle', description: 'Testam vulnerabilidades' },
        { id: 'performance', name: 'Testes de Performance', level: 'middle', description: 'Testam carga e stress' }
      ],
      correctPyramid: [
        { level: 'base', tests: ['unit', 'component'] },
        { level: 'middle', tests: ['integration', 'contract', 'api', 'accessibility', 'security', 'performance'] },
        { level: 'top', tests: ['e2e', 'visual'] }
      ],
      explanation: "A pirâmide moderna considera microserviços, APIs, acessibilidade e segurança, mantendo a base sólida de testes unitários."
    }
  ]

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameFinished && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      finishLevel()
    }
  }, [timeLeft, gameStarted, gameFinished, showResult])

  const startGame = () => {
    setGameStarted(true)
    setCurrentLevel(0)
    setScore(0)
    setUserPyramid([
      { level: 'base', tests: [] },
      { level: 'middle', tests: [] },
      { level: 'top', tests: [] }
    ])
    setShowResult(false)
    setGameFinished(false)
    setTimeLeft(180)
  }

  const addTestToPyramid = (testId, level) => {
    const newPyramid = [...userPyramid]
    const levelIndex = newPyramid.findIndex(l => l.level === level)
    
    if (levelIndex !== -1 && !newPyramid[levelIndex].tests.includes(testId)) {
      // Remove test from other levels first
      newPyramid.forEach(l => {
        l.tests = l.tests.filter(t => t !== testId)
      })
      
      // Add to selected level
      newPyramid[levelIndex].tests.push(testId)
      setUserPyramid(newPyramid)
    }
  }

  const removeTestFromPyramid = (testId) => {
    const newPyramid = userPyramid.map(level => ({
      ...level,
      tests: level.tests.filter(t => t !== testId)
    }))
    setUserPyramid(newPyramid)
  }

  const finishLevel = () => {
    setShowResult(true)
    
    const currentLevelData = levels[currentLevel]
    let levelScore = 0
    
    // Calculate score based on correct placement
    currentLevelData.correctPyramid.forEach(correctLevel => {
      const userLevel = userPyramid.find(l => l.level === correctLevel.level)
      if (userLevel) {
        correctLevel.tests.forEach(testId => {
          if (userLevel.tests.includes(testId)) {
            levelScore += 15
          }
        })
      }
    })
    
    // Penalty for wrong placements
    userPyramid.forEach(userLevel => {
      const correctLevel = currentLevelData.correctPyramid.find(l => l.level === userLevel.level)
      if (correctLevel) {
        userLevel.tests.forEach(testId => {
          if (!correctLevel.tests.includes(testId)) {
            levelScore -= 5
          }
        })
      }
    })
    
    // Time bonus
    const timeBonus = Math.floor(timeLeft / 10)
    levelScore = Math.max(0, levelScore + timeBonus)
    
    setScore(score + levelScore)
  }

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1)
      setUserPyramid([
        { level: 'base', tests: [] },
        { level: 'middle', tests: [] },
        { level: 'top', tests: [] }
      ])
      setShowResult(false)
      setTimeLeft(180)
    } else {
      setGameFinished(true)
      // Save score
      const savedBestScore = localStorage.getItem('qaplay-pyramid-best-score')
      if (!savedBestScore || score > parseInt(savedBestScore)) {
        localStorage.setItem('qaplay-pyramid-best-score', score.toString())
      }
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentLevel(0)
    setScore(0)
    setUserPyramid([])
    setShowResult(false)
    setGameFinished(false)
    setTimeLeft(180)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800'
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800'
      case 'Avançado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreMessage = () => {
    const maxScore = levels.reduce((acc, level) => acc + (level.correctPyramid.reduce((sum, l) => sum + l.tests.length * 15, 0)), 0)
    const percentage = (score / maxScore) * 100
    
    if (percentage >= 90) return "Excelente! Você domina a pirâmide de testes! 🏆"
    if (percentage >= 70) return "Muito bom! Você entende bem os conceitos! 🎯"
    if (percentage >= 50) return "Bom trabalho! Continue estudando! 📚"
    return "Continue praticando! A pirâmide é fundamental! 💪"
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTestsInLevel = (level) => {
    const userLevel = userPyramid.find(l => l.level === level)
    return userLevel ? userLevel.tests : []
  }

  const getAvailableTests = () => {
    const usedTests = userPyramid.flatMap(level => level.tests)
    return levels[currentLevel].availableTests.filter(test => !usedTests.includes(test.id))
  }

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Triangle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Pirâmide de Testes</CardTitle>
            <CardDescription className="text-lg">
              Monte a pirâmide de testes correta considerando custo e velocidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{levels.length}</div>
                <div className="text-sm text-muted-foreground">Níveis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3min</div>
                <div className="text-sm text-muted-foreground">Por nível</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {localStorage.getItem('qaplay-pyramid-best-score') || 0}
                </div>
                <div className="text-sm text-muted-foreground">Melhor pontuação</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Como jogar:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Arraste os tipos de teste para os níveis corretos</li>
                <li>• Base: testes rápidos e baratos</li>
                <li>• Meio: testes de integração</li>
                <li>• Topo: testes lentos e caros</li>
              </ul>
            </div>
            
            <Button onClick={startGame} size="lg" className="w-full">
              <Triangle className="mr-2 h-5 w-5" />
              Começar Pirâmide
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameFinished) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Pirâmides Concluídas!</CardTitle>
            <CardDescription className="text-lg">
              {getScoreMessage()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Pontuação Final</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{levels.length}</div>
                <div className="text-sm text-muted-foreground">Níveis Concluídos</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button onClick={resetGame} variant="outline" className="flex-1">
                <RotateCcw className="mr-2 h-4 w-4" />
                Jogar Novamente
              </Button>
              <Button onClick={() => window.history.back()} className="flex-1">
                Voltar aos Jogos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentLevelData = levels[currentLevel]
  const progress = ((currentLevel + 1) / levels.length) * 100

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Badge variant="outline">
            Nível {currentLevel + 1} de {levels.length}
          </Badge>
          <Badge className={getDifficultyColor(currentLevelData.difficulty)}>
            {currentLevelData.difficulty}
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className={`font-mono ${timeLeft <= 60 ? 'text-red-500' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span className="font-semibold">{score}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Progress value={progress} className="h-2" />

      {/* Level */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentLevelData.title}</CardTitle>
          <CardDescription>{currentLevelData.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Tests */}
            <div className="space-y-4">
              <h4 className="font-semibold">Tipos de teste disponíveis:</h4>
              <div className="space-y-2">
                {getAvailableTests().map((test) => (
                  <div
                    key={test.id}
                    className="p-3 bg-muted rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                  >
                    <div className="font-medium">{test.name}</div>
                    <div className="text-sm text-muted-foreground">{test.description}</div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" onClick={() => addTestToPyramid(test.id, 'base')}>
                        Base
                      </Button>
                      <Button size="sm" onClick={() => addTestToPyramid(test.id, 'middle')}>
                        Meio
                      </Button>
                      <Button size="sm" onClick={() => addTestToPyramid(test.id, 'top')}>
                        Topo
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pyramid */}
            <div className="space-y-4">
              <h4 className="font-semibold">Sua pirâmide:</h4>
              <div className="space-y-3">
                {/* Top Level */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-red-800">Topo - Testes E2E/UI</span>
                    <span className="text-sm text-red-600">Lentos, Caros</span>
                  </div>
                  <div className="space-y-1">
                    {getTestsInLevel('top').map(testId => {
                      const test = currentLevelData.availableTests.find(t => t.id === testId)
                      return (
                        <div key={testId} className="flex items-center justify-between bg-white p-2 rounded border">
                          <span className="text-sm">{test?.name}</span>
                          <Button size="sm" variant="ghost" onClick={() => removeTestFromPyramid(testId)}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                    {getTestsInLevel('top').length === 0 && (
                      <div className="text-center text-muted-foreground text-sm py-4 border-2 border-dashed rounded">
                        Arraste testes aqui
                      </div>
                    )}
                  </div>
                </div>

                {/* Middle Level */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-yellow-800">Meio - Testes de Integração</span>
                    <span className="text-sm text-yellow-600">Médios</span>
                  </div>
                  <div className="space-y-1">
                    {getTestsInLevel('middle').map(testId => {
                      const test = currentLevelData.availableTests.find(t => t.id === testId)
                      return (
                        <div key={testId} className="flex items-center justify-between bg-white p-2 rounded border">
                          <span className="text-sm">{test?.name}</span>
                          <Button size="sm" variant="ghost" onClick={() => removeTestFromPyramid(testId)}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                    {getTestsInLevel('middle').length === 0 && (
                      <div className="text-center text-muted-foreground text-sm py-4 border-2 border-dashed rounded">
                        Arraste testes aqui
                      </div>
                    )}
                  </div>
                </div>

                {/* Base Level */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-green-800">Base - Testes Unitários</span>
                    <span className="text-sm text-green-600">Rápidos, Baratos</span>
                  </div>
                  <div className="space-y-1">
                    {getTestsInLevel('base').map(testId => {
                      const test = currentLevelData.availableTests.find(t => t.id === testId)
                      return (
                        <div key={testId} className="flex items-center justify-between bg-white p-2 rounded border">
                          <span className="text-sm">{test?.name}</span>
                          <Button size="sm" variant="ghost" onClick={() => removeTestFromPyramid(testId)}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                    {getTestsInLevel('base').length === 0 && (
                      <div className="text-center text-muted-foreground text-sm py-4 border-2 border-dashed rounded">
                        Arraste testes aqui
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {showResult && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-3">Pirâmide correta:</h4>
                <div className="space-y-2">
                  {currentLevelData.correctPyramid.map((level, index) => (
                    <div key={level.level} className="p-2 rounded border">
                      <div className="font-medium capitalize">{level.level}:</div>
                      <div className="text-sm">
                        {level.tests.map(testId => {
                          const test = currentLevelData.availableTests.find(t => t.id === testId)
                          return test?.name
                        }).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Explicação:</h4>
                <p className="text-blue-800">{currentLevelData.explanation}</p>
              </div>
              
              <Button onClick={nextLevel} className="w-full" size="lg">
                {currentLevel < levels.length - 1 ? 'Próximo Nível' : 'Ver Resultado Final'}
              </Button>
            </div>
          )}

          {!showResult && (
            <Button 
              onClick={finishLevel} 
              className="w-full" 
              size="lg"
              disabled={userPyramid.every(level => level.tests.length === 0)}
            >
              Verificar Pirâmide
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TestPyramidGame

