// src/hooks/useCustomers.js
import { useCallback } from 'react';
import { useAsyncList } from './useAsyncList';
import {
  listCustomers, createCustomer, updateCustomer, deleteCustomer,
} from '../services/customerService';

export function useCustomers() {
  const { data: customers, setData: setCustomers, loading, error, refetch } = useAsyncList(listCustomers);

  const saveCustomer = useCallback(async (payload, isEditing) => {
    const saved = isEditing
      ? await updateCustomer(payload.id, payload)
      : await createCustomer(payload);
    setCustomers(prev =>
      prev.some(c => c.id === saved.id)
        ? prev.map(c => c.id === saved.id ? saved : c)
        : [...prev, saved]
    );
    return saved;
  }, [setCustomers]);

  const removeCustomer = useCallback(async (id) => {
    await deleteCustomer(id);
    setCustomers(prev => prev.filter(c => c.id !== id));
  }, [setCustomers]);

  return { customers, loading, error, refetch, saveCustomer, removeCustomer };
}