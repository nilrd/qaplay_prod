import TestCaseWritingGame from "../games/TestCaseWritingGame";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TestCaseWritingGamePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/jogos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Jogos
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Escrita de Casos de Teste</h1>
          <p className="text-muted-foreground">Pratique a escrita de casos de teste estruturados e detalhados.</p>
        </div>
      </div>
      
      <TestCaseWritingGame />
    </div>
  );
};

export default TestCaseWritingGamePage;

