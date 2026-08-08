// src/components/ui/LoadingState.jsx
import { Loader2 } from 'lucide-react';

export default function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <Loader2 size={28} className="animate-spin mb-3 text-green-500" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}