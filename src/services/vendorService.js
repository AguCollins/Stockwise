// src/services/vendorService.js
import { vendorsData as seedVendors } from '../data/mockData';

let vendors = seedVendors.map(v => ({ ...v }));
let nextId = Math.max(...vendors.map(v => v.id), 0) + 1;

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export async function listVendors() {
  await delay();
  return vendors.map(v => ({ ...v }));
}

export async function getVendor(id) {
  await delay();
  const vendor = vendors.find(v => v.id === id);
  if (!vendor) throw new Error('Vendor not found');
  return { ...vendor };
}

export async function createVendor(payload) {
  await delay();
  const newVendor = { ...payload, id: nextId++ };
  vendors = [...vendors, newVendor];
  return { ...newVendor };
}

export async function updateVendor(id, payload) {
  await delay();
  let updated = null;
  vendors = vendors.map(v => {
    if (v.id !== id) return v;
    updated = { ...v, ...payload, id };
    return updated;
  });
  if (!updated) throw new Error('Vendor not found');
  return { ...updated };
}

export async function deleteVendor(id) {
  await delay();
  vendors = vendors.filter(v => v.id !== id);
}

export async function createPurchaseOrder(vendorId, order, orderTotal) {
  await delay();
  let updatedVendor = null;
  vendors = vendors.map(v => {
    if (v.id !== vendorId) return v;
    updatedVendor = {
      ...v,
      totalOrders: v.totalOrders + 1,
      pendingAmount: v.pendingAmount + orderTotal,
      lastOrder: order.date,
      orders: [order, ...(v.orders ?? [])],
    };
    return updatedVendor;
  });
  if (!updatedVendor) throw new Error('Vendor not found');
  return { ...updatedVendor };
}

export async function updatePurchaseOrderStatus(vendorId, orderId, status) {
  await delay();
  let updatedVendor = null;
  vendors = vendors.map(v => {
    if (v.id !== vendorId) return v;
    const orders = (v.orders ?? []).map(o => o.id === orderId ? { ...o, status } : o);
    const changedOrder = orders.find(o => o.id === orderId);
    let pendingAmount = v.pendingAmount;
    let totalPaid = v.totalPaid;
    if (status === 'delivered' && changedOrder) {
      pendingAmount = Math.max(0, pendingAmount - changedOrder.total);
      totalPaid = totalPaid + changedOrder.total;
    }
    updatedVendor = { ...v, orders, pendingAmount, totalPaid };
    return updatedVendor;
  });
  if (!updatedVendor) throw new Error('Vendor not found');
  return { ...updatedVendor };
}