// src/utils/inventoryIcons.jsx
import { Package } from 'lucide-react';
import { iconMap } from './iconMap';

// Render an inventory item icon. Kept as the sole export in this file
// (component only) to satisfy react-refresh/only-export-components —
// iconMap and iconOptions now live in ./iconMap.js.
export function ItemIcon({ iconName, bg, size = 18, className = '' }) {
  const Icon = iconMap[iconName] ?? Package;
  return (
    <div
      className={`flex items-center justify-center rounded-xl flex-shrink-0 ${className}`}
      style={{ background: bg }}
    >
      <Icon size={size} className="text-gray-600" />
    </div>
  );
}