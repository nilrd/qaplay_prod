import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import ctfl100Questions from '../data/ctfl100Questions.json'
import UserInfoModal from '../components/UserInfoModal'
import CertificateModal from '../components/CertificateModal'

const CTFL100Quiz = () => {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutos em segundos
  const [gameStarted, setGameStarted] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
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
    const shuffledQuestions = shuffleArray(ctfl100Questions)
    setQuestions(shuffledQuestions)
  }, [])

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameFinished && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameFinished(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameStarted, gameFinished, timeLeft])

  // Detectar mudança de aba/minimização
  useEffect(() => {
    if (!gameStarted || gameFinished || showResult) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Marcar questão atual como incorreta e avançar
        const newAnswers = [...answers, {
          questionId: questions[currentQuestion]?.id,
          selectedAnswer: -1, // -1 indica resposta perdida por mudança de aba
          correct: false
        }]
        setAnswers(newAnswers)
        
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1)
          setSelectedAnswer(null)
        } else {
          setGameFinished(true)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [gameStarted, gameFinished, showResult, currentQuestion, answers, questions])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, {
      questionId: questions[currentQuestion].id,
      selectedAnswer,
      correct: selectedAnswer === questions[currentQuestion].correctAnswer
    }]
    setAnswers(newAnswers)
    setShowResult(true)
  }

  const handleContinue = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      handleGameFinish()
    }
  }

  const calculateScore = () => {
    const correct = answers.filter(answer => answer.correct).length
    return {
      correct,
      total: answers.length,
      percentage: Math.round((correct / answers.length) * 100)
    }
  }

  const getScoreLevel = (percentage) => {
    if (percentage >= 90) return { level: 'Expert', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage >= 80) return { level: 'Avançado', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (percentage >= 70) return { level: 'Intermediário', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (percentage >= 60) return { level: 'Iniciante', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { level: 'Precisa Estudar', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowResult(false)
    setGameFinished(false)
    setTimeLeft(60 * 60)
    setGameStarted(false)
    setShowUserModal(false)
    setShowCertificate(false)
    setUserInfo(null)
    // Embaralhar perguntas novamente
    const shuffledQuestions = shuffleArray(ctfl100Questions)
    setQuestions(shuffledQuestions)
  }

  const startGame = () => {
    setShowUserModal(true)
  }

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info)
    setShowUserModal(false)
    setGameStarted(true)
  }

  const handleGameFinish = () => {
    setGameFinished(true)
    setShowCertificate(true)
  }

  if (!gameStarted) {
    return (
      <>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Desafio: Mestre da Qualidade
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Você enfrentará 100 questões baseadas no conteúdo oficial do CTFL. Ao final, você poderá compartilhar sua pontuação no LinkedIn com um certificado personalizado.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Instruções do Desafio</CardTitle>
              <CardDescription>Leia atentamente antes de começar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">100</span>
                  </div>
                  <span>100 questões de múltipla escolha</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-orange-500" />
                  <span>60 minutos para completar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <span>Baseado no CTFL 4.0</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <span>Feedback imediato</span>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Níveis de Classificação:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>90-100%</span>
                    <Badge className="bg-green-100 text-green-800">Expert</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>80-89%</span>
                    <Badge className="bg-blue-100 text-blue-800">Avançado</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>70-79%</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Intermediário</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>60-69%</span>
                    <Badge className="bg-orange-100 text-orange-800">Iniciante</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Abaixo de 60%</span>
                    <Badge className="bg-red-100 text-red-800">Precisa Estudar</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-sm">
                <p className="text-blue-800">
                  <strong>Importante:</strong> Se você minimizar o navegador ou trocar de aba durante o jogo, 
                  a questão atual será marcada como incorreta automaticamente.
                </p>
              </div>

              <Button onClick={startGame} size="lg" className="w-full">
                Iniciar Desafio
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Modais */}
        {showUserModal && (
          <UserInfoModal 
            onStart={handleUserInfoSubmit}
            onClose={() => setShowUserModal(false)}
          />
        )}
      </>
    )
  }

  if (gameFinished) {
    const score = calculateScore()
    const level = getScoreLevel(score.percentage)
    
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Desafio Concluído!
          </h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl">Seu Resultado</CardTitle>
            <CardDescription>Baseado no syllabus CTFL 4.0</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary">
                {score.percentage}%
              </div>
              <Badge className={`text-lg px-4 py-2 ${level.bg} ${level.color}`}>
                {level.level}
              </Badge>
              <p className="text-muted-foreground">
                Você acertou {score.correct} de {score.total} questões
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span>{score.correct}/{score.total}</span>
              </div>
              <Progress value={score.percentage} className="h-3" />
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Análise do Desempenho:</h4>
              <p className="text-sm text-muted-foreground">
                {score.percentage >= 90 && "Excelente! Você demonstra domínio avançado dos conceitos de QA e está pronto para certificações."}
                {score.percentage >= 80 && score.percentage < 90 && "Muito bom! Você tem conhecimento sólido em QA, continue estudando para alcançar a excelência."}
                {score.percentage >= 70 && score.percentage < 80 && "Bom desempenho! Você tem uma base sólida, mas há espaço para aprimoramento em algumas áreas."}
                {score.percentage >= 60 && score.percentage < 70 && "Você está no caminho certo! Continue estudando e praticando para fortalecer seus conhecimentos."}
                {score.percentage < 60 && "Recomendamos revisar os conceitos fundamentais de QA e praticar mais antes de tentar novamente."}
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={restartGame} variant="outline" className="flex-1">
                <RotateCcw className="mr-2 h-4 w-4" />
                Tentar Novamente
              </Button>
              <Button asChild className="flex-1">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Voltar ao Início
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  // Verificar se as perguntas foram carregadas
  if (!questions.length) {
    return <div className="text-center">Carregando perguntas...</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header com progresso e timer */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Questão {currentQuestion + 1} de {questions.length}
            </span>
            <Badge variant="outline">{Math.round(progress)}%</Badge>
          </div>
          <Progress value={progress} className="w-64" />
        </div>
        <div className="flex items-center space-x-2 text-lg font-mono">
          <Clock className="w-5 h-5" />
          <span className={timeLeft < 300 ? 'text-red-500' : 'text-muted-foreground'}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Questão */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {question.options.map((option, index) => {
              let buttonClass = "justify-start text-left h-auto p-4 "
              
              if (showResult) {
                if (index === question.correctAnswer) {
                  buttonClass += "bg-green-100 border-green-500 text-green-800 hover:bg-green-100"
                } else if (index === selectedAnswer && index !== question.correctAnswer) {
                  buttonClass += "bg-red-100 border-red-500 text-red-800 hover:bg-red-100"
                } else {
                  buttonClass += "opacity-50"
                }
              } else if (selectedAnswer === index) {
                buttonClass += "bg-primary text-primary-foreground"
              } else {
                buttonClass += "hover:bg-muted"
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <span className="font-semibold min-w-[24px]">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="flex-1">{option}</span>
                    {showResult && index === question.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </Button>
              )
            })}
          </div>

          {showResult && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Explicação:</h4>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
              <Button 
                onClick={handleContinue} 
                className="w-full"
                size="lg"
              >
                {currentQuestion === ctfl100Questions.length - 1 ? 'Finalizar Desafio' : 'Próxima Pergunta'}
              </Button>
            </div>
          )}

          {!showResult && (
            <Button 
              onClick={handleNextQuestion} 
              disabled={selectedAnswer === null}
              className="w-full mt-6"
              size="lg"
            >
              {selectedAnswer !== null ? 'Confirmar Resposta' : 'Selecione uma resposta'}
            </Button>
          )}
        </CardContent>
      </Card>
      
      {/* Modais */}
      {showUserModal && (
        <UserInfoModal 
          onStart={handleUserInfoSubmit}
          onClose={() => setShowUserModal(false)}
        />
      )}
      
      {showCertificate && userInfo && (
        <CertificateModal 
          userInfo={userInfo}
          score={calculateScore()}
          onClose={() => setShowCertificate(false)}
          onShareLinkedIn={(url) => window.open(url, '_blank')}
        />
      )}
    </div>
  )
}

export default CTFL100Quiz

