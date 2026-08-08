// src/services/customerService.js
import { customersData as seedCustomers } from '../data/mockData';

let customers = seedCustomers.map(c => ({ ...c }));
let nextId = Math.max(...customers.map(c => c.id), 0) + 1;

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export async function listCustomers() {
  await delay();
  return customers.map(c => ({ ...c }));
}

export async function getCustomer(id) {
  await delay();
  const customer = customers.find(c => c.id === id);
  if (!customer) throw new Error('Customer not found');
  return { ...customer };
}

export async function createCustomer(payload) {
  await delay();
  const newCustomer = { ...payload, id: nextId++ };
  customers = [...customers, newCustomer];
  return { ...newCustomer };
}

export async function updateCustomer(id, payload) {
  await delay();
  let updated = null;
  customers = customers.map(c => {
    if (c.id !== id) return c;
    updated = { ...c, ...payload, id };
    return updated;
  });
  if (!updated) throw new Error('Customer not found');
  return { ...updated };
}

export async function deleteCustomer(id) {
  await delay();
  customers = customers.filter(c => c.id !== id);
}