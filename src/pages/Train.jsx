import TrainingGameEnhanced from '../games/TrainingGameEnhanced'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const Train = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Início
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Treinamento QA</h1>
          <p className="text-muted-foreground">30 questões baseadas no CTFL 4.0 com certificação e compartilhamento</p>
        </div>
      </div>
      
      <TrainingGameEnhanced />
    </div>
  )
}

export default Train

