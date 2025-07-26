import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, Clock, Trophy, Award, Share2, AlertTriangle, User, Linkedin } from 'lucide-react'
import trainingQuestions from '../data/trainingQuestions.json'

const TrainingGameEnhanced = () => {
  const [gameState, setGameState] = useState('intro') // intro, form, playing, result
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const [startTime, setStartTime] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(30 * 60) // 30 minutos em segundos
  const [answers, setAnswers] = useState([])
  const [isTabActive, setIsTabActive] = useState(true)
  const [userInfo, setUserInfo] = useState({ name: '', linkedin: '' })
  const timerRef = useRef(null)

  // Embaralhar perguntas e selecionar 30
  const shuffleQuestions = () => {
    const shuffled = [...trainingQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 30)
  }

  // Monitorar mudança de aba/janela
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (gameState === 'playing' && !showFeedback) {
        if (document.hidden) {
          setIsTabActive(false)
          // Marcar questão atual como incorreta
          handleTabSwitch()
        } else {
          setIsTabActive(true)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [gameState, showFeedback, currentQuestionIndex])

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            finishGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current)
  }, [gameState, timeRemaining])

  const handleTabSwitch = () => {
    if (gameState === 'playing' && !showFeedback) {
      const currentQuestion = questions[currentQuestionIndex]
      
      // Marcar como incorreta
      setAnswers(prev => [...prev, {
        questionId: currentQuestion.id,
        selectedAnswer: -1, // Indica que foi marcada por troca de aba
        correct: currentQuestion.correct,
        isCorrect: false,
        tabSwitch: true
      }])

      setShowFeedback(true)
      setSelectedAnswer(-1)
    }
  }

  const startGame = () => {
    if (!userInfo.name.trim()) {
      alert('Por favor, preencha seu nome completo.')
      return
    }

    const shuffledQuestions = shuffleQuestions()
    setQuestions(shuffledQuestions)
    setGameState('playing')
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setStartTime(new Date())
    setTimeRemaining(60 * 60)
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

    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer,
      correct: currentQuestion.correct,
      isCorrect,
      tabSwitch: false
    }])

    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      finishGame()
    }
  }

  const finishGame = () => {
    clearInterval(timerRef.current)
    setGameState('result')
  }

  const resetGame = () => {
    setGameState('intro')
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setQuestions([])
    setStartTime(null)
    setTimeRemaining(60 * 60)
    setAnswers([])
    setUserInfo({ name: '', linkedin: '' })
  }

  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100)
  }

  const getClassification = () => {
    const percentage = getScorePercentage()
    if (percentage >= 80) return { level: "Expert", color: "text-purple-600", bgColor: "bg-purple-50" }
    if (percentage >= 70) return { level: "Avançado", color: "text-blue-600", bgColor: "bg-blue-50" }
    if (percentage >= 60) return { level: "Intermediário", color: "text-green-600", bgColor: "bg-green-50" }
    return { level: "Precisa Estudar", color: "text-red-600", bgColor: "bg-red-50" }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTimeTaken = () => {
    const totalTime = 60 * 60
    return totalTime - timeRemaining
  }

  const shareOnLinkedIn = () => {
    const classification = getClassification()
    const percentage = getScorePercentage()
    const text = `Acabei de completar o Treinamento QA no QAPlay! 🎯\n\nMeu resultado: ${percentage}% - Nível ${classification.level}\n\nBaseado no CTFL 4.0 com 30 questões em 60 minutos.\n\n#QualityAssurance #QA #Testing #CTFL #QAPlay`
    
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://qaplay.com')}&text=${encodeURIComponent(text)}`
    window.open(linkedinUrl, '_blank')
  }

  if (gameState === 'intro') {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Treinamento QA - CTFL 4.0
          </CardTitle>
          <CardDescription className="text-lg">
            Avalie seu conhecimento com nosso treinamento baseado no CTFL 4.0
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Leia atentamente antes de começar:</strong>
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Regras do Treinamento
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>30 questões</strong> de múltipla escolha</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>30 minutos</strong> para completar</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Baseado no <strong>CTFL 4.0</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Feedback imediato</strong> após cada resposta</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Perguntas <strong>embaralhadas</strong> - nunca se repete</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-2" />
                Níveis de Classificação
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <span className="font-medium">Expert</span>
                  <span className="text-purple-600">80-100%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="font-medium">Avançado</span>
                  <span className="text-blue-600">70-79%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="font-medium">Intermediário</span>
                  <span className="text-green-600">60-69%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span className="font-medium">Precisa Estudar</span>
                  <span className="text-red-600">Abaixo de 60%</span>
                </div>
              </div>
            </div>
          </div>

          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>IMPORTANTE:</strong> Se você minimizar o navegador ou trocar de aba durante o treinamento, 
              a questão atual será marcada como incorreta automaticamente.
            </AlertDescription>
          </Alert>

          <Button 
            onClick={() => setGameState('form')}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            size="lg"
          >
            <User className="mr-2 h-5 w-5" />
            Continuar para Cadastro
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (gameState === 'form') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Informações para Certificação</CardTitle>
          <CardDescription>
            Preencha seus dados para gerar seu certificado ao final do treinamento
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={userInfo.name}
                onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Seu nome completo"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="linkedin">Link do LinkedIn (opcional)</Label>
              <Input
                id="linkedin"
                value={userInfo.linkedin}
                onChange={(e) => setUserInfo(prev => ({ ...prev, linkedin: e.target.value }))}
                placeholder="https://linkedin.com/in/seu-perfil"
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Para facilitar o compartilhamento do seu resultado
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={() => setGameState('intro')}
              variant="outline"
              className="flex-1"
            >
              Voltar
            </Button>
            <Button 
              onClick={startGame}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              disabled={!userInfo.name.trim()}
            >
              <Trophy className="mr-2 h-4 w-4" />
              Iniciar Treinamento
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (gameState === 'playing') {
    const currentQuestion = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                Questão {currentQuestionIndex + 1} de {questions.length}
              </Badge>
              {!isTabActive && (
                <Badge variant="destructive">
                  Aba Inativa - Questão será marcada como incorreta
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={timeRemaining < 300 ? 'text-red-600 font-bold' : ''}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Pontuação: {score}/{currentQuestionIndex + (showFeedback ? 1 : 0)}
              </div>
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
                    disabled={showFeedback || !isTabActive}
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
            <div className="space-y-4">
              {selectedAnswer === -1 ? (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Questão marcada como incorreta:</strong> Você trocou de aba ou minimizou o navegador.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Explicação:</h3>
                  <p className="text-blue-700">{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Tempo restante: {formatTime(timeRemaining)}
            </div>
            
            {!showFeedback ? (
              <Button 
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null || !isTabActive}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Confirmar Resposta
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                className="bg-green-600 hover:bg-green-700"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (gameState === 'result') {
    const classification = getClassification()
    const percentage = getScorePercentage()
    const timeTaken = getTimeTaken()
    const tabSwitches = answers.filter(a => a.tabSwitch).length

    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <Award className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">Treinamento Concluído!</CardTitle>
          <CardDescription>Parabéns, {userInfo.name}! Aqui está seu resultado:</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {percentage}%
            </div>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${classification.bgColor} ${classification.color}`}>
              <Trophy className="h-5 w-5 mr-2" />
              Nível: {classification.level}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-green-600">Acertos</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{questions.length - score}</div>
              <div className="text-sm text-red-600">Erros</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{formatTime(timeTaken)}</div>
              <div className="text-sm text-blue-600">Tempo Usado</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{tabSwitches}</div>
              <div className="text-sm text-orange-600">Trocas de Aba</div>
            </div>
          </div>

          {tabSwitches > 0 && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                {tabSwitches} questão(ões) foram marcadas como incorretas devido a troca de aba ou minimização do navegador.
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border">
            <h3 className="font-bold text-lg mb-2 text-center">🎉 Certificado de Conclusão 🎉</h3>
            <div className="text-center space-y-2">
              <p className="text-lg">
                <strong>{userInfo.name}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Completou o Treinamento QA baseado no CTFL 4.0
              </p>
              <p className="text-sm">
                <strong>Resultado:</strong> {percentage}% - Nível {classification.level}
              </p>
              <p className="text-xs text-muted-foreground">
                30 questões • {formatTime(timeTaken)} • QAPlay
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={shareOnLinkedIn}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              Compartilhar no LinkedIn
            </Button>
            <Button 
              onClick={startGame}
              variant="outline"
              className="flex-1"
            >
              Tentar Novamente
            </Button>
            <Button 
              onClick={resetGame}
              variant="outline"
              className="flex-1"
            >
              Novo Treinamento
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default TrainingGameEnhanced

