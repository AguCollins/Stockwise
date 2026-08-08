// src/hooks/useExpenses.js
import { useCallback } from 'react';
import { useAsyncList } from './useAsyncList';
import {
  listExpenses, createExpense, updateExpense, deleteExpense,
} from '../services/expenseService';

export function useExpenses() {
  const { data: expenses, setData: setExpenses, loading, error, refetch } = useAsyncList(listExpenses);

  const saveExpense = useCallback(async (payload, isEditing) => {
    const saved = isEditing
      ? await updateExpense(payload.id, payload)
      : await createExpense(payload);
    setExpenses(prev =>
      prev.some(e => e.id === saved.id)
        ? prev.map(e => e.id === saved.id ? saved : e)
        : [saved, ...prev]
    );
    return saved;
  }, [setExpenses]);

  const removeExpense = useCallback(async (id) => {
    await deleteExpense(id);
    setExpenses(prev => prev.filter(e => e.id !== id));
  }, [setExpenses]);

  return { expenses, loading, error, refetch, saveExpense, removeExpense };
}