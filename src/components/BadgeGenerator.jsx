import React, { useRef, useEffect } from 'react';

const BadgeGenerator = ({ playerName, score, percentage, level, logoUrl, onBadgeGenerated }) => {
  const canvasRef = useRef(null);

  const getBadgeTheme = (percentage) => {
    if (percentage >= 90) return { 
      primary: '#10B981', 
      secondary: '#059669', 
      accent: '#ECFDF5',
      title: 'QA EXPERT',
      subtitle: 'Excelência em Quality Assurance'
    };
    if (percentage >= 75) return { 
      primary: '#3B82F6', 
      secondary: '#2563EB', 
      accent: '#EFF6FF',
      title: 'QA PROFESSIONAL',
      subtitle: 'Profissional Qualificado'
    };
    if (percentage >= 60) return { 
      primary: '#F59E0B', 
      secondary: '#D97706', 
      accent: '#FFFBEB',
      title: 'QA PRACTITIONER',
      subtitle: 'Praticante em Desenvolvimento'
    };
    if (percentage >= 40) return { 
      primary: '#EF4444', 
      secondary: '#DC2626', 
      accent: '#FEF2F2',
      title: 'QA APPRENTICE',
      subtitle: 'Aprendiz em Evolução'
    };
    return { 
      primary: '#6B7280', 
      secondary: '#4B5563', 
      accent: '#F9FAFB',
      title: 'QA STUDENT',
      subtitle: 'Estudante Iniciante'
    };
  };

  const generateBadge = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Configurar tamanho do canvas para alta qualidade
    canvas.width = 800;
    canvas.height = 600;

    const theme = getBadgeTheme(percentage);

    // Fundo com gradiente elegante
    const bgGradient = ctx.createLinearGradient(0, 0, 800, 600);
    bgGradient.addColorStop(0, '#F8FAFC');
    bgGradient.addColorStop(0.5, '#E2E8F0');
    bgGradient.addColorStop(1, '#CBD5E1');

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 800, 600);

    // Padrão decorativo sutil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 800; i += 60) {
      for (let j = 0; j < 600; j += 60) {
        ctx.beginPath();
        ctx.arc(i, j, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Cartão principal com borda arredondada
    const cardGradient = ctx.createLinearGradient(0, 100, 0, 500);
    cardGradient.addColorStop(0, '#FFFFFF');
    cardGradient.addColorStop(1, theme.accent);

    ctx.fillStyle = cardGradient;
    ctx.roundRect(60, 80, 680, 440, 25);
    ctx.fill();

    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 4;
    ctx.roundRect(60, 80, 680, 440, 25);
    ctx.stroke();

    // Cabeçalho com gradiente
    const headerGradient = ctx.createLinearGradient(0, 80, 0, 180);
    headerGradient.addColorStop(0, theme.primary);
    headerGradient.addColorStop(1, theme.secondary);

    ctx.fillStyle = headerGradient;
    ctx.roundRect(60, 80, 680, 100, 25);
    ctx.fill();

    // Corrigir cantos inferiores do cabeçalho
    ctx.fillRect(60, 155, 680, 25);

    // Carregar e desenhar o logo do QA Play
    const logo = new Image();
    logo.src = logoUrl || '/qa-play-logo.png';
    logo.onload = () => {
      ctx.drawImage(logo, 100, 100, 80, 80);

      // Texto do cabeçalho
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 28px "Roboto", sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('QA PLAY', 190, 120);
      ctx.font = '16px "Roboto", sans-serif';
      ctx.fillText(`Acertou ${score} questões em um jogo baseado no syllabus ISTQB CTFL 4.0`, 190, 145);

      // Selo de certificação
      drawCertificationSeal(ctx, 680, 130, 70, theme.primary);

      // Texto no selo
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px "Roboto", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ISTQB', 680, 125);
      ctx.fillText('CTFL 4.0', 680, 140);

      // Conteúdo principal
      ctx.fillStyle = theme.primary;
      ctx.font = 'bold 36px "Roboto", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(theme.title, 400, 240);

      ctx.fillStyle = '#4B5563';
      ctx.font = '18px "Roboto", sans-serif';
      ctx.fillText(theme.subtitle, 400, 270);

      // Nome do jogador
      ctx.fillStyle = '#1F2937';
      ctx.font = 'bold 32px "Roboto", sans-serif';
      ctx.fillText(playerName.toUpperCase(), 400, 320);

      // Seção de pontuação
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.roundRect(250, 350, 300, 80, 15);
      ctx.fill();

      ctx.strokeStyle = theme.primary;
      ctx.lineWidth = 2;
      ctx.roundRect(250, 350, 300, 80, 15);
      ctx.stroke();

      // Exibir pontuação
      ctx.fillStyle = theme.primary;
      ctx.font = 'bold 42px "Roboto", sans-serif';
      ctx.fillText(`${score}/20`, 320, 385);

      ctx.fillStyle = '#1F2937';
      ctx.font = 'bold 24px "Roboto", sans-serif';
      ctx.fillText(`${percentage}%`, 480, 385);

      ctx.font = '14px "Roboto", sans-serif';
      ctx.fillStyle = '#6B7280';
      ctx.fillText('PONTUAÇÃO', 320, 405);
      ctx.fillText('ACERTOS', 480, 405);

      // Badge de nível
      ctx.fillStyle = theme.secondary;
      ctx.roundRect(300, 450, 200, 35, 17);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px "Roboto", sans-serif';
      ctx.fillText(`NÍVEL: ${level.toUpperCase()}`, 400, 470);

      // Rodapé
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '14px "Roboto", sans-serif';
      ctx.fillText('Quiz Inteligente ISTQB CTFL 4.0 • QAPlay.com.br', 400, 510);

      // Elementos decorativos
      ctx.fillStyle = theme.primary + '40';
      ctx.beginPath();
      ctx.arc(120, 400, 30, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(680, 400, 25, 0, 2 * Math.PI);
      ctx.fill();

      // Converter canvas para blob
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        onBadgeGenerated(url);
      }, 'image/png', 1.0);
    };

    logo.onerror = () => {
      console.error('Erro ao carregar o logo do QA Play. Usando logo padrão.');
      drawQAPlayLogo(ctx, 100, 130, 60); // Fallback para o logo padrão
      completeBadgeDrawing(ctx, theme);
    };
  };

  const drawCertificationSeal = (ctx, x, y, size, color) => {
    const sides = 12;
    const outerRadius = size / 2;
    const innerRadius = outerRadius * 0.7;

    ctx.beginPath();
    for (let i = 0; i < sides * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / sides;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();

    const sealGradient = ctx.createRadialGradient(x, y, 0, x, y, outerRadius);
    sealGradient.addColorStop(0, color);
    sealGradient.addColorStop(1, color + '80');

    ctx.fillStyle = sealGradient;
    ctx.fill();

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawQAPlayLogo = (ctx, x, y, size) => {
    const radius = size / 2;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, '#3B82F6');
    gradient.addColorStop(1, '#1E40AF');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${size * 0.4}px "Roboto", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('QA', x, y);
  };

  const completeBadgeDrawing = (ctx, theme) => {
    // Texto do cabeçalho
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px "Roboto", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('QA PLAY', 190, 120);
    ctx.font = '16px "Roboto", sans-serif';
    ctx.fillText(`Acertou ${score} questões em um jogo baseado no syllabus ISTQB CTFL 4.0`, 190, 145);

    // Selo de certificação
    drawCertificationSeal(ctx, 680, 130, 70, theme.primary);

    // Texto no selo
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px "Roboto", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ISTQB', 680, 125);
    ctx.fillText('CTFL 4.0', 680, 140);

    // Conteúdo principal
    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 36px "Roboto", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(theme.title, 400, 240);

    ctx.fillStyle = '#4B5563';
    ctx.font = '18px "Roboto", sans-serif';
    ctx.fillText(theme.subtitle, 400, 270);

    // Nome do jogador
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 32px "Roboto", sans-serif';
    ctx.fillText(playerName.toUpperCase(), 400, 320);

    // Seção de pontuação
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.roundRect(250, 350, 300, 80, 15);
    ctx.fill();

    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 2;
    ctx.roundRect(250, 350, 300, 80, 15);
    ctx.stroke();

    // Exibir pontuação
    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 42px "Roboto", sans-serif';
    ctx.fillText(`${score}/20`, 320, 385);

    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 24px "Roboto", sans-serif';
    ctx.fillText(`${percentage}%`, 480, 385);

    ctx.font = '14px "Roboto", sans-serif';
    ctx.fillStyle = '#6B7280';
    ctx.fillText('PONTUAÇÃO', 320, 405);
    ctx.fillText('ACERTOS', 480, 405);

    // Badge de nível
    ctx.fillStyle = theme.secondary;
    ctx.roundRect(300, 450, 200, 35, 17);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px "Roboto", sans-serif';
    ctx.fillText(`NÍVEL: ${level.toUpperCase()}`, 400, 470);

    // Rodapé
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '14px "Roboto", sans-serif';
    ctx.fillText('Quiz Inteligente ISTQB CTFL 4.0 • QAPlay.com.br', 400, 510);

    // Elementos decorativos
    ctx.fillStyle = theme.primary + '40';
    ctx.beginPath();
    ctx.arc(120, 400, 30, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(680, 400, 25, 0, 2 * Math.PI);
    ctx.fill();

    // Converter canvas para blob
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      onBadgeGenerated(url);
    }, 'image/png', 1.0);
  };

  useEffect(() => {
    // Adicionar método roundRect se não estiver disponível
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
      };
    }

    generateBadge();
  }, [playerName, score, percentage, level, logoUrl]);

  return (
    <div className="hidden">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default BadgeGenerator;
