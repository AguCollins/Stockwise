// src/hooks/useVendors.js
import { useCallback } from 'react';
import { useAsyncList } from './useAsyncList';
import {
  listVendors, createVendor, updateVendor, deleteVendor,
  createPurchaseOrder, updatePurchaseOrderStatus,
} from '../services/vendorService';

export function useVendors() {
  const { data: vendors, setData: setVendors, loading, error, refetch } = useAsyncList(listVendors);

  const saveVendor = useCallback(async (payload, isEditing) => {
    const saved = isEditing
      ? await updateVendor(payload.id, payload)
      : await createVendor(payload);
    setVendors(prev =>
      prev.some(v => v.id === saved.id)
        ? prev.map(v => v.id === saved.id ? saved : v)
        : [...prev, saved]
    );
    return saved;
  }, [setVendors]);

  const removeVendor = useCallback(async (id) => {
    await deleteVendor(id);
    setVendors(prev => prev.filter(v => v.id !== id));
  }, [setVendors]);

  const placeOrder = useCallback(async (vendorId, order, total) => {
    const updated = await createPurchaseOrder(vendorId, order, total);
    setVendors(prev => prev.map(v => v.id === vendorId ? updated : v));
    return updated;
  }, [setVendors]);

  const setPurchaseOrderStatus = useCallback(async (vendorId, orderId, status) => {
    const updated = await updatePurchaseOrderStatus(vendorId, orderId, status);
    setVendors(prev => prev.map(v => v.id === vendorId ? updated : v));
    return updated;
  }, [setVendors]);

  return { vendors, loading, error, refetch, saveVendor, removeVendor, placeOrder, setPurchaseOrderStatus };
}