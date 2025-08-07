import React, { useState, useEffect } from 'react';
import { Clock, Trophy, Share2, CheckCircle, XCircle, RotateCcw, Download } from 'lucide-react';
import questionsData from '../data/ctfl_150_questions.json';
import BadgeGenerator from '../../components/BadgeGenerator';

const IntelligentQuiz = () => {
  const [gameState, setGameState] = useState("menu"); // 'menu', 'playing', 'finished'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [badgeUrl, setBadgeUrl] = useState(null);
  const [fraudDetected, setFraudDetected] = useState(false);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      finishGame();
    }
  }, [timeLeft, gameState]);

  // Fraud detection effect
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleFraudDetection('Troca de aba ou minimização detectada');
      }
    };

    const handleBlur = () => {
      handleFraudDetection('Perda de foco da janela detectada');
    };

    const handleKeyDown = (e) => {
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        handleFraudDetection('Tentativa de abrir ferramentas de desenvolvedor');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, currentQuestion, questions, answers]);

  // Handle fraud detection
  const handleFraudDetection = (reason) => {
    if (fraudDetected || showFeedback) return;

    setFraudDetected(true);
    alert(`⚠️ ATENÇÃO: ${reason}. A questão atual será marcada como incorreta.`);

    if (currentQuestion < questions.length) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = -1; // -1 indicates incorrect due to fraud
      setAnswers(newAnswers);
      setShowFeedback(true);
      setSelectedAnswer(null);
    }
  };

  // Start the game
  const startGame = () => {
    if (!playerName.trim()) {
      alert('Por favor, insira seu nome para começar o jogo.');
      return;
    }

    // Show rules warning
    const rulesAccepted = window.confirm(
      `📜 **Regras do Quiz Inteligente ISTQB CTFL 4.0**

- Você terá 20 minutos para responder 20 questões (níveis júnior, pleno e sênior).
- Não saia da aba ou minimize o navegador, pois isso marcará a questão atual como incorreta.
- Feedback detalhado será fornecido após cada resposta.
- **Materiais recomendados para estudo:**
  - ISTQB CTFL 4.0 Syllabus (disponível em: https://www.istqb.org/certifications/certified-tester-foundation-level)
  - Livro *Foundations of Software Testing* de Rex Black, Erik van Veenendaal e Dorothy Graham
  - Artigos do blog QA Play (disponíveis em: https://www.qaplay.com.br/blog)
- Seu nível será determinado ao final com base na pontuação.

Clique em OK para aceitar as regras e iniciar o quiz.`
    );

    if (!rulesAccepted) return;

    // Select 20 random questions
    const shuffledQuestions = [...questionsData.questions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, 20).map(q => ({
      ...q,
      question: q.question.replace(/^De acordo com o ISTQB CTFL 4.0, /, '')
    }));

    setQuestions(selectedQuestions);
    setAnswers(new Array(20).fill(null));
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(1200);
    setGameState('playing');
    setShowFeedback(false);
    setSelectedAnswer(null);
    setFraudDetected(false);
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      alert("Por favor, selecione uma opção antes de enviar.");
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowFeedback(true);
  };

  // Go to next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setFraudDetected(false);
    } else {
      finishGame();
    }
  };

  // Finish the game
  const finishGame = () => {
    setGameState("finished");
  };

  // Reset game
  const resetGame = () => {
    setGameState('menu');
    setCurrentQuestion(0);
    setQuestions([]);
    setAnswers([]);
    setTimeLeft(1200);
    setScore(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setFraudDetected(false);
    setBadgeUrl(null);
  };

  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculate percentage
  const getPercentage = () => {
    return Math.round((score / 20) * 100);
  };

  // Get performance message and determine level
  const getPerformanceResult = () => {
    const percentage = getPercentage();
    let level = "";
    let message = "";
    let recommendation = "";

    if (percentage >= 90) {
      level = "Senior";
      message = "🎉 Excelente! Você demonstrou um conhecimento excepcional em Quality Assurance!";
      recommendation = "Você está pronto para liderar projetos de teste e mentorear outros profissionais. Continue se atualizando com as últimas tendências em QA.";
    } else if (percentage >= 75) {
      level = "Pleno";
      message = "👏 Muito bom! Você possui um sólido conhecimento em Quality Assurance!";
      recommendation = "Você tem uma base forte. Para evoluir para sênior, foque em automação de testes, DevOps e gestão de equipes de QA.";
    } else if (percentage >= 60) {
      level = "Junior";
      message = "👍 Bom trabalho! Você tem uma base em Quality Assurance, mas há espaço para crescimento.";
      recommendation = "Continue estudando os fundamentos de teste. Recomendamos revisar o syllabus ISTQB CTFL 4.0 e praticar mais técnicas de teste.";
    } else if (percentage >= 40) {
      level = "Iniciante";
      message = "📚 Você está no caminho certo, mas precisa estudar mais os conceitos fundamentais.";
      recommendation = "Foque nos capítulos 1 e 2 do syllabus ISTQB CTFL 4.0. Pratique com mais exercícios e considere fazer um curso de fundamentos de teste.";
    } else {
      level = "Estudante";
      message = "📖 Não desanime! Todo expert já foi iniciante. É hora de se dedicar aos estudos.";
      recommendation = "Recomendamos começar do zero com o syllabus ISTQB CTFL 4.0. Considere fazer um curso estruturado e praticar regularmente.";
    }

    return { level, message, recommendation };
  };

  // Share on LinkedIn
  const shareOnLinkedIn = () => {
    const percentage = getPercentage();
    const { level, message } = getPerformanceResult();
    
    const shareText = `🎯 Acabei de completar o Quiz Inteligente ISTQB CTFL 4.0 no QA Play!

📊 Meus resultados:
• Pontuação: ${score}/20 (${percentage}%)
• Nível alcançado: ${fraudDetected ? "INVALIDADO" : level}
• Tempo: ${formatTime(1200 - timeLeft)} utilizado

${message}

💡 Este quiz avalia conhecimentos em Quality Assurance baseado no syllabus oficial ISTQB CTFL 4.0, com questões dinâmicas que misturam níveis júnior, pleno e sênior.

Que tal testar seus conhecimentos também? 🚀 Acesse: https://www.qaplay.com.br

#QualityAssurance #ISTQB #Testing #QA #SoftwareTesting #TechSkills #ProfessionalDevelopment`;

    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.qaplay.com.br')}&text=${encodeURIComponent(shareText)}`;
    
    window.open(url, "_blank");
    
    if (badgeUrl) {
      setTimeout(() => {
        alert("💡 Dica: Após abrir o LinkedIn, você pode anexar sua badge personalizada! Use o botão 'Baixar Badge' para salvá-la e anexá-la ao seu post.");
      }, 1000);
    }
  };

  // Handle badge generation
  const handleBadgeGenerated = (url) => {
    setBadgeUrl(url);
  };

  // Download badge
  const downloadBadge = () => {
    if (badgeUrl) {
      const link = document.createElement('a');
      link.href = badgeUrl;
      link.download = `qa-play-badge-${playerName.replace(/\s+/g, '-').toLowerCase()}-${getPercentage()}%.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 p-4">
        <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3">
              Quiz Inteligente ISTQB CTFL 4.0
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Teste seus conhecimentos com questões dinâmicas
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seu Nome
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Digite seu nome"
              />
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Regras do Jogo:</h3>
              <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• 20 questões (júnior, pleno e sênior)</li>
                <li>• 20 minutos para completar</li>
                <li>• Não saia da aba ou minimize o navegador, ou a questão será marcada como incorreta</li>
                <li>• Feedback didático após cada resposta</li>
                <li>• Estude: <a href="https://www.istqb.org/certifications/certified-tester-foundation-level" target="_blank" className="underline">ISTQB CTFL 4.0 Syllabus</a>, <i>Foundations of Software Testing</i>, e artigos do <a href="https://www.qaplay.com.br/blog" target="_blank" className="underline">blog QA Play</a></li>
                <li>• Seu nível será determinado ao final</li>
              </ul>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Aceitar e Iniciar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const currentQ = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 mb-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-gray-800 dark:text-white">{formatTime(timeLeft)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span className="font-semibold text-gray-800 dark:text-white">{score}/20</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-gray-600 dark:text-gray-300">
                  {currentQuestion + 1}/20
                </div>
                {fraudDetected && (
                  <div className="text-red-600 text-xs font-semibold">
                    🔍 FRAUDE DETECTADA
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / 20) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-white leading-tight">
              {currentQ.question}
            </h2>
            
            <div className="space-y-2 sm:space-y-3">
              {currentQ.options.map((option, index) => {
                let buttonClass = "w-full p-3 sm:p-4 text-left border-2 rounded-lg transition-all text-sm sm:text-base ";
                
                if (showFeedback) {
                  if (index === currentQ.correctAnswer) {
                    buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300";
                  } else if (index === selectedAnswer || (answers[currentQuestion] === -1 && index !== currentQ.correctAnswer)) {
                    buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300";
                  } else {
                    buttonClass += "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass += "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-white";
                  } else {
                    buttonClass += "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showFeedback}
                  >
                    <div className="flex items-center">
                      <span className="font-semibold mr-3 text-blue-600 dark:text-blue-400">
                        {String.fromCharCode(65 + index)})
                      </span>
                      <span className="flex-1 text-left">{option}</span>
                      {showFeedback && index === currentQ.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                      )}
                      {showFeedback && (index === selectedAnswer || answers[currentQuestion] === -1) && index !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-600 ml-2" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              <button
                onClick={handleSubmitAnswer}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={selectedAnswer === null || showFeedback}
              >
                Enviar Resposta
              </button>
            </div>

            {showFeedback && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                  {selectedAnswer === currentQ.correctAnswer || answers[currentQuestion] === -1
                    ? currentQ.correctFeedback
                    : currentQ.incorrectFeedback}
                </div>
                <button
                  onClick={nextQuestion}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {currentQuestion < questions.length - 1 ? 'Próxima Questão' : 'Finalizar'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = getPercentage();
    const { level, message, recommendation } = getPerformanceResult();
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 p-4">
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <div className="text-center">
            <img src="/qa-play-logo.png" alt="QA Play Logo" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Parabéns, {playerName}!
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
              Você completou o Quiz Inteligente ISTQB CTFL 4.0
            </p>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Sua Pontuação</h2>
              <div className="text-3xl sm:text-4xl font-bold mb-2">{score}/20</div>
              <div className="text-lg sm:text-xl">{percentage}% de acertos</div>
              <div className="text-lg sm:text-xl font-semibold mt-2">
                Nível: {fraudDetected ? "INVALIDADO" : level}
              </div>
              {fraudDetected && (
                <div className="mt-3 p-3 bg-red-500/20 border border-red-300 rounded-lg">
                  <p className="text-sm text-red-100">
                    ⚠️ Pontuação invalidada devido à detecção de comportamento suspeito durante o teste.
                  </p>
                </div>
              )}
              <p className="mt-3 text-sm sm:text-base text-blue-100">{message}</p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">💡 Recomendação para seu desenvolvimento:</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-200">{recommendation}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Tempo Restante</h3>
                <p className="text-lg text-gray-800 dark:text-white">{formatTime(timeLeft)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Acertos</h3>
                <p className="text-lg text-gray-800 dark:text-white">{score}/20</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={shareOnLinkedIn}
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Compartilhar no LinkedIn</span>
              </button>
              <button
                onClick={resetGame}
                className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Jogar Novamente</span>
              </button>
            </div>

            <div className="mt-6">
              <BadgeGenerator
                playerName={playerName}
                score={score}
                percentage={percentage}
                level={level}
                logoUrl="/qa-play-logo.png"
                onBadgeGenerated={handleBadgeGenerated}
              />
              {badgeUrl && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-center">
                    🎖️ Sua Badge de Certificação está Pronta!
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-200 text-center mb-4">
                    Baixe sua badge personalizada com o logo QA Play e compartilhe sua conquista!
                  </p>
                  <button
                    onClick={downloadBadge}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    <span className="font-semibold">Baixar Badge</span>
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                    💡 Dica: Anexe a badge ao seu post no LinkedIn para destacar sua conquista!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default IntelligentQuiz;
