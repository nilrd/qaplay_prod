import ScenarioSimulatorGame from "../games/ScenarioSimulatorGame";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ScenarioSimulatorGamePage = () => {
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
          <h1 className="text-2xl font-bold">Simulador de Cenários</h1>
          <p className="text-muted-foreground">Crie e execute cenários de teste em um ambiente simulado.</p>
        </div>
      </div>
      
      <ScenarioSimulatorGame />
    </div>
  );
};

export default ScenarioSimulatorGamePage;


