import { useEffect, useRef, useState } from "react";

interface QuantumState {
  realPart: number;
  imagPart: number;
  position: { x: number; y: number };
}

interface QuantumCanvasProps {
  numSites: number;
  coupling: number;
  gainLoss: number;
  isRunning: boolean;
  onOTOC: (value: number) => void;
  onEntropy: (value: number) => void;
}

export const QuantumCanvas = ({ 
  numSites, 
  coupling, 
  gainLoss, 
  isRunning,
  onOTOC,
  onEntropy
}: QuantumCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [states, setStates] = useState<QuantumState[]>([]);
  const timeRef = useRef(0);
  const animationRef = useRef<number>();

  // Initialize quantum states
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const spacing = width / (numSites + 1);

    const initialStates: QuantumState[] = [];
    for (let i = 0; i < numSites; i++) {
      const angle = (i / numSites) * Math.PI * 2;
      initialStates.push({
        realPart: i === Math.floor(numSites / 2) ? 1 : 0, // Localized initial state
        imagPart: 0,
        position: {
          x: width / 2 + Math.cos(angle) * (width * 0.35),
          y: height / 2 + Math.sin(angle) * (height * 0.35)
        }
      });
    }
    setStates(initialStates);
    timeRef.current = 0;
  }, [numSites]);

  // Quantum evolution simulation
  const evolveStates = (dt: number) => {
    setStates(prevStates => {
      const newStates = [...prevStates];
      const N = newStates.length;

      // Non-Hermitian Hamiltonian evolution
      for (let i = 0; i < N; i++) {
        const state = newStates[i];
        let dReal = -gainLoss * state.imagPart; // Non-Hermitian term
        let dImag = gainLoss * state.realPart;

        // Coupling to neighbors (circular boundary)
        const left = newStates[(i - 1 + N) % N];
        const right = newStates[(i + 1) % N];

        dReal += -coupling * (left.imagPart + right.imagPart);
        dImag += coupling * (left.realPart + right.realPart);

        // Update state
        state.realPart += dImag * dt;
        state.imagPart += dReal * dt;

        // Normalize (with non-Hermitian effects)
        const norm = Math.sqrt(state.realPart ** 2 + state.imagPart ** 2);
        if (norm > 0.01) {
          state.realPart /= (norm * 0.98 + 0.02); // Slight damping
          state.imagPart /= (norm * 0.98 + 0.02);
        }
      }

      return newStates;
    });
  };

  // Calculate quantum metrics
  const calculateMetrics = (states: QuantumState[]) => {
    // OTOC-like measure (simplified)
    let otoc = 0;
    for (let i = 0; i < states.length; i++) {
      const j = (i + Math.floor(states.length / 3)) % states.length;
      const commutator = Math.abs(
        states[i].realPart * states[j].imagPart - 
        states[i].imagPart * states[j].realPart
      );
      otoc += commutator;
    }
    onOTOC(otoc / states.length);

    // Von Neumann entropy (simplified participation ratio)
    let entropy = 0;
    states.forEach(state => {
      const prob = state.realPart ** 2 + state.imagPart ** 2;
      if (prob > 0.001) {
        entropy -= prob * Math.log(prob + 0.001);
      }
    });
    onEntropy(entropy);
  };

  // Animation loop
  useEffect(() => {
    if (!isRunning) return;

    const animate = () => {
      timeRef.current += 0.05;
      evolveStates(0.05);
      
      if (timeRef.current % 1 < 0.1) {
        calculateMetrics(states);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, coupling, gainLoss, states]);

  // Render quantum states
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "rgba(15, 15, 25, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    for (let i = 0; i < states.length; i++) {
      const next = (i + 1) % states.length;
      ctx.beginPath();
      ctx.moveTo(states[i].position.x, states[i].position.y);
      ctx.lineTo(states[next].position.x, states[next].position.y);
      ctx.stroke();
    }

    // Draw quantum sites
    states.forEach((state, i) => {
      const amplitude = Math.sqrt(state.realPart ** 2 + state.imagPart ** 2);
      const phase = Math.atan2(state.imagPart, state.realPart);
      
      // Color based on phase
      const hue = ((phase + Math.PI) / (2 * Math.PI)) * 360;
      const color = `hsl(${hue}, 100%, 60%)`;
      
      // Glow effect
      const gradient = ctx.createRadialGradient(
        state.position.x, state.position.y, 0,
        state.position.x, state.position.y, 30 * amplitude
      );
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, `hsla(${hue}, 100%, 60%, 0.3)`);
      gradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(state.position.x, state.position.y, 30 * amplitude, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(state.position.x, state.position.y, 8 * amplitude, 0, Math.PI * 2);
      ctx.fill();

      // Site label
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(i.toString(), state.position.x, state.position.y - 25);
    });

    // Draw information flow particles
    if (timeRef.current % 0.5 < 0.05) {
      for (let i = 0; i < states.length; i++) {
        const next = (i + 1) % states.length;
        const t = Math.random();
        const x = states[i].position.x * (1 - t) + states[next].position.x * t;
        const y = states[i].position.y * (1 - t) + states[next].position.y * t;
        
        ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [states]);

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[500px] relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-full rounded-lg border border-primary/30 touch-none"
        style={{ background: "radial-gradient(circle at center, rgba(0, 255, 255, 0.03), transparent 70%)" }}
      />
    </div>
  );
};
