// src/hooks/useOrders.js
import { useCallback } from 'react';
import { useAsyncList } from './useAsyncList';
import { listOrders, createOrder, updateOrderStatus } from '../services/orderService';

export function useOrders() {
  const { data: orders, setData: setOrders, loading, error, refetch } = useAsyncList(listOrders);

  const addOrder = useCallback(async (order) => {
    const saved = await createOrder(order);
    setOrders(prev => [saved, ...prev]);
    return saved;
  }, [setOrders]);

  const setStatus = useCallback(async (id, status) => {
    const updated = await updateOrderStatus(id, status);
    setOrders(prev => prev.map(o => o.id === id ? updated : o));
    return updated;
  }, [setOrders]);

  return { orders, loading, error, refetch, addOrder, setStatus };
}