import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ReadmeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReadmeDialog = ({ open, onOpenChange }: ReadmeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] glass-panel">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Non-Hermitian Quantum Information Scrambling
          </DialogTitle>
          <DialogDescription>
            Interactive Physics Simulation
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            {/* Overview */}
            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">
                This interactive demo explores the fascinating intersection of non-Hermitian quantum mechanics 
                and information scrambling. Watch as quantum information spreads across a lattice system with 
                gain/loss mechanisms, visualized through real-time Out-of-Time-Order Correlator (OTOC) measurements.
              </p>
            </section>

            <Separator />

            {/* How to Use */}
            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">How to Use</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>Press the <strong>Play</strong> button to start the quantum evolution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Adjust <strong>Number of Sites</strong> to change the lattice size (4-16 quantum sites)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>Modify <strong>Coupling Strength (J)</strong> to control information flow between sites</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>Change <strong>Non-Hermitian (γ)</strong> parameter to add gain/loss dynamics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">5.</span>
                  <span>Observe OTOC and Entropy metrics tracking information scrambling in real-time</span>
                </li>
              </ul>
            </section>

            <Separator />

            {/* Physics Explained */}
            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">Physics Explained</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-secondary mb-1">Non-Hermitian Quantum Mechanics</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Unlike traditional quantum systems where the Hamiltonian is Hermitian (H = H†), 
                    non-Hermitian systems have H ≠ H†, leading to:
                  </p>
                  <ul className="mt-2 ml-4 space-y-1 text-muted-foreground list-disc">
                    <li>Complex eigenvalues (gain and loss)</li>
                    <li>Exceptional points (EP) where eigenvalues coalesce</li>
                    <li>PT-symmetry and symmetry breaking</li>
                    <li>Enhanced sensitivity to perturbations</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-secondary mb-1">Information Scrambling</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Quantum scrambling describes how initially localized quantum information spreads 
                    throughout a many-body system, becoming encoded non-locally. This is quantified by 
                    the Out-of-Time-Order Correlator (OTOC):
                  </p>
                  <div className="mt-2 p-3 bg-black/30 rounded font-mono text-xs text-primary">
                    F(t) = ⟨[W(t), V(0)]†[W(t), V(0)]⟩
                  </div>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    Growing OTOC indicates fast scrambling, a signature of quantum chaos relevant to 
                    black hole physics, thermalization, and quantum computing.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-secondary mb-1">Entanglement Entropy</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Von Neumann entropy S = -Tr(ρ ln ρ) measures quantum entanglement. As the system 
                    evolves, entropy grows, indicating the buildup of quantum correlations and 
                    information delocalization.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Visualization Guide */}
            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">Visualization Guide</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">●</span>
                  <span><strong>Site Color:</strong> Represents quantum phase (hue) and amplitude (brightness)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">●</span>
                  <span><strong>Glow Effect:</strong> Intensity indicates probability amplitude</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">●</span>
                  <span><strong>Connecting Lines:</strong> Show lattice structure and quantum coupling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">●</span>
                  <span><strong>Moving Particles:</strong> Visualize information flow between sites</span>
                </li>
              </ul>
            </section>

            <Separator />

            {/* Technical Details */}
            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">Technical Implementation</h3>
              <p className="text-muted-foreground leading-relaxed">
                The simulation solves the non-Hermitian Schrödinger equation with a tight-binding 
                Hamiltonian including nearest-neighbor coupling and gain/loss terms. The system is 
                initialized with a localized quantum state that evolves under unitary (coupling) and 
                non-unitary (gain/loss) dynamics.
              </p>
            </section>

            <Separator />

            {/* Credits */}
            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">About</h3>
              <p className="text-muted-foreground leading-relaxed">
                Developed by <a 
                  href="https://vers3dynamics.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition-colors underline"
                >
                  Vers3 Dynamics
                </a> - Exploring the frontiers of quantum physics and complex systems.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
