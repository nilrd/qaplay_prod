import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw, Home, X, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import quizData from '../data/quiz-ctfl.json'
import QuizFlowWrapper from '../components/QuizFlowWrapper'
import { useQuizTimer, calculateQuizTime, formatQuizTime, getTimeLeftClasses } from '../hooks/useQuizTimer'

const CTFL100Quiz = () => {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(20)
  const [totalTime, setTotalTime] = useState(calculateQuizTime(20))
  const [userInfo, setUserInfo] = useState(null)

  // Função para embaralhar array
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Embaralhar perguntas no início
  useEffect(() => {
    const shuffledQuestions = shuffleArray(quizData.questions)
    setQuestions(shuffledQuestions)
  }, [])

  // Hook do temporizador padronizado
  const { timeLeft, resetTimer } = useQuizTimer(
    totalTime,
    gameStarted,
    gameFinished,
    () => setGameFinished(true)
  )

  // Função para iniciar o quiz com configurações
  const handleQuizStart = (questionCount, timeInSeconds) => {
    setTotalQuestions(questionCount)
    setTotalTime(timeInSeconds)
    
    // Usar questões diretamente sem limitedQuestions
    const shuffledQuestions = shuffleArray(quizData.questions)
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

  const handleAnswerSelect = (index) => {
    if (!showResult) {
      setSelectedAnswer(index)
    }
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const question = questions[currentQuestion]
    const isCorrect = question.options[selectedAnswer] === question.correctAnswer

    const newAnswer = {
      questionIndex: currentQuestion,
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect,
      correctAnswer: question.correctAnswer
    }

    setAnswers([...answers, newAnswer])
    setShowResult(true)
  }

  const handleContinue = () => {
    if (currentQuestion === totalQuestions - 1) {
      setGameFinished(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const calculateScore = () => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length
    return Math.round((correctAnswers / totalQuestions) * 100)
  }

  const formatTime = formatQuizTime

  if (!gameStarted) {
    return (
      <QuizFlowWrapper
        quizTitle="Mestre da Qualidade"
        onQuizStart={handleQuizStart}
        onUserInfoSubmit={handleUserInfoSubmit}
        onShowCertificate={() => {}}
      >
        <div></div>
      </QuizFlowWrapper>
    )
  }

  if (gameFinished) {
    const score = calculateScore()
    const correctAnswers = answers.filter(answer => answer.isCorrect).length

    return (
      <QuizFlowWrapper
        quizTitle="Mestre da Qualidade"
        onQuizStart={handleQuizStart}
        onUserInfoSubmit={handleUserInfoSubmit}
        onShowCertificate={() => {}}
        score={score}
        onShareLinkedIn={(url) => window.open(url, '_blank')}
      >
        <div className="min-h-screen bg-background p-2 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="bg-card border rounded-lg p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-3 w-full sm:w-auto">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Quiz Concluído!</h1>
                  <p className="text-muted-foreground">Parabéns por completar o desafio!</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/quizzes')}
                  className="text-muted-foreground hover:text-foreground"
                  title="Voltar aos Quizzes"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar aos Quizzes
                </Button>
              </div>
            </div>

            <Card className="w-full overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl">Excelente Trabalho!</CardTitle>
                <CardDescription className="text-lg">
                  Você completou o quiz com {correctAnswers} de {totalQuestions} acertos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{score}%</div>
                  <div className="text-lg text-muted-foreground">Taxa de Acerto</div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      const score = Math.round((answers.filter(answer => answer.isCorrect).length / totalQuestions) * 100)
                      
                      if (score < 70) {
                        alert('Você precisa atingir pelo menos 70% de acertos para gerar um certificado.')
                        return
                      }

                      const params = new URLSearchParams({
                        quiz: 'Mestre da Qualidade',
                        nome: userInfo?.name || 'Usuário',
                        score: answers.filter(answer => answer.isCorrect).length.toString(),
                        totalQuestions: totalQuestions.toString(),
                        percentage: score.toString(),
                        data: new Date().toISOString(),
                        level: score >= 90 ? 'Avançado' : score >= 70 ? 'Intermediário' : 'Precisa Estudar'
                      })
                      
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </QuizFlowWrapper>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  if (!question) {
    return (
      <QuizFlowWrapper
        quizTitle="Mestre da Qualidade"
        onQuizStart={handleQuizStart}
        onUserInfoSubmit={handleUserInfoSubmit}
        onShowCertificate={() => {}}
      >
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Carregando questão...</p>
          </div>
        </div>
      </QuizFlowWrapper>
    )
  }

  return (
    <QuizFlowWrapper
      quizTitle="Desafio: Mestre da Qualidade"
      onQuizStart={handleQuizStart}
      onUserInfoSubmit={handleUserInfoSubmit}
      onShowCertificate={() => {}}
      score={calculateScore()}
      onShareLinkedIn={(url) => window.open(url, '_blank')}
    >
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
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
                  <div className="flex items-center space-x-2 text-lg font-mono">
                    <Clock className="w-5 h-5" />
                    <span className={getTimeLeftClasses(timeLeft)}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/quizzes')}
                className="text-muted-foreground hover:text-foreground"
                title="Voltar aos Quizzes"
              >
                <X className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>

          <Card className="w-full overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl leading-relaxed">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option, index) => {
                let cardClass = "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 text-left w-full "
                
                if (showResult) {
                  if (index === selectedAnswer) {
                    cardClass += question.options[selectedAnswer] === question.correctAnswer
                      ? "bg-green-100 border-green-500 text-green-800"
                      : "bg-red-100 border-red-500 text-red-800"
                  } else if (question.options[index] === question.correctAnswer) {
                    cardClass += "bg-green-100 border-green-500 text-green-800"
                  } else {
                    cardClass += "bg-gray-100 border-gray-300 text-gray-600"
                  }
                } else {
                  if (selectedAnswer === index) {
                    cardClass += "bg-blue-600 border-blue-600 text-primary-foreground shadow-lg ring-2 ring-blue-200 transform scale-[1.02]"
                  } else {
                    cardClass += "bg-card border-border text-card-foreground hover:border-blue-400 hover:bg-accent"
                  }
                }

                return (
                  <div key={index}>
                    <div
                      className={cardClass}
                      onClick={() => !showResult && handleAnswerSelect(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          !showResult && handleAnswerSelect(index)
                        }
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                          showResult
                            ? index === selectedAnswer
                              ? question.options[selectedAnswer] === question.correctAnswer
                                ? "bg-green-500 border-green-500 text-white"
                                : "bg-red-500 border-red-500 text-white"
                              : question.options[index] === question.correctAnswer
                                ? "bg-green-500 border-green-500 text-white"
                                : "bg-gray-300 border-gray-300 text-gray-600"
                            : selectedAnswer === index
                              ? "bg-blue-500 border-blue-500 text-white"
                              : "bg-transparent border-gray-300 text-gray-600"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {showResult && (
                          <div className="flex items-center space-x-2">
                            {index === selectedAnswer && (
                              question.options[selectedAnswer] === question.correctAnswer ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500" />
                              )
                            )}
                            {question.options[index] === question.correctAnswer && index !== selectedAnswer && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

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
                        <div className="flex items-start space-x-3">
                          {isCorrect ? (
                            <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <h4 className={`font-semibold text-lg ${
                              isCorrect ? 'text-green-800' : 'text-red-800'
                            }`}>
                              {isCorrect ? 'Correto!' : 'Incorreto'}
                            </h4>
                            <p className={`text-sm mt-1 ${
                              isCorrect ? 'text-green-700' : 'text-red-700'
                            }`}>
                              {isCorrect 
                                ? 'Parabéns! Você acertou esta questão.' 
                                : `A resposta correta é: ${question.correctAnswer}`
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                  
                  <div className="flex justify-center">
                    <Button
                      onClick={handleContinue}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
                      size="lg"
                    >
                      {currentQuestion === totalQuestions - 1 ? 'Ver Resultado Final' : 'Próxima Questão'}
                    </Button>
                  </div>
                </div>
              )}

              {!showResult && selectedAnswer !== null && (
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
                    size="lg"
                  >
                    Confirmar Resposta
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

export default CTFL100Quiz