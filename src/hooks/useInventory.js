// src/hooks/useInventory.js
import { useCallback } from 'react';
import { useAsyncList } from './useAsyncList';
import {
  listInventory, createInventoryItem, updateInventoryItem, deleteInventoryItem,
} from '../services/inventoryService';

export function useInventory() {
  const { data: items, setData: setItems, loading, error, refetch } = useAsyncList(listInventory);

  const saveItem = useCallback(async (payload, isEditing) => {
    const saved = isEditing
      ? await updateInventoryItem(payload.id, payload)
      : await createInventoryItem(payload);
    setItems(prev =>
      prev.some(i => i.id === saved.id)
        ? prev.map(i => i.id === saved.id ? saved : i)
        : [...prev, saved]
    );
    return saved;
  }, [setItems]);

  const removeItem = useCallback(async (id) => {
    await deleteInventoryItem(id);
    setItems(prev => prev.filter(i => i.id !== id));
  }, [setItems]);

  return { items, loading, error, refetch, saveItem, removeItem };
}