
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="neo-button bg-white/10 hover:bg-white/20 dark:bg-slate-800/30 dark:hover:bg-slate-800/50"
      aria-label={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === 'light' ? (
        <Moon size={18} className="text-taskflow-purple" />
      ) : (
        <Sun size={18} className="text-taskflow-orange" />
      )}
    </Button>
  );
};

export default React.memo(ThemeToggle);
