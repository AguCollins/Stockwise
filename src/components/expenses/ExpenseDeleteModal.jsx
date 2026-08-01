// src/components/expenses/ExpenseDeleteModal.jsx
import { Trash2, Package, Home, Truck, Zap, Megaphone, Users, MailOpen, Wrench } from 'lucide-react';
import ConfirmDeleteModal from '../ui/ConfirmDeleteModal';
import { expenseCategories } from '../../data/mockData';

const iconMap = { Package, Home, Truck, Zap, Megaphone, Users, MailOpen, Wrench };

export default function ExpenseDeleteModal({ isOpen, expense, onClose, onConfirm }) {
  if (!isOpen || !expense) return null;

  const cat = expenseCategories.find(c => c.id === expense.category);
  const CategoryIcon = iconMap[cat?.icon] ?? Wrench;

  return (
    <ConfirmDeleteModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => { onConfirm(expense.id); onClose(); }}
      icon={Trash2}
      title="Delete Expense?"
      confirmLabel="Yes, Delete"
    >
      <p className="text-sm text-gray-500 text-center mb-4 leading-relaxed">
        Are you sure you want to delete
      </p>
      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: cat?.bg ?? '#f3f4f6' }}>
          <CategoryIcon size={18} style={{ color: cat?.color ?? '#6b7280' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{expense.name}</p>
          <p className="text-xs text-gray-400">{cat?.label ?? 'Other'} · {expense.vendor}</p>
        </div>
        <p className="text-sm font-extrabold text-red-500 flex-shrink-0">
          ₦{expense.amount?.toLocaleString()}
        </p>
      </div>
    </ConfirmDeleteModal>
  );
}