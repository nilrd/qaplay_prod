import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Download, Share2, Award } from 'lucide-react';
import html2canvas from 'html2canvas';

const CertificateModal = ({ isOpen, onClose, fullName, score, totalQuestions, linkedinProfile }) => {
  const certificateRef = useRef(null);

  const percentage = Math.round((score / totalQuestions) * 100);
  const currentDate = new Date().toLocaleDateString('pt-BR');

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
        });
        
        const link = document.createElement('a');
        link.download = `certificado-qaplay-${fullName.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Erro ao gerar certificado:', error);
        alert('Erro ao gerar o certificado. Tente novamente.');
      }
    }
  };

  const shareOnLinkedIn = () => {
    const badgeText = `QA Quiz - ${getBadgeLevel()} (${percentage}% de acertos)`;
    const text = `Acabei de completar o Quiz de QA no QAPlay com ${percentage}% de acertos e conquistei o badge '${badgeText}'! 🎉\n\nBaseado no Syllabus ISTQB CTFL 4.0. Teste seus conhecimentos em Quality Assurance também: https://qaplay.vercel.app\n\n#QA #QualityAssurance #Testing #ISTQB #CTFL #QAPlay`;
    
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://qaplay.vercel.app')}&summary=${encodeURIComponent(badgeText)}&title=${encodeURIComponent('Meu Resultado no QA Quiz do QAPlay')}&source=${encodeURIComponent('QAPlay')}&text=${encodeURIComponent(text)}`;
    
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  const getBadgeColor = () => {
    if (percentage >= 90) return 'bg-yellow-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-green-500';
    return 'bg-gray-500';
  };

  const getBadgeLevel = () => {
    if (percentage >= 90) return 'Expert';
    if (percentage >= 70) return 'Avançado';
    if (percentage >= 50) return 'Intermediário';
    return 'Iniciante';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Certificado de Conclusão</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Certificado */}
          <div 
            ref={certificateRef}
            className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg border-2 border-blue-200 text-center"
            style={{ minHeight: '500px' }}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className={`w-16 h-16 ${getBadgeColor()} rounded-full flex items-center justify-center`}>
                    <Award className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Certificado de Conclusão</h1>
                <p className="text-lg text-gray-600">QAPlay - Quiz de Quality Assurance (Baseado no Syllabus ISTQB CTFL 4.0)</p>
              </div>

              {/* Conteúdo Principal */}
              <div className="space-y-4">
                <p className="text-lg text-gray-700">Certificamos que</p>
                <h2 className="text-4xl font-bold text-blue-600">{fullName}</h2>
                <p className="text-lg text-gray-700">
                  completou com sucesso o Quiz de Quality Assurance
                </p>
              </div>

              {/* Resultados */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{score}</div>
                    <div className="text-sm text-gray-600">Pontuação</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{percentage}%</div>
                    <div className="text-sm text-gray-600">Acertos</div>
                  </div>
                  <div>
                    <Badge className={`${getBadgeColor()} text-white`}>
                      {getBadgeLevel()}
                    </Badge>
                    <div className="text-sm text-gray-600 mt-1">Nível</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="space-y-2 text-sm text-gray-600">
                <p>Data de conclusão: {currentDate}</p>
                <p>QAPlay - Plataforma de Treinamento em Quality Assurance</p>
                <p className="text-xs">Certificado gerado automaticamente pelo sistema QAPlay</p>
              </div>
            </div>
          </div>

          {/* Badge Digital */}
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Seu Badge Digital</h3>
            <div className="inline-flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm border">
              <div className={`w-12 h-12 ${getBadgeColor()} rounded-full flex items-center justify-center`}>
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold">QA Quiz - {getBadgeLevel()}</div>
                <div className="text-sm text-gray-600">{percentage}% de acertos</div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-4">
            <Button onClick={downloadCertificate} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Baixar Certificado
            </Button>
            <Button onClick={shareOnLinkedIn} variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar no LinkedIn
            </Button>
          </div>

          {/* Informações do LinkedIn */}
          {linkedinProfile && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Perfil LinkedIn:</strong> {linkedinProfile}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Adicione este certificado ao seu perfil para destacar suas habilidades em QA!
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;





