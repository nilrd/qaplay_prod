import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const exercises = [
  {
    id: 1,
    category: 'Fundamentos de Teste',
    title: 'Identificando Bugs',
    description: 'Analise um cenário de software e identifique possíveis bugs e suas severidades.',
    difficulty: 'Iniciante',
    content: 'Você está testando um aplicativo de e-commerce. Ao adicionar um item ao carrinho e tentar finalizar a compra, o aplicativo trava. Qual o bug e qual sua severidade?',
    solution: 'Bug: Travamento do aplicativo ao finalizar a compra. Severidade: Crítica, pois impede a funcionalidade principal do aplicativo.',
  },
  {
    id: 2,
    category: 'SDLC e STLC',
    title: 'Mapeando o Ciclo de Vida',
    description: 'Descreva as fases do SDLC e STLC e como o QA se encaixa em cada uma.',
    difficulty: 'Intermediário',
    content: 'Explique as etapas do SDLC e STLC e o papel do QA em cada uma, com foco na abordagem Shift Left.',
    solution: 'SDLC: Planejamento, Análise, Design, Implementação, Teste, Implantação, Manutenção. STLC: Planejamento de Teste, Análise de Requisitos de Teste, Design de Teste, Configuração do Ambiente de Teste, Execução de Teste, Fechamento do Ciclo de Teste. QA se envolve desde o planejamento (Shift Left) para prevenir defeitos.',
  },
  {
    id: 3,
    category: 'Automação de Testes',
    title: 'Criando um Script Básico',
    description: 'Escreva um pseudocódigo para automatizar o login em um site.',
    difficulty: 'Intermediário',
    content: 'Crie um pseudocódigo para um script de automação que faça login em um site, considerando os campos de usuário e senha e o botão de login.',
    solution: 'ABRIR NAVEGADOR\nNAVEGAR PARA URL_DO_SITE\nENCONTRAR CAMPO_USUARIO POR ID\nDIGITAR USUARIO\nENCONTRAR CAMPO_SENHA POR ID\nDIGITAR SENHA\nCLICAR BOTAO_LOGIN\nVERIFICAR SE LOGIN FOI REALIZADO COM SUCESSO',
  },
  {
    id: 4,
    category: 'Metodologias Ágeis',
    title: 'Scrum e QA',
    description: 'Explique o papel do QA em uma equipe Scrum.',
    difficulty: 'Intermediário',
    content: 'Como o QA se integra em uma equipe Scrum? Quais são suas responsabilidades durante as sprints?',
    solution: 'O QA participa de todas as cerimônias Scrum, colabora na definição de critérios de aceite, executa testes durante a sprint, participa do refinamento do backlog e garante a qualidade do incremento entregue.',
  },
  {
    id: 5,
    category: 'Testes de API',
    title: 'Testando uma API REST',
    description: 'Descreva como testar uma API RESTful.',
    difficulty: 'Avançado',
    content: 'Quais são os principais aspectos a serem testados em uma API REST? Como você estruturaria os testes?',
    solution: 'Testar: códigos de status HTTP, estrutura da resposta JSON/XML, validação de dados, autenticação/autorização, performance, tratamento de erros. Usar ferramentas como Postman, Newman ou RestAssured.',
  }
];

const TrainContent = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [showSolution, setShowSolution] = useState(false);

  const startExercise = (index) => {
    setCurrentExerciseIndex(index);
    setShowSolution(false);
  };

  const completeExercise = () => {
    if (currentExerciseIndex !== null && !completedExercises.includes(currentExerciseIndex)) {
      setCompletedExercises([...completedExercises, currentExerciseIndex]);
    }
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setShowSolution(false);
    }
  };

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setShowSolution(false);
    }
  };

  const backToList = () => {
    setCurrentExerciseIndex(null);
    setShowSolution(false);
  };

  if (currentExerciseIndex !== null) {
    const exercise = exercises[currentExerciseIndex];
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={backToList}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Voltar à Lista
          </Button>
          <div className="text-sm text-muted-foreground">
            Exercício {currentExerciseIndex + 1} de {exercises.length}
          </div>
        </div>

        <Progress value={((currentExerciseIndex + 1) / exercises.length) * 100} className="w-full" />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{exercise.title}</CardTitle>
                <CardDescription className="text-lg mt-2">
                  {exercise.category} • {exercise.difficulty}
                </CardDescription>
              </div>
              {completedExercises.includes(currentExerciseIndex) && (
                <CheckCircle className="h-8 w-8 text-green-500" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{exercise.description}</p>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Exercício:</h4>
              <p>{exercise.content}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowSolution(!showSolution)} variant="outline">
                {showSolution ? 'Ocultar Solução' : 'Ver Solução'}
              </Button>
              <Button onClick={completeExercise} disabled={completedExercises.includes(currentExerciseIndex)}>
                {completedExercises.includes(currentExerciseIndex) ? 'Concluído' : 'Marcar como Concluído'}
              </Button>
            </div>

            {showSolution && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-green-800">Solução:</h4>
                <p className="text-green-700 whitespace-pre-line">{exercise.solution}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevExercise} 
            disabled={currentExerciseIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <Button 
            onClick={nextExercise} 
            disabled={currentExerciseIndex === exercises.length - 1}
          >
            Próximo
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Exercícios Práticos de QA
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Pratique suas habilidades com exercícios baseados em cenários reais. 
          Cada exercício foi cuidadosamente elaborado para desenvolver competências específicas em Quality Assurance.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{completedExercises.length}</div>
              <p className="text-sm text-muted-foreground">Exercícios Concluídos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{Math.round((completedExercises.length / exercises.length) * 100)}%</div>
              <p className="text-sm text-muted-foreground">Progresso Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Progress value={(completedExercises.length / exercises.length) * 100} className="w-full" />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise, index) => (
          <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{exercise.title}</CardTitle>
                  <CardDescription>{exercise.category}</CardDescription>
                </div>
                {completedExercises.includes(index) ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-gray-300" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{exercise.description}</p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  exercise.difficulty === 'Iniciante' ? 'bg-green-100 text-green-800' :
                  exercise.difficulty === 'Intermediário' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {exercise.difficulty}
                </span>
                <Button onClick={() => startExercise(index)} size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Começar Exercício
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default TrainContent;

