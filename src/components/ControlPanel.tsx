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
    <Card className="glass-panel p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold quantum-text-glow">Controls</h2>
        <div className="flex gap-2">
          <Button
            onClick={onToggleRunning}
            variant="default"
            size="sm"
            className="quantum-glow h-9 w-9 md:h-10 md:w-10"
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="h-9 w-9 md:h-10 md:w-10"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs md:text-sm font-medium text-muted-foreground">
              Sites
            </label>
            <span className="text-xs md:text-sm font-mono text-primary font-bold">{numSites}</span>
          </div>
          <Slider
            value={[numSites]}
            onValueChange={([value]) => onNumSitesChange(value)}
            min={4}
            max={16}
            step={1}
            className="w-full touch-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs md:text-sm font-medium text-muted-foreground">
              Coupling (J)
            </label>
            <span className="text-xs md:text-sm font-mono text-primary font-bold">{coupling.toFixed(2)}</span>
          </div>
          <Slider
            value={[coupling]}
            onValueChange={([value]) => onCouplingChange(value)}
            min={0}
            max={2}
            step={0.1}
            className="w-full touch-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs md:text-sm font-medium text-muted-foreground">
              Gain/Loss (γ)
            </label>
            <span className="text-xs md:text-sm font-mono text-secondary font-bold">{gainLoss.toFixed(2)}</span>
          </div>
          <Slider
            value={[gainLoss]}
            onValueChange={([value]) => onGainLossChange(value)}
            min={0}
            max={1}
            step={0.05}
            className="w-full touch-none"
          />
        </div>
      </div>

      <div className="pt-3 md:pt-4 border-t border-border/50 space-y-1.5">
        <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
          <span className="text-primary font-semibold">Non-Hermitian:</span> gain/loss dynamics
        </p>
        <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
          <span className="text-secondary font-semibold">OTOC:</span> scrambling measure
        </p>
      </div>
    </Card>
  );
};
