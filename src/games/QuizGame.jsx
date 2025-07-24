import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, RotateCcw, Trophy, Clock, Target } from 'lucide-react'
import questionsData from '../data/quizQuestions.json'

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameStarted, setGameStarted] = useState(false)

  const questions = questionsData;

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameFinished && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion()
    }
  }, [timeLeft, gameStarted, gameFinished, showResult])

  // Load saved score
  useEffect(() => {
    const savedScore = localStorage.getItem('qaplay-quiz-best-score')
    if (savedScore) {
      setBestScore(parseInt(savedScore))
    }
  }, [])

  const [bestScore, setBestScore] = useState(0)

  const startGame = () => {
    setGameStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameFinished(false)
    setTimeLeft(30)
  }

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === questions[currentQuestion].correct) {
      const timeBonus = Math.floor(timeLeft / 3)
      setScore(score + 10 + timeBonus)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      finishGame()
    }
  }

  const finishGame = () => {
    setGameFinished(true)
    
    // Save best score
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem('qaplay-quiz-best-score', score.toString())
    }
    
    // Save game stats
    const stats = JSON.parse(localStorage.getItem('qaplay-quiz-stats') || '{"gamesPlayed": 0, "totalScore": 0}')
    stats.gamesPlayed += 1
    stats.totalScore += score
    localStorage.setItem('qaplay-quiz-stats', JSON.stringify(stats))
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameFinished(false)
    setTimeLeft(30)
  }

  const getScoreMessage = () => {
    const percentage = (score / (questions.length * 10)) * 100
    if (percentage >= 90) return "Excelente! Você é um expert em QA! 🏆"
    if (percentage >= 70) return "Muito bom! Você tem um ótimo conhecimento em QA! 🎉"
    if (percentage >= 50) return "Bom trabalho! Continue estudando para melhorar! 📚"
    return "Continue praticando! Todo expert já foi iniciante! 💪"
  }

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <CardTitle className="text-2xl">QA Quiz</CardTitle>
            <CardDescription className="text-lg">
              Teste seus conhecimentos em Quality Assurance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{questions.length}</div>
                <div className="text-sm text-muted-foreground">Perguntas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">30s</div>
                <div className="text-sm text-muted-foreground">Por pergunta</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{bestScore}</div>
                <div className="text-sm text-muted-foreground">Melhor pontuação</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Como jogar:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Responda cada pergunta em até 30 segundos</li>
                <li>• Ganhe 10 pontos por resposta correta + bônus de tempo</li>
                <li>• Veja a explicação após cada resposta</li>
                <li>• Sua melhor pontuação será salva automaticamente</li>
              </ul>
            </div>
            
            <Button onClick={startGame} size="lg" className="w-full">
              <Target className="mr-2 h-5 w-5" />
              Começar Quiz
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
            <CardTitle className="text-2xl">Quiz Finalizado!</CardTitle>
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
                <div className="text-3xl font-bold text-primary">{Math.round((score / (questions.length * 10)) * 100)}%</div>
                <div className="text-sm text-muted-foreground">Acertos</div>
              </div>
            </div>
            
            {score > bestScore && (
              <Badge className="bg-yellow-100 text-yellow-800">
                🎉 Nova melhor pontuação!
              </Badge>
            )}
            
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

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Badge variant="outline">
          Pergunta {currentQuestion + 1} de {questions.length}
        </Badge>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className={`font-mono ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
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

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 border rounded-lg transition-colors"
              
              if (showResult) {
                if (index === currentQ.correct) {
                  buttonClass += " bg-green-100 border-green-500 text-green-800"
                } else if (index === selectedAnswer && index !== currentQ.correct) {
                  buttonClass += " bg-red-100 border-red-500 text-red-800"
                } else {
                  buttonClass += " bg-muted"
                }
              } else {
                buttonClass += " hover:bg-accent hover:border-primary"
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                    {showResult && index === currentQ.correct && (
                      <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentQ.correct && (
                      <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Explicação:</h4>
              <p className="text-blue-800">{currentQ.explanation}</p>
            </div>
          )}

          {showResult && (
            <Button onClick={handleNextQuestion} className="w-full" size="lg">
              {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizGame

