import React, { useRef, useEffect } from 'react';
import { Trophy, Award, Star } from 'lucide-react';

const BadgeGenerator = ({ playerName, score, percentage, level, onBadgeGenerated }) => {
  const canvasRef = useRef(null);

  const getBadgeColor = (percentage) => {
    if (percentage >= 90) return { bg: '#10B981', accent: '#059669' }; // Green
    if (percentage >= 80) return { bg: '#3B82F6', accent: '#2563EB' }; // Blue
    if (percentage >= 70) return { bg: '#F59E0B', accent: '#D97706' }; // Yellow
    if (percentage >= 60) return { bg: '#EF4444', accent: '#DC2626' }; // Red
    return { bg: '#6B7280', accent: '#4B5563' }; // Gray
  };

  const getBadgeTitle = (percentage) => {
    if (percentage >= 90) return "QA Expert";
    if (percentage >= 80) return "QA Professional";
    if (percentage >= 70) return "QA Practitioner";
    if (percentage >= 60) return "QA Apprentice";
    return "QA Learner";
  };

  const generateBadge = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;
    
    const colors = getBadgeColor(percentage);
    const badgeTitle = getBadgeTitle(percentage);
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 600, 400);
    gradient.addColorStop(0, colors.bg);
    gradient.addColorStop(1, colors.accent);
    
    // Background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 400);
    
    // Add subtle pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 600; i += 40) {
      for (let j = 0; j < 400; j += 40) {
        ctx.fillRect(i, j, 20, 20);
      }
    }
    
    // White overlay for content area
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.roundRect(50, 50, 500, 300, 20);
    ctx.fill();
    
    // Border
    ctx.strokeStyle = colors.bg;
    ctx.lineWidth = 4;
    ctx.roundRect(50, 50, 500, 300, 20);
    ctx.stroke();
    
    // Title
    ctx.fillStyle = colors.bg;
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ISTQB CTFL 4.0', 300, 100);
    
    // Badge title
    ctx.font = 'bold 24px Arial';
    ctx.fillText(badgeTitle, 300, 140);
    
    // Player name
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 28px Arial';
    ctx.fillText(playerName, 300, 180);
    
    // Score
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = colors.bg;
    ctx.fillText(`${score}/20`, 300, 230);
    
    // Percentage
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`${percentage}% de acertos`, 300, 260);
    
    // Level
    ctx.font = '18px Arial';
    ctx.fillStyle = '#6B7280';
    ctx.fillText(`Nível: ${level.charAt(0).toUpperCase() + level.slice(1)}`, 300, 290);
    
    // QAPlay branding
    ctx.font = '16px Arial';
    ctx.fillText('QAPlay - Aprenda QA Jogando', 300, 320);
    
    // Trophy icon (simplified)
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(150, 200, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#D97706';
    ctx.fillRect(135, 220, 30, 20);
    ctx.fillRect(140, 240, 20, 10);
    
    // Star icon (simplified)
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.moveTo(450, 180);
    ctx.lineTo(460, 200);
    ctx.lineTo(480, 200);
    ctx.lineTo(465, 215);
    ctx.lineTo(470, 235);
    ctx.lineTo(450, 220);
    ctx.lineTo(430, 235);
    ctx.lineTo(435, 215);
    ctx.lineTo(420, 200);
    ctx.lineTo(440, 200);
    ctx.closePath();
    ctx.fill();
    
    // Convert canvas to blob and call callback
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      onBadgeGenerated(url);
    }, 'image/png');
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

