import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Lightbulb, Code, Users, Target, Zap } from 'lucide-react';

const Train = () => {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
          Treine Suas Habilidades em QA
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Aprofunde seus conhecimentos em Quality Assurance com conteúdo estruturado e exercícios práticos, seguindo as melhores práticas da indústria e o syllabus CTFL.
        </p>
      </section>

      <section className="text-center space-y-6 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold">Exercícios Práticos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pratique suas habilidades com exercícios baseados em cenários reais. 
            Desenvolva competências através de desafios progressivos em 8 categorias diferentes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="text-sm text-muted-foreground">Categorias</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">20+</div>
            <div className="text-sm text-muted-foreground">Exercícios</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Pontos Possíveis</div>
          </div>
        </div>
        
        <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Link to="/treinar/exercicios">
            <Zap className="mr-2 h-5 w-5" />
            Começar Exercícios Práticos
          </Link>
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-green-500" />
            </div>
            <CardTitle className="text-lg">Fundamentos de Teste (CTFL)</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Explore os conceitos essenciais de teste de software, alinhados com o Syllabus CTFL (Certified Tester Foundation Level) 4.0br. Entenda o que é teste, por que é necessário, e os princípios fundamentais.
            </CardDescription>
            <Link to="/treinar/jogo/fundamentos-ctfl" className="text-primary hover:underline mt-4 block">Saiba Mais <ArrowRight className="inline-block h-4 w-4 ml-1" /></Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-blue-500" />
            </div>
            <CardTitle className="text-lg">SDLC e STLC na Prática</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Compreenda o ciclo de vida do desenvolvimento de software (SDLC) e o ciclo de vida do teste de software (STLC). Aprenda como o QA se integra em cada fase, desde a concepção até a manutenção.
            </CardDescription>
            <Link to="/treinar/jogo/sdlc-stlc" className="text-primary hover:underline mt-4 block">Saiba Mais <ArrowRight className="inline-block h-4 w-4 ml-1" /></Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-purple-500" />
            </div>
            <CardTitle className="text-lg">Automação e Frameworks</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Descubra os principais frameworks e ferramentas de automação de testes, como Cypress, Playwright, Selenium, JUnit, e Cucumber. Entenda quando e como aplicá-los em diferentes contextos.
            </CardDescription>
            <Link to="/treinar/jogo/automacao-frameworks" className="text-primary hover:underline mt-4 block">Saiba Mais <ArrowRight className="inline-block h-4 w-4 ml-1" /></Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-yellow-500" />
            </div>
            <CardTitle className="text-lg">Metodologias Ágeis e Colaboração</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Aprenda sobre Scrum, Kanban e o papel do QA em equipes ágeis. Entenda como o BDD (Behavior-Driven Development) e o Git/GitHub facilitam a colaboração e a qualidade do software.
            </CardDescription>
            <Link to="/treinar/jogo/metodologias-ageis" className="text-primary hover:underline mt-4 block">Saiba Mais <ArrowRight className="inline-block h-4 w-4 ml-1" /></Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-red-500" />
            </div>
            <CardTitle className="text-lg">Testes Específicos (API, Mobile, UI)</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Aprofunde-se em tipos de teste específicos, como testes de API (RESTful), testes mobile (Android/iOS), testes de UI/UX, e a aplicação da Pirâmide de Testes para otimizar sua estratégia.
            </CardDescription>
            <Link to="/treinar/jogo/testes-especificos" className="text-primary hover:underline mt-4 block">Saiba Mais <ArrowRight className="inline-block h-4 w-4 ml-1" /></Link>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Questões para Reflexão e Estudo</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Aqui estão algumas questões para você aprofundar seus conhecimentos e se preparar para o mercado de trabalho. Tente respondê-las e pesquisar sobre os tópicos que tiver dúvidas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Questões Fundamentais de QA</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Qual a diferença entre QA e Teste de Software?</li>
                <li>Explique o ciclo de vida do desenvolvimento de software (SDLC) e o papel do QA em cada fase.</li>
                <li>Descreva o ciclo de vida do teste de software (STLC) e suas etapas.</li>
                <li>O que é a abordagem 'Shift Left' em testes e qual sua importância?</li>
                <li>Qual a diferença entre verificação e validação?</li>
                <li>O que é um teste de regressão e quando ele é executado?</li>
                <li>Explique a Pirâmide de Testes e a importância de cada camada.</li>
                <li>Qual a diferença entre teste de caixa branca e caixa preta?</li>
                <li>O que são critérios de aceite e qual sua relevância?</li>
                <li>Descreva o papel do QA em uma equipe Scrum ou Kanban.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Questões de Automação e Ferramentas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Quais as vantagens e desvantagens do Cypress vs. Selenium?</li>
                <li>Como o Playwright se diferencia de outras ferramentas de automação de UI?</li>
                <li>O que é BDD e como o Cucumber se encaixa nesse contexto?</li>
                <li>Explique como você usaria o Postman para testar uma API RESTful.</li>
                <li>Qual a importância do JUnit para testes de unidade em Java?</li>
                <li>Como o Git/GitHub auxilia na colaboração em projetos de automação de testes?</li>
                <li>O que são testes de performance e quais ferramentas você conhece?</li>
                <li>Descreva um cenário onde testes de segurança seriam cruciais.</li>
                <li>O que são testes de usabilidade e como eles são conduzidos?</li>
                <li>Qual a diferença entre testes de integração e testes de sistema?</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Train;

