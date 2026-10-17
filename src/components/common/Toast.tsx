import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-600 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-200 bg-white text-stone-900',
    error: 'border-rose-200 bg-white text-stone-900',
    info: 'border-amber-200 bg-white text-stone-900',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div
        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-lg ${borders[toast.type]}`}
        role="status"
        aria-live="polite"
      >
        {icons[toast.type]}
        <p className="text-sm font-medium leading-snug">{toast.message}</p>
      </div>
    </div>
  );
};
