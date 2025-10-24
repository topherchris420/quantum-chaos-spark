import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

interface MetricsDisplayProps {
  otoc: number;
  entropy: number;
}

export const MetricsDisplay = ({ otoc, entropy }: MetricsDisplayProps) => {
  const otocCanvasRef = useRef<HTMLCanvasElement>(null);
  const entropyCanvasRef = useRef<HTMLCanvasElement>(null);
  const otocHistoryRef = useRef<number[]>([]);
  const entropyHistoryRef = useRef<number[]>([]);

  useEffect(() => {
    otocHistoryRef.current.push(otoc);
    if (otocHistoryRef.current.length > 100) {
      otocHistoryRef.current.shift();
    }

    const canvas = otocCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "rgba(15, 15, 25, 0.9)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (i / 4) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw OTOC history
    ctx.strokeStyle = "rgba(0, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    otocHistoryRef.current.forEach((value, i) => {
      const x = (i / 100) * canvas.width;
      const y = canvas.height - (value * canvas.height * 0.8) - 20;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0, 255, 255, 0.5)";
    ctx.stroke();
    ctx.shadowBlur = 0;

  }, [otoc]);

  useEffect(() => {
    entropyHistoryRef.current.push(entropy);
    if (entropyHistoryRef.current.length > 100) {
      entropyHistoryRef.current.shift();
    }

    const canvas = entropyCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "rgba(15, 15, 25, 0.9)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "rgba(200, 100, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (i / 4) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw entropy history
    ctx.strokeStyle = "rgba(200, 100, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const maxEntropy = Math.max(...entropyHistoryRef.current, 1);
    entropyHistoryRef.current.forEach((value, i) => {
      const x = (i / 100) * canvas.width;
      const y = canvas.height - ((value / maxEntropy) * canvas.height * 0.8) - 20;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(200, 100, 255, 0.5)";
    ctx.stroke();
    ctx.shadowBlur = 0;

  }, [entropy]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="glass-panel p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-primary">OTOC (Scrambling)</h3>
          <span className="text-lg font-mono text-primary quantum-text-glow">
            {otoc.toFixed(4)}
          </span>
        </div>
        <canvas
          ref={otocCanvasRef}
          width={300}
          height={100}
          className="w-full rounded border border-primary/20"
        />
        <p className="text-xs text-muted-foreground">
          Out-of-Time-Order Correlator measures quantum information scrambling
        </p>
      </Card>

      <Card className="glass-panel p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-secondary">Entanglement Entropy</h3>
          <span className="text-lg font-mono text-secondary" style={{ textShadow: "0 0 20px hsl(280 70% 60% / 0.5)" }}>
            {entropy.toFixed(4)}
          </span>
        </div>
        <canvas
          ref={entropyCanvasRef}
          width={300}
          height={100}
          className="w-full rounded border border-secondary/20"
        />
        <p className="text-xs text-muted-foreground">
          Von Neumann entropy quantifies quantum entanglement
        </p>
      </Card>
    </div>
  );
};
