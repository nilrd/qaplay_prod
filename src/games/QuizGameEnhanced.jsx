import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, RotateCcw, Trophy, Clock, Target } from 'lucide-react'
import quizQuestions from '../data/quizQuestionsExpanded.json'

const QuizGameEnhanced = () => {
  const [gameState, setGameState] = useState('menu') // menu, playing, result
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [answers, setAnswers] = useState([])

  // Embaralhar perguntas e selecionar 20
  const shuffleQuestions = () => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 20)
  }

  const startGame = () => {
    const shuffledQuestions = shuffleQuestions()
    setQuestions(shuffledQuestions)
    setGameState('playing')
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setStartTime(new Date())
    setAnswers([])
  }

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return
    setSelectedAnswer(answerIndex)
  }

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return

    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.correct
    
    if (isCorrect) {
      setScore(score + 1)
    }

    // Salvar resposta
    setAnswers([...answers, {
      questionId: currentQuestion.id,
      selectedAnswer,
      correct: currentQuestion.correct,
      isCorrect
    }])

    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setEndTime(new Date())
      setGameState('result')
    }
  }

  const resetGame = () => {
    setGameState('menu')
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setQuestions([])
    setStartTime(null)
    setEndTime(null)
    setAnswers([])
  }

  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100)
  }

  const getScoreMessage = () => {
    const percentage = getScorePercentage()
    if (percentage >= 90) return { message: "Excelente! Você é um expert em QA!", color: "text-green-600" }
    if (percentage >= 80) return { message: "Muito bom! Você tem conhecimento sólido em QA.", color: "text-blue-600" }
    if (percentage >= 70) return { message: "Bom trabalho! Continue estudando para melhorar.", color: "text-yellow-600" }
    if (percentage >= 60) return { message: "Razoável. Há espaço para melhoramento.", color: "text-orange-600" }
    return { message: "Precisa estudar mais. Não desista!", color: "text-red-600" }
  }

  const getTimeTaken = () => {
    if (!startTime || !endTime) return 0
    return Math.round((endTime - startTime) / 1000)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (gameState === 'menu') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Target className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            QA Quiz Melhorado
          </CardTitle>
          <CardDescription className="text-lg">
            Teste seus conhecimentos em Quality Assurance com perguntas embaralhadas e feedback imediato
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">20</div>
              <div className="text-sm text-blue-600">Perguntas</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">100+</div>
              <div className="text-sm text-green-600">Base de Dados</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">Imediato</div>
              <div className="text-sm text-purple-600">Feedback</div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Como Funciona:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>20 perguntas selecionadas aleatoriamente de uma base com 100+ questões</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Sequência embaralhada a cada rodada - nunca se repete</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Feedback imediato após cada resposta com explicação detalhada</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Baseado em conceitos fundamentais de Quality Assurance</span>
              </li>
            </ul>
          </div>

          <Button 
            onClick={startGame}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            <Target className="mr-2 h-5 w-5" />
            Começar Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (gameState === 'playing') {
    const currentQuestion = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Badge variant="outline">
              Pergunta {currentQuestionIndex + 1} de {questions.length}
            </Badge>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Tempo: {formatTime(Math.floor((new Date() - startTime) / 1000))}</span>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "w-full text-left p-4 border rounded-lg transition-all"
                
                if (showFeedback) {
                  if (index === currentQuestion.correct) {
                    buttonClass += " bg-green-50 border-green-500 text-green-700"
                  } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                    buttonClass += " bg-red-50 border-red-500 text-red-700"
                  } else {
                    buttonClass += " bg-gray-50 border-gray-200 text-gray-500"
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass += " bg-blue-50 border-blue-500 text-blue-700"
                  } else {
                    buttonClass += " hover:bg-gray-50 border-gray-200"
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showFeedback}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                      {showFeedback && index === currentQuestion.correct && (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                      )}
                      {showFeedback && index === selectedAnswer && index !== currentQuestion.correct && (
                        <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {showFeedback && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Explicação:</h3>
              <p className="text-blue-700">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Pontuação atual: {score}/{currentQuestionIndex + (showFeedback ? 1 : 0)}
            </div>
            
            {!showFeedback ? (
              <Button 
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Confirmar Resposta
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                className="bg-green-600 hover:bg-green-700"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (gameState === 'result') {
    const scoreMessage = getScoreMessage()
    const timeTaken = getTimeTaken()

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">Quiz Concluído!</CardTitle>
          <CardDescription>Veja seu desempenho abaixo</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {getScorePercentage()}%
            </div>
            <div className={`text-lg font-medium ${scoreMessage.color}`}>
              {scoreMessage.message}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-green-600">Acertos</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{questions.length - score}</div>
              <div className="text-sm text-red-600">Erros</div>
            </div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{formatTime(timeTaken)}</div>
            <div className="text-sm text-blue-600">Tempo Total</div>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={startGame}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Jogar Novamente
            </Button>
            <Button 
              onClick={resetGame}
              variant="outline"
              className="flex-1"
            >
              Voltar ao Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default QuizGameEnhanced

