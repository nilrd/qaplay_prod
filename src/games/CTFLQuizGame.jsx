import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, RotateCcw, Trophy, Clock, Target, BookOpen } from 'lucide-react'
import questionsData from '../data/quiz-ctfl.json'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import CertificateModal from '@/components/CertificateModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import QuizConfigModal from '@/components/QuizConfigModal';
import UserInfoModal from '@/components/UserInfoModal';
import { useQuizTimer, calculateQuizTime, formatQuizTime, getTimeLeftClasses } from '../hooks/useQuizTimer';

const CTFLQuizGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [gameMode, setGameMode] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(20);
  const [totalTime, setTotalTime] = useState(calculateQuizTime(20));

  // Hook do temporizador padronizado
  const { timeLeft, resetTimer } = useQuizTimer(
    totalTime,
    gameStarted,
    gameFinished,
    () => setGameFinished(true)
  )

  // Fisher-Yates Shuffle algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startGame = (mode) => {
    const allQuestions = questionsData.questions;

    // Embaralhar todas as questões e selecionar o número configurado
    let questionsToUse = shuffleArray(allQuestions).slice(0, totalQuestions);

    // Embaralhar as opções de cada questão
    const shuffledQWithOptions = questionsToUse.map(q => {
      const shuffledOptions = shuffleArray(q.options);
      
      return {
        ...q,
        options: shuffledOptions,
        correctAnswer: q.correctAnswer // Manter como string para validação
      };
    });

    setShuffledQuestions(shuffledQWithOptions);
    setGameStarted(true);
    setGameMode(mode);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswerIndex(null);
    setShowExplanation(false);
    setGameFinished(false);
    if (mode === 'simulado') {
      resetTimer(totalTime); // Usar tempo configurado para o modo simulado
    }
    setIsCertificateModalOpen(false);
    setFullName('');
    setLinkedinProfile('');
    // O hook useQuizTimer já gerencia o temporizador automaticamente
  };

  const handleTimeUp = () => {
    if (gameMode === 'simulado') {
      finishGame();
    } else {
      // No modo aprendizado, o tempo livre não deve esgotar o jogo, apenas mostrar a explicação se o usuário quiser
      // setIsTimeUpModalOpen(true); // Não abre modal de tempo esgotado no modo aprendizado
      // setShowExplanation(true); // Não força explicação, o usuário controla
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showExplanation && gameMode === 'aprendizado') return; // Permite selecionar apenas uma vez no modo aprendizado
    setSelectedAnswerIndex(answerIndex);
    
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = currentQuestion.options[answerIndex] === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    if (gameMode === 'aprendizado') {
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    setIsTimeUpModalOpen(false);
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswerIndex(null);
      setShowExplanation(false);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    clearInterval(timerRef.current);
    setGameFinished(true);
    
    // Para modo simulado, mostrar explicações
    if (gameMode === 'simulado') {
      setShowExplanation(true);
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
    resetTimer(totalTime); // Usar tempo configurado
    setIsTimeUpModalOpen(false);
    setIsCertificateModalOpen(false);
    setFullName('');
    setLinkedinProfile('');
    setGameMode('');
  };

  // Função para lidar com configuração do quiz
  const handleQuizConfig = (questionCount, timeInSeconds) => {
    setTotalQuestions(questionCount);
    setTotalTime(timeInSeconds);
    setShowConfigModal(false);
    setShowUserModal(true);
  };

  // Função para lidar com informações do usuário
  const handleUserInfo = (userData) => {
    setFullName(userData.name);
    setLinkedinProfile(userData.linkedinUrl);
    setShowUserModal(false);
    // Iniciar o jogo após coletar informações do usuário
    startGame('simulado');
  };

  const getScoreMessage = () => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage >= 90) return 'Excelente! Você é um expert em CTFL! 🏆';
    if (percentage >= 70) return 'Muito bom! Você tem um ótimo conhecimento em CTFL! 🎉';
    if (percentage >= 50) return 'Bom trabalho! Continue estudando para melhorar! 📚';
    return 'Continue praticando! Todo expert já foi iniciante! 💪';
  };

  const handleGenerateCertificate = () => {
    if (fullName && linkedinProfile) {
      setIsCertificateModalOpen(true);
    } else {
      alert('Por favor, preencha seu nome completo e o link do seu perfil do LinkedIn para gerar o certificado.');
    }
  };

  const currentQ = shuffledQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  // Função para formatar tempo (usando utilitário padronizado)
  const formatTime = formatQuizTime;

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <CardTitle className="text-2xl">CTFL Questions Game</CardTitle>
            <CardDescription className="text-lg">
              Teste seus conhecimentos no Syllabus ISTQB CTFL 4.0
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Sobre o Jogo</h3>
              <p className="text-sm text-blue-800 text-left">
                Este jogo foi desenvolvido para ajudar você a se preparar para a certificação ISTQB CTFL 4.0. 
                Com 150 questões cuidadosamente elaboradas baseadas no syllabus oficial, você pode praticar 
                em dois modos diferentes para maximizar seu aprendizado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={() => setShowConfigModal(true)} size="lg" className="w-full">
                <Target className="mr-2 h-5 w-5" />
                Modo Simulado Configurável
              </Button>
              <Button onClick={() => startGame('aprendizado')} size="lg" className="w-full" variant="outline">
                <BookOpen className="mr-2 h-5 w-5" />
                Modo Aprendizado (Tempo Livre)
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Regras do Jogo:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• <strong>Modo Simulado:</strong> Configure 20, 50 ou 100 questões com tempo proporcional (60s por questão).</li>
                <li>• <strong>Modo Aprendizado:</strong> 20 questões, tempo livre, feedback imediato.</li>
                <li>• Questões randomizadas e balanceadas por nível.</li>
                <li>• Alternativas embaralhadas para evitar padrões previsíveis.</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Sugestões de Estudo</h3>
              <ul className="text-sm text-green-800 space-y-1 text-left">
                <li>• Estude o Syllabus ISTQB CTFL 4.0 oficial</li>
                <li>• Pratique com exames de amostra do ISTQB</li>
                <li>• Revise os conceitos fundamentais de teste de software</li>
                <li>• Participe de grupos de estudo e fóruns especializados</li>
                <li>• Faça cursos preparatórios reconhecidos pelo ISTQB</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                Baseado no Syllabus ISTQB® CTFL 4.0 | 
                <a href="https://www.istqb.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                  International Software Testing Qualifications Board
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameFinished) {
    const percentage = (score / shuffledQuestions.length) * 100;
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Jogo Finalizado!</CardTitle>
            <CardDescription className="text-lg">
              {getScoreMessage()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Acertos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{percentage.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Aproveitamento</div>
              </div>
            </div>

            <div className="space-y-4 mt-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold">Gerar Certificado de Conclusão</h3>
              <p className="text-sm text-muted-foreground">Preencha seus dados para gerar um certificado e compartilhar seu resultado no LinkedIn.</p>
              <div className="grid gap-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu Nome Completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="linkedinProfile">Link do Perfil LinkedIn</Label>
                <Input
                  id="linkedinProfile"
                  type="url"
                  placeholder="https://linkedin.com/in/seuperfil"
                  value={linkedinProfile}
                  onChange={(e) => setLinkedinProfile(e.target.value)}
                  autoComplete="url"
                />
              </div>
              <Button onClick={handleGenerateCertificate} className="w-full">
                Gerar Certificado e Compartilhar
              </Button>
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

        <CertificateModal
          isOpen={isCertificateModalOpen}
          onClose={() => setIsCertificateModalOpen(false)}
          fullName={fullName}
          score={score}
          totalQuestions={shuffledQuestions.length}
          linkedinProfile={linkedinProfile}
        />
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
        {timeLeft !== null && (
          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border shadow-sm">
            <Clock className="h-4 w-4" />
            <span className={`font-mono text-lg font-bold ${getTimeLeftClasses(timeLeft)}`}>
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs text-gray-500">restante</span>
          </div>
        )}
        {timeLeft === null && (
          <div className="flex items-center space-x-2 bg-green-50 p-2 rounded-lg border border-green-200">
            <BookOpen className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700 font-medium">Tempo Livre</span>
          </div>
        )}
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
              const isCorrectOption = option === currentQ.correctAnswer;
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
                  key={option.text} // Use option.text as key for stable rendering after shuffling
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

          {showExplanation && gameMode === 'aprendizado' && (
            <Button onClick={handleNextQuestion} className="w-full" size="lg">
              {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
            </Button>
          )}

          {gameMode === 'simulado' && (
            <Button onClick={handleNextQuestion} className="w-full" size="lg" disabled={selectedAnswerIndex === null && gameMode === 'simulado'}>
              {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Próxima Pergunta' : 'Finalizar'}
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={isTimeUpModalOpen} onOpenChange={setIsTimeUpModalOpen}>
        <DialogContent className="sm:max-w-[425px] text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600">Tempo Esgotado!</DialogTitle>
            <DialogDescription className="mt-2">
              O tempo para o simulado acabou. Vamos ver seus resultados!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleNextQuestion} className="w-full mt-4">Ver Resultado</Button>
        </DialogContent>
      </Dialog>

      {/* Modal de Configuração do Quiz */}
      <QuizConfigModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onStart={handleQuizConfig}
        quizTitle="CTFL 4.0"
      />

      {/* Modal de Informações do Usuário */}
      <UserInfoModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSubmit={handleUserInfo}
      />
    </div>
  );
};

export default CTFLQuizGame;



