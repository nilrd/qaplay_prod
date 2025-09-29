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
          <h1 className="text-2xl font-bold">Mestre da Qualidade</h1>
          <p className="text-muted-foreground">200+ questões inspiradas nos materiais públicos do CTFL 4.0 com certificação e compartilhamento</p>
        </div>
      </div>
      
      <div className="bg-muted/50 p-8 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Treinamento em Desenvolvimento</h2>
        <p className="text-muted-foreground mb-4">
          O sistema de treinamento está sendo atualizado. Enquanto isso, você pode praticar com nossos quizzes disponíveis.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/quizzes">
              Ver Quizzes Disponíveis
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/jogos/ctfl-100-quiz">
              Mestre da Qualidade
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Train

