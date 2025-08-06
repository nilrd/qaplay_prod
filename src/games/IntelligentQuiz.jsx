import React, { useState, useEffect } from 'react';
import { Clock, Trophy, Share2, CheckCircle, XCircle, RotateCcw, Download } from 'lucide-react';
import knowledgeBase from '../data/knowledge_base.json';
import BadgeGenerator from '../components/BadgeGenerator';

const IntelligentQuiz = () => {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'finished'
  const [selectedLevel, setSelectedLevel] = useState('junior');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [badgeUrl, setBadgeUrl] = useState(null);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      finishGame();
    }
  }, [timeLeft, gameState]);

  // Generate a question based on difficulty level
  const generateQuestion = (difficulty) => {
    const availableConcepts = [];
    
    knowledgeBase.syllabus.chapters.forEach(chapter => {
      chapter.sections.forEach(section => {
        section.concepts.forEach(concept => {
          if (concept.level === difficulty) {
            availableConcepts.push(concept);
          }
        });
      });
    });

    if (availableConcepts.length === 0) return null;

    const selectedConcept = availableConcepts[Math.floor(Math.random() * availableConcepts.length)];
    
    // Generate distractors from other concepts of the same level
    const distractors = [];
    while (distractors.length < 3) {
      const randomConcept = availableConcepts[Math.floor(Math.random() * availableConcepts.length)];
      if (randomConcept !== selectedConcept && !distractors.includes(randomConcept.description)) {
        distractors.push(randomConcept.description);
      }
    }

    const options = [selectedConcept.description, ...distractors];
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    const correctAnswerIndex = options.indexOf(selectedConcept.description);

    return {
      question: `De acordo com o ISTQB CTFL 4.0, qual é a definição ou principal característica de '${selectedConcept.title}'?`,
      options: options,
      correctAnswer: correctAnswerIndex,
      correctFeedback: `Correto! ${selectedConcept.description} (LO: ${selectedConcept.id}).`,
      incorrectFeedback: `Incorreto. A resposta correta é: ${selectedConcept.description} (LO: ${selectedConcept.id}).`,
      LO: selectedConcept.id,
      level: selectedConcept.level
    };
  };

  // Start the game
  const startGame = () => {
    if (!playerName.trim()) {
      alert('Por favor, insira seu nome para começar o jogo.');
      return;
    }

    const generatedQuestions = [];
    for (let i = 0; i < 20; i++) {
      const question = generateQuestion(selectedLevel);
      if (question) {
        generatedQuestions.push(question);
      }
    }

    if (generatedQuestions.length < 20) {
      alert('Não há questões suficientes para este nível. Tente outro nível.');
      return;
    }

    setQuestions(generatedQuestions);
    setAnswers(new Array(20).fill(null));
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(1200);
    setGameState('playing');
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
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
    } else {
      finishGame();
    }
  };

  // Finish the game
  const finishGame = () => {
    setGameState('finished');
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

  // Get performance message
  const getPerformanceMessage = () => {
    const percentage = getPercentage();
    if (percentage >= 90) return "Excelente! Você é um expert em QA!";
    if (percentage >= 80) return "Muito bom! Você tem um ótimo conhecimento em QA!";
    if (percentage >= 70) return "Bom trabalho! Continue estudando para melhorar!";
    if (percentage >= 60) return "Razoável. Há espaço para melhorias!";
    return "Continue estudando! A prática leva à perfeição!";
  };

  // Share on LinkedIn
  const shareOnLinkedIn = () => {
    const percentage = getPercentage();
    const text = `Acabei de completar o Quiz Inteligente ISTQB CTFL 4.0 no nível ${selectedLevel} e obtive ${percentage}% de acertos! ${getPerformanceMessage()} #QualityAssurance #ISTQB #Testing #QA`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
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
      link.download = `qa-badge-${playerName.replace(/\s+/g, '-').toLowerCase()}-${getPercentage()}%.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Quiz Inteligente ISTQB CTFL 4.0
            </h1>
            <p className="text-lg text-gray-600">
              Teste seus conhecimentos com questões geradas dinamicamente baseadas no syllabus oficial
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Configurações do Jogo</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu Nome
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu nome"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nível de Dificuldade
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(knowledgeBase.difficulty_levels).map(([level, info]) => (
                  <div
                    key={level}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedLevel === level
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedLevel(level)}
                  >
                    <h3 className="font-semibold text-lg capitalize">{level}</h3>
                    <p className="text-sm text-gray-600 mt-1">{info.description}</p>
                    <div className="mt-2">
                      {info.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mr-1 mb-1"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Regras do Jogo:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 20 questões por rodada</li>
                <li>• 20 minutos para completar</li>
                <li>• Questões geradas dinamicamente</li>
                <li>• Feedback didático após cada resposta</li>
                <li>• Compartilhamento no LinkedIn disponível</li>
              </ul>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Iniciar Jogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const currentQ = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">{formatTime(timeLeft)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold">{score}/20</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Questão {currentQuestion + 1} de 20 • Nível: {selectedLevel}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / 20) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all ";
                
                if (showFeedback) {
                  if (index === currentQ.correctAnswer) {
                    buttonClass += "border-green-500 bg-green-50 text-green-800";
                  } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                    buttonClass += "border-red-500 bg-red-50 text-red-800";
                  } else {
                    buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass += "border-blue-500 bg-blue-50";
                  } else {
                    buttonClass += "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
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
                      <span className="font-semibold mr-3">
                        {String.fromCharCode(65 + index)})
                      </span>
                      <span>{option}</span>
                      {showFeedback && index === currentQ.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                      )}
                      {showFeedback && index === selectedAnswer && index !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm">
                  {selectedAnswer === currentQ.correctAnswer
                    ? currentQ.correctFeedback
                    : currentQ.incorrectFeedback}
                </p>
                <button
                  onClick={nextQuestion}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Parabéns, {playerName}!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Você completou o Quiz Inteligente ISTQB CTFL 4.0
            </p>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-2">Sua Pontuação</h2>
              <div className="text-4xl font-bold mb-2">{score}/20</div>
              <div className="text-xl">{percentage}% de acertos</div>
              <p className="mt-2 text-blue-100">{getPerformanceMessage()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700">Nível</h3>
                <p className="text-lg capitalize">{selectedLevel}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700">Tempo Restante</h3>
                <p className="text-lg">{formatTime(timeLeft)}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={shareOnLinkedIn}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Compartilhar no LinkedIn</span>
              </button>
              <button
                onClick={downloadBadge}
                disabled={!badgeUrl}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                <span>Baixar Badge</span>
              </button>
              <button
                onClick={resetGame}
                className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Jogar Novamente</span>
              </button>
            </div>
          </div>

          {/* Badge Generator */}
          <BadgeGenerator
            playerName={playerName}
            score={score}
            percentage={getPercentage()}
            level={selectedLevel}
            onBadgeGenerated={handleBadgeGenerated}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default IntelligentQuiz;

