import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Code, Terminal, Brain, ArrowRight } from 'lucide-react';

const Program = () => {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
          Desafios de Programação para QA
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Aprimore suas habilidades de programação e automação de testes com desafios práticos e focados no dia a dia de um QA.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Terminal className="h-6 w-6 text-purple-500" />
            </div>
            <CardTitle className="text-lg">Automação de Testes</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Desafios práticos para você aplicar seus conhecimentos em automação de testes web e API, utilizando ferramentas e frameworks populares como Cypress, Playwright, Selenium e Postman.
            </CardDescription>
            <Link to="/jogos/programming-challenge" className="text-primary hover:underline mt-4 block">Começar Desafio <ArrowRight className="inline-block h-4 w-4 ml-1" /></Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-pink-500" />
            </div>
            <CardTitle className="text-lg">Lógica de Programação</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Exercícios de lógica de programação em JavaScript e Java para fortalecer sua base e prepará-lo para escrever códigos de teste mais eficientes e robustos.
            </CardDescription>
            <Link to="/jogos/logic-programming" className="text-primary hover:underline mt-4 block">Começar Desafio <ArrowRight className="inline-block h-4 w-4 ml-1" /></Link>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Tópicos Abordados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nossos desafios cobrem uma ampla gama de tecnologias e conceitos essenciais para o QA moderno.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Frameworks de Automação</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Cypress</li>
                <li>Playwright</li>
                <li>Selenium</li>
                <li>JUnit (Java)</li>
                <li>Cucumber</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Testes Automatizados</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Testes de Unidade</li>
                <li>Testes de Integração</li>
                <li>Testes de UI (End-to-End)</li>
                <li>Testes de API</li>
                <li>Testes Mobile</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Conceitos Essenciais</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Lógica de Programação (JavaScript, Java)</li>
                <li>BDD (Behavior-Driven Development)</li>
                <li>Pirâmide de Testes</li>
                <li>Git/GitHub para automação</li>
                <li>Integração Contínua (CI)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Program;


