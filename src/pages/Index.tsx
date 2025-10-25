import { useState } from "react";
import { QuantumCanvas } from "@/components/QuantumCanvas";
import { ControlPanel } from "@/components/ControlPanel";
import { MetricsDisplay } from "@/components/MetricsDisplay";
import { Header } from "@/components/Header";
import { ReadmeDialog } from "@/components/ReadmeDialog";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [numSites, setNumSites] = useState(8);
  const [coupling, setCoupling] = useState(0.5);
  const [gainLoss, setGainLoss] = useState(0.2);
  const [isRunning, setIsRunning] = useState(false);
  const [otoc, setOtoc] = useState(0);
  const [entropy, setEntropy] = useState(0);
  const [showReadme, setShowReadme] = useState(false);

  const handleReset = () => {
    setIsRunning(false);
    setOtoc(0);
    setEntropy(0);
    toast({
      title: "System Reset",
      description: "Quantum state reinitialized",
      duration: 2000,
    });
  };

  const handleToggleRunning = () => {
    setIsRunning(!isRunning);
    toast({
      title: isRunning ? "Simulation Paused" : "Simulation Running",
      description: isRunning ? "Evolution halted" : "Quantum dynamics active",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onShowReadme={() => setShowReadme(true)} />
      <ReadmeDialog open={showReadme} onOpenChange={setShowReadme} />
      
      <main className="flex-1 p-3 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
          {/* Title Section */}
          <div className="text-center space-y-2 md:space-y-3 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold gradient-text animate-float">
              Non-Hermitian Quantum Scrambling
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
              Explore quantum dynamics with gain/loss mechanisms
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Canvas */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Card className="glass-panel p-3 md:p-4 lg:p-6 quantum-glow animate-scale-in">
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
            <div className="order-1 lg:order-2">
              <ControlPanel
                numSites={numSites}
                coupling={coupling}
                gainLoss={gainLoss}
                isRunning={isRunning}
                onNumSitesChange={setNumSites}
                onCouplingChange={setCoupling}
                onGainLossChange={setGainLoss}
                onToggleRunning={handleToggleRunning}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* Metrics */}
          <MetricsDisplay otoc={otoc} entropy={entropy} />

          {/* Theory Section - Collapsible on mobile */}
          <Card className="glass-panel p-4 md:p-6 space-y-3 md:space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-primary quantum-text-glow">Theory</h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
              <div className="space-y-2">
                <h3 className="text-primary font-semibold text-sm md:text-base">Non-Hermitian Systems</h3>
                <p className="leading-relaxed">
                  In non-Hermitian quantum mechanics, H ≠ H†, leading to complex eigenvalues 
                  (gain/loss). Unique phenomena include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Exceptional points</li>
                  <li>PT-symmetry breaking</li>
                  <li>Enhanced sensitivity</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-secondary font-semibold text-sm md:text-base">Information Scrambling</h3>
                <p className="leading-relaxed">
                  Quantum scrambling describes how local information spreads non-locally. 
                  Measured by OTOC:
                </p>
                <div className="mt-2 p-2 md:p-3 bg-black/30 rounded font-mono text-[10px] md:text-xs text-primary overflow-x-auto">
                  F(t) = ⟨[W(t), V(0)]†[W(t), V(0)]⟩
                </div>
                <p className="leading-relaxed">
                  Growing OTOC indicates quantum chaos, relevant to black holes and quantum computing.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
