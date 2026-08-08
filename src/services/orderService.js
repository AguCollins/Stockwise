// src/services/orderService.js
import { salesData as seedOrders } from '../data/mockData';

let orders = seedOrders.map(order => ({ ...order }));

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export async function listOrders() {
  await delay();
  return orders.map(order => ({ ...order }));
}

export async function getOrder(id) {
  await delay();
  const order = orders.find(o => o.id === id);
  if (!order) throw new Error('Order not found');
  return { ...order };
}

export async function createOrder(payload) {
  await delay();
  orders = [payload, ...orders];
  return { ...payload };
}

export async function updateOrderStatus(id, status) {
  await delay();
  let updated = null;
  orders = orders.map(order => {
    if (order.id !== id) return order;
    updated = { ...order, status };
    return updated;
  });
  if (!updated) throw new Error('Order not found');
  return { ...updated };
}