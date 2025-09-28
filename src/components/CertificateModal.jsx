import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Download, Share2, Award } from 'lucide-react';
import html2canvas from 'html2canvas';

const CertificateModal = ({ isOpen, onClose, fullName = '', score = 0, totalQuestions = 1, linkedinProfile = '' }) => {
  const certificateRef = useRef(null);

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const currentDate = new Date().toLocaleDateString('pt-BR');

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          foreignObjectRendering: false,
          logging: false,
          width: certificateRef.current.offsetWidth,
          height: certificateRef.current.offsetHeight
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
    const text = `🎯 Acabei de completar o Quiz de QA no QAPlay com ${percentage}% de acertos e conquistei o badge '${badgeText}'! 🏆\n\n📚 Baseado no Syllabus ISTQB® CTFL 4.0 - International Software Testing Qualifications Board\n🎮 150 questões cuidadosamente elaboradas para preparação certificação\n⚡ Teste seus conhecimentos em Quality Assurance: https://qaplay.com.br\n\n#QA #QualityAssurance #Testing #ISTQB #CTFL #SoftwareTesting #QAPlay #Certificação`;
    
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://qaplay.com.br')}&summary=${encodeURIComponent(badgeText)}&title=${encodeURIComponent('Meu Resultado no QA Quiz do QAPlay - ISTQB CTFL 4.0')}&source=${encodeURIComponent('QAPlay')}&text=${encodeURIComponent(text)}`;
    
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };



  const getBadgeColor = () => {
    if (percentage >= 90) return '#eab308'; // yellow-500
    if (percentage >= 70) return '#3b82f6'; // blue-500
    if (percentage >= 50) return '#22c55e'; // green-500
    return '#6b7280'; // gray-500
  };

  const getBadgeLevel = () => {
    if (percentage >= 90) return 'Expert';
    if (percentage >= 70) return 'Avançado';
    if (percentage >= 50) return 'Intermediário';
    return 'Iniciante';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] flex flex-col overflow-hidden modal-container">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl font-bold text-center">Certificado de Conclusão</DialogTitle>
        </DialogHeader>
        
        <div className="flex-grow overflow-y-auto space-y-4 pr-1">
          {/* Certificado */}
          <div 
            ref={certificateRef}
            className="p-4 sm:p-6 rounded-lg border-2 text-center"
            style={{ 
              minHeight: '400px',
              background: 'linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%)',
              borderColor: '#bfdbfe'
            }}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: getBadgeColor() }}
                  >
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold" style={{ color: '#1f2937' }}>Certificado de Conclusão</h1>
                <p className="text-sm sm:text-base" style={{ color: '#4b5563' }}>QAPlay - Quiz de Quality Assurance</p>
                <p className="text-xs sm:text-sm font-semibold" style={{ color: '#2563eb' }}>Baseado no Syllabus ISTQB® CTFL 4.0</p>
                <p className="text-xs" style={{ color: '#6b7280' }}>International Software Testing Qualifications Board</p>
              </div>

              {/* Conteúdo Principal */}
              <div className="space-y-3">
                <p className="text-sm sm:text-base" style={{ color: '#374151' }}>Certificamos que</p>
                <h2 className="text-2xl sm:text-3xl font-bold break-words" style={{ color: '#2563eb' }}>{fullName}</h2>
                <p className="text-sm sm:text-base" style={{ color: '#374151' }}>
                  completou com sucesso o Quiz de Quality Assurance
                </p>
              </div>

              {/* Resultados */}
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                    <div className="text-lg sm:text-xl font-bold" style={{ color: '#2563eb' }}>{score}</div>
                    <div className="text-xs" style={{ color: '#4b5563' }}>Pontuação</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold" style={{ color: '#16a34a' }}>{percentage}%</div>
                    <div className="text-xs" style={{ color: '#4b5563' }}>Acertos</div>
                  </div>
                  <div>
                    <Badge 
                      className="text-white text-xs"
                      style={{ backgroundColor: getBadgeColor() }}
                    >
                      {getBadgeLevel()}
                    </Badge>
                    <div className="text-xs" style={{ color: '#4b5563' }}>Nível</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="space-y-1 text-xs" style={{ color: '#4b5563' }}>
                <p>Data de conclusão: {currentDate}</p>
                <p>QAPlay - Plataforma de Treinamento em Quality Assurance</p>
                <p className="text-xs">Certificado gerado automaticamente pelo sistema QAPlay</p>
              </div>
            </div>
          </div>

          {/* Badge Digital */}
          <div className="p-3 sm:p-4 rounded-lg text-center" style={{ backgroundColor: '#f9fafb' }}>
            <h3 className="text-sm sm:text-base font-semibold mb-3">Seu Badge Digital</h3>
            <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white p-3 rounded-lg shadow-sm border">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getBadgeColor() }}
              >
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">QA Quiz - {getBadgeLevel()}</div>
                <div className="text-xs" style={{ color: '#4b5563' }}>{percentage}% de acertos</div>
              </div>
            </div>
          </div>

          {/* Informações do LinkedIn */}
          {linkedinProfile && (
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#eff6ff' }}>
              <p className="text-xs" style={{ color: '#1e40af' }}>
                <strong>Perfil LinkedIn:</strong> {linkedinProfile}
              </p>
              <p className="text-xs mt-1" style={{ color: '#2563eb' }}>
                Adicione este certificado ao seu perfil para destacar suas habilidades em QA!
              </p>
            </div>
          )}
        </div>

        {/* Rodapé fixo com botões de ação */}
        <div className="flex-shrink-0 p-6 pt-4 border-t border-border modal-footer">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Button onClick={downloadCertificate} className="flex-1 text-sm hover:shadow-lg transition-all duration-300">
              <Download className="mr-2 h-4 w-4" />
              Baixar Certificado
            </Button>
            <Button onClick={shareOnLinkedIn} variant="outline" className="flex-1 text-sm hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar no LinkedIn
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;

