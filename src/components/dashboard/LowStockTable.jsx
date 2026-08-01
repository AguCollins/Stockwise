// src/components/dashboard/LowStockTable.jsx
import { ArrowRight, AlertTriangle, ShoppingCart, Package } from 'lucide-react';
import { lowStockItems } from '../../data/mockData';
import ResponsiveTable from '../ui/ResponsiveTable';

function StatusPill({ isCritical }) {
  return isCritical ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
      <AlertTriangle size={9} /> Critical
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
      Low
    </span>
  );
}

function LowStockCard({ item }) {
  const pct = Math.min((item.stock / item.threshold) * 100, 100);
  const isCritical = item.status === 'critical';
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-3.5">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
        <Package size={18} className={isCritical ? 'text-red-400' : 'text-amber-500'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
        <p className="text-[11px] text-gray-400">{item.sku}</p>
        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1.5">
          <div className={`h-full rounded-full ${isCritical ? 'bg-red-400' : 'bg-amber-400'}`} style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="text-right flex-shrink-0 flex flex-col items-end gap-1.5">
        <span className={`text-sm font-bold ${isCritical ? 'text-red-600' : 'text-amber-600'}`}>
          {item.stock}<span className="text-[10px] text-gray-400 font-normal ml-0.5">/ {item.threshold}</span>
        </span>
        <StatusPill isCritical={isCritical} />
      </div>
    </div>
  );
}

const columns = [
  {
    key: 'product',
    header: 'Product',
    render: (item) => {
      const isCritical = item.status === 'critical';
      return (
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
            <Package size={16} className={isCritical ? 'text-red-400' : 'text-amber-500'} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800 leading-tight">{item.name}</p>
            <p className="text-[10px] text-gray-400">{item.sku}</p>
          </div>
        </div>
      );
    },
  },
  {
    key: 'stock',
    header: 'Stock',
    render: (item) => {
      const pct = Math.min((item.stock / item.threshold) * 100, 100);
      const isCritical = item.status === 'critical';
      return (
        <div className="flex flex-col gap-1">
          <span className={`text-sm font-bold ${isCritical ? 'text-red-600' : 'text-amber-600'}`}>
            {item.stock}
            <span className="text-[10px] text-gray-400 font-normal ml-1">/ {item.threshold}</span>
          </span>
          <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${isCritical ? 'bg-red-400' : 'bg-amber-400'}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      );
    },
  },
  {
    key: 'status',
    header: 'Status',
    render: (item) => <StatusPill isCritical={item.status === 'critical'} />,
  },
  {
    key: 'action',
    header: 'Action',
    render: () => (
      <button className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-600 bg-gray-100 hover:bg-green-50 hover:text-green-700 px-2.5 py-1.5 rounded-lg transition-all">
        <ShoppingCart size={10} /> Reorder
      </button>
    ),
  },
];

export default function LowStockTable() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-up delay-350">
      {/* Header */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
            <AlertTriangle size={15} className="text-amber-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Low Stock Alerts</h3>
            <p className="text-[11px] text-gray-400">Items needing restocking</p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors">
          Reorder all <ArrowRight size={12} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 lg:p-0">
        <ResponsiveTable
          data={lowStockItems}
          keyExtractor={(item) => item.id}
          columns={columns}
          minWidthClass="min-w-[380px]"
          wrapInCard={false}
          renderMobileCard={(item) => <LowStockCard item={item} />}
        />
      </div>
    </div>
  );
}