import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";

interface ControlPanelProps {
  numSites: number;
  coupling: number;
  gainLoss: number;
  isRunning: boolean;
  onNumSitesChange: (value: number) => void;
  onCouplingChange: (value: number) => void;
  onGainLossChange: (value: number) => void;
  onToggleRunning: () => void;
  onReset: () => void;
}

export const ControlPanel = ({
  numSites,
  coupling,
  gainLoss,
  isRunning,
  onNumSitesChange,
  onCouplingChange,
  onGainLossChange,
  onToggleRunning,
  onReset,
}: ControlPanelProps) => {
  return (
    <Card className="glass-panel p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold quantum-text-glow">Quantum Controls</h2>
        <div className="flex gap-2">
          <Button
            onClick={onToggleRunning}
            variant="default"
            size="icon"
            className="quantum-glow"
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            size="icon"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-muted-foreground">
              Number of Sites
            </label>
            <span className="text-sm font-mono text-primary">{numSites}</span>
          </div>
          <Slider
            value={[numSites]}
            onValueChange={([value]) => onNumSitesChange(value)}
            min={4}
            max={16}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-muted-foreground">
              Coupling Strength (J)
            </label>
            <span className="text-sm font-mono text-primary">{coupling.toFixed(2)}</span>
          </div>
          <Slider
            value={[coupling]}
            onValueChange={([value]) => onCouplingChange(value)}
            min={0}
            max={2}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-muted-foreground">
              Non-Hermitian (γ)
            </label>
            <span className="text-sm font-mono text-secondary">{gainLoss.toFixed(2)}</span>
          </div>
          <Slider
            value={[gainLoss]}
            onValueChange={([value]) => onGainLossChange(value)}
            min={0}
            max={1}
            step={0.05}
            className="w-full"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-border/50 space-y-2">
        <p className="text-xs text-muted-foreground">
          <span className="text-primary font-semibold">Non-Hermitian</span> systems exhibit gain/loss and complex eigenvalues
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="text-secondary font-semibold">Scrambling</span> measures information spreading via OTOC
        </p>
      </div>
    </Card>
  );
};
