import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { FileText, CheckCircle, XCircle, RotateCcw, Trophy, Clock, Target, Lightbulb } from 'lucide-react'

const TestCaseWritingGame = () => {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [userTestCase, setUserTestCase] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [gameStarted, setGameStarted] = useState(false)
  const [feedback, setFeedback] = useState('')

  const scenarios = [
    {
      id: 1,
      title: "Tela de Login",
      description: "Escreva casos de teste para uma tela de login com campos de email e senha",
      requirements: [
        "Campo de email obrigatório",
        "Campo de senha obrigatório",
        "Validação de formato de email",
        "Senha deve ter no mínimo 8 caracteres",
        "Botão de login deve estar habilitado apenas com campos preenchidos"
      ],
      difficulty: "Iniciante",
      expectedElements: [
        "pré-condições",
        "passos",
        "resultado esperado",
        "dados de teste",
        "validação"
      ],
      sampleTestCase: `
**Caso de Teste: CT001 - Login com credenciais válidas**

**Pré-condições:**
- Usuário possui conta válida no sistema
- Sistema está acessível

**Passos:**
1. Acessar a tela de login
2. Inserir email válido no campo "Email"
3. Inserir senha válida no campo "Senha"
4. Clicar no botão "Entrar"

**Resultado Esperado:**
- Usuário é redirecionado para a página principal
- Mensagem de boas-vindas é exibida

**Dados de Teste:**
- Email: usuario@teste.com
- Senha: senha123456
      `
    },
    {
      id: 2,
      title: "Formulário de Cadastro",
      description: "Crie casos de teste para um formulário de cadastro de usuário",
      requirements: [
        "Nome completo obrigatório",
        "Email único no sistema",
        "Senha com critérios de segurança",
        "Confirmação de senha",
        "Aceite dos termos de uso obrigatório"
      ],
      difficulty: "Intermediário",
      expectedElements: [
        "cenário positivo",
        "cenário negativo",
        "validações",
        "mensagens de erro",
        "dados limite"
      ],
      sampleTestCase: `
**Caso de Teste: CT002 - Cadastro com dados válidos**

**Pré-condições:**
- Sistema está acessível
- Email não está cadastrado no sistema

**Passos:**
1. Acessar a tela de cadastro
2. Preencher campo "Nome" com nome válido
3. Preencher campo "Email" com email válido
4. Preencher campo "Senha" com senha que atende critérios
5. Confirmar senha no campo "Confirmar Senha"
6. Marcar checkbox "Aceito os termos"
7. Clicar em "Cadastrar"

**Resultado Esperado:**
- Cadastro realizado com sucesso
- Mensagem de confirmação exibida
- Email de verificação enviado

**Dados de Teste:**
- Nome: João Silva Santos
- Email: joao.silva@email.com
- Senha: MinhaSenh@123
      `
    },
    {
      id: 3,
      title: "Carrinho de Compras",
      description: "Desenvolva casos de teste para funcionalidades de carrinho de e-commerce",
      requirements: [
        "Adicionar produtos ao carrinho",
        "Alterar quantidade de itens",
        "Remover itens do carrinho",
        "Calcular total com impostos",
        "Aplicar cupons de desconto"
      ],
      difficulty: "Avançado",
      expectedElements: [
        "múltiplos cenários",
        "cálculos matemáticos",
        "integração",
        "performance",
        "usabilidade"
      ],
      sampleTestCase: `
**Caso de Teste: CT003 - Adicionar produto ao carrinho**

**Pré-condições:**
- Usuário logado no sistema
- Produto disponível em estoque
- Carrinho vazio

**Passos:**
1. Navegar para página do produto
2. Verificar informações do produto (preço, descrição)
3. Selecionar quantidade desejada
4. Clicar em "Adicionar ao Carrinho"
5. Verificar carrinho atualizado

**Resultado Esperado:**
- Produto adicionado ao carrinho
- Quantidade correta exibida
- Subtotal calculado corretamente
- Contador do carrinho atualizado

**Dados de Teste:**
- Produto: Smartphone XYZ
- Quantidade: 2 unidades
- Preço unitário: R$ 899,90
      `
    }
  ]

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameFinished && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      finishScenario()
    }
  }, [timeLeft, gameStarted, gameFinished, showResult])

  const startGame = () => {
    setGameStarted(true)
    setCurrentScenario(0)
    setScore(0)
    setUserTestCase('')
    setShowResult(false)
    setGameFinished(false)
    setTimeLeft(300)
    setFeedback('')
  }

  const analyzeTestCase = (testCase) => {
    const scenario = scenarios[currentScenario]
    let points = 0
    let feedbackItems = []

    // Check for expected elements
    scenario.expectedElements.forEach(element => {
      const elementPatterns = {
        'pré-condições': /pré.?condições|precondições|pré.?requisitos/i,
        'passos': /passos|etapas|procedimento/i,
        'resultado esperado': /resultado.?esperado|expected.?result/i,
        'dados de teste': /dados.?de.?teste|test.?data/i,
        'validação': /validação|verificação|validar/i,
        'cenário positivo': /cenário.?positivo|caso.?positivo|fluxo.?principal/i,
        'cenário negativo': /cenário.?negativo|caso.?negativo|fluxo.?alternativo/i,
        'mensagens de erro': /mensagem.?de.?erro|error.?message/i,
        'dados limite': /dados.?limite|boundary.?value|valor.?limite/i,
        'múltiplos cenários': /múltiplos|vários|diferentes/i,
        'cálculos matemáticos': /cálculo|total|soma|subtotal/i,
        'integração': /integração|integration/i,
        'performance': /performance|tempo.?de.?resposta/i,
        'usabilidade': /usabilidade|experiência|interface/i
      }

      if (elementPatterns[element] && elementPatterns[element].test(testCase)) {
        points += 10
        feedbackItems.push(`✅ Incluiu ${element}`)
      } else {
        feedbackItems.push(`❌ Faltou ${element}`)
      }
    })

    // Bonus points for structure
    if (testCase.length > 100) {
      points += 10
      feedbackItems.push('✅ Caso de teste detalhado')
    }

    if (/\d+\./.test(testCase)) {
      points += 5
      feedbackItems.push('✅ Passos numerados')
    }

    return { points, feedback: feedbackItems.join('\n') }
  }

  const finishScenario = () => {
    setShowResult(true)
    
    const analysis = analyzeTestCase(userTestCase)
    const timeBonus = Math.floor(timeLeft / 30)
    const finalScore = analysis.points + timeBonus
    
    setScore(score + finalScore)
    setFeedback(analysis.feedback)
  }

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setUserTestCase('')
      setShowResult(false)
      setTimeLeft(300)
      setFeedback('')
    } else {
      setGameFinished(true)
      // Save score
      const savedBestScore = localStorage.getItem('qaplay-testcase-best-score')
      if (!savedBestScore || score > parseInt(savedBestScore)) {
        localStorage.setItem('qaplay-testcase-best-score', score.toString())
      }
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentScenario(0)
    setScore(0)
    setUserTestCase('')
    setShowResult(false)
    setGameFinished(false)
    setTimeLeft(300)
    setFeedback('')
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800'
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800'
      case 'Avançado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreMessage = () => {
    const maxScore = scenarios.reduce((acc, scenario) => acc + (scenario.expectedElements.length * 10 + 15), 0)
    const percentage = (score / maxScore) * 100
    
    if (percentage >= 90) return "Excelente! Você escreve casos de teste como um expert! 📝"
    if (percentage >= 70) return "Muito bom! Seus casos de teste estão bem estruturados! 🎯"
    if (percentage >= 50) return "Bom trabalho! Continue praticando a escrita! 📚"
    return "Continue estudando! A prática leva à perfeição! 💪"
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Escrita de Casos de Teste</CardTitle>
            <CardDescription className="text-lg">
              Pratique a escrita de casos de teste estruturados e detalhados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{scenarios.length}</div>
                <div className="text-sm text-muted-foreground">Cenários</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5min</div>
                <div className="text-sm text-muted-foreground">Por cenário</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {localStorage.getItem('qaplay-testcase-best-score') || 0}
                </div>
                <div className="text-sm text-muted-foreground">Melhor pontuação</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Como jogar:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Leia os requisitos do cenário</li>
                <li>• Escreva um caso de teste completo</li>
                <li>• Inclua pré-condições, passos e resultados esperados</li>
                <li>• Ganhe pontos por estrutura e completude</li>
              </ul>
            </div>
            
            <Button onClick={startGame} size="lg" className="w-full">
              <FileText className="mr-2 h-5 w-5" />
              Começar Escrita
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameFinished) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Escrita Concluída!</CardTitle>
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
                <div className="text-3xl font-bold text-primary">{scenarios.length}</div>
                <div className="text-sm text-muted-foreground">Cenários Concluídos</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button onClick={resetGame} variant="outline" className="flex-1">
                <RotateCcw className="mr-2 h-4 w-4" />
                Escrever Novamente
              </Button>
              <Button onClick={() => window.history.back()} className="flex-1">
                Voltar aos Jogos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentScenarioData = scenarios[currentScenario]
  const progress = ((currentScenario + 1) / scenarios.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Badge variant="outline">
            Cenário {currentScenario + 1} de {scenarios.length}
          </Badge>
          <Badge className={getDifficultyColor(currentScenarioData.difficulty)}>
            {currentScenarioData.difficulty}
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className={`font-mono ${timeLeft <= 60 ? 'text-red-500' : ''}`}>
              {formatTime(timeLeft)}
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

      {/* Scenario */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentScenarioData.title}</CardTitle>
          <CardDescription>{currentScenarioData.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Requirements */}
          <div className="space-y-3">
            <h4 className="font-semibold">Requisitos:</h4>
            <ul className="space-y-1">
              {currentScenarioData.requirements.map((req, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Test Case Input */}
          <div className="space-y-3">
            <h4 className="font-semibold">Escreva seu caso de teste:</h4>
            <Textarea
              placeholder="Digite seu caso de teste aqui... Inclua pré-condições, passos detalhados, resultado esperado e dados de teste."
              value={userTestCase}
              onChange={(e) => setUserTestCase(e.target.value)}
              className="min-h-[300px]"
              disabled={showResult}
            />
            <div className="text-sm text-muted-foreground">
              Caracteres: {userTestCase.length}
            </div>
          </div>

          {/* Results */}
          {showResult && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-3">Feedback:</h4>
                <pre className="text-sm whitespace-pre-wrap">{feedback}</pre>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Exemplo de caso de teste:
                </h4>
                <pre className="text-blue-800 text-sm whitespace-pre-wrap">
                  {currentScenarioData.sampleTestCase}
                </pre>
              </div>
              
              <Button onClick={nextScenario} className="w-full" size="lg">
                {currentScenario < scenarios.length - 1 ? 'Próximo Cenário' : 'Ver Resultado Final'}
              </Button>
            </div>
          )}

          {!showResult && (
            <Button 
              onClick={finishScenario} 
              className="w-full" 
              size="lg"
              disabled={userTestCase.length < 50}
            >
              Avaliar Caso de Teste
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TestCaseWritingGame

