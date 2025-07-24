
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, CheckCircle, XCircle, Lightbulb, RotateCcw } from 'lucide-react';

const BrokenInterfaceGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos
  const [markedBugs, setMarkedBugs] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Limpar o timer e resetar o jogo ao desmontar o componente ou ao iniciar um novo jogo
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      resetGame(); // Garante que o estado seja limpo ao sair da página
    };
  }, []); // Executa apenas uma vez na montagem do componente

  const scenarios = [
    {
      id: 1,
      title: "Formulário de Login Quebrado",
      description: "Identifique os problemas de usabilidade e funcionalidade neste formulário de login.",
      bugs: [
        { id: 'label-email', description: 'Label do campo E-mail está incorreta (Nome)', elementId: 'label-email', type: 'Usabilidade' },
        { id: 'input-minlength', description: 'Validação de minlength da senha não funciona', elementId: 'senha', type: 'Funcional' },
        { id: 'button-submit', description: 'Botão Enviar não submete o formulário', elementId: 'submit-button', type: 'Funcional' },
        { id: 'placeholder-username', description: 'Placeholder do campo usuário está incorreto (Digite seu e-mail)', elementId: 'email', type: 'Usabilidade' },
      ],
      render: () => (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700" id="label-email">Nome:</label>
            <input type="text" id="email" placeholder="Digite seu e-mail" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha:</label>
            <input type="password" id="senha" minLength="10" placeholder="Digite sua senha" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <Button type="submit" id="submit-button" className="w-full">Enviar</Button>
        </form>
      )
    },
    {
      id: 2,
      title: "Carrinho de Compras com Erros",
      description: "Encontre os bugs de cálculo e interação neste carrinho de compras.",
      bugs: [
        { id: 'item-quantity', description: 'Quantidade de item pode ser negativa', elementId: 'quantity-input', type: 'Funcional' },
        { id: 'total-calculation', description: 'Total não é atualizado ao mudar quantidade', elementId: 'total-display', type: 'Cálculo' },
        { id: 'remove-button', description: 'Botão remover não funciona', elementId: 'remove-item-button', type: 'Funcional' },
      ],
      render: () => {
        const [quantity, setQuantity] = useState(1);
        const price = 25.00;
        const total = quantity * price;

        const handleQuantityChange = (e) => {
          const value = parseInt(e.target.value);
          setQuantity(isNaN(value) ? 0 : value);
        };

        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span>Produto X</span>
              <input
                type="number"
                id="quantity-input"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 border rounded-md p-1 text-center"
              />
              <span>R$ {price.toFixed(2)}</span>
              <Button variant="destructive" size="sm" id="remove-item-button">Remover</Button>
            </div>
            <div className="flex justify-end items-center font-bold text-lg">
              Total: <span id="total-display">R$ {total.toFixed(2)}</span>
            </div>
            <Button className="w-full">Finalizar Compra</Button>
          </div>
        );
      }
    },
    {
      id: 3,
      title: "Página de Perfil Quebrada",
      description: "Descubra os problemas de exibição e funcionalidade na página de perfil do usuário.",
      bugs: [
        { id: 'profile-image', description: 'Imagem de perfil não carrega', elementId: 'profile-img', type: 'Visual' },
        { id: 'edit-button', description: 'Botão Editar não redireciona', elementId: 'edit-profile-button', type: 'Funcional' },
        { id: 'logout-link', description: 'Link de Logout não funciona', elementId: 'logout-link', type: 'Funcional' },
        { id: 'user-name-display', description: 'Nome do usuário incorreto', elementId: 'user-name', type: 'Dados' },
      ],
      render: () => (
        <div className="space-y-4 text-center">
          <img src="/broken-image.png" alt="Profile" id="profile-img" className="w-24 h-24 rounded-full mx-auto border" />
          <h2 className="text-xl font-bold" id="user-name">Usuário Desconhecido</h2>
          <p className="text-sm text-gray-600">email@example.com</p>
          <Button id="edit-profile-button" className="w-full">Editar Perfil</Button>
          <a href="#" id="logout-link" className="text-blue-500 hover:underline block mt-2">Sair</a>
        </div>
      )
    },
    {
      id: 4,
      title: "Formulário de Cadastro com Validações Quebradas",
      description: "Identifique problemas de validação e usabilidade neste formulário de cadastro.",
      bugs: [
        { id: 'email-validation', description: 'Campo e-mail aceita formato inválido', elementId: 'cadastro-email', type: 'Funcional' },
        { id: 'password-confirm', description: 'Confirmação de senha não valida se as senhas são iguais', elementId: 'confirm-password', type: 'Funcional' },
        { id: 'required-field', description: 'Campo obrigatório não está marcado como required', elementId: 'nome-completo', type: 'Funcional' },
        { id: 'submit-disabled', description: 'Botão de cadastro permanece desabilitado mesmo com campos preenchidos', elementId: 'cadastro-submit', type: 'Funcional' },
      ],
      render: () => {
        const [formData, setFormData] = useState({
          nome: '',
          email: '',
          senha: '',
          confirmSenha: ''
        });

        const handleInputChange = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
        };

        return (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label htmlFor="nome-completo" className="block text-sm font-medium text-gray-700">Nome Completo *</label>
              <input 
                type="text" 
                id="nome-completo" 
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
              />
            </div>
            <div>
              <label htmlFor="cadastro-email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input 
                type="email" 
                id="cadastro-email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
              />
            </div>
            <div>
              <label htmlFor="cadastro-senha" className="block text-sm font-medium text-gray-700">Senha</label>
              <input 
                type="password" 
                id="cadastro-senha" 
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
              <input 
                type="password" 
                id="confirm-password" 
                name="confirmSenha"
                value={formData.confirmSenha}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
              />
            </div>
            <Button type="submit" id="cadastro-submit" disabled className="w-full opacity-50 cursor-not-allowed">
              Cadastrar
            </Button>
          </form>
        );
      }
    },
    {
      id: 5,
      title: "Dashboard com Dados Inconsistentes",
      description: "Encontre inconsistências nos dados e problemas de interface neste dashboard.",
      bugs: [
        { id: 'chart-data', description: 'Gráfico mostra dados inconsistentes com a tabela', elementId: 'dashboard-chart', type: 'Dados' },
        { id: 'total-sum', description: 'Soma total não confere com os valores individuais', elementId: 'total-vendas', type: 'Cálculo' },
        { id: 'date-filter', description: 'Filtro de data não funciona', elementId: 'date-filter', type: 'Funcional' },
        { id: 'export-button', description: 'Botão de exportar não responde', elementId: 'export-btn', type: 'Funcional' },
      ],
      render: () => {
        const vendas = [
          { produto: 'Produto A', valor: 150.00 },
          { produto: 'Produto B', valor: 200.00 },
          { produto: 'Produto C', valor: 100.00 }
        ];
        
        const totalCorreto = vendas.reduce((sum, venda) => sum + venda.valor, 0);
        const totalIncorreto = 500.00; // Bug: total incorreto

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Dashboard de Vendas</h3>
              <div className="flex space-x-2">
                <input type="date" id="date-filter" className="border rounded-md p-2" />
                <Button id="export-btn" variant="outline">Exportar</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Vendas por Produto</h4>
                <div id="dashboard-chart" className="bg-blue-100 h-32 flex items-center justify-center">
                  <span className="text-sm text-gray-600">Gráfico: Produto A: 50%, Produto B: 30%, Produto C: 20%</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Tabela de Vendas</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left">Produto</th>
                      <th className="text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendas.map((venda, index) => (
                      <tr key={index} className="border-b">
                        <td>{venda.produto}</td>
                        <td className="text-right">R$ {venda.valor.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-2 pt-2 border-t font-bold">
                  Total: <span id="total-vendas">R$ {totalIncorreto.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  ];

  const currentScenario = scenarios[currentScenarioIndex] || scenarios[0];

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(180);
    setMarkedBugs([]);
    setShowResults(false);
    setCurrentScenarioIndex(0);
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

  const handleElementClick = (event) => {
    const clickedElement = event.target;
    const elementId = clickedElement.id;

    const bugFound = currentScenario.bugs.find(bug => bug.elementId === elementId);

    if (bugFound && !markedBugs.some(bug => bug.id === bugFound.id)) {
      setMarkedBugs(prev => [...prev, { ...bugFound, clicked: true }]);
      clickedElement.style.border = '2px solid red';
    } else if (!bugFound && !markedBugs.some(bug => bug.elementId === elementId && bug.clicked === false)) {
        setMarkedBugs(prev => [...prev, { id: `false-positive-${elementId}`, description: `Elemento clicado indevidamente: ${elementId}`, elementId: elementId, clicked: false }]);
        clickedElement.style.border = '2px solid blue';
    }
  };

  const finishGame = () => {
    clearInterval(timerRef.current);
    setShowResults(true);
  };

  const nextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      // Limpar o timer atual
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Avançar para o próximo cenário
      setCurrentScenarioIndex(prevIndex => prevIndex + 1);
      setMarkedBugs([]);
      setShowResults(false);
      setTimeLeft(180);
      
      // Reiniciar o timer para o novo cenário
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
    } else {
      // Fim do jogo - redirecionar para a página de jogos
      clearInterval(timerRef.current);
      window.location.href = '/jogos';
    }
  };

  const resetGame = () => {
    // Limpar bordas de todos os cenários
    scenarios.forEach(scenario => {
      scenario.bugs.forEach(bug => {
        const element = document.getElementById(bug.elementId);
        if (element) element.style.border = '';
      });
    });
    setGameStarted(false);
    setTimeLeft(180);
    setMarkedBugs([]);
    setShowResults(false);
    setCurrentScenarioIndex(0);
  };

  const correctBugsFound = markedBugs.filter(bug => currentScenario.bugs.some(b => b.id === bug.id && bug.clicked)).length;
  const incorrectClicks = markedBugs.filter(bug => bug.clicked === false).length;
  const bugsNotFound = currentScenario.bugs.length - correctBugsFound;

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Interface Quebrada</CardTitle>
            <CardDescription className="text-lg">
              Identifique erros reais de interface, fluxo e funcionalidade em mini aplicações web.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Sobre o Jogo:</h3>
              <p className="text-sm text-muted-foreground text-left">
                No jogo "Interface Quebrada", você assume o papel de um Analista de Qualidade (QA) com a missão de encontrar bugs em interfaces de software simuladas. Seu objetivo é identificar e marcar todos os defeitos presentes na tela antes que o tempo se esgote.
              </p>
              <h3 className="font-semibold text-xl">Como Jogar:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Cada cenário apresenta uma mini aplicação com funcionalidades específicas (ex: formulário de login, carrinho de compras).</li>
                <li>• Interaja com os elementos da interface (clique em botões, preencha campos, etc.) e observe o comportamento.</li>
                <li>• Quando encontrar um bug (algo que não funciona como deveria, um erro visual, um cálculo incorreto, etc.), clique sobre o elemento que contém o defeito.</li>
                <li>• Se você clicar em um elemento que **não** é um bug, será considerado um "falso positivo" e impactará sua pontuação.</li>
                <li>• Você terá 3 minutos para encontrar todos os bugs em cada cenário.</li>
                <li>• Ao final do tempo ou quando você decidir finalizar o cenário, seus resultados serão exibidos, mostrando os bugs encontrados, os que foram perdidos e os falsos positivos.</li>
              </ul>
              <h3 className="font-semibold text-xl">O que procurar (Tipos de Bugs):</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• **Bugs Funcionais**: Algo não funciona como esperado (ex: botão não clica, validação falha).</li>
                <li>• **Bugs de Usabilidade**: Dificuldade de uso, fluxo confuso, mensagens pouco claras.</li>
                <li>• **Bugs Visuais**: Elementos desalinhados, cores erradas, imagens quebradas.</li>
                <li>• **Bugs de Cálculo**: Valores incorretos em somas, subtrações, etc.</li>
                <li>• **Bugs de Dados**: Informações incorretas ou inconsistentes exibidas.</li>
              </ul>
            </div>
            <Button onClick={startGame} size="lg" className="w-full">
              <Timer className="mr-2 h-5 w-5" />
              Começar Teste
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Cenário {currentScenarioIndex + 1} de {scenarios.length}: {currentScenario.title}</h2>
        <div className="flex items-center space-x-2">
          <Timer className="h-5 w-5" />
          <span className={`font-mono text-lg ${timeLeft <= 30 ? 'text-red-500' : ''}`}>
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{ (timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="border p-4 rounded-lg bg-gray-50" onClick={handleElementClick}> {/* Container para a mini aplicação */}
            {currentScenario && currentScenario.render ? currentScenario.render() : <div>Carregando cenário...</div>}
          </div>
        </CardContent>
      </Card>

      <Button onClick={finishGame} className="w-full" size="lg" disabled={showResults}>
        Finalizar Cenário
      </Button>

      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Resultados do Cenário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{correctBugsFound}</div>
                <div className="text-sm text-muted-foreground">Acertos</div>
              </div>
              <div>
                <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{incorrectClicks}</div>
                <div className="text-sm text-muted-foreground">Erros (cliques indevidos)</div>
              </div>
              <div>
                <Lightbulb className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{bugsNotFound}</div>
                <div className="text-sm text-muted-foreground">Bugs não encontrados</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Bugs Encontrados:</h4>
              <ul className="list-disc pl-5">
                {markedBugs.filter(bug => bug.clicked).map(bug => (
                  <li key={bug.id} className="text-green-700">✅ {bug.description}</li>
                ))}
              </ul>
            </div>
            {bugsNotFound > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Bugs que você deixou passar:</h4>
                <ul className="list-disc pl-5">
                  {currentScenario.bugs.filter(bug => !markedBugs.some(mb => mb.id === bug.id && mb.clicked)).map(bug => (
                    <li key={bug.id} className="text-yellow-700">💡 {bug.description}</li>
                  ))}
                </ul>
              </div>
            )}
            {incorrectClicks > 0 && (
                <div className="space-y-2">
                    <h4 className="font-semibold">Cliques indevidos:</h4>
                    <ul className="list-disc pl-5">
                        {markedBugs.filter(bug => !bug.clicked).map(bug => (
                            <li key={bug.id} className="text-red-700">❌ {bug.description}</li>
                        ))}
                    </ul>
                </div>
            )}
            <Button onClick={() => window.location.href = '/jogos'} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Voltar aos Jogos
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BrokenInterfaceGame;


