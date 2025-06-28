"use client";

import React, { useEffect, useRef } from 'react';

interface WaveData {
  value: number;
  targetValue: number;
  speed: number;
}

export default function AnimatedWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      let time = 0;
      const waveData: WaveData[] = Array.from({ length: 8 }).map(() => ({
        value: Math.random() * 0.5 + 0.1,
        targetValue: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.01
      }));

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      const updateWaveData = () => {
        waveData.forEach(data => {
          if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1;
          const diff = data.targetValue - data.value;
          data.value += diff * data.speed;
        });
      };

      const draw = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        waveData.forEach((data, i) => {
          const freq = data.value * 7;
          ctx.beginPath();
          for (let x = 0; x < canvas.width; x++) {
            const nx = (x / canvas.width) * 2 - 1;
            const px = nx + i * 0.04 + freq * 0.03;
            const py = Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8);
            const y = (py + 1) * canvas.height / 2;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          const intensity = Math.min(1, freq * 0.3);
          const r = 79 + intensity * 100;
          const g = 70 + intensity * 130;
          const b = 229;
          ctx.lineWidth = 1 + i * 0.3;
          ctx.strokeStyle = `rgba(${r},${g},${b},0.6)`;
          ctx.shadowColor = `rgba(${r},${g},${b},0.5)`;
          ctx.shadowBlur = 5;
          ctx.stroke();
          ctx.shadowBlur = 0;
        });
      };

      let animationFrameId: number;
      const animate = () => {
        time += 0.02;
        updateWaveData();
        draw();
        animationFrameId = requestAnimationFrame(animate);
      };

      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      animate();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />;
}