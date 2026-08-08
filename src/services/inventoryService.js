// src/services/inventoryService.js
import { inventoryItems as seedInventory } from '../data/mockData';

let inventory = seedInventory.map(item => ({ ...item }));
let nextId = Math.max(...inventory.map(i => i.id), 0) + 1;

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export async function listInventory() {
  await delay();
  return inventory.map(item => ({ ...item }));
}

export async function getInventoryItem(id) {
  await delay();
  const item = inventory.find(i => i.id === id);
  if (!item) throw new Error('Item not found');
  return { ...item };
}

export async function createInventoryItem(payload) {
  await delay();
  const newItem = {
    ...payload,
    id: nextId++,
    lastRestocked: payload.lastRestocked ?? new Date().toISOString().slice(0, 10),
  };
  inventory = [...inventory, newItem];
  return { ...newItem };
}

export async function updateInventoryItem(id, payload) {
  await delay();
  let updated = null;
  inventory = inventory.map(item => {
    if (item.id !== id) return item;
    updated = { ...item, ...payload, id };
    return updated;
  });
  if (!updated) throw new Error('Item not found');
  return { ...updated };
}

export async function deleteInventoryItem(id) {
  await delay();
  inventory = inventory.filter(item => item.id !== id);
}