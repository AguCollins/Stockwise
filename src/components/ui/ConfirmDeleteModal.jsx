// src/components/ui/ConfirmDeleteModal.jsx
import { AlertTriangle, Trash2 } from 'lucide-react';
import ModalShell from './ModalShell';

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  icon,
  title,
  warningText,
  confirmLabel = 'Delete',
  children,
}) {
  const Icon = icon ?? Trash2;

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} maxWidthClass="sm:max-w-sm">
      <div className="p-6">
        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon size={24} className="text-red-500" />
        </div>

        <h3 className="text-base font-bold text-foreground text-center mb-4">
          {title}
        </h3>

        {children && (
          <div className="mb-4">
            {children}
          </div>
        )}

        {warningText && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-5">
            <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 font-medium">{warningText}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Trash2 size={14} /> {confirmLabel}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}