import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, CheckCircle, XCircle, RotateCcw, Cog, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AutomationMasterGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutos
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const timerRef = useRef(null);

  const questions = [
    {
      id: 1,
      question: "O que é o padrão Page Object Model (POM)?",
      options: [
        "Um padrão para organizar elementos da página em classes separadas",
        "Uma ferramenta de automação de testes",
        "Um tipo de teste de performance",
        "Um framework de desenvolvimento web"
      ],
      correctAnswer: 0,
      explanation: "Page Object Model é um padrão de design que cria uma camada de abstração entre os testes e a interface do usuário, organizando elementos e ações de cada página em classes separadas.",
      category: "Page Objects"
    },
    {
      id: 2,
      question: "Qual é a principal vantagem do Page Object Model?",
      options: [
        "Aumenta a velocidade dos testes",
        "Reduz a manutenção e melhora a reutilização de código",
        "Elimina a necessidade de assertions",
        "Torna os testes mais rápidos de executar"
      ],
      correctAnswer: 1,
      explanation: "A principal vantagem do POM é reduzir a manutenção dos testes. Quando a interface muda, você só precisa atualizar o Page Object correspondente, não todos os testes.",
      category: "Page Objects"
    },
    {
      id: 3,
      question: "O que é JUnit?",
      options: [
        "Uma linguagem de programação",
        "Um framework de testes unitários para Java",
        "Um banco de dados",
        "Um servidor web"
      ],
      correctAnswer: 1,
      explanation: "JUnit é um framework de testes unitários para Java que fornece anotações e métodos para escrever e executar testes automatizados.",
      category: "Frameworks"
    },
    {
      id: 4,
      question: "Qual anotação do JUnit é usada para marcar um método de teste?",
      options: [
        "@TestMethod",
        "@Test",
        "@UnitTest",
        "@TestCase"
      ],
      correctAnswer: 1,
      explanation: "A anotação @Test é usada no JUnit para marcar métodos que devem ser executados como testes.",
      category: "Frameworks"
    },
    {
      id: 5,
      question: "O que é Cucumber?",
      options: [
        "Uma ferramenta de teste de performance",
        "Um framework BDD que permite escrever testes em linguagem natural",
        "Um banco de dados NoSQL",
        "Uma linguagem de programação"
      ],
      correctAnswer: 1,
      explanation: "Cucumber é um framework BDD (Behavior-Driven Development) que permite escrever testes em linguagem natural usando Gherkin.",
      category: "Frameworks"
    },
    {
      id: 6,
      question: "Qual é a linguagem usada pelo Cucumber para escrever cenários?",
      options: [
        "Java",
        "Python",
        "Gherkin",
        "JavaScript"
      ],
      correctAnswer: 2,
      explanation: "Gherkin é a linguagem usada pelo Cucumber para escrever cenários de teste em formato legível por humanos.",
      category: "Frameworks"
    },
    {
      id: 7,
      question: "O que é SpecFlow?",
      options: [
        "Uma ferramenta de CI/CD",
        "Um framework BDD para .NET",
        "Um tipo de teste de API",
        "Uma metodologia ágil"
      ],
      correctAnswer: 1,
      explanation: "SpecFlow é um framework BDD para .NET que permite usar Gherkin para escrever testes executáveis.",
      category: "Frameworks"
    },
    {
      id: 8,
      question: "Qual é uma boa prática ao nomear métodos de teste?",
      options: [
        "Usar nomes curtos como test1, test2",
        "Usar nomes descritivos que expliquem o que está sendo testado",
        "Usar apenas números",
        "Usar nomes em código"
      ],
      correctAnswer: 1,
      explanation: "Nomes descritivos ajudam a entender rapidamente o que cada teste faz, facilitando a manutenção e debugging.",
      category: "Boas Práticas"
    },
    {
      id: 9,
      question: "O que é um teste flaky?",
      options: [
        "Um teste que sempre passa",
        "Um teste que sempre falha",
        "Um teste que às vezes passa e às vezes falha sem mudanças no código",
        "Um teste muito rápido"
      ],
      correctAnswer: 2,
      explanation: "Testes flaky são instáveis - podem passar ou falhar sem mudanças no código, geralmente devido a dependências externas, timing ou problemas de sincronização.",
      category: "Boas Práticas"
    },
    {
      id: 10,
      question: "Qual é a melhor prática para lidar com waits em automação?",
      options: [
        "Usar sempre Thread.sleep()",
        "Usar waits explícitos (WebDriverWait)",
        "Não usar waits",
        "Usar apenas waits implícitos"
      ],
      correctAnswer: 1,
      explanation: "Waits explícitos são mais eficientes e confiáveis, pois esperam por condições específicas em vez de tempos fixos.",
      category: "Boas Práticas"
    },
    {
      id: 11,
      question: "O que significa DRY em automação de testes?",
      options: [
        "Don't Repeat Yourself",
        "Dynamic Resource Yielding",
        "Data Retrieval Yearly",
        "Direct Response Yielding"
      ],
      correctAnswer: 0,
      explanation: "DRY (Don't Repeat Yourself) é um princípio que visa evitar duplicação de código, promovendo reutilização e facilitando manutenção.",
      category: "Boas Práticas"
    },
    {
      id: 12,
      question: "Qual é o objetivo principal dos testes de regressão automatizados?",
      options: [
        "Testar novas funcionalidades",
        "Verificar se mudanças não quebraram funcionalidades existentes",
        "Testar performance",
        "Testar segurança"
      ],
      correctAnswer: 1,
      explanation: "Testes de regressão automatizados garantem que novas mudanças não introduzam bugs em funcionalidades que já funcionavam.",
      category: "Boas Práticas"
    },
    {
      id: 13,
      question: "O que é um Data Provider em automação de testes?",
      options: [
        "Um banco de dados",
        "Um método que fornece dados para testes parametrizados",
        "Uma ferramenta de teste",
        "Um tipo de assertion"
      ],
      correctAnswer: 1,
      explanation: "Data Provider é um mecanismo que permite executar o mesmo teste com diferentes conjuntos de dados, promovendo reutilização.",
      category: "Frameworks"
    },
    {
      id: 14,
      question: "Qual é a diferença entre assertion e verification?",
      options: [
        "Não há diferença",
        "Assertion para o teste se falhar, verification continua",
        "Verification para o teste se falhar, assertion continua",
        "Ambos param o teste sempre"
      ],
      correctAnswer: 1,
      explanation: "Assertion para a execução do teste imediatamente se falhar, enquanto verification registra a falha mas continua a execução.",
      category: "Boas Práticas"
    },
    {
      id: 15,
      question: "O que é Continuous Integration (CI) em automação?",
      options: [
        "Executar testes manualmente",
        "Integrar e testar código automaticamente a cada commit",
        "Testar apenas em produção",
        "Fazer deploy manual"
      ],
      correctAnswer: 1,
      explanation: "CI é a prática de integrar mudanças de código frequentemente e executar testes automatizados para detectar problemas rapidamente.",
      category: "Boas Práticas"
    },
    {
      id: 16,
      question: "Qual é uma característica importante de um bom caso de teste automatizado?",
      options: [
        "Deve ser dependente de outros testes",
        "Deve ser independente e executável isoladamente",
        "Deve sempre usar dados de produção",
        "Deve ser muito longo e complexo"
      ],
      correctAnswer: 1,
      explanation: "Testes independentes são mais confiáveis, fáceis de manter e podem ser executados em qualquer ordem.",
      category: "Boas Práticas"
    },
    {
      id: 17,
      question: "O que é TestNG?",
      options: [
        "Uma linguagem de programação",
        "Um framework de testes para Java inspirado no JUnit",
        "Um banco de dados",
        "Uma ferramenta de CI/CD"
      ],
      correctAnswer: 1,
      explanation: "TestNG é um framework de testes para Java que oferece recursos avançados como grupos de testes, dependências e execução paralela.",
      category: "Frameworks"
    },
    {
      id: 18,
      question: "Qual é o propósito do método setUp() em testes automatizados?",
      options: [
        "Limpar dados após o teste",
        "Preparar o ambiente antes de executar o teste",
        "Executar o teste principal",
        "Gerar relatórios"
      ],
      correctAnswer: 1,
      explanation: "O método setUp() (ou @BeforeEach) é usado para preparar o ambiente de teste, como inicializar objetos ou configurar dados.",
      category: "Frameworks"
    },
    {
      id: 19,
      question: "O que é um Mock em testes automatizados?",
      options: [
        "Um tipo de banco de dados",
        "Um objeto simulado que imita o comportamento de objetos reais",
        "Uma ferramenta de CI/CD",
        "Um tipo de assertion"
      ],
      correctAnswer: 1,
      explanation: "Mocks são objetos simulados que imitam o comportamento de dependências reais, permitindo testar unidades isoladamente.",
      category: "Boas Práticas"
    },
    {
      id: 20,
      question: "Qual é a pirâmide de testes em automação?",
      options: [
        "Muitos testes E2E, poucos testes unitários",
        "Muitos testes unitários, alguns de integração, poucos E2E",
        "Apenas testes manuais",
        "Todos os tipos em igual quantidade"
      ],
      correctAnswer: 1,
      explanation: "A pirâmide de testes preconiza muitos testes unitários (rápidos e baratos), alguns de integração e poucos E2E (lentos e caros).",
      category: "Boas Práticas"
    }
  ];

  // Função para embaralhar array (Fisher-Yates Shuffle)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    const shuffled = shuffleArray(questions).slice(0, 15); // Pega 15 questões aleatórias
    // Embaralha as opções de cada questão
    const shuffledWithOptions = shuffled.map(q => ({
      ...q,
      originalOptions: [...q.options],
      options: shuffleArray(q.options.map((option, index) => ({ text: option, originalIndex: index }))),
    }));
    
    setShuffledQuestions(shuffledWithOptions);
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setGameFinished(false);
    setTimeLeft(1200);
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          finishGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleAnswerSelect = (answerIndex) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[selectedAnswer];
    const isCorrect = selectedOption.originalIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    clearInterval(timerRef.current);
    setGameFinished(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setGameFinished(false);
    setShuffledQuestions([]);
    setTimeLeft(1200);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cog className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Mestre da Automação</CardTitle>
            <CardDescription className="text-lg">
              Teste seus conhecimentos sobre automação de testes, frameworks e boas práticas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Sobre o Jogo:</h3>
              <p className="text-sm text-muted-foreground text-left">
                No jogo "Mestre da Automação", você será desafiado com questões sobre Page Objects, frameworks como JUnit, Cucumber e SpecFlow, além de boas práticas em automação de testes.
              </p>
              <h3 className="font-semibold text-xl">Como Jogar:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Você terá 20 minutos para responder 15 questões aleatórias.</li>
                <li>• As questões e alternativas são embaralhadas a cada jogo.</li>
                <li>• Selecione a resposta que considera correta e clique em "Confirmar".</li>
                <li>• Após responder, você verá a explicação da resposta correta.</li>
                <li>• Seu objetivo é acertar o máximo de questões possível!</li>
              </ul>
              <h3 className="font-semibold text-xl">Tópicos Abordados:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">Page Objects</Badge>
                <Badge variant="secondary">JUnit</Badge>
                <Badge variant="secondary">Cucumber</Badge>
                <Badge variant="secondary">SpecFlow</Badge>
                <Badge variant="secondary">Boas Práticas</Badge>
              </div>
            </div>
            <Button onClick={startGame} size="lg" className="w-full">
              <Cog className="mr-2 h-5 w-5" />
              Começar Jogo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameFinished) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    let performance = '';
    if (percentage >= 80) performance = 'Excelente! Você é um verdadeiro Mestre da Automação!';
    else if (percentage >= 60) performance = 'Muito bom! Você tem um bom conhecimento em automação.';
    else if (percentage >= 40) performance = 'Razoável. Continue estudando para melhorar!';
    else performance = 'Precisa estudar mais. Não desista, a prática leva à perfeição!';

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cog className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Jogo Finalizado!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">{score}/{shuffledQuestions.length}</div>
              <div className="text-xl font-semibold">{percentage}% de acertos</div>
              <p className="text-muted-foreground">{performance}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-semibold text-green-800">Acertos</div>
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="font-semibold text-red-800">Erros</div>
                  <div className="text-2xl font-bold text-red-600">{shuffledQuestions.length - score}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button onClick={resetGame} size="lg" className="w-full">
                <RotateCcw className="mr-2 h-5 w-5" />
                Jogar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const selectedOption = selectedAnswer !== null ? currentQuestion.options[selectedAnswer] : null;
  const isCorrect = selectedOption && selectedOption.originalIndex === currentQuestion.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Questão {currentQuestionIndex + 1} de {shuffledQuestions.length}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            Pontuação: <span className="font-bold">{score}/{shuffledQuestions.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Timer className="h-5 w-5" />
            <span className={`font-mono text-lg ${timeLeft <= 300 ? 'text-red-500' : ''}`}>
              {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
          <CardDescription>
            <Badge variant="outline">{currentQuestion.category}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedAnswer === index
                    ? showExplanation
                      ? isCorrect
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                      : 'bg-blue-50 border-blue-200 text-blue-800'
                    : showExplanation && option.originalIndex === currentQuestion.correctAnswer
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? showExplanation
                        ? isCorrect
                          ? 'border-green-500 bg-green-500'
                          : 'border-red-500 bg-red-500'
                        : 'border-blue-500 bg-blue-500'
                      : showExplanation && option.originalIndex === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}>
                    {(selectedAnswer === index && showExplanation) || 
                     (showExplanation && option.originalIndex === currentQuestion.correctAnswer) ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : selectedAnswer === index && showExplanation && !isCorrect ? (
                      <XCircle className="h-4 w-4 text-white" />
                    ) : null}
                  </div>
                  <span>{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Explicação:</h4>
                  <p className="text-blue-700 text-sm">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {!showExplanation ? (
              <Button 
                onClick={handleSubmitAnswer} 
                disabled={selectedAnswer === null}
                className="ml-auto"
              >
                Confirmar Resposta
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} className="ml-auto">
                {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Próxima Questão' : 'Finalizar Jogo'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationMasterGame;

