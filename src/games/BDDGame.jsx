import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, CheckCircle, XCircle, RotateCcw, FileText, Lightbulb } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const BDDGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos por cenário
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userScenario, setUserScenario] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null); // null, 'pass', 'fail'
  const [evaluationMessage, setEvaluationMessage] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const timerRef = useRef(null);

  const businessDocuments = [
    {
      id: 1,
      title: 'Sistema de Login de E-commerce',
      description: 'Funcionalidade de autenticação para uma loja online.',
      businessRequirements: `
        Requisitos de Negócio:
        1. O usuário deve poder fazer login com email e senha.
        2. Se as credenciais estiverem corretas, o usuário deve ser redirecionado para a página principal.
        3. Se as credenciais estiverem incorretas, uma mensagem de erro deve ser exibida.
        4. Após 3 tentativas de login falhadas, a conta deve ser temporariamente bloqueada por 15 minutos.
        5. O usuário deve poder recuperar sua senha através do email.
      `,
      expectedScenario: `
Feature: Login de usuário no e-commerce

  Scenario: Login com credenciais válidas
    Given que o usuário está na página de login
    When o usuário insere um email válido "usuario@exemplo.com"
    And o usuário insere uma senha válida "senha123"
    And o usuário clica no botão "Entrar"
    Then o usuário deve ser redirecionado para a página principal
    And o usuário deve ver a mensagem "Bem-vindo!"

  Scenario: Login com credenciais inválidas
    Given que o usuário está na página de login
    When o usuário insere um email inválido "usuario@exemplo.com"
    And o usuário insere uma senha inválida "senhaerrada"
    And o usuário clica no botão "Entrar"
    Then o usuário deve permanecer na página de login
    And o usuário deve ver a mensagem de erro "Email ou senha incorretos"

  Scenario: Bloqueio de conta após múltiplas tentativas falhadas
    Given que o usuário já tentou fazer login 2 vezes com credenciais incorretas
    When o usuário tenta fazer login novamente com credenciais incorretas
    Then a conta do usuário deve ser bloqueada por 15 minutos
    And o usuário deve ver a mensagem "Conta temporariamente bloqueada. Tente novamente em 15 minutos."
      `,
      explanation: 'Um bom cenário BDD deve cobrir os fluxos principais (happy path) e alternativos (sad path). Use Given para pré-condições, When para ações e Then para resultados esperados.',
      type: 'Autenticação'
    },
    {
      id: 2,
      title: 'Carrinho de Compras Online',
      description: 'Funcionalidade de adicionar e remover produtos do carrinho.',
      businessRequirements: `
        Requisitos de Negócio:
        1. O usuário deve poder adicionar produtos ao carrinho.
        2. O usuário deve poder ver a quantidade de itens no carrinho.
        3. O usuário deve poder remover produtos do carrinho.
        4. O total do carrinho deve ser atualizado automaticamente.
        5. O carrinho deve persistir durante a sessão do usuário.
      `,
      expectedScenario: `
Feature: Gerenciamento do carrinho de compras

  Scenario: Adicionar produto ao carrinho
    Given que o usuário está na página de um produto
    And o produto "Smartphone XYZ" custa R$ 1.200,00
    When o usuário clica no botão "Adicionar ao Carrinho"
    Then o produto deve ser adicionado ao carrinho
    And o contador do carrinho deve mostrar "1 item"
    And o total do carrinho deve ser R$ 1.200,00

  Scenario: Remover produto do carrinho
    Given que o usuário tem o produto "Smartphone XYZ" no carrinho
    And o carrinho tem 1 item no valor de R$ 1.200,00
    When o usuário clica no botão "Remover" do produto
    Then o produto deve ser removido do carrinho
    And o contador do carrinho deve mostrar "0 itens"
    And o total do carrinho deve ser R$ 0,00

  Scenario: Adicionar múltiplos produtos ao carrinho
    Given que o usuário está na página de produtos
    When o usuário adiciona "Smartphone XYZ" por R$ 1.200,00 ao carrinho
    And o usuário adiciona "Fone de Ouvido ABC" por R$ 300,00 ao carrinho
    Then o carrinho deve conter 2 itens
    And o total do carrinho deve ser R$ 1.500,00
      `,
      explanation: 'Cenários de carrinho devem cobrir adição, remoção e cálculos. Use dados específicos (valores, nomes) para tornar os cenários mais claros e testáveis.',
      type: 'E-commerce'
    },
    {
      id: 3,
      title: 'Sistema de Reserva de Hotel',
      description: 'Funcionalidade para buscar e reservar quartos de hotel.',
      businessRequirements: `
        Requisitos de Negócio:
        1. O usuário deve poder buscar hotéis por cidade e datas.
        2. O sistema deve mostrar apenas hotéis disponíveis para as datas selecionadas.
        3. O usuário deve poder filtrar por preço e avaliação.
        4. O usuário deve poder fazer uma reserva selecionando um quarto.
        5. O sistema deve enviar um email de confirmação após a reserva.
      `,
      expectedScenario: `
Feature: Reserva de hotel

  Scenario: Buscar hotéis disponíveis
    Given que o usuário está na página de busca de hotéis
    When o usuário seleciona a cidade "São Paulo"
    And o usuário seleciona a data de check-in "2024-06-15"
    And o usuário seleciona a data de check-out "2024-06-17"
    And o usuário clica em "Buscar"
    Then o sistema deve exibir apenas hotéis disponíveis para essas datas
    And cada hotel deve mostrar preço, avaliação e disponibilidade

  Scenario: Fazer reserva de quarto
    Given que o usuário encontrou um hotel disponível "Hotel Central"
    And o quarto "Standard Duplo" custa R$ 250,00 por noite
    When o usuário clica em "Reservar" para este quarto
    And o usuário preenche os dados pessoais
    And o usuário confirma a reserva
    Then a reserva deve ser criada no sistema
    And o usuário deve receber um email de confirmação
    And o quarto deve ficar indisponível para as datas selecionadas

  Scenario: Filtrar hotéis por preço
    Given que o usuário fez uma busca e há 10 hotéis disponíveis
    When o usuário define o filtro de preço máximo para R$ 200,00
    Then o sistema deve mostrar apenas hotéis com diárias até R$ 200,00
    And hotéis mais caros devem ser ocultados da lista
      `,
      explanation: 'Cenários de reserva devem incluir busca, filtros e o processo completo de reserva. Considere estados do sistema (disponibilidade) e integrações (email).',
      type: 'Reservas'
    }
  ];

  const currentDocument = businessDocuments[currentScenarioIndex];

  const startGame = () => {
    setGameStarted(true);
    setCurrentScenarioIndex(0);
    setUserScenario('');
    setEvaluationResult(null);
    setEvaluationMessage('');
    setShowExplanation(false);
    setTimeLeft(300);
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleEvaluateScenario(); // Avaliar automaticamente quando o tempo acabar
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
  }, [gameStarted, currentScenarioIndex]);

  const handleEvaluateScenario = () => {
    clearInterval(timerRef.current);
    
    const userScenarioTrimmed = userScenario.trim();
    if (!userScenarioTrimmed) {
      setEvaluationResult('fail');
      setEvaluationMessage('Por favor, escreva seus cenários Gherkin antes de avaliar.');
      setShowExplanation(true);
      return;
    }

    const lines = userScenarioTrimmed.split('\n').map(line => line.trim());
    let passed = true;
    let message = 'Seus cenários precisam de melhorias.';

    // 1. Verificar a presença de Feature
    if (!lines[0] || !lines[0].toLowerCase().startsWith('feature:')) {
      passed = false;
      message = 'O cenário deve começar com a palavra-chave "Feature:".';
    } else {
      // 2. Verificar a presença de pelo menos um Scenario
      const scenarioLines = lines.filter(line => line.toLowerCase().startsWith('scenario:'));
      if (scenarioLines.length === 0) {
        passed = false;
        message = 'Pelo menos um "Scenario:" é obrigatório.';
      } else {
        // 3. Para cada cenário, verificar Given, When, Then
        let currentScenarioPassed = true;
        let currentScenarioMessage = '';
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].toLowerCase();
          if (line.startsWith('scenario:')) {
            let hasGiven = false;
            let hasWhen = false;
            let hasThen = false;
            let j = i + 1;
            while (j < lines.length && !lines[j].toLowerCase().startsWith('scenario:')) {
              const innerLine = lines[j].toLowerCase();
              if (innerLine.startsWith('given')) hasGiven = true;
              if (innerLine.startsWith('when')) hasWhen = true;
              if (innerLine.startsWith('then')) hasThen = true;
              j++;
            }
            if (!hasGiven || !hasWhen || !hasThen) {
              currentScenarioPassed = false;
              currentScenarioMessage = 'Cada cenário deve conter pelo menos um "Given", "When" e "Then".';
              break;
            }
            i = j - 1; // Ajusta o índice para o próximo cenário ou fim do documento
          }
        }
        if (!currentScenarioPassed) {
          passed = false;
          message = currentScenarioMessage;
        }
      }
    }

    if (passed) {
      setEvaluationResult('pass');
      setEvaluationMessage('Excelente! Seus cenários estão bem estruturados e seguem as diretrizes do Gherkin!');
    } else {
      setEvaluationResult('fail');
      setEvaluationMessage(message);
    }
    setShowExplanation(true);
  };

  const handleNextDocument = () => {
    if (currentScenarioIndex < businessDocuments.length - 1) {
      setCurrentScenarioIndex(prevIndex => prevIndex + 1);
      setUserScenario('');
      setEvaluationResult(null);
      setEvaluationMessage('');
      setShowExplanation(false);
      setTimeLeft(300);
    } else {
      // Fim do jogo
      setGameStarted(false);
      alert('Parabéns! Você completou todos os desafios de BDD!');
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentScenarioIndex(0);
    setUserScenario('');
    setEvaluationResult(null);
    setEvaluationMessage('');
    setShowExplanation(false);
    setTimeLeft(300);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Desafio BDD (Behavior-Driven Development)</CardTitle>
            <CardDescription className="text-lg">
              Pratique a escrita de cenários em linguagem Gherkin baseados em documentos de negócio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Sobre o Jogo:</h3>
              <p className="text-sm text-muted-foreground text-left">
                No jogo "Desafio BDD", você receberá documentos de requisitos de negócio e deverá escrever cenários de teste em linguagem Gherkin (Given-When-Then) que cubram adequadamente as funcionalidades descritas.
              </p>
              <h3 className="font-semibold text-xl">Como Jogar:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Você receberá um documento com requisitos de negócio.</li>
                <li>• Leia atentamente os requisitos e identifique os cenários de teste necessários.</li>
                <li>• Escreva cenários em linguagem Gherkin usando a estrutura Feature, Scenario, Given, When, Then.</li>
                <li>• Você terá 5 minutos para cada documento.</li>
                <li>• Tente cobrir tanto o "happy path" (fluxo principal) quanto cenários alternativos.</li>
                <li>• Após escrever, clique em "Avaliar Cenários" para ver o resultado.</li>
              </ul>
              <h3 className="font-semibold text-xl">Estrutura Gherkin:</h3>
              <div className="text-sm text-muted-foreground text-left bg-gray-50 p-3 rounded-md">
                <strong>Feature:</strong> Título da funcionalidade<br/>
                <strong>Scenario:</strong> Nome do cenário<br/>
                <strong>Given:</strong> Pré-condições (estado inicial)<br/>
                <strong>When:</strong> Ações do usuário<br/>
                <strong>Then:</strong> Resultados esperados<br/>
                <strong>And:</strong> Passos adicionais
              </div>
            </div>
            <Button onClick={startGame} size="lg" className="w-full">
              <FileText className="mr-2 h-5 w-5" />
              Começar Desafio BDD
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Documento {currentScenarioIndex + 1} de {businessDocuments.length}: {currentDocument.title}</h2>
        <div className="flex items-center space-x-2">
          <Timer className="h-5 w-5" />
          <span className={`font-mono text-lg ${timeLeft <= 60 ? 'text-red-500' : ''}`}>
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{ (timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documento de Negócio */}
        <Card>
          <CardHeader>
            <CardTitle>Documento de Requisitos</CardTitle>
            <CardDescription>
              <Badge variant="secondary">{currentDocument.type}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h4 className="font-semibold mb-2">{currentDocument.description}</h4>
            <div className="bg-gray-50 p-4 rounded-md text-sm">
              <pre className="whitespace-pre-wrap">{currentDocument.businessRequirements}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Área de Escrita */}
        <Card>
          <CardHeader>
            <CardTitle>Seus Cenários BDD</CardTitle>
            <CardDescription>
              Escreva cenários em linguagem Gherkin baseados nos requisitos ao lado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="user-scenario">Cenários Gherkin:</Label>
            <Textarea
              id="user-scenario"
              value={userScenario}
              onChange={(e) => setUserScenario(e.target.value)}
              placeholder={`Feature: Nome da funcionalidade\n\nScenario: Nome do cenário\n  Given que [pré-condição]\n  When o usuário [ação]\n  Then [resultado esperado]`}
              rows={15}
              className="font-mono text-sm"
            />
            <Button onClick={handleEvaluateScenario} className="w-full" size="lg" disabled={showExplanation}>
              Avaliar Cenários
            </Button>
          </CardContent>
        </Card>
      </div>

      {showExplanation && (
        <Card>
          <CardContent className="p-6">
            <div className={`p-4 rounded-lg border ${evaluationResult === 'pass' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h4 className={`font-semibold mb-2 ${evaluationResult === 'pass' ? 'text-green-800' : 'text-red-800'}`}>
                {evaluationResult === 'pass' ? (
                  <CheckCircle className="inline-block mr-2 h-5 w-5" />
                ) : (
                  <XCircle className="inline-block mr-2 h-5 w-5" />
                )}
                {evaluationResult === 'pass' ? 'Avaliação Concluída!' : 'Avaliação Concluída!'}
              </h4>
              <p className={`text-sm mb-4 ${evaluationResult === 'pass' ? 'text-green-700' : 'text-red-700'}`}>
                {evaluationMessage}
              </p>
              
              <div className="mt-4">
                <h5 className="font-semibold mb-2">Exemplo de Cenários Esperados:</h5>
                <div className="bg-gray-100 p-3 rounded-md text-xs overflow-auto">
                  <pre className="whitespace-pre-wrap">{currentDocument.expectedScenario}</pre>
                </div>
              </div>
            </div>
            
            <Button onClick={handleNextDocument} className="w-full mt-4" size="lg">
              {currentScenarioIndex < businessDocuments.length - 1 ? 'Próximo Documento' : 'Finalizar Jogo'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BDDGame;


