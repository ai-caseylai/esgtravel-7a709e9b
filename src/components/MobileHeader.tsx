import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  right?: React.ReactNode;
}

export default function MobileHeader({ title, showBack = false, right }: MobileHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30">
      <div className="flex items-center h-11 px-4 relative">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="absolute left-2 flex items-center gap-0.5 text-primary bg-transparent border-none p-1"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-[15px]">Back</span>
          </button>
        )}
        <h1 className="flex-1 text-center text-[17px] font-semibold text-foreground truncate">
          {title}
        </h1>
        {right && <div className="absolute right-3">{right}</div>}
      </div>
    </header>
  );
}
