import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, Award, Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { useSEO } from '@/hooks/useSEO';

const CertificatePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extrair parâmetros da URL
  const quiz = searchParams.get('quiz');
  const nome = searchParams.get('nome');
  const score = searchParams.get('score');
  const totalQuestions = searchParams.get('total') || '100';
  const data = searchParams.get('data');

  useEffect(() => {
    // Validar parâmetros obrigatórios
    if (!quiz || !nome || !score || !data) {
      setError('Certificado inválido ou dados incompletos.');
      setLoading(false);
      return;
    }

    // Validar se score é um número válido
    const scoreNum = parseInt(score);
    const totalNum = parseInt(totalQuestions);
    
    if (isNaN(scoreNum) || isNaN(totalNum) || scoreNum < 0 || totalNum <= 0) {
      setError('Dados do certificado inválidos.');
      setLoading(false);
      return;
    }

    // Validar se score não excede o total (caso de dados corrompidos)
    if (scoreNum > totalNum) {
      setError('Dados do certificado inconsistentes. Score maior que total de questões.');
      setLoading(false);
      return;
    }

    // Calcular porcentagem
    const percentage = Math.round((scoreNum / totalNum) * 100);

    // Validar se atingiu 70% mínimo
    if (percentage < 70) {
      setError('Pontuação insuficiente para gerar certificado. Mínimo de 70% necessário.');
      setLoading(false);
      return;
    }

    setCertificateData({
      quiz,
      nome,
      score: scoreNum,
      totalQuestions: totalNum,
      percentage,
      data
    });
    setLoading(false);
  }, [quiz, nome, score, totalQuestions, data]);

  // SEO Meta Tags
  useSEO({
    title: certificateData ? `Certificado ${certificateData.quiz} - ${certificateData.nome}` : 'Certificado QAPlay',
    description: certificateData ? `Certificado de conclusão do ${certificateData.quiz} com ${certificateData.percentage}% de acertos` : 'Certificado oficial do QAPlay',
    image: '/qa-play-logo.png',
    url: window.location.href,
    type: 'article'
  });

  const getBadgeColor = () => {
    if (!certificateData) return '#6b7280';
    if (certificateData.percentage >= 90) return '#eab308'; // yellow-500
    if (certificateData.percentage >= 80) return '#3b82f6'; // blue-500
    if (certificateData.percentage >= 70) return '#22c55e'; // green-500
    return '#6b7280'; // gray-500
  };

  const getBadgeLevel = () => {
    if (!certificateData) return 'Iniciante';
    if (certificateData.percentage >= 90) return 'Expert';
    if (certificateData.percentage >= 80) return 'Avançado';
    if (certificateData.percentage >= 70) return 'Intermediário';
    return 'Iniciante';
  };

  const getPerformanceDescription = () => {
    if (!certificateData) return '';
    const level = getBadgeLevel();
    
    switch (level) {
      case 'Expert':
        return 'Demonstrou conhecimento avançado e maestria nos fundamentos de Quality Assurance.';
      case 'Avançado':
        return 'Demonstrou conhecimento avançado e maestria nos fundamentos de Quality Assurance.';
      case 'Intermediário':
        return 'Demonstrou um sólido conhecimento nos fundamentos de Quality Assurance.';
      case 'Iniciante':
        return 'Completou o desafio e identificou importantes pontos para aprimoramento em Quality Assurance.';
      default:
        return 'Completou o desafio e identificou importantes pontos para aprimoramento em Quality Assurance.';
    }
  };

  const downloadCertificate = async () => {
    if (!certificateData) {
      alert('Erro: Dados do certificado não encontrados.');
      return;
    }

    // Validar dados essenciais
    if (!certificateData.nome || !certificateData.quiz || 
        certificateData.score === undefined || certificateData.totalQuestions === undefined) {
      alert('Erro: Dados do certificado incompletos.');
      return;
    }

    try {
      // Mostrar indicador de carregamento
      const button = document.querySelector('[data-testid="download-button"]');
      if (button) {
        button.disabled = true;
        button.textContent = 'Gerando imagem...';
      }

      // Criar canvas diretamente
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Definir dimensões
      canvas.width = 1800; // 2x para alta resolução
      canvas.height = 1300;
      
      // Fundo branco
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Borda azul
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
      
      // Fundo do certificado
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
      
      // Título principal
      ctx.fillStyle = '#1e40af';
      ctx.font = 'bold 72px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('RELATÓRIO DE DESEMPENHO', canvas.width / 2, 150);
      
      // Subtítulo
      ctx.fillStyle = '#64748b';
      ctx.font = '40px Arial';
      ctx.fillText('QAPlay - Quality Assurance', canvas.width / 2, 200);
      
      // Descrição
      ctx.font = '28px Arial';
      ctx.fillText('Baseado no Syllabus ISTQB® CTFL 4.0', canvas.width / 2, 240);
      
      // Texto de certificação
      ctx.fillStyle = '#374151';
      ctx.font = '36px Arial';
      ctx.fillText('Certificamos que', canvas.width / 2, 320);
      
      // Nome do usuário
      ctx.fillStyle = '#1e40af';
      ctx.font = 'bold 56px Arial';
      
      // Truncar nome se muito longo
      let userName = certificateData.nome;
      if (userName.length > 25) {
        userName = userName.substring(0, 22) + '...';
      }
      
      ctx.fillText(userName, canvas.width / 2, 380);
      
      // Descrição da conclusão
      ctx.fillStyle = '#64748b';
      ctx.font = '32px Arial';
      
      // Truncar nome do quiz se muito longo
      let quizDisplayName = certificateData.quiz;
      if (quizDisplayName.length > 50) {
        quizDisplayName = quizDisplayName.substring(0, 47) + '...';
      }
      
      ctx.fillText(`concluiu o ${quizDisplayName}`, canvas.width / 2, 420);
      
      // Caixa de resultados
      const boxX = canvas.width / 2 - 500;
      const boxY = 480;
      const boxWidth = 1000;
      const boxHeight = 200;
      
      // Fundo da caixa
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
      
      // Borda da caixa
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
      
      // Acertos
      ctx.fillStyle = '#1e40af';
      ctx.font = 'bold 96px Arial';
      
      // Ajustar tamanho da fonte se número muito grande
      let scoreText = certificateData.score.toString();
      if (scoreText.length > 3) {
        ctx.font = 'bold 72px Arial';
      }
      ctx.fillText(scoreText, boxX + 200, boxY + 120);
      
      // Total de questões
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 96px Arial';
      
      // Ajustar tamanho da fonte se número muito grande
      let totalText = certificateData.totalQuestions.toString();
      if (totalText.length > 3) {
        ctx.font = 'bold 72px Arial';
      }
      ctx.fillText(totalText, boxX + 400, boxY + 120);
      
      // Porcentagem
      ctx.fillStyle = '#16a34a';
      ctx.font = 'bold 96px Arial';
      
      // Ajustar tamanho da fonte se porcentagem muito grande
      let percentageText = certificateData.percentage + '%';
      if (percentageText.length > 4) {
        ctx.font = 'bold 72px Arial';
      }
      ctx.fillText(percentageText, boxX + 600, boxY + 120);
      
      // Nível
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px Arial';
      const levelText = getBadgeLevel();
      const levelWidth = ctx.measureText(levelText).width;
      const levelX = boxX + 800;
      const levelY = boxY + 80;
      
      // Fundo do nível - ajustar largura para acomodar texto
      const badgePadding = 30;
      const badgeWidth = Math.max(levelWidth + (badgePadding * 2), 120);
      const badgeHeight = 60;
      
      ctx.fillStyle = getBadgeColor();
      ctx.fillRect(levelX - (badgeWidth / 2), levelY - (badgeHeight / 2), badgeWidth, badgeHeight);
      
      // Texto do nível
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(levelText, levelX, levelY + 8);
      
      // Labels
      ctx.fillStyle = '#64748b';
      ctx.font = '28px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Acertos', boxX + 200, boxY + 160);
      ctx.fillText('Total de Questões', boxX + 400, boxY + 160);
      ctx.fillText('Taxa de Acerto', boxX + 600, boxY + 160);
      ctx.fillText('Nível', levelX, boxY + 160);
      
      // Restaurar alinhamento para o resto do código
      ctx.textAlign = 'center';
      
      // Data de conclusão
      ctx.fillStyle = '#64748b';
      ctx.font = '28px Arial';
      ctx.fillText('Data de conclusão: ' + new Date(certificateData.data).toLocaleDateString('pt-BR'), canvas.width / 2, 750);
      
      // Footer
      ctx.font = '24px Arial';
      ctx.fillText('QAPlay - Plataforma de Treinamento em Quality Assurance', canvas.width / 2, 800);
      
      ctx.font = '20px Arial';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Relatório gerado automaticamente pelo sistema QAPlay', canvas.width / 2, 840);
      
      // Download da imagem
      const link = document.createElement('a');
      
      // Sanitizar nome do arquivo
      const sanitizedName = certificateData.nome
        .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove caracteres especiais
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .toLowerCase();
      
      link.download = `relatorio-desempenho-qaplay-${sanitizedName}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
      // Restaurar botão
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg style="margin-right: 8px; height: 16px; width: 16px;" data-lucide="download"></svg>Baixar como Imagem';
      }
      
    } catch (error) {
      console.error('Erro detalhado ao gerar certificado:', error);
      
      // Restaurar botão em caso de erro
      const button = document.querySelector('[data-testid="download-button"]');
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg style="margin-right: 8px; height: 16px; width: 16px;" data-lucide="download"></svg>Baixar como Imagem';
      }
      
      alert('Ocorreu um erro ao gerar a imagem. Por favor, tente novamente.');
    }
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    } catch (error) {
      console.error('Erro ao copiar link:', error);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            animation: 'spin 1s linear infinite', 
            borderRadius: '50%', 
            height: '48px', 
            width: '48px', 
            borderBottom: '2px solid #3b82f6', 
            margin: '0 auto 16px' 
          }}></div>
          <p style={{ color: '#6b7280' }}>Carregando certificado...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '448px', margin: '0 16px' }}>
          <div style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ color: '#ef4444', marginBottom: '16px' }}>
              <Award style={{ height: '64px', width: '64px', margin: '0 auto' }} />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Certificado Inválido</h1>
            <p style={{ color: '#4b5563', marginBottom: '24px' }}>{error}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button asChild style={{ width: '100%' }}>
                <Link to="/quizzes">
                  <ArrowLeft style={{ marginRight: '8px', height: '16px', width: '16px' }} />
                  Voltar aos Quizzes
                </Link>
              </Button>
              <Button variant="outline" asChild style={{ width: '100%' }}>
                <Link to="/">Ir para Home</Link>
            </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(to right, #2563eb, #7c3aed)', 
        color: 'white', 
        padding: '32px 0' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Relatório de Desempenho</h1>
              <p style={{ color: '#bfdbfe', marginTop: '8px' }}>QAPlay - Quality Assurance</p>
            </div>
            <Button variant="outline" asChild style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              borderColor: 'rgba(255, 255, 255, 0.2)', 
              color: 'white' 
            }}>
              <Link to="/quizzes">
                <ArrowLeft style={{ marginRight: '8px', height: '16px', width: '16px' }} />
                Voltar aos Quizzes
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', paddingTop: '32px', paddingBottom: '32px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        {/* Certificado */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ padding: '0' }}>
              <div 
                ref={certificateRef}
                style={{ 
                  width: '900px',
                  height: '650px',
                  backgroundColor: '#f8fafc',
                  border: '3px solid #3b82f6',
                  borderRadius: '12px',
                  padding: '50px',
                  textAlign: 'center',
                  fontFamily: 'Arial, sans-serif',
                  position: 'relative',
                  margin: '0 auto',
                  boxSizing: 'border-box'
                }}
              >
          {/* Header */}
                <div style={{ marginBottom: '30px' }}>
                  <div style={{ 
                    fontSize: '36px', 
                    fontWeight: 'bold', 
                    color: '#1e40af',
                    marginBottom: '10px'
                  }}>
                    RELATÓRIO DE DESEMPENHO
                  </div>
                  <div style={{ 
                    fontSize: '20px', 
                    color: '#64748b',
                    marginBottom: '5px'
                  }}>
                    QAPlay - Quality Assurance
              </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#94a3b8'
                  }}>
                    Baseado no Syllabus ISTQB® CTFL 4.0
            </div>
          </div>

          {/* Conteúdo Principal */}
                <div style={{ marginBottom: '30px' }}>
                  <div style={{ 
                    fontSize: '18px', 
                    color: '#374151',
                    marginBottom: '20px'
                  }}>
              Certificamos que
                  </div>
                  <div style={{ 
                    fontSize: '28px', 
                    fontWeight: 'bold', 
                    color: '#1e40af',
                    marginBottom: '20px'
                  }}>
                    {certificateData.nome}
                  </div>
                  <div style={{ 
                    fontSize: '16px', 
                    color: '#64748b'
                  }}>
                    concluiu o {certificateData.quiz}
                  </div>
          </div>

                {/* Resultados */}
                <div style={{ 
                  backgroundColor: '#ffffff',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '30px',
                  marginBottom: '30px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '20px',
                  alignItems: 'center'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '48px', 
                      fontWeight: 'bold', 
                      color: '#1e40af'
                    }}>
                      {certificateData.score}
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#64748b'
                    }}>
                      Acertos
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '48px', 
                      fontWeight: 'bold', 
                      color: '#64748b'
                    }}>
                      {certificateData.totalQuestions}
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#64748b'
                    }}>
                      Total de Questões
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '48px', 
                      fontWeight: 'bold', 
                      color: '#16a34a'
                    }}>
                      {certificateData.percentage}%
              </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#64748b'
                    }}>
                      Taxa de Acerto
            </div>
              </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      backgroundColor: getBadgeColor(),
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      padding: '12px 20px',
                      borderRadius: '6px',
                      marginBottom: '8px'
                    }}>
                      {getBadgeLevel()}
            </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#64748b'
                    }}>
                      Nível
              </div>
            </div>
          </div>

                {/* Footer */}
                <div style={{ 
                  fontSize: '14px', 
                  color: '#64748b',
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '20px'
                }}>
                  <div style={{ marginBottom: '5px' }}>
                    Data de conclusão: {new Date(certificateData.data).toLocaleDateString('pt-BR')}
                  </div>
                  <div style={{ marginBottom: '5px' }}>
                    QAPlay - Plataforma de Treinamento em Quality Assurance
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Relatório gerado automaticamente pelo sistema QAPlay
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selo de Desempenho */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>
                Seu Selo de Desempenho
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '16px', 
                  backgroundColor: 'white', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
                  border: '1px solid #e5e7eb' 
                }}>
                  <div 
                    style={{ 
                      width: '64px', 
                      height: '64px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor: getBadgeColor()
                    }}
                  >
                    <Trophy style={{ height: '32px', width: '32px', color: 'white' }} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '600', fontSize: '18px' }}>QA Quiz - {getBadgeLevel()}</div>
                    <div style={{ fontSize: '14px', color: '#4b5563' }}>
                      {certificateData.percentage}% de acertos
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                      {getPerformanceDescription()}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Ações */}
          <div>
            <div style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>
                Ações do Relatório
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '512px', margin: '0 auto' }}>
                <Button onClick={downloadCertificate} data-testid="download-button" style={{ flex: '1', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <Download style={{ marginRight: '8px', height: '16px', width: '16px' }} />
            Baixar como Imagem
          </Button>
                <Button onClick={copyShareLink} variant="outline" style={{ 
                  flex: '1',
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  borderColor: '#3b82f6',
                  color: '#3b82f6',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  <Share2 style={{ marginRight: '8px', height: '16px', width: '16px' }} />
                  Copiar Link para Compartilhar
          </Button>
              </div>
              <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '16px', color: '#6b7280' }}>
                Compartilhe este link no LinkedIn, WhatsApp ou outras redes sociais
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;