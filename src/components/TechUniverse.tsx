import { useEffect, useRef, useState } from 'react';

interface TechNode {
  name: string;
  category: 'language' | 'framework' | 'db' | 'devops' | 'ai';
  color: string;
  orbitRadius: number;
  speed: number;
  size: number;
  angle: number; // Current angle in radians
}

export default function TechUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Define tech stack items with customized orbit rings
  const nodes: TechNode[] = [
    // Languages (Orbit 1 - 85px)
    { name: 'Python', category: 'language', color: '#3776AB', orbitRadius: 85, speed: 0.008, size: 8, angle: 0 },
    { name: 'TypeScript', category: 'language', color: '#3178C6', orbitRadius: 85, speed: 0.006, size: 8, angle: Math.PI * 0.5 },
    { name: 'JavaScript', category: 'language', color: '#F7DF1E', orbitRadius: 85, speed: 0.007, size: 8, angle: Math.PI },
    { name: 'SQL', category: 'language', color: '#00758F', orbitRadius: 85, speed: 0.005, size: 8, angle: Math.PI * 1.5 },

    // Frameworks & Libraries (Orbit 2 - 150px)
    { name: 'React', category: 'framework', color: '#61DAFB', orbitRadius: 150, speed: -0.004, size: 9, angle: 0 },
    { name: 'Node.js', category: 'framework', color: '#5FA04E', orbitRadius: 150, speed: -0.003, size: 9, angle: Math.PI * 0.4 },
    { name: 'FastAPI', category: 'framework', color: '#009688', orbitRadius: 150, speed: -0.005, size: 9, angle: Math.PI * 0.8 },
    { name: 'Flask', category: 'framework', color: '#000000', orbitRadius: 150, speed: -0.0035, size: 9, angle: Math.PI * 1.2 },
    { name: 'LangChain', category: 'ai', color: '#f59e0b', orbitRadius: 150, speed: -0.0045, size: 10, angle: Math.PI * 1.6 },

    // DBs & DevOps (Orbit 3 - 220px)
    { name: 'PostgreSQL', category: 'db', color: '#4169E1', orbitRadius: 220, speed: 0.002, size: 10, angle: 0 },
    { name: 'MongoDB', category: 'db', color: '#47A248', orbitRadius: 220, speed: 0.0018, size: 10, angle: Math.PI * 0.4 },
    { name: 'ChromaDB', category: 'ai', color: '#ec4899', orbitRadius: 220, speed: 0.0022, size: 10, angle: Math.PI * 0.8 },
    { name: 'Docker', category: 'devops', color: '#2496ED', orbitRadius: 220, speed: 0.0015, size: 10, angle: Math.PI * 1.2 },
    { name: 'AWS', category: 'devops', color: '#FF9900', orbitRadius: 220, speed: 0.0016, size: 10, angle: Math.PI * 1.6 },
  ];

  const nodePositionsRef = useRef<{ name: string; x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      const parent = containerRef.current;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = Math.max(parent.clientHeight, 500);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const activeNodes = [...nodes];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Check hover
      let found: string | null = null;
      for (const pos of nodePositionsRef.current) {
        const dx = mouseX - pos.x;
        const dy = mouseY - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < pos.size + 8) {
          found = pos.name;
          break;
        }
      }
      setHoveredNode(found);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw Orbit Paths (Dotted Circles)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.lineWidth = 1;
      
      const orbits = [85, 150, 220];
      orbits.forEach(radius => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.setLineDash([4, 6]);
        ctx.stroke();
      });
      ctx.setLineDash([]); // Reset line dash

      // Draw Central AI Core
      // Core outer glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 45);
      glowGrad.addColorStop(0, 'rgba(168, 85, 247, 0.5)');
      glowGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.2)');
      glowGrad.addColorStop(1, 'rgba(3, 0, 20, 0)');
      
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
      ctx.fill();

      // Core main body
      ctx.fillStyle = '#1e1b4b';
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = hoveredNode === 'AI CORE' ? 20 : 10;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Core Text label
      ctx.shadowBlur = 0; // reset shadow
      ctx.fillStyle = '#f3f4f6';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AI CORE', centerX, centerY);

      // Check if mouse is hovering over AI CORE
      const coreDx = mouseX - centerX;
      const coreDy = mouseY - centerY;
      if (Math.sqrt(coreDx * coreDx + coreDy * coreDy) < 25) {
        setHoveredNode('AI CORE (Gemini/LangChain)');
      }

      // Update and Draw Orbiting Nodes
      const positions: typeof nodePositionsRef.current = [];

      activeNodes.forEach(node => {
        // Increment angle
        node.angle += node.speed;

        // Calculate node X & Y
        const nodeX = centerX + node.orbitRadius * Math.cos(node.angle);
        const nodeY = centerY + node.orbitRadius * Math.sin(node.angle);
        
        positions.push({ name: node.name, x: nodeX, y: nodeY, size: node.size });

        const isHovered = hoveredNode === node.name;
        const drawSize = isHovered ? node.size + 4 : node.size;

        // Outer glow on hover
        if (isHovered) {
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 15;
        }

        // Draw node circle
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, drawSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Node outline
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node label
        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(243, 244, 246, 0.75)';
        ctx.font = isHovered ? 'bold 11px system-ui' : '9px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, nodeX, nodeY - drawSize - 6);
      });

      nodePositionsRef.current = positions;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredNode]);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] border border-white/5 bg-black/15 rounded-2xl flex items-center justify-center overflow-hidden">
      {/* Absolute floating backdrop text */}
      <div className="absolute top-4 left-4 select-none opacity-20 text-[10px] uppercase font-mono tracking-widest text-cyan-400">
        AI Orbital Matrix
      </div>

      {/* Orbit Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      {/* Dynamic Hover Tooltip Banner */}
      {hoveredNode && (
        <div className="absolute bottom-6 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-950/40 backdrop-blur-md text-xs font-mono text-purple-300 transition-all duration-200 animate-pulse">
          Active Node: {hoveredNode}
        </div>
      )}
    </div>
  );
}
