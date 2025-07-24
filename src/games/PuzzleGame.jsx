import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Puzzle, CheckCircle, XCircle, RotateCcw, Trophy, Clock, Target, ArrowRight } from 'lucide-react'

const PuzzleGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [userSequence, setUserSequence] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90)
  const [gameStarted, setGameStarted] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)

  const puzzles = [
    {
      id: 1,
      title: "Ciclo de Vida de Teste Básico",
      description: "Organize as fases do ciclo de vida de teste na ordem correta",
      difficulty: "Iniciante",
      correctSequence: [
        "Planejamento de Teste",
        "Análise de Teste", 
        "Modelagem de Teste",
        "Implementação de Teste",
        "Execução de Teste",
        "Conclusão de Teste"
      ],
      explanation: "O ciclo de vida de teste segue uma sequência lógica: primeiro planejamos, depois analisamos os requisitos, modelamos os casos de teste, implementamos os testes, executamos e finalmente concluímos com relatórios.",
      category: "Fundamentos"
    },
    {
      id: 2,
      title: "Processo de Revisão",
      description: "Ordene as etapas do processo de revisão de documentos",
      difficulty: "Intermediário",
      correctSequence: [
        "Planejamento da Revisão",
        "Início da Revisão",
        "Revisão Individual",
        "Comunicação e Análise",
        "Correção e Relatório"
      ],
      explanation: "O processo de revisão começa com planejamento, depois iniciamos formalmente, cada revisor faz sua análise individual, comunicamos os achados e finalmente corrigimos e relatamos.",
      category: "Teste Estático"
    },
    {
      id: 3,
      title: "Técnica de Particionamento de Equivalência",
      description: "Organize os passos para aplicar particionamento de equivalência",
      difficulty: "Intermediário",
      correctSequence: [
        "Identificar Requisitos",
        "Definir Classes de Equivalência",
        "Identificar Valores Válidos e Inválidos",
        "Selecionar Casos de Teste",
        "Executar e Validar"
      ],
      explanation: "Para aplicar particionamento de equivalência, primeiro identificamos os requisitos, definimos as classes, separamos valores válidos e inválidos, selecionamos casos representativos e executamos.",
      category: "Técnicas de Teste"
    },
    {
      id: 4,
      title: "Gerenciamento de Defeitos",
      description: "Ordene o fluxo de vida de um defeito",
      difficulty: "Avançado",
      correctSequence: [
        "Descoberta do Defeito",
        "Registro no Sistema",
        "Triagem e Priorização",
        "Atribuição para Correção",
        "Correção pelo Desenvolvedor",
        "Reteste pelo QA",
        "Fechamento do Defeito"
      ],
      explanation: "O ciclo de vida de um defeito vai desde sua descoberta, passando por registro, triagem, correção, reteste até o fechamento final.",
      category: "Gerenciamento"
    },
    {
      id: 5,
      title: "Implementação de Automação",
      description: "Organize as etapas para implementar automação de testes",
      difficulty: "Avançado",
      correctSequence: [
        "Análise de Viabilidade",
        "Seleção de Ferramentas",
        "Criação do Framework",
        "Desenvolvimento dos Scripts",
        "Execução e Manutenção",
        "Relatórios e Métricas"
      ],
      explanation: "A automação requer análise prévia, escolha de ferramentas adequadas, criação de um framework robusto, desenvolvimento de scripts, execução contínua e acompanhamento de métricas.",
      category: "Automação"
    }
  ]

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameFinished && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      finishPuzzle()
    }
  }, [timeLeft, gameStarted, gameFinished, showResult])

  const startGame = () => {
    setGameStarted(true)
    setCurrentPuzzle(0)
    setScore(0)
    setUserSequence([])
    setShowResult(false)
    setGameFinished(false)
    setTimeLeft(90)
  }

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetIndex) => {
    e.preventDefault()
    if (draggedItem) {
      const newSequence = [...userSequence]
      
      // Remove item from current position if it exists
      const currentIndex = newSequence.indexOf(draggedItem)
      if (currentIndex !== -1) {
        newSequence.splice(currentIndex, 1)
      }
      
      // Insert at new position
      newSequence.splice(targetIndex, 0, draggedItem)
      
      setUserSequence(newSequence)
      setDraggedItem(null)
    }
  }

  const addToSequence = (item) => {
    if (!userSequence.includes(item)) {
      setUserSequence([...userSequence, item])
    }
  }

  const removeFromSequence = (index) => {
    const newSequence = [...userSequence]
    newSequence.splice(index, 1)
    setUserSequence(newSequence)
  }

  const finishPuzzle = () => {
    setShowResult(true)
    
    const currentPuzzleData = puzzles[currentPuzzle]
    let puzzleScore = 0
    
    // Calculate score based on correct sequence
    for (let i = 0; i < userSequence.length; i++) {
      if (userSequence[i] === currentPuzzleData.correctSequence[i]) {
        puzzleScore += 10
      }
    }
    
    // Bonus for completing the sequence
    if (userSequence.length === currentPuzzleData.correctSequence.length) {
      puzzleScore += 20
    }
    
    // Time bonus
    const timeBonus = Math.floor(timeLeft / 10)
    puzzleScore += timeBonus
    
    setScore(score + puzzleScore)
  }

  const nextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1)
      setUserSequence([])
      setShowResult(false)
      setTimeLeft(90)
    } else {
      setGameFinished(true)
      // Save score
      const savedBestScore = localStorage.getItem('qaplay-puzzle-best-score')
      if (!savedBestScore || score > parseInt(savedBestScore)) {
        localStorage.setItem('qaplay-puzzle-best-score', score.toString())
      }
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentPuzzle(0)
    setScore(0)
    setUserSequence([])
    setShowResult(false)
    setGameFinished(false)
    setTimeLeft(90)
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
    const maxScore = puzzles.reduce((acc, puzzle) => acc + (puzzle.correctSequence.length * 10 + 20), 0)
    const percentage = (score / maxScore) * 100
    
    if (percentage >= 90) return "Excelente! Você domina os processos de QA! 🏆"
    if (percentage >= 70) return "Muito bom! Você entende bem as sequências! 🎯"
    if (percentage >= 50) return "Bom trabalho! Continue praticando! 📚"
    return "Continue estudando os processos! Todo expert já foi iniciante! 💪"
  }

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Puzzle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">QA Puzzle</CardTitle>
            <CardDescription className="text-lg">
              Monte a sequência correta de processos e técnicas de QA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{puzzles.length}</div>
                <div className="text-sm text-muted-foreground">Puzzles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">90s</div>
                <div className="text-sm text-muted-foreground">Por puzzle</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {localStorage.getItem('qaplay-puzzle-best-score') || 0}
                </div>
                <div className="text-sm text-muted-foreground">Melhor pontuação</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Como jogar:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Arraste e solte os itens na ordem correta</li>
                <li>• Ou clique nos itens para adicioná-los à sequência</li>
                <li>• Ganhe pontos por cada item na posição correta</li>
                <li>• Bônus por completar a sequência e tempo restante</li>
              </ul>
            </div>
            
            <Button onClick={startGame} size="lg" className="w-full">
              <Puzzle className="mr-2 h-5 w-5" />
              Começar Puzzle
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
            <CardTitle className="text-2xl">Puzzles Concluídos!</CardTitle>
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
                <div className="text-3xl font-bold text-primary">{puzzles.length}</div>
                <div className="text-sm text-muted-foreground">Puzzles Resolvidos</div>
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

  const currentPuzzleData = puzzles[currentPuzzle]
  const progress = ((currentPuzzle + 1) / puzzles.length) * 100
  const shuffledItems = shuffleArray(currentPuzzleData.correctSequence)
  const availableItems = shuffledItems.filter(item => !userSequence.includes(item))

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Badge variant="outline">
            Puzzle {currentPuzzle + 1} de {puzzles.length}
          </Badge>
          <Badge className={getDifficultyColor(currentPuzzleData.difficulty)}>
            {currentPuzzleData.difficulty}
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className={`font-mono ${timeLeft <= 20 ? 'text-red-500' : ''}`}>
              {timeLeft}s
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

      {/* Puzzle */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentPuzzleData.title}</CardTitle>
          <CardDescription>{currentPuzzleData.description}</CardDescription>
          <Badge variant="outline">{currentPuzzleData.category}</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Available Items */}
          <div className="space-y-3">
            <h4 className="font-semibold">Itens disponíveis:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {availableItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => addToSequence(item)}
                  className="p-3 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/30 cursor-pointer hover:bg-accent hover:border-primary transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* User Sequence */}
          <div className="space-y-3">
            <h4 className="font-semibold">Sua sequência:</h4>
            <div className="min-h-[200px] space-y-2">
              {userSequence.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className="flex-1 p-3 bg-primary/10 border border-primary rounded-lg flex items-center justify-between"
                  >
                    <span>{item}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromSequence(index)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  {index < userSequence.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
              
              {/* Drop zone for new items */}
              {userSequence.length < currentPuzzleData.correctSequence.length && (
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, userSequence.length)}
                  className="p-6 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center text-muted-foreground"
                >
                  Arraste um item aqui ou clique nos itens acima
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          {showResult && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-3">Sequência correta:</h4>
                <div className="space-y-2">
                  {currentPuzzleData.correctSequence.map((item, index) => {
                    const isCorrect = userSequence[index] === item
                    return (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded border">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <span className="flex-1">{item}</span>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Explicação:</h4>
                <p className="text-blue-800">{currentPuzzleData.explanation}</p>
              </div>
              
              <Button onClick={nextPuzzle} className="w-full" size="lg">
                {currentPuzzle < puzzles.length - 1 ? 'Próximo Puzzle' : 'Ver Resultado Final'}
              </Button>
            </div>
          )}

          {!showResult && (
            <Button 
              onClick={finishPuzzle} 
              className="w-full" 
              size="lg"
              disabled={userSequence.length === 0}
            >
              Verificar Sequência
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PuzzleGame

