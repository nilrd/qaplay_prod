import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestPyramidGame from '../games/TestPyramidGame';

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
      
      <TestPyramidGame />
    </div>
  );
};

export default SDLCGamePage;

