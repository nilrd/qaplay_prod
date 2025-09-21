import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SDLCGamePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/treinar">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Treinamento
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">SDLC e STLC na Prática</h1>
          <p className="text-muted-foreground">Jogo sobre ciclo de vida do desenvolvimento e teste de software</p>
        </div>
      </div>
      
      <div className="bg-muted/50 p-8 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Jogo em Desenvolvimento</h2>
        <p className="text-muted-foreground mb-4">
          O jogo de SDLC/STLC está sendo desenvolvido e estará disponível em breve.
        </p>
        <Button asChild>
          <Link to="/quizzes">
            Ver Quizzes Disponíveis
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SDLCGamePage;

