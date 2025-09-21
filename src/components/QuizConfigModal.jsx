import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Target, Trophy } from 'lucide-react'

const QuizConfigModal = ({ isOpen, onClose, onStart, quizTitle }) => {
  const [selectedQuestions, setSelectedQuestions] = useState(20)
  const [selectedTime, setSelectedTime] = useState(20 * 60) // 20 minutos em segundos

  const questionOptions = [
    { value: 20, label: '20 questões', time: 20 * 60, difficulty: 'Rápido' }, // 20 minutos em segundos
    { value: 50, label: '50 questões', time: 50 * 60, difficulty: 'Médio' }, // 50 minutos em segundos
    { value: 100, label: '100 questões', time: 100 * 60, difficulty: 'Completo' } // 100 minutos em segundos
  ]

  const handleStart = () => {
    onStart(selectedQuestions, selectedTime) // selectedTime já está em segundos
    // Não chamar onClose() aqui - deixar o componente pai controlar
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}min`
    }
    return `${minutes}min`
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose()
      }
    }}>
      <DialogContent className="w-[95vw] max-w-md">
        {/* Cabeçalho */}
        <DialogHeader className="space-y-2 pb-4">
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Target className="w-6 h-6 text-primary" />
            <span>Configurar Quiz</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Escolha quantas questões você quer encarar no desafio de {quizTitle}
          </DialogDescription>
        </DialogHeader>

        {/* Conteúdo Principal */}
        <div className="space-y-6">
          {/* Seletor Horizontal de Questões */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Selecione o número de questões para esta rodada</h4>
            <div className="flex bg-muted rounded-lg p-1">
              {questionOptions.map((option) => (
                <button
                  key={option.value}
                  className={`flex-1 py-3 px-4 text-sm font-semibold rounded-md transition-all duration-300 ${
                    selectedQuestions === option.value
                      ? "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/20 shadow-primary/25"
                      : "text-muted-foreground border border-gray-400 hover:text-foreground hover:border-primary hover:bg-muted/50 hover:shadow-md"
                  }`}
                  onClick={() => {
                    setSelectedQuestions(option.value)
                    setSelectedTime(option.time)
                  }}
                >
                  {option.value}
                </button>
              ))}
            </div>
          </div>

          {/* Resumo Dinâmico */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Desafio configurado:</span> Você terá <span className="font-semibold text-foreground">{formatTime(selectedTime)}</span> para responder <span className="font-semibold text-foreground">{selectedQuestions} questões</span>
            </p>
          </div>
        </div>

        {/* Rodapé com Botões */}
        <div className="pt-6 border-t border-border">
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 h-10 text-sm font-medium"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleStart} 
              className="flex-1 h-10 text-sm font-medium bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
            >
              Iniciar Desafio
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QuizConfigModal
