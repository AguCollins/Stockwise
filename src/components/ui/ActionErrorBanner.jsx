// src/components/ui/ActionErrorBanner.jsx
import { AlertCircle, X } from 'lucide-react';

export default function ActionErrorBanner({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 animate-fade-up">
      <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <AlertCircle size={14} className="text-red-600" />
      </div>
      <p className="text-sm text-red-800 font-medium flex-1 min-w-0">{message}</p>
      <button onClick={onDismiss} className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}