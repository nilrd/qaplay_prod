import BugHuntGame from '../games/BugHuntGame'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const BugHuntGamePage = () => {
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
          <h1 className="text-2xl font-bold">Encontre o Bug</h1>
          <p className="text-muted-foreground">Identifique problemas em interfaces e códigos reais</p>
        </div>
      </div>
      
      <BugHuntGame />
    </div>
  )
}

export default BugHuntGamePage

