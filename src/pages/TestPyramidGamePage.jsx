import TestPyramidGame from "../games/TestPyramidGame";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TestPyramidGamePage = () => {
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
          <h1 className="text-2xl font-bold">Pirâmide de Testes</h1>
          <p className="text-muted-foreground">Monte a pirâmide de testes correta considerando custo e velocidade.</p>
        </div>
      </div>
      
      <TestPyramidGame />
    </div>
  );
};

export default TestPyramidGamePage;

