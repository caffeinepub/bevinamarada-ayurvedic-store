import React from 'react';
import { AlertTriangle, CheckCircle, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllStockItems } from '../hooks/useQueries';

export default function LowStockWarning() {
  const { data: stockItems, isLoading } = useGetAllStockItems();

  const lowStockItems = (stockItems || []).filter(
    (item) => item.quantity <= item.lowStockThreshold
  );

  if (isLoading) {
    return (
      <Card className="rounded-2xl shadow-md border-2 border-amber-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-black text-amber-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Low Stock Warning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-amber-50 rounded-xl animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (lowStockItems.length === 0) {
    return (
      <Card className="rounded-2xl shadow-md border-2 border-green-200 bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-black text-green-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Stock Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 font-bold text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            All stock levels are healthy ✓
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-md border-2 border-amber-300 bg-amber-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-black text-amber-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          ⚠ Low Stock Warning ({lowStockItems.length} item{lowStockItems.length !== 1 ? 's' : ''})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {lowStockItems.map((item) => (
            <div
              key={String(item.id)}
              className="bg-white border-2 border-amber-200 rounded-xl p-3 flex items-start gap-3 shadow-sm"
            >
              <Package className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-black text-sm text-gray-900 truncate">{item.name}</p>
                <p className="text-xs font-bold text-amber-700">
                  Qty: <span className="font-black text-red-600">{String(item.quantity)}</span>
                  {' / '}
                  Threshold: <span className="font-black">{String(item.lowStockThreshold)}</span>
                </p>
                <p className="text-xs font-bold text-gray-500">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
