import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw, Home, X, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import quizData from '../data/quiz-automacao_doc.json'
import QuizFlowWrapper from '../components/QuizFlowWrapper'
import { useQuizTimer, calculateQuizTime, formatQuizTime, getTimeLeftClasses } from '../hooks/useQuizTimer'

const AutomationMasterGame = () => {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(20)
  const [totalTime, setTotalTime] = useState(calculateQuizTime(20)) // Default 20 minutes
  const [userInfo, setUserInfo] = useState(null)

  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Load and shuffle all questions initially
  useEffect(() => {
    // Convert from quiz-automacao_doc.json format to expected format
    const convertedQuestions = quizData.questions.map((q, index) => {
      const options = q.opcoes.map(option => option.trim())
      const correctAnswerIndex = parseInt(q.indice_correto, 10)
      const correctAnswer = options[correctAnswerIndex]

      return {
        id: Math.random().toString(36).substring(2, 11),
        question: q.pergunta.trim(),
        options: options,
        correctAnswer: correctAnswer,
        explanation: q.explicacao.trim()
      }
    })
    
    const shuffledQuestions = shuffleArray(convertedQuestions)
    setQuestions(shuffledQuestions)
  }, [])

  // Hook do temporizador padronizado
  const { timeLeft, resetTimer } = useQuizTimer(
    totalTime,
    gameStarted,
    gameFinished,
    () => setGameFinished(true)
  )

  // Function to start the quiz with configurations
  const handleQuizStart = (questionCount, timeInSeconds) => {
    setTotalQuestions(questionCount)
    setTotalTime(timeInSeconds)
    
    // Usar questões diretamente sem limitedQuestions
    const shuffledQuestions = shuffleArray(questions)
    const limitedQuestionsArray = shuffledQuestions.slice(0, questionCount)
    setQuestions(limitedQuestionsArray)
    
    resetTimer(timeInSeconds)
    setGameStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowResult(false)
    setGameFinished(false)
  }

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info)
  }

  // Timer effect removido - agora gerenciado pelo hook useQuizTimer

  const handleAnswerSelect = (index) => {
    if (!showResult) {
      setSelectedAnswer(index)
    }
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const currentQ = questions[currentQuestion]
    const isCorrect = currentQ.options[selectedAnswer] === currentQ.correctAnswer

    setAnswers([...answers, { question: currentQ.question, selected: currentQ.options[selectedAnswer], correct: currentQ.correctAnswer, isCorrect }])
    setShowResult(true)
  }

  const handleContinue = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameFinished(true)
    }
  }

  const restartGame = () => {
    // Convert from quiz-automacao_doc.json format to expected format
    const convertedQuestions = quizData.questions.map((q, index) => {
      const options = q.opcoes.map(option => option.trim())
      const correctAnswerIndex = parseInt(q.indice_correto, 10)
      const correctAnswer = options[correctAnswerIndex]

      return {
        id: Math.random().toString(36).substring(2, 11),
        question: q.pergunta.trim(),
        options: options,
        correctAnswer: correctAnswer,
        explanation: q.explicacao.trim()
      }
    })
    
    const shuffledQuestions = shuffleArray(convertedQuestions)
    setQuestions(shuffledQuestions)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowResult(false)
    setGameFinished(false)
    resetTimer(totalTime) // Reset time to configured total
    setGameStarted(false)
    setUserInfo(null)
  }

  const calculateScore = () => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length
    return (correctAnswers / totalQuestions) * 100
  }

  // Função para formatar tempo (usando utilitário padronizado)
  const formatTime = formatQuizTime

  if (!gameStarted) {
    return (
      <QuizFlowWrapper
        quizTitle="Mestre da Automação"
        onQuizStart={handleQuizStart}
        onUserInfoSubmit={handleUserInfoSubmit}
        onShowCertificate={() => {}}
        score={calculateScore()}
        onShareLinkedIn={(url) => window.open(url, '_blank')}
      >
        <div className="text-center">Preparando o quiz...</div>
      </QuizFlowWrapper>
    )
  }

  if (gameFinished) {
    const score = calculateScore()
    const correctAnswers = answers.filter(answer => answer.isCorrect).length

    return (
      <QuizFlowWrapper
        quizTitle="Mestre da Automação"
        onQuizStart={handleQuizStart}
        onUserInfoSubmit={handleUserInfoSubmit}
        onShowCertificate={() => {}}
        score={score}
        onShareLinkedIn={(url) => window.open(url, '_blank')}
      >
        <div className="min-h-screen bg-background p-2 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="bg-card border rounded-lg p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-3 w-full sm:w-auto">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">Quiz Finalizado!</h1>
                      <p className="text-muted-foreground">Mestre da Automação</p>
                    </div>
            </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/quizzes')}
                    className="text-muted-foreground hover:text-foreground"
                    title="Voltar aos Quizzes"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Resultado */}
            <Card className="w-full overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="w-12 h-12 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground">
                  Parabéns!
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Você completou o quiz Mestre da Automação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">{Math.round(score)}%</div>
                    <div className="text-sm text-muted-foreground">Pontuação Final</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-green-600">{correctAnswers}</div>
                    <div className="text-sm text-muted-foreground">Respostas Corretas</div>
                  </div>
            <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-600">{totalQuestions}</div>
                    <div className="text-sm text-muted-foreground">Total de Questões</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => {
                      const score = Math.round((answers.filter(answer => answer.isCorrect).length / totalQuestions) * 100)
                      
                      // Verificar se atingiu a pontuação mínima (70%)
                      if (score < 70) {
                        alert('Você precisa atingir pelo menos 70% de acertos para gerar um certificado.')
                        return
                      }

                      // Construir URL com parâmetros
                      const params = new URLSearchParams({
                        quiz: 'Desafio: Mestre da Automação',
                        nome: userInfo?.name || 'Usuário',
                        score: answers.filter(answer => answer.isCorrect).length.toString(),
                        total: totalQuestions.toString(),
                        data: new Date().toISOString(),
                        linkedin: userInfo?.linkedinUrl || ''
                      });
                      
                      // Navegar para a página do certificado
                      navigate(`/certificado?${params.toString()}`);
                    }}
                    className={`w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-primary-foreground ${
                      Math.round((answers.filter(answer => answer.isCorrect).length / totalQuestions) * 100) < 70 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    size="lg"
                    disabled={Math.round((answers.filter(answer => answer.isCorrect).length / totalQuestions) * 100) < 70}
                  >
                    <Trophy className="mr-2 h-5 w-5" />
                    Gerar Certificado
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={restartGame}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                <RotateCcw className="mr-2 h-5 w-5" />
                      Reiniciar Quiz
                    </Button>
                    <Button
                      onClick={() => navigate('/quizzes')}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      <Home className="mr-2 h-5 w-5" />
                      Voltar aos Quizzes
              </Button>
                  </div>
            </div>
          </CardContent>
        </Card>
      </div>
        </div>
      </QuizFlowWrapper>
    )
  }

  // Renderização simplificada - apenas verificar se o quiz foi iniciado
  if (!gameStarted) {
    return (
      <QuizFlowWrapper
        quizTitle="Desafio: Mestre da Automação"
        onQuizStart={handleQuizStart}
        onUserInfoSubmit={handleUserInfoSubmit}
        onShowCertificate={() => {}}
      >
        <div></div>
      </QuizFlowWrapper>
    )
  }

  // Se o quiz foi iniciado, mostrar as questões
  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  // Se não há questão atual, mostrar carregamento
  if (!question) {
    return (
      <QuizFlowWrapper
        quizTitle="Desafio: Mestre da Automação"
        onQuizStart={handleQuizStart}
        onUserInfoSubmit={handleUserInfoSubmit}
        onShowCertificate={() => {}}
      >
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Preparando questões...</p>
          </div>
        </div>
      </QuizFlowWrapper>
    )
  }

  return (
    <QuizFlowWrapper
      quizTitle="Mestre da Automação"
      onQuizStart={handleQuizStart}
      onUserInfoSubmit={handleUserInfoSubmit}
      onShowCertificate={() => {}}
      score={calculateScore()}
      onShareLinkedIn={(url) => window.open(url, '_blank')}
    >
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Header com progresso e timer */}
          <div className="bg-card border rounded-lg p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-3 w-full sm:w-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="text-sm font-semibold">
                      Questão {currentQuestion + 1} de {totalQuestions}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {Math.round(progress)}% Concluído
                    </Badge>
          </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 text-lg font-mono">
                      <Clock className="w-5 h-5" />
                      <span className={getTimeLeftClasses(timeLeft)}>
                        {formatTime(timeLeft)}
            </span>
          </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/quizzes')}
                      className="text-muted-foreground hover:text-foreground"
                      title="Sair do Quiz"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <Progress value={progress} className="w-full h-2" />
          </div>
        </div>
      </div>

          {/* Questão */}
          <Card className="w-full overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl leading-relaxed break-words overflow-wrap-anywhere">
                {question.question}
              </CardTitle>
        </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6">
              <div className="grid gap-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrect = showResult && option === question.correctAnswer
                  const isIncorrect = showResult && index === selectedAnswer && option !== question.correctAnswer
                  
                  let cardClass = "w-full p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md "
                  
                  if (showResult) {
                    if (isCorrect) {
                      cardClass += "bg-green-50 border-green-300 text-green-900"
                    } else if (isIncorrect) {
                      cardClass += "bg-red-50 border-red-300 text-red-900"
                    } else {
                      cardClass += "opacity-50 bg-gray-50 border-gray-200"
                    }
                  } else if (isSelected) {
                    cardClass += "bg-blue-600 border-blue-600 text-primary-foreground shadow-lg ring-2 ring-blue-200 transform scale-[1.02]"
                  } else {
                    cardClass += "bg-card border-border text-card-foreground hover:border-blue-400 hover:bg-accent"
                  }

                  return (
                    <div key={index}>
                      <div
                        className={cardClass}
                        onClick={() => !showResult && handleAnswerSelect(index)}
                        role="button"
                        tabIndex={showResult ? -1 : 0}
                        onKeyDown={(e) => {
                          if (!showResult && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault()
                            handleAnswerSelect(index)
                          }
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Marcador da Alternativa */}
                          <div className="flex-shrink-0">
                            {isSelected && !showResult ? (
                              <div className="w-6 h-6 rounded-full bg-primary-foreground flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                              </div>
                            ) : (
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                                isSelected && !showResult 
                                  ? 'border-white' 
                                  : showResult && isCorrect
                                  ? 'border-green-600 bg-green-100 text-green-600'
                                  : showResult && isIncorrect
                                  ? 'border-red-600 bg-red-100 text-red-600'
                                  : 'border-border text-card-foreground'
                              }`}>
                                {String.fromCharCode(65 + index)}
                  </div>
                            )}
                </div>
                          
                          {/* Texto da Alternativa */}
                          <div className="flex-1 min-w-0">
                            <span className={`text-sm sm:text-base leading-relaxed break-words overflow-wrap-anywhere whitespace-normal ${
                              isSelected && !showResult ? 'font-semibold text-primary-foreground' : ''
                            }`}>
                              {option}
                            </span>
          </div>

                          {/* Ícone de Status */}
                          <div className="flex-shrink-0">
                            {showResult && isCorrect && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                            {showResult && isIncorrect && (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                </div>
              </div>
                </div>
                  )
                })}
              </div>

              {showResult && (
                <div className="mt-4 sm:mt-6 space-y-4">
                  {(() => {
                    const isCorrect = question.options[selectedAnswer] === question.correctAnswer
                    return (
                      <div className={`p-4 rounded-lg border-2 ${
                        isCorrect 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-3">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <h4 className={`font-semibold text-sm sm:text-base ${
                            isCorrect ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {isCorrect ? 'Você acertou!' : 'Você errou!'}
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <h5 className={`font-medium text-sm ${
                            isCorrect ? 'text-green-700' : 'text-red-700'
                          }`}>
                            Explicação:
                          </h5>
                          <p className={`text-xs sm:text-sm break-words overflow-wrap-anywhere leading-relaxed ${
                            isCorrect ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {isCorrect ? question.explanation : question.explanation.replace(/^Correto\.\s*/, '')}
                          </p>
                        </div>
                      </div>
                    )
                  })()}
                  <Button
                    onClick={handleContinue}
                    className="w-full sm:w-auto sm:min-w-[200px]"
                    size="lg"
                  >
                    {currentQuestion === totalQuestions - 1 ? 'Finalizar Desafio' : 'Próxima Pergunta'}
                  </Button>
            </div>
          )}

              {!showResult && (
                <div className="mt-6">
              <Button 
                    onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                    className="w-full sm:w-auto sm:min-w-[200px]"
                    size="lg"
              >
                    {selectedAnswer !== null ? 'Confirmar Resposta' : 'Selecione uma resposta'}
              </Button>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
      </div>
    </QuizFlowWrapper>
  )
}

export default AutomationMasterGame