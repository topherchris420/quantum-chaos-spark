import { ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface HeaderProps {
  onShowReadme: () => void;
}

export const Header = ({ onShowReadme }: HeaderProps) => {
  return (
    <header className="w-full border-b border-primary/20 glass-panel">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <img 
            src={logo} 
            alt="Vers3Dynamics" 
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover opacity-90 hover:opacity-100 transition-opacity" 
          />
          <div>
            <h1 className="text-sm md:text-lg font-bold gradient-text">
              Quantum Scrambling
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Non-Hermitian Dynamics</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onShowReadme}
            className="text-xs md:text-sm"
          >
            <Info className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">README</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-xs md:text-sm"
          >
            <a 
              href="https://vers3dynamics.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-2"
            >
              <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Vers3Dynamics</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
