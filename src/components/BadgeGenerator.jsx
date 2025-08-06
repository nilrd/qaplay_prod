import React, { useRef, useEffect } from 'react';

const BadgeGenerator = ({ playerName, score, percentage, level, onBadgeGenerated }) => {
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

  const drawQAPlayLogo = (ctx, x, y, size) => {
    // Logo QAPlay - Círculo com "QA" estilizado
    const radius = size / 2;
    
    // Círculo principal
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, '#3B82F6');
    gradient.addColorStop(1, '#1E40AF');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Borda dourada
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Texto "QA"
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${size * 0.4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('QA', x, y);
  };

  const drawCertificationSeal = (ctx, x, y, size, color) => {
    // Selo de certificação estilizado
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

  const generateBadge = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size for high quality
    canvas.width = 800;
    canvas.height = 600;
    
    const theme = getBadgeTheme(percentage);
    
    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 800, 600);
    bgGradient.addColorStop(0, '#F8FAFC');
    bgGradient.addColorStop(0.5, '#E2E8F0');
    bgGradient.addColorStop(1, '#CBD5E1');
    
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Decorative pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 800; i += 60) {
      for (let j = 0; j < 600; j += 60) {
        ctx.beginPath();
        ctx.arc(i, j, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    
    // Main card background
    const cardGradient = ctx.createLinearGradient(0, 100, 0, 500);
    cardGradient.addColorStop(0, '#FFFFFF');
    cardGradient.addColorStop(1, theme.accent);
    
    ctx.fillStyle = cardGradient;
    ctx.roundRect(60, 80, 680, 440, 25);
    ctx.fill();
    
    // Card border
    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 4;
    ctx.roundRect(60, 80, 680, 440, 25);
    ctx.stroke();
    
    // Header section with theme color
    const headerGradient = ctx.createLinearGradient(0, 80, 0, 180);
    headerGradient.addColorStop(0, theme.primary);
    headerGradient.addColorStop(1, theme.secondary);
    
    ctx.fillStyle = headerGradient;
    ctx.roundRect(60, 80, 680, 100, 25);
    ctx.fill();
    
    // Fix bottom corners
    ctx.fillRect(60, 155, 680, 25);
    
    // QAPlay Logo
    drawQAPlayLogo(ctx, 130, 130, 60);
    
    // Header text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('QAPLAY', 180, 120);
    
    ctx.font = '16px Arial';
    ctx.fillText('por Nilson Brites', 180, 145);
    
    // Certification seal
    drawCertificationSeal(ctx, 680, 130, 70, '#F59E0B');
    
    // ISTQB text in seal
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ISTQB', 680, 125);
    ctx.fillText('CTFL 4.0', 680, 140);
    
    // Main content area
    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(theme.title, 400, 240);
    
    ctx.fillStyle = '#4B5563';
    ctx.font = '18px Arial';
    ctx.fillText(theme.subtitle, 400, 270);
    
    // Player name with elegant styling
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 32px Arial';
    ctx.fillText(playerName.toUpperCase(), 400, 320);
    
    // Score section with background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.roundRect(250, 350, 300, 80, 15);
    ctx.fill();
    
    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 2;
    ctx.roundRect(250, 350, 300, 80, 15);
    ctx.stroke();
    
    // Score display
    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 42px Arial';
    ctx.fillText(`${score}/20`, 320, 385);
    
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`${percentage}%`, 480, 385);
    
    ctx.font = '14px Arial';
    ctx.fillStyle = '#6B7280';
    ctx.fillText('PONTUAÇÃO', 320, 405);
    ctx.fillText('ACERTOS', 480, 405);
    
    // Level badge
    ctx.fillStyle = theme.secondary;
    ctx.roundRect(300, 450, 200, 35, 17);
    ctx.fill();
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`NÍVEL: ${level.toUpperCase()}`, 400, 470);
    
    // Footer
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '14px Arial';
    ctx.fillText('Quiz Inteligente ISTQB CTFL 4.0 • QAPlay.com.br', 400, 510);
    
    // Decorative elements
    ctx.fillStyle = theme.primary + '40';
    ctx.beginPath();
    ctx.arc(120, 400, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(680, 400, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Convert canvas to blob and call callback
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      onBadgeGenerated(url);
    }, 'image/png', 1.0);
  };

  useEffect(() => {
    // Add roundRect method if not available
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
  }, [playerName, score, percentage, level]);

  return (
    <div className="hidden">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default BadgeGenerator;

