import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, CheckCircle, XCircle, RotateCcw, Code, Lightbulb } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const ProgrammingChallengeGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos por desafio
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [testResult, setTestResult] = useState(null); // null, 'pass', 'fail'
  const [showExplanation, setShowExplanation] = useState(false);
  const timerRef = useRef(null);

  const challenges = [
    {
      id: 1,
      title: 'Desafio de Automação Web (Cypress)',
      description: 'Escreva o código Cypress para verificar se um elemento com o ID \'login-button\' está visível na página.',
      language: 'JavaScript (Cypress)',
      expectedCode: `cy.get('#login-button').should('be.visible');`,
      explanation: 'Para verificar a visibilidade de um elemento no Cypress, usamos cy.get() para selecionar o elemento e .should(\'be.visible\') para asserir sua visibilidade.',
      type: 'Automação Web'
    },
    {
      id: 2,
      title: 'Lógica de Programação (JavaScript)',
      description: 'Escreva uma função JavaScript que receba um array de números e retorne a soma de todos os números pares.',
      language: 'JavaScript',
      expectedCode: `function sumEvenNumbers(arr) {\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] % 2 === 0) {\n      sum += arr[i];\n    }\n  }\n  return sum;\n}`,
      testCases: [
        { input: [1, 2, 3, 4, 5], expectedOutput: 6 },
        { input: [10, 20, 30], expectedOutput: 60 },
        { input: [1, 3, 5], expectedOutput: 0 }
      ],
      explanation: 'A função deve iterar sobre o array, verificar se cada número é par usando o operador de módulo (%), e somar os números pares.',
      type: 'Lógica de Programação'
    },
    {
      id: 3,
      title: 'Teste de API (JavaScript - Fetch API)',
      description: 'Escreva o código JavaScript usando Fetch API para fazer uma requisição GET para `https://jsonplaceholder.typicode.com/posts/1` e verificar se o `userId` retornado é 1.',
      language: 'JavaScript (API)',
      expectedCode: `fetch('https://jsonplaceholder.typicode.com/posts/1')\n  .then(response => response.json())\n  .then(data => {\n    if (data.userId === 1) {\n      return 'pass';\n    } else {\n      return 'fail';\n    }\n  });`,
      explanation: 'Para testar uma API, fazemos uma requisição GET e, após receber a resposta, verificamos se os dados retornados correspondem ao esperado. Neste caso, o userId deve ser 1.',
      type: 'Teste de API'
    },
    {
      id: 4,
      title: 'Teste de Unidade (Java - JUnit)',
      description: 'Escreva um teste de unidade JUnit para a função `public int add(int a, int b) { return a + b; }` da classe `Calculator`.', 
      language: 'Java (JUnit)',
      expectedCode: `import org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.assertEquals;\n\npublic class CalculatorTest {\n\n    @Test\n    void testAdd() {\n        Calculator calculator = new Calculator();\n        assertEquals(5, calculator.add(2, 3));\n        assertEquals(0, calculator.add(-1, 1));\n    }\n}`,
      explanation: 'Testes de unidade com JUnit usam anotações como @Test e métodos de asserção como assertEquals para verificar o comportamento de métodos individuais de uma classe.',
      type: 'Teste de Unidade'
    },
    {
      id: 5,
      title: 'Teste de UI (Playwright)',
      description: 'Escreva o código Playwright para clicar em um botão com o texto \'Submit\' e verificar se a URL mudou para \'/success\'.', 
      language: 'JavaScript (Playwright)',
      expectedCode: `await page.click('text=Submit');\nawait page.waitForURL('/success');`,
      explanation: 'Playwright permite interagir com elementos da página (como clicar em botões) e esperar por condições específicas (como uma mudança de URL) para validar o fluxo da interface do usuário.',
      type: 'Teste de UI'
    },
    {
      id: 6,
      title: 'Validação de Qualidade - Critérios de Aceite',
      description: 'Escreva um critério de aceite em formato Gherkin para testar o login de um usuário válido.',
      language: 'Gherkin (BDD)',
      expectedCode: `Given que o usuário está na página de login\nWhen o usuário insere credenciais válidas\nAnd clica no botão "Entrar"\nThen o usuário deve ser redirecionado para o dashboard`,
      explanation: 'Critérios de aceite em Gherkin seguem o padrão Given-When-Then para descrever cenários de teste de forma clara e compreensível para todos os stakeholders.',
      type: 'Qualidade de Software'
    },
    {
      id: 7,
      title: 'Teste de Regressão (Selenium)',
      description: 'Escreva código Selenium WebDriver para verificar se o título da página contém "QAPlay".',
      language: 'Java (Selenium)',
      expectedCode: `WebDriver driver = new ChromeDriver();\ndriver.get("https://qaplay.com");\nString title = driver.getTitle();\nassert title.contains("QAPlay");`,
      explanation: 'Testes de regressão verificam se funcionalidades existentes continuam funcionando após mudanças. O Selenium WebDriver permite automatizar essas verificações.',
      type: 'Teste de Regressão'
    },
    {
      id: 8,
      title: 'Pirâmide de Testes - Conceito',
      description: 'Complete a frase: "Na pirâmide de testes, a base deve conter _____ testes, o meio _____ testes, e o topo _____ testes."',
      language: 'Conceito QA',
      expectedCode: `muitos testes unitários, alguns testes de integração, poucos testes E2E`,
      explanation: 'A pirâmide de testes preconiza muitos testes unitários (rápidos e baratos), alguns testes de integração (médio custo), e poucos testes E2E (lentos e caros).',
      type: 'Qualidade de Software'
    },
    {
      id: 9,
      title: 'Teste de Performance (JavaScript)',
      description: 'Escreva código JavaScript para medir o tempo de execução de uma função usando console.time.',
      language: 'JavaScript',
      expectedCode: `console.time('funcaoTeste');\nminhaFuncao();\nconsole.timeEnd('funcaoTeste');`,
      explanation: 'console.time() e console.timeEnd() são ferramentas básicas para medir performance de código JavaScript, essenciais para identificar gargalos.',
      type: 'Teste de Performance'
    },
    {
      id: 10,
      title: 'Teste de Acessibilidade (Cypress)',
      description: 'Escreva código Cypress para verificar se um botão tem o atributo aria-label.',
      language: 'JavaScript (Cypress)',
      expectedCode: `cy.get('button').should('have.attr', 'aria-label');`,
      explanation: 'Testes de acessibilidade verificam se a aplicação é usável por pessoas com deficiências. O atributo aria-label fornece descrição para leitores de tela.',
      type: 'Teste de Acessibilidade'
    },
    {
      id: 11,
      title: 'Teste de Integração (API)',
      description: 'Escreva código para testar se uma API POST retorna status 201 ao criar um usuário.',
      language: 'JavaScript (API)',
      expectedCode: `fetch('/api/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'João', email: 'joao@test.com' })\n})\n.then(response => {\n  assert(response.status === 201);\n});`,
      explanation: 'Testes de integração verificam se diferentes componentes funcionam juntos. Status 201 indica criação bem-sucedida de recurso.',
      type: 'Teste de Integração'
    },
    {
      id: 12,
      title: 'Qualidade de Código - Code Review',
      description: 'Liste 3 pontos importantes a verificar durante um code review focado em qualidade.',
      language: 'Conceito QA',
      expectedCode: `1. Legibilidade e clareza do código\n2. Cobertura de testes adequada\n3. Tratamento de erros e casos extremos`,
      explanation: 'Code review é fundamental para manter qualidade. Deve verificar legibilidade, testes, tratamento de erros, performance e aderência aos padrões.',
      type: 'Qualidade de Software'
    },
    {
      id: 13,
      title: 'Teste de Segurança (SQL Injection)',
      description: 'Escreva um exemplo de input que poderia causar SQL Injection em um campo de login.',
      language: 'Conceito Segurança',
      expectedCode: `\' OR \'1\'=\'1\' --`,
      explanation: 'SQL Injection é uma vulnerabilidade onde input malicioso pode manipular queries SQL. Testes de segurança devem verificar sanitização de inputs.',
      type: 'Teste de Segurança'
    },
    {
      id: 14,
      title: 'Teste Mobile (Appium)',
      description: 'Escreva código Appium para encontrar um elemento por ID em um app mobile.',
      language: 'Java (Appium)',
      expectedCode: `WebElement element = driver.findElement(By.id("com.app:id/button"));\nelement.click();`,
      explanation: 'Appium permite automatizar testes em apps mobile. findElement(By.id()) localiza elementos usando identificadores únicos do app.',
      type: 'Teste Mobile'
    },
    {
      id: 15,
      title: 'Teste de Usabilidade - Heurísticas',
      description: 'Complete: "Uma das heurísticas de Nielsen para usabilidade é: \'_____ do sistema com o mundo real\'"',
      language: 'Conceito UX',
      expectedCode: `Correspondência`,
      explanation: 'As heurísticas de Nielsen incluem "Correspondência entre o sistema e o mundo real", que preconiza usar linguagem familiar ao usuário.',
      type: 'Teste de Usabilidade'
    },
    {
      id: 16,
      title: 'Teste de Carga (JavaScript)',
      description: 'Escreva código para simular 100 requisições simultâneas a uma API usando Promise.all.',
      language: 'JavaScript',
      expectedCode: `const requests = Array(100).fill().map(() => \n  fetch('/api/endpoint')\n);\nPromise.all(requests)\n  .then(responses => console.log('Todas as requisições completadas'));`,
      explanation: 'Testes de carga verificam como o sistema se comporta sob alta demanda. Promise.all executa múltiplas requisições em paralelo.',
      type: 'Teste de Performance'
    },
    {
      id: 17,
      title: 'Qualidade de Software - Métricas',
      description: 'Qual métrica indica a porcentagem de código coberta por testes?',
      language: 'Conceito QA',
      expectedCode: `Cobertura de código (Code Coverage)`,
      explanation: 'Cobertura de código mede quantas linhas/branches do código são executadas durante os testes. É uma métrica importante mas não garante qualidade total.',
      type: 'Qualidade de Software'
    },
    {
      id: 18,
      title: 'Teste de Compatibilidade (Cross-browser)',
      description: 'Liste 3 navegadores essenciais para testes de compatibilidade web.',
      language: 'Conceito QA',
      expectedCode: `Chrome, Firefox, Safari`,
      explanation: 'Testes de compatibilidade garantem que a aplicação funciona em diferentes navegadores. Chrome, Firefox e Safari cobrem a maioria dos usuários.',
      type: 'Teste de Compatibilidade'
    },
    {
      id: 19,
      title: 'Teste de Dados (Boundary Testing)',
      description: 'Para um campo que aceita idade de 18 a 65 anos, quais valores você testaria?',
      language: 'Conceito QA',
      expectedCode: `17, 18, 19, 64, 65, 66`,
      explanation: 'Boundary testing testa valores nos limites e adjacentes: valores inválidos (17, 66) e válidos (18, 65) nos extremos, plus valores próximos.',
      type: 'Teste de Dados'
    },
    {
      id: 20,
      title: 'Automação CI/CD (GitHub Actions)',
      description: 'Escreva um step básico do GitHub Actions para executar testes npm.',
      language: 'YAML (CI/CD)',
      expectedCode: `- name: Run tests\n  run: npm test`,
      explanation: 'CI/CD automatiza execução de testes. GitHub Actions usa YAML para definir steps. "run: npm test" executa os testes do projeto Node.js.',
      type: 'Automação CI/CD'
    },
    {
      id: 21,
      title: 'Teste de Estado (Stateful Testing)',
      description: 'Escreva código Cypress para verificar se um contador incrementa corretamente.',
      language: 'JavaScript (Cypress)',
      expectedCode: `cy.get('[data-testid="counter"]').should('contain', '0');\ncy.get('[data-testid="increment"]').click();\ncy.get('[data-testid="counter"]').should('contain', '1');`,
      explanation: 'Testes de estado verificam se a aplicação mantém e atualiza seu estado corretamente através de interações do usuário.',
      type: 'Teste de Estado'
    },
    {
      id: 22,
      title: 'Qualidade de Software - Defeitos',
      description: 'Complete: "Um defeito encontrado em produção custa _____ vezes mais para corrigir que na fase de desenvolvimento."',
      language: 'Conceito QA',
      expectedCode: `10 a 100`,
      explanation: 'Estudos mostram que defeitos encontrados em produção custam 10-100x mais para corrigir que durante desenvolvimento, justificando investimento em QA.',
      type: 'Qualidade de Software'
    },
    {
      id: 23,
      title: 'Teste de Responsividade (CSS)',
      description: 'Escreva código Cypress para verificar se um elemento está visível em viewport mobile (375px).',
      language: 'JavaScript (Cypress)',
      expectedCode: `cy.viewport(375, 667);\ncy.get('[data-testid="mobile-menu"]').should('be.visible');`,
      explanation: 'Testes de responsividade verificam se a interface se adapta a diferentes tamanhos de tela. cy.viewport() simula diferentes dispositivos.',
      type: 'Teste de Responsividade'
    },
    {
      id: 24,
      title: 'Teste de Localização (i18n)',
      description: 'Escreva código para verificar se um texto está traduzido corretamente para português.',
      language: 'JavaScript',
      expectedCode: `const text = getTranslation('welcome', 'pt-BR');\nassert(text === 'Bem-vindo');`,
      explanation: 'Testes de localização verificam se textos, formatos de data/número e elementos culturais estão corretos para cada idioma/região.',
      type: 'Teste de Localização'
    },
    {
      id: 25,
      title: 'Qualidade de Software - STLC',
      description: 'Ordene as fases do STLC: Execução, Planejamento, Análise de Requisitos, Design de Casos de Teste.',
      language: 'Conceito QA',
      expectedCode: `1. Análise de Requisitos\n2. Planejamento\n3. Design de Casos de Teste\n4. Execução`,
      explanation: 'O Software Testing Life Cycle (STLC) segue uma sequência lógica: primeiro entender requisitos, planejar estratégia, criar casos de teste, depois executar.',
      type: 'Qualidade de Software'
    }
  ];

  const currentChallenge = challenges[currentChallengeIndex];

  const startGame = () => {
    setGameStarted(true);
    setCurrentChallengeIndex(0);
    setUserCode('');
    setTestResult(null);
    setShowExplanation(false);
    setTimeLeft(120);
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleTestCode(); // Testar automaticamente quando o tempo acabar
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (gameStarted) {
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [gameStarted, currentChallengeIndex]);

  const handleTestCode = () => {
    clearInterval(timerRef.current);
    // Simulação de execução de código e teste
    // Em um ambiente real, isso envolveria um backend para executar e validar o código
    const normalizedUserCode = userCode.replace(/\s/g, '').toLowerCase();
    const normalizedExpectedCode = currentChallenge.expectedCode.replace(/\s/g, '').toLowerCase();

    if (currentChallenge.testCases) {
      // Lógica para testar funções com casos de teste
      let allTestsPass = true;
      try {
        // eslint-disable-next-line no-eval
        const userFunction = eval(`(${userCode})`); // Avalia a string como uma função
        for (const testCase of currentChallenge.testCases) {
          const result = userFunction(testCase.input);
          if (result !== testCase.expectedOutput) {
            allTestsPass = false;
            break;
          }
        }
      } catch (e) {
        allTestsPass = false; // Erro de sintaxe ou execução
      }
      setTestResult(allTestsPass ? 'pass' : 'fail');
    } else {
      // Comparação simples de string para outros tipos de código
      setTestResult(normalizedUserCode.includes(normalizedExpectedCode) ? 'pass' : 'fail');
    }
    setShowExplanation(true);
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prevIndex => prevIndex + 1);
      setUserCode('');
      setTestResult(null);
      setShowExplanation(false);
      setTimeLeft(120);
    } else {
      // Fim do jogo
      setGameStarted(false);
      alert('Parabéns! Você completou todos os desafios de programação!');
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentChallengeIndex(0);
    setUserCode('');
    setTestResult(null);
    setShowExplanation(false);
    setTimeLeft(120);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Desafios de Programação</CardTitle>
            <CardDescription className="text-lg">
              Teste suas habilidades em lógica de programação e automação de testes com 25 desafios focados em Qualidade de Software.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Sobre o Jogo:</h3>
              <p className="text-sm text-muted-foreground text-left">
                No jogo "Desafios de Programação", você enfrentará 25 problemas práticos de lógica, automação de testes e conceitos de qualidade de software. Seu objetivo é escrever o código correto para resolver cada desafio dentro do tempo limite.
              </p>
              <h3 className="font-semibold text-xl">Como Jogar:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Você receberá um problema de programação, automação ou conceito de QA.</li>
                <li>• Escreva seu código ou resposta na área de texto fornecida.</li>
                <li>• Clique em "Testar Código" para verificar sua solução.</li>
                <li>• Você terá 2 minutos para cada desafio. Se o tempo acabar, seu código será testado automaticamente.</li>
                <li>• Após o teste, você verá se sua solução passou ou falhou, e uma explicação será fornecida.</li>
              </ul>
              <h3 className="font-semibold text-xl">O que você vai aprender:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Lógica de programação em JavaScript e Java.</li>
                <li>• Automação de testes com Cypress, Playwright, Selenium e Appium.</li>
                <li>• Testes de unidade, integração, API e performance.</li>
                <li>• Conceitos de qualidade: STLC, pirâmide de testes, métricas.</li>
                <li>• Testes de acessibilidade, segurança e usabilidade.</li>
                <li>• CI/CD, code review e boas práticas de QA.</li>
              </ul>
            </div>
            <Button onClick={startGame} size="lg" className="w-full">
              <Code className="mr-2 h-5 w-5" />
              Começar Desafio ({challenges.length} questões)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Desafio {currentChallengeIndex + 1} de {challenges.length}: {currentChallenge.title}</h2>
        <div className="flex items-center space-x-2">
          <Timer className="h-5 w-5" />
          <span className={`font-mono text-lg ${timeLeft <= 30 ? 'text-red-500' : ''}`}>
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{ (timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentChallenge.description}</CardTitle>
          <CardDescription>
            Linguagem: <Badge variant="secondary">{currentChallenge.language}</Badge>
            <Badge variant="outline" className="ml-2">{currentChallenge.type}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="user-code">Seu Código:</Label>
          <Textarea
            id="user-code"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="Escreva seu código aqui..."
            rows={10}
            className="font-mono"
          />
          <Button onClick={handleTestCode} className="w-full" size="lg" disabled={showExplanation}>
            Testar Código
          </Button>

          {showExplanation && (
            <div className={`mt-6 p-4 rounded-lg border ${testResult === 'pass' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              <h4 className="font-semibold mb-2">
                {testResult === 'pass' ? (<CheckCircle className="inline-block mr-2 h-5 w-5" />) : (<XCircle className="inline-block mr-2 h-5 w-5" />)}
                {testResult === 'pass' ? 'Parabéns! Seu código passou nos testes!' : 'Seu código falhou nos testes.'}
              </h4>
              <p className="text-sm">{currentChallenge.explanation}</p>
              {testResult === 'fail' && (
                <div className="mt-2">
                  <h5 className="font-semibold">Solução Esperada:</h5>
                  <pre className="bg-gray-100 p-2 rounded-md text-xs overflow-auto"><code>{currentChallenge.expectedCode}</code></pre>
                </div>
              )}
            </div>
          )}

          {showExplanation && (
            <Button onClick={handleNextChallenge} className="w-full" size="lg">
              {currentChallengeIndex < challenges.length - 1 ? 'Próximo Desafio' : 'Finalizar Jogo'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgrammingChallengeGame;

