// src/components/inventory/DeleteModal.jsx
import { Trash2 } from 'lucide-react';
import ConfirmDeleteModal from '../ui/ConfirmDeleteModal';
import { ItemIcon } from '../../utils/inventoryIcons';

export default function DeleteModal({ isOpen, item, onClose, onConfirm }) {
  if (!isOpen || !item) return null;

  return (
    <ConfirmDeleteModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => { onConfirm(item.id); onClose(); }}
      icon={Trash2}
      title="Delete Item?"
      warningText="This action cannot be undone. All stock data for this item will be permanently removed."
      confirmLabel="Delete Item"
    >
      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
        <ItemIcon iconName={item.iconName} bg={item.bg} size={18} className="w-10 h-10" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
          <p className="text-[11px] text-gray-400">{item.sku} · {item.category}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-sm font-bold text-gray-900">{item.stock}</p>
          <p className="text-[10px] text-gray-400">in stock</p>
        </div>
      </div>
    </ConfirmDeleteModal>
  );
}