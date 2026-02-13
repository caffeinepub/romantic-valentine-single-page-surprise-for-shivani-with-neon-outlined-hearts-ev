import { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  hue: number;
  drift: number;
  glowIntensity: number;
}

export default function NeonHeartsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track pointer/touch position
    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerLeave = () => {
      pointerRef.current = null;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    // Create hearts - increased count for full viewport coverage
    const hearts: Heart[] = [];
    const heartCount = 50;

    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height + canvas.height,
        size: Math.random() * 25 + 15,
        speed: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.6 + 0.3,
        hue: Math.random() > 0.5 ? 340 : 0, // Pink or white
        drift: Math.random() * Math.PI * 2,
        glowIntensity: 1,
      });
    }

    // Draw hollow/outlined heart shape with neon glow
    const drawHeart = (heart: Heart) => {
      const { x, y, size, opacity, hue, glowIntensity } = heart;
      
      ctx.save();
      ctx.globalAlpha = opacity;
      
      // Create neon glow effect
      const glowColor = hue === 340 
        ? `rgba(255, 105, 180, ${0.8 * glowIntensity})` 
        : `rgba(255, 255, 255, ${0.8 * glowIntensity})`;
      
      const strokeColor = hue === 340 
        ? `rgb(255, 105, 180)` 
        : `rgb(255, 255, 255)`;
      
      ctx.shadowBlur = 20 * glowIntensity;
      ctx.shadowColor = glowColor;
      
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      
      // Left curve
      ctx.bezierCurveTo(
        x, y,
        x - size / 2, y,
        x - size / 2, y + topCurveHeight
      );
      
      ctx.bezierCurveTo(
        x - size / 2, y + (size + topCurveHeight) / 2,
        x, y + (size + topCurveHeight) / 1.2,
        x, y + size
      );
      
      // Right curve
      ctx.bezierCurveTo(
        x, y + (size + topCurveHeight) / 1.2,
        x + size / 2, y + (size + topCurveHeight) / 2,
        x + size / 2, y + topCurveHeight
      );
      
      ctx.bezierCurveTo(
        x + size / 2, y,
        x, y,
        x, y + topCurveHeight
      );
      
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart) => {
        // Apply pointer interaction effect
        if (pointerRef.current) {
          const dx = heart.x - pointerRef.current.x;
          const dy = heart.y - pointerRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = 150;
          
          if (distance < interactionRadius) {
            // Repulsion effect
            const force = (interactionRadius - distance) / interactionRadius;
            heart.x += (dx / distance) * force * 2;
            heart.y += (dy / distance) * force * 2;
            
            // Increase glow intensity when near pointer
            heart.glowIntensity = 1 + force * 0.8;
          } else {
            // Reset glow intensity
            heart.glowIntensity = Math.max(1, heart.glowIntensity - 0.05);
          }
        } else {
          heart.glowIntensity = Math.max(1, heart.glowIntensity - 0.05);
        }
        
        drawHeart(heart);
        
        // Move heart upward
        heart.y -= heart.speed;
        
        // Add horizontal drift
        heart.drift += 0.02;
        heart.x += Math.sin(heart.drift) * 0.8;
        
        // Keep hearts within horizontal bounds
        if (heart.x < -heart.size) heart.x = canvas.width + heart.size;
        if (heart.x > canvas.width + heart.size) heart.x = -heart.size;
        
        // Reset heart when it goes off screen top
        if (heart.y + heart.size < 0) {
          heart.y = canvas.height + heart.size;
          heart.x = Math.random() * canvas.width;
          heart.drift = Math.random() * Math.PI * 2;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: 'linear-gradient(135deg, #1a0a1e 0%, #2d1b3d 50%, #1a0a1e 100%)' }}
    />
  );
}
