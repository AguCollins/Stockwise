// src/components/customers/CustomerDeleteModal.jsx
import { UserX } from 'lucide-react';
import ConfirmDeleteModal from '../ui/ConfirmDeleteModal';

export default function CustomerDeleteModal({ isOpen, customer, onClose, onConfirm }) {
  if (!isOpen || !customer) return null;

  return (
    <ConfirmDeleteModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => { onConfirm(customer.id); onClose(); }}
      icon={UserX}
      title={`Remove ${customer.firstName} ${customer.lastName}?`}
      warningText={customer.totalOrders > 0
        ? `This customer has ${customer.totalOrders} order${customer.totalOrders > 1 ? 's' : ''} on record. Their order history will be preserved.`
        : undefined}
      confirmLabel="Remove"
    />
  );
}