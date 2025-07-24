import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Share2, Download, X, Linkedin } from 'lucide-react'

const CertificateModal = ({ userInfo, score, onClose, onShareLinkedIn }) => {
  const getScoreLevel = (percentage) => {
    if (percentage >= 90) return { level: 'Expert', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage >= 80) return { level: 'Avançado', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (percentage >= 70) return { level: 'Intermediário', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (percentage >= 60) return { level: 'Iniciante', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { level: 'Precisa Estudar', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const scoreLevel = getScoreLevel(score.percentage)
  const currentDate = new Date().toLocaleDateString('pt-BR')

  const generateLinkedInPost = () => {
    const text = `🎯 Acabei de completar o "Desafio: Mestre da Qualidade" no QAPlay!

📊 Resultado: ${score.percentage}% (${score.correct}/${score.total} questões corretas)
🏆 Nível: ${scoreLevel.level}
📚 100 questões baseadas no CTFL 4.0

O QAPlay é uma plataforma gamificada criada por Nilson da Silva Brites para ensinar Quality Assurance de forma prática e divertida.

#QualityAssurance #QA #CTFL #Testing #QAPlay #Certificação #TechSkills`

    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.qaplay.com.br')}&text=${encodeURIComponent(text)}`
    
    if (onShareLinkedIn) {
      onShareLinkedIn(url)
    } else {
      window.open(url, '_blank')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2"
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl">Conquista</CardTitle>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-dashed border-blue-200">
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-gray-800">Certificado de Conclusão</h2>
                <div className="text-lg">
                  <p className="text-gray-600">Certificamos que</p>
                  <p className="text-2xl font-bold text-blue-600 my-2">{userInfo.name}</p>
                  <p className="text-gray-600">completou com sucesso o</p>
                  <p className="text-xl font-semibold text-purple-600 my-2">Desafio: Mestre da Qualidade</p>
                </div>
                
                <div className="flex justify-center items-center space-x-4 my-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{score.percentage}%</div>
                    <div className="text-sm text-gray-500">Pontuação</div>
                  </div>
                  <div className="text-center">
                    <Badge className={`${scoreLevel.bg} ${scoreLevel.color} text-lg px-3 py-1`}>
                      {scoreLevel.level}
                    </Badge>
                    <div className="text-sm text-gray-500 mt-1">Nível</div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>{score.correct} de {score.total} questões corretas</p>
                  <p>Baseado no CTFL 4.0</p>
                  <p>Data: {currentDate}</p>
                </div>

                <div className="border-t pt-3 mt-4">
                  <p className="text-xs text-gray-400">QAPlay - Plataforma de Ensino de QA</p>
                  <p className="text-xs text-gray-400">Por Nilson da Silva Brites</p>
                  <p className="text-xs text-gray-400">www.qaplay.com.br</p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Parabéns!</h3>
            <p className="text-muted-foreground">
              {userInfo.name}, você completou o desafio com uma pontuação de {score.percentage}%.
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Análise do Desempenho:</h4>
            <p className="text-sm text-muted-foreground">
              {score.percentage >= 90 && "Excelente! Você demonstra domínio avançado dos conceitos de QA e está pronto para certificações."}
              {score.percentage >= 80 && score.percentage < 90 && "Muito bom! Você tem conhecimento sólido em QA, continue estudando para alcançar a excelência."}
              {score.percentage >= 70 && score.percentage < 80 && "Bom desempenho! Você tem uma base sólida, mas há espaço para aprimoramento em algumas áreas."}
              {score.percentage >= 60 && score.percentage < 70 && "Você está no caminho certo! Continue estudando e praticando para fortalecer seus conhecimentos."}
              {score.percentage < 60 && "Recomendamos revisar os conceitos fundamentais de QA e praticar mais antes de tentar novamente."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={generateLinkedInPost}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              Compartilhar no LinkedIn
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Baixar Certificado
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              linkedin.com/in/nilsonbrites
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CertificateModal

