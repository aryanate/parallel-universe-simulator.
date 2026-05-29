import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

interface CosmicDust {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const stars: Star[] = [];
    const dustClouds: CosmicDust[] = [];
    const starColors = ['#ffffff', '#e0f2fe', '#f3e8ff', '#fae8ff', '#bae6fd'];
    const dustColors = [
      'rgba(76, 29, 149, 0.04)',  // Purple
      'rgba(6, 182, 212, 0.03)',  // Cyan
      'rgba(236, 72, 153, 0.02)'   // Pink
    ];

    // Handle resizing to device pixel ratio for ultra-sharp rendering
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Re-initialize stars to fill the new screen size
      initStars(width, height);
    };

    const initStars = (width: number, height: number) => {
      stars.length = 0;
      const numStars = Math.floor((width * height) / 3000); // Dynamic count based on screen area

      for (let i = 0; i < numStars; i++) {
        const baseAlpha = Math.random() * 0.7 + 0.3;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          color: starColors[Math.floor(Math.random() * starColors.length)]
        });
      }

      // Initialize a few drifting colored gas clouds
      dustClouds.length = 0;
      for (let i = 0; i < 4; i++) {
        dustClouds.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 300 + 200,
          color: dustColors[i % dustColors.length],
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1
        });
      }
    };

    // Track mouse coordinates for parallax
    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Normalized coordinates from -0.5 to 0.5
      mouseRef.current.targetX = (e.clientX / width) - 0.5;
      mouseRef.current.targetY = (e.clientY / height) - 0.5;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initial setup
    handleResize();

    // Render loop
    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Soft clear for trails
      ctx.fillStyle = '#030014';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation (easing)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw drifting gas clouds (nebulae)
      dustClouds.forEach((cloud) => {
        // Move cloud
        cloud.x += cloud.vx;
        cloud.y += cloud.vy;

        // Bounce boundaries
        if (cloud.x < -cloud.radius) cloud.x = width + cloud.radius;
        if (cloud.x > width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = height + cloud.radius;
        if (cloud.y > height + cloud.radius) cloud.y = -cloud.radius;

        // Draw radial gradient for the gas glow
        const grad = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, cloud.radius
        );
        grad.addColorStop(0, cloud.color);
        grad.addColorStop(1, 'rgba(3, 0, 20, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw twinkling, moving stars
      stars.forEach((star) => {
        // Twinkle effect (sine wave alpha shifts)
        star.alpha += star.twinkleSpeed;
        const currentAlpha = star.baseAlpha + Math.sin(star.alpha) * 0.3;

        // Calculate parallax offset based on mouse position and star size (closer = larger parallax)
        const parallaxX = mouse.x * star.size * 15;
        const parallaxY = mouse.y * star.size * 15;

        // Wrap around boundaries if coordinates drift too far
        let renderX = star.x + parallaxX;
        let renderY = star.y + parallaxY;

        if (renderX < 0) renderX += width;
        if (renderX > width) renderX -= width;
        if (renderY < 0) renderY += height;
        if (renderY > height) renderY -= height;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0; // Reset alpha
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up listeners and frame loops
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-[#030014]"
      style={{ display: 'block' }}
    />
  );
};
