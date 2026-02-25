import { useGetLowStockItems } from '../hooks/useQueries';
import { AlertTriangle, Package } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function LowStockWarning() {
  const { data: lowStockItems, isLoading } = useGetLowStockItems();

  if (isLoading) return null;
  if (!lowStockItems || lowStockItems.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <h3 className="font-semibold text-red-700">Low Stock Alert</h3>
        <span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
          {lowStockItems.length} item{lowStockItems.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="space-y-2">
        {lowStockItems.slice(0, 5).map((item) => (
          <div key={item.id.toString()} className="flex items-center gap-2 text-sm">
            <Package className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-red-700 font-medium truncate">{item.name}</span>
            <span className="ml-auto text-red-500 font-bold whitespace-nowrap">
              {item.quantity.toString()} left
            </span>
          </div>
        ))}
        {lowStockItems.length > 5 && (
          <p className="text-xs text-red-500 text-center pt-1">
            +{lowStockItems.length - 5} more items
          </p>
        )}
      </div>
      <Link
        to="/admin/stock"
        className="mt-3 block text-center text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
      >
        Manage Stock →
      </Link>
    </div>
  );
}
