import { useState } from "react";
import { QuantumCanvas } from "@/components/QuantumCanvas";
import { ControlPanel } from "@/components/ControlPanel";
import { MetricsDisplay } from "@/components/MetricsDisplay";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [numSites, setNumSites] = useState(8);
  const [coupling, setCoupling] = useState(0.5);
  const [gainLoss, setGainLoss] = useState(0.2);
  const [isRunning, setIsRunning] = useState(false);
  const [otoc, setOtoc] = useState(0);
  const [entropy, setEntropy] = useState(0);

  const handleReset = () => {
    setIsRunning(false);
    setOtoc(0);
    setEntropy(0);
    // Force re-render by changing key
    setNumSites(prev => prev);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold quantum-text-glow bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Non-Hermitian Quantum Information Scrambling
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto">
            Explore quantum dynamics with gain/loss mechanisms and observe information spreading through OTOC measurements
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas */}
          <div className="lg:col-span-2">
            <Card className="glass-panel p-4 md:p-6 quantum-glow">
              <QuantumCanvas
                numSites={numSites}
                coupling={coupling}
                gainLoss={gainLoss}
                isRunning={isRunning}
                onOTOC={setOtoc}
                onEntropy={setEntropy}
              />
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <ControlPanel
              numSites={numSites}
              coupling={coupling}
              gainLoss={gainLoss}
              isRunning={isRunning}
              onNumSitesChange={setNumSites}
              onCouplingChange={setCoupling}
              onGainLossChange={setGainLoss}
              onToggleRunning={() => setIsRunning(!isRunning)}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Metrics */}
        <MetricsDisplay otoc={otoc} entropy={entropy} />

        {/* Theory Section */}
        <Card className="glass-panel p-6 space-y-4">
          <h2 className="text-2xl font-bold text-primary quantum-text-glow">Theory</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h3 className="text-primary font-semibold mb-2">Non-Hermitian Systems</h3>
              <p>
                In non-Hermitian quantum mechanics, the Hamiltonian H ≠ H†, leading to complex eigenvalues 
                representing gain (amplification) and loss (decay). These systems exhibit unique phenomena like:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Exceptional points (EP)</li>
                <li>PT-symmetry breaking</li>
                <li>Unidirectional invisibility</li>
                <li>Enhanced sensitivity</li>
              </ul>
            </div>
            <div>
              <h3 className="text-secondary font-semibold mb-2">Quantum Information Scrambling</h3>
              <p>
                Information scrambling describes how local quantum information spreads across a many-body system. 
                Measured by the Out-of-Time-Order Correlator (OTOC):
              </p>
              <p className="mt-2 font-mono text-xs bg-black/30 p-2 rounded">
                F(t) = ⟨[W(t), V(0)]†[W(t), V(0)]⟩
              </p>
              <p className="mt-2">
                Growing OTOC indicates quantum chaos and fast scrambling, relevant to black hole physics 
                and quantum computing.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
