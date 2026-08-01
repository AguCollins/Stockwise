// src/components/vendors/VendorDeleteModal.jsx
import { Truck } from 'lucide-react';
import ConfirmDeleteModal from '../ui/ConfirmDeleteModal';

export default function VendorDeleteModal({ isOpen, vendor, onClose, onConfirm }) {
  if (!isOpen || !vendor) return null;

  return (
    <ConfirmDeleteModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => { onConfirm(vendor.id); onClose(); }}
      icon={Truck}
      title="Remove Vendor?"
      warningText={vendor.pendingAmount > 0
        ? `This vendor has a pending balance of ₦${vendor.pendingAmount.toLocaleString()}. Make sure all payments are settled first.`
        : undefined}
      confirmLabel="Yes, Remove"
    >
      <p className="text-sm text-gray-500 text-center mb-1 leading-relaxed">
        Are you sure you want to remove
      </p>
      <p className="text-sm font-bold text-gray-800 text-center">
        {vendor.name}?
      </p>
    </ConfirmDeleteModal>
  );
}