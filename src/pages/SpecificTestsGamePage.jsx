import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestCaseWritingGame from '../games/TestCaseWritingGame';

const SpecificTestsGamePage = () => {
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
          <h1 className="text-2xl font-bold">Testes Específicos (API, Mobile, UI)</h1>
          <p className="text-muted-foreground">Pratique escrita de casos de teste para diferentes tipos de aplicação</p>
        </div>
      </div>
      
      <TestCaseWritingGame />
    </div>
  );
};

export default SpecificTestsGamePage;

