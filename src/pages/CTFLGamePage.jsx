import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuizGame from '../games/QuizGame';

const CTFLGamePage = () => {
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
          <h1 className="text-2xl font-bold">Fundamentos de Teste (CTFL)</h1>
          <p className="text-muted-foreground">Quiz baseado no Syllabus CTFL - Certified Tester Foundation Level</p>
        </div>
      </div>
      
      <QuizGame />
    </div>
  );
};

export default CTFLGamePage;

