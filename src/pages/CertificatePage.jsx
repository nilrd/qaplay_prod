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
        link.download = `certificado-qaplay-${certificateData.nome.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Erro ao gerar certificado:', error);
        alert('Erro ao gerar o certificado. Tente novamente.');
      }
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
              <Award className="h-16 w-16 mx-auto" />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Certificado Inválido</h1>
            <p style={{ color: '#4b5563', marginBottom: '24px' }}>{error}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button asChild style={{ width: '100%' }}>
                <Link to="/quizzes">
                  <ArrowLeft className="mr-2 h-4 w-4" />
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
                <ArrowLeft className="mr-2 h-4 w-4" />
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
                  padding: '32px 48px',
                  borderRadius: '8px',
                  border: '2px solid #bfdbfe',
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%)',
                  minHeight: '600px',
                  textAlign: 'center'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div 
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          backgroundColor: getBadgeColor()
                        }}
                      >
                        <Award className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>
                      Relatório de Desempenho
                    </h1>
                    <p style={{ fontSize: '18px', color: '#4b5563' }}>
                      QAPlay - Quiz de Quality Assurance
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#2563eb' }}>
                      Baseado no Syllabus ISTQB® CTFL 4.0
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                      International Software Testing Qualifications Board
                    </p>
                  </div>

                  {/* Conteúdo Principal */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <p style={{ fontSize: '18px', color: '#374151' }}>
                      {certificateData.nome} concluiu o Desafio QA: Fundamentos CTFL 4.0 com o seguinte desempenho:
                    </p>
                  </div>

                  {/* Resultados */}
                  <div style={{ 
                    backgroundColor: 'white', 
                    padding: '24px', 
                    borderRadius: '8px', 
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
                    border: '1px solid #e5e7eb',
                    maxWidth: '512px',
                    margin: '0 auto'
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'center' }}>
                      <div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>
                          {certificateData.score}
                        </div>
                        <div style={{ fontSize: '14px', color: '#4b5563' }}>Pontuação</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a' }}>
                          {certificateData.percentage}%
                        </div>
                        <div style={{ fontSize: '14px', color: '#4b5563' }}>Acertos</div>
                      </div>
                      <div>
                        <div 
                          style={{ 
                            backgroundColor: getBadgeColor(),
                            color: 'white',
                            fontSize: '14px',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontWeight: '600'
                          }}
                        >
                          {getBadgeLevel()}
                        </div>
                        <div style={{ fontSize: '14px', color: '#4b5563', marginTop: '8px' }}>Nível</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#4b5563' }}>
                    <p>Data de conclusão: {new Date(certificateData.data).toLocaleDateString('pt-BR')}</p>
                    <p>QAPlay - Plataforma de Treinamento em Quality Assurance</p>
                    <p style={{ fontSize: '12px' }}>Relatório gerado automaticamente pelo sistema QAPlay</p>
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
                    <Trophy className="h-8 w-8 text-white" />
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
                <Button onClick={downloadCertificate} style={{ flex: '1', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <Download className="mr-2 h-4 w-4" />
                  Baixar como Imagem
                </Button>
                <Button onClick={copyShareLink} variant="outline" style={{ 
                  flex: '1',
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  borderColor: '#3b82f6',
                  color: '#3b82f6',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  <Share2 className="mr-2 h-4 w-4" />
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