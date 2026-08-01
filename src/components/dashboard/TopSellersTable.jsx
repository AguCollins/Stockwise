// src/components/dashboard/TopSellersTable.jsx
import { ArrowRight, TrendingUp, TrendingDown, ShoppingBag } from 'lucide-react';
import { topSellers } from '../../data/mockData';
import ResponsiveTable from '../ui/ResponsiveTable';

function formatNaira(v) {
  if (v >= 1000000) return `₦${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000)    return `₦${(v / 1000).toFixed(0)}K`;
  return `₦${v}`;
}

const rankColors = ['text-amber-500', 'text-gray-400', 'text-orange-400'];

function TrendBadge({ trend }) {
  return trend === 'up' ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-lg">
      <TrendingUp size={10} /> Up
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">
      <TrendingDown size={10} /> Down
    </span>
  );
}

function TopSellerCard({ item, rank }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-3.5">
      <span className={`text-xs font-extrabold w-4 text-center flex-shrink-0 ${rankColors[rank] ?? 'text-gray-300'}`}>
        {rank + 1}
      </span>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: item.bg }}>
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
        <p className="text-[11px] text-gray-400">{item.sku} · {item.sold} units sold</p>
      </div>
      <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
        <p className="text-sm font-bold text-green-600">{formatNaira(item.revenue)}</p>
        <TrendBadge trend={item.trend} />
      </div>
    </div>
  );
}

const columns = [
  {
    key: 'rank',
    header: '#',
    render: (item) => {
      const idx = topSellers.findIndex(s => s.id === item.id);
      return <span className={`text-xs font-extrabold ${rankColors[idx] ?? 'text-gray-300'}`}>{idx + 1}</span>;
    },
  },
  {
    key: 'product',
    header: 'Product',
    render: (item) => (
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: item.bg }}>
          {item.emoji}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-800 leading-tight">{item.name}</p>
          <p className="text-[10px] text-gray-400">{item.sku}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'sold',
    header: 'Sold',
    render: (item) => (
      <>
        <span className="text-sm font-bold text-gray-900">{item.sold}</span>
        <span className="text-[10px] text-gray-400 ml-1">units</span>
      </>
    ),
  },
  {
    key: 'revenue',
    header: 'Revenue',
    render: (item) => <span className="text-sm font-bold text-green-600">{formatNaira(item.revenue)}</span>,
  },
  {
    key: 'trend',
    header: 'Trend',
    render: (item) => <TrendBadge trend={item.trend} />,
  },
];

export default function TopSellersTable() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-up delay-300">
      {/* Header */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
            <ShoppingBag size={15} className="text-orange-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Top Sellers</h3>
            <p className="text-[11px] text-gray-400">Best performers this month</p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors">
          View all <ArrowRight size={12} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 lg:p-0">
        <ResponsiveTable
          data={topSellers}
          keyExtractor={(item) => item.id}
          columns={columns}
          minWidthClass="min-w-[400px]"
          wrapInCard={false}
          renderMobileCard={(item) => (
            <TopSellerCard item={item} rank={topSellers.findIndex(s => s.id === item.id)} />
          )}
        />
      </div>
    </div>
  );
}