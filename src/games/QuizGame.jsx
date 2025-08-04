import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, RotateCcw, Trophy, Clock, Target } from 'lucide-react'
import questionsData from '../data/quizQuestions.json'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const QuizGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // 30 segundos por pergunta
  const [gameStarted, setGameStarted] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState(false);
  const timerRef = useRef(null);

  // Fisher-Yates Shuffle algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startGame = () => {
    const shuffledQ = shuffleArray(questionsData);
    const shuffledQWithOptions = shuffledQ.map(q => ({
      ...q,
      originalOptions: [...q.options],
      options: shuffleArray(q.options.map((option, index) => ({ text: option, originalIndex: index }))),
    }));
    setShuffledQuestions(shuffledQWithOptions);
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswerIndex(null);
    setShowExplanation(false);
    setGameFinished(false);
    setTimeLeft(30);
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleTimeUp = () => {
    setIsTimeUpModalOpen(true);
    setShowExplanation(true);
    // Se o tempo acabar e o usuário não selecionou uma resposta, trate como incorreta
    if (selectedAnswerIndex === null) {
      // Não adiciona pontos e mostra a explicação
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showExplanation) return;
    setSelectedAnswerIndex(answerIndex);
    setShowExplanation(true);

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[answerIndex];
    const isCorrect = selectedOption.originalIndex === currentQuestion.correct;

    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 3);
      setScore(prevScore => prevScore + 10 + timeBonus);
    }
  };

  const handleNextQuestion = () => {
    setIsTimeUpModalOpen(false);
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswerIndex(null);
      setShowExplanation(false);
      setTimeLeft(30);
      startTimer();
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    clearInterval(timerRef.current);
    setGameFinished(true);
    // Lógica para salvar melhor pontuação, se houver
    const savedBestScore = localStorage.getItem('qaplay-quiz-best-score');
    if (!savedBestScore || score > parseInt(savedBestScore)) {
      localStorage.setItem('qaplay-quiz-best-score', score.toString());
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setScore(0);
    setShowExplanation(false);
    setGameFinished(false);
    setShuffledQuestions([]);
    setTimeLeft(30);
    setIsTimeUpModalOpen(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / (shuffledQuestions.length * 10)) * 100;
    if (percentage >= 90) return "Excelente! Você é um expert em QA! 🏆";
    if (percentage >= 70) return "Muito bom! Você tem um ótimo conhecimento em QA! 🎉";
    if (percentage >= 50) return "Bom trabalho! Continue estudando para melhorar! 📚";
    return "Continue praticando! Todo expert já foi iniciante! 💪";
  };

  const currentQ = shuffledQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  const currentBestScore = localStorage.getItem('qaplay-quiz-best-score') || 0;

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
                <div className="text-2xl font-bold text-primary">{questionsData.length}</div>
                <div className="text-sm text-muted-foreground">Perguntas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">30s</div>
                <div className="text-sm text-muted-foreground">Por pergunta</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{currentBestScore}</div>
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
    );
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
                <div className="text-3xl font-bold text-primary">{Math.round((score / (shuffledQuestions.length * 10)) * 100)}%</div>
                <div className="text-sm text-muted-foreground">Acertos</div>
              </div>
            </div>
            
            {score > currentBestScore && (
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
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Badge variant="outline">
          Pergunta {currentQuestionIndex + 1} de {shuffledQuestions.length}
        </Badge>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className={`font-mono text-lg ${timeLeft <= 10 ? 'text-red-500 font-bold' : ''}`}>
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
              const isCorrectOption = option.originalIndex === currentQ.correct;
              const isSelected = selectedAnswerIndex === index;

              let buttonClass = "w-full text-left p-4 border rounded-lg transition-colors";
              
              if (showExplanation) {
                if (isCorrectOption) {
                  buttonClass += " bg-green-100 border-green-500 text-green-800";
                } else if (isSelected && !isCorrectOption) {
                  buttonClass += " bg-red-100 border-red-500 text-red-800";
                } else {
                  buttonClass += " bg-muted";
                }
              } else {
                buttonClass += " hover:bg-accent hover:border-primary";
              }

              return (
                <button
                  key={option.originalIndex} // Use originalIndex as key for stable rendering
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option.text}</span>
                    {showExplanation && isCorrectOption && (
                      <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                    )}
                    {showExplanation && isSelected && !isCorrectOption && (
                      <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Explicação:</h4>
              <p className="text-blue-800">{currentQ.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <Button onClick={handleNextQuestion} className="w-full" size="lg">
              {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={isTimeUpModalOpen} onOpenChange={setIsTimeUpModalOpen}>
        <DialogContent className="sm:max-w-[425px] text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600">Tempo Esgotado!</DialogTitle>
            <DialogDescription className="mt-2">
              O tempo para responder a esta pergunta acabou.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleNextQuestion} className="w-full mt-4">Continuar</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizGame;


