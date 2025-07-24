import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BDDGame from '../games/BDDGame';

const AgileGamePage = () => {
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
          <h1 className="text-2xl font-bold">Metodologias Ágeis e Colaboração</h1>
          <p className="text-muted-foreground">Aprenda BDD, Scrum, Kanban e colaboração em equipes ágeis</p>
        </div>
      </div>
      
      <BDDGame />
    </div>
  );
};

export default AgileGamePage;

