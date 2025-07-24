import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bug, Play, Send } from 'lucide-react';

const scenarios = [
  {
    id: 1,
    title: "Formulário de Cadastro de Usuário",
    description: "Você está testando um formulário de cadastro de usuário com os seguintes campos: Nome (texto), Email (email), Senha (senha, mínimo 8 caracteres), Confirmação de Senha (senha), e um checkbox 'Aceito os termos de uso'. O botão de 'Cadastrar' deve estar habilitado apenas quando todos os campos obrigatórios forem preenchidos corretamente e as senhas coincidirem. Quais cenários de teste você executaria para cobrir este formulário?",
    expected_answers: [
      "Preencher todos os campos com dados válidos e cadastrar.",
      "Deixar campos obrigatórios em branco.",
      "Inserir email em formato inválido.",
      "Senha com menos de 8 caracteres.",
      "Senhas não coincidentes.",
      "Não marcar 'Aceito os termos de uso'.",
      "Testar caracteres especiais nos campos de texto.",
      "Testar limites de caracteres nos campos.",
      "Testar submissão com e sem conexão à internet.",
      "Testar comportamento do botão 'Cadastrar' (habilitado/desabilitado)."
    ]
  },
  {
    id: 2,
    title: "Funcionalidade de Busca de Produtos",
    description: "Você está testando uma funcionalidade de busca em um e-commerce. A busca deve retornar produtos que contenham o termo pesquisado no nome ou descrição. Há também filtros por categoria e preço. Quais cenários de teste você executaria para cobrir esta funcionalidade?",
    expected_answers: [
      "Buscar por termo existente.",
      "Buscar por termo inexistente.",
      "Buscar com campo vazio.",
      "Buscar com caracteres especiais.",
      "Buscar com termos muito longos.",
      "Buscar e aplicar filtro por categoria.",
      "Buscar e aplicar filtro por preço (faixa válida).",
      "Buscar e aplicar filtro por preço (faixa inválida).",
      "Combinar busca com múltiplos filtros.",
      "Testar sensibilidade a maiúsculas/minúsculas."
    ]
  }
];

const ScenarioSimulatorGame = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentScenario = scenarios[currentScenarioIndex];

  const handleSubmit = () => {
    let currentScore = 0;
    const userAnswers = userResponse.split(/\n/).map(answer => answer.trim()).filter(answer => answer.length > 0);

    currentScenario.expected_answers.forEach(expected => {
      if (userAnswers.some(userAns => userAns.toLowerCase().includes(expected.toLowerCase().substring(0, Math.min(expected.length * 0.7, 20))))) {
        currentScore += 10;
      }
    });

    setScore(currentScore);
    setShowResult(true);
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setUserResponse('');
      setShowResult(false);
      setScore(0);
    } else {
      alert('Todos os cenários foram concluídos! Parabéns!');
      setCurrentScenarioIndex(0); // Reset for replay
      setUserResponse('');
      setShowResult(false);
      setScore(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bug className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-center">Simulador de Cenários</CardTitle>
          <CardDescription className="text-center">
            Analise o cenário e identifique os casos de teste.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-xl font-semibold">Cenário {currentScenarioIndex + 1}: {currentScenario.title}</h2>
          <p className="text-muted-foreground">{currentScenario.description}</p>

          {!showResult ? (
            <div className="space-y-4">
              <Label htmlFor="user-test-cases">Seus Casos de Teste (um por linha):</Label>
              <Textarea
                id="user-test-cases"
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                rows={10}
                placeholder="Ex: 1. Validar cadastro com todos os campos preenchidos corretamente.\n2. Validar mensagem de erro ao deixar campo de email vazio."
              />
              <Button onClick={handleSubmit} className="w-full">
                <Send className="mr-2 h-5 w-5" />
                Enviar Resposta
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Seu Resultado:</h3>
              <p className="text-md">Sua pontuação neste cenário: <span className="font-bold text-primary">{score} pontos</span></p>
              <h4 className="text-md font-semibold">Casos de Teste Esperados:</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                {currentScenario.expected_answers.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
              <Button onClick={handleNextScenario} className="w-full">
                {currentScenarioIndex < scenarios.length - 1 ? 'Próximo Cenário' : 'Reiniciar Cenários'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioSimulatorGame;


