import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Download, Share2, Calendar, Award, Target } from 'lucide-react'
import html2canvas from 'html2canvas'

const CertificatePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const certificateRef = useRef(null)
  const [certificateData, setCertificateData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento dos dados do certificado
    // Em uma implementação real, você buscaria os dados do localStorage ou de uma API
    const savedData = localStorage.getItem(`certificate_${id}`)
    if (savedData) {
      setCertificateData(JSON.parse(savedData))
    }
    setLoading(false)
  }, [id])

  const downloadCertificate = async () => {
    if (!certificateRef.current) return

    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#0a0a0a', // Fundo escuro para o tema dark
        scale: 2, // Maior resolução
        useCORS: true,
        allowTaint: true
      })
      
      const link = document.createElement('a')
      link.download = `certificado-qaplay-${certificateData.userName.replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error('Erro ao gerar certificado:', error)
      alert('Erro ao gerar o certificado. Tente novamente.')
    }
  }

  const shareCertificate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu Certificado QAPlay',
          text: `Concluí o desafio ${certificateData.quizName} com ${certificateData.score}% de acertos!`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Erro ao compartilhar:', error)
      }
    } else {
      // Fallback: copiar URL para clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado para a área de transferência!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando certificado...</p>
        </div>
      </div>
    )
  }

  if (!certificateData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Certificado não encontrado</h1>
            <p className="text-muted-foreground mb-6">
              Este certificado não existe ou foi removido.
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Certificado */}
        <div ref={certificateRef} className="bg-card border border-border rounded-lg p-8 mb-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">QAPlay</h1>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Certificado de Conclusão</h2>
            <p className="text-muted-foreground">Plataforma Gamificada de Quality Assurance</p>
          </div>

          {/* Conteúdo Principal */}
          <div className="text-center mb-8">
            <p className="text-lg text-foreground mb-4">
              Certificamos que
            </p>
            <h3 className="text-3xl font-bold text-primary mb-6 border-b-2 border-primary pb-2">
              {certificateData.userName}
            </h3>
            <p className="text-lg text-foreground mb-6">
              concluiu com sucesso o desafio
            </p>
            <h4 className="text-2xl font-semibold text-foreground mb-6">
              {certificateData.quizName}
            </h4>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-white" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Pontuação Final</p>
              <p className="text-2xl font-bold text-foreground">{certificateData.score}%</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-white" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Questões Corretas</p>
              <p className="text-2xl font-bold text-foreground">{certificateData.correctAnswers}/{certificateData.totalQuestions}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Data de Conclusão</p>
              <p className="text-lg font-semibold text-foreground">{certificateData.completionDate}</p>
            </div>
          </div>

          {/* Badge de Performance */}
          <div className="text-center mb-8">
            <Badge className={`text-lg px-6 py-3 ${
              certificateData.score >= 90 ? 'bg-green-600 text-white' :
              certificateData.score >= 80 ? 'bg-blue-600 text-white' :
              certificateData.score >= 70 ? 'bg-yellow-600 text-white' :
              'bg-gray-600 text-white'
            }`}>
              {certificateData.score >= 90 ? 'Excelente Performance' :
               certificateData.score >= 80 ? 'Boa Performance' :
               certificateData.score >= 70 ? 'Performance Satisfatória' :
               'Performance Básica'}
            </Badge>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground border-t border-border pt-6">
            <p>Este certificado foi gerado automaticamente pela plataforma QAPlay</p>
            <p className="mt-1">ID do Certificado: {id}</p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={downloadCertificate} size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
            <Download className="mr-2 h-5 w-5" />
            Baixar como Imagem
          </Button>
          <Button onClick={shareCertificate} variant="outline" size="lg">
            <Share2 className="mr-2 h-5 w-5" />
            Compartilhar
          </Button>
          <Button onClick={() => navigate('/')} variant="outline" size="lg">
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CertificatePage
