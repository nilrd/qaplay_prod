import PuzzleGame from '../games/PuzzleGame'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const PuzzleGamePage = () => {
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
          <h1 className="text-2xl font-bold">QA Puzzle</h1>
          <p className="text-muted-foreground">Monte a sequência correta de processos e técnicas de QA</p>
        </div>
      </div>
      
      <PuzzleGame />
    </div>
  )
}

export default PuzzleGamePage

