// src/services/expenseService.js
import { expensesData as seedExpenses } from '../data/mockData';

let expenses = seedExpenses.map(e => ({ ...e }));
let nextId = Math.max(...expenses.map(e => e.id), 0) + 1;

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export async function listExpenses() {
  await delay();
  return expenses.map(e => ({ ...e }));
}

export async function getExpense(id) {
  await delay();
  const expense = expenses.find(e => e.id === id);
  if (!expense) throw new Error('Expense not found');
  return { ...expense };
}

export async function createExpense(payload) {
  await delay();
  const newExpense = { ...payload, id: nextId++ };
  expenses = [newExpense, ...expenses];
  return { ...newExpense };
}

export async function updateExpense(id, payload) {
  await delay();
  let updated = null;
  expenses = expenses.map(e => {
    if (e.id !== id) return e;
    updated = { ...e, ...payload, id };
    return updated;
  });
  if (!updated) throw new Error('Expense not found');
  return { ...updated };
}

export async function deleteExpense(id) {
  await delay();
  expenses = expenses.filter(e => e.id !== id);
}