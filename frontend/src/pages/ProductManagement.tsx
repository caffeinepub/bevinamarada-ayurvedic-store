import { useState } from 'react';
import { Package, Plus, Edit2, Trash2, TrendingUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useGetAllStockItems, useDeleteStockItem, useMarkTrending } from '../hooks/useQueries';
import StockItemForm from '../components/StockItemForm';
import type { StockItem } from '../backend';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductManagement() {
  const { data: items = [], isLoading } = useGetAllStockItems();
  const deleteMutation = useDeleteStockItem();
  const markTrendingMutation = useMarkTrending();
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<StockItem | null>(null);

  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (item: StockItem) => {
    setEditItem(item);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditItem(null);
    setFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    if (!open) setEditItem(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-forest-800 font-display">Product Management</h1>
            <p className="text-forest-500 text-sm">{items.length} products</p>
          </div>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-gradient-to-r from-forest-600 to-sage-600 hover:from-forest-700 hover:to-sage-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="pl-9 border-forest-200"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-forest-400">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No products found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-forest-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-forest-100 bg-forest-50">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-forest-500">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-forest-500">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-forest-500">Price</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-forest-500">Stock</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-forest-500">Trending</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-forest-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-50">
              {filtered.map((item) => (
                <tr key={item.id.toString()} className="hover:bg-forest-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image.getDirectURL()} alt={item.name} className="w-9 h-9 rounded-lg object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center">
                          <Package className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <span className="font-medium text-forest-800">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-forest-600">{item.category}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-forest-700">
                    ₹{Number(item.unitPrice).toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={item.isLowStock ? 'destructive' : 'secondary'}>
                      {item.quantity.toString()} units
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {item.isTrending ? (
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    ) : (
                      <span className="text-forest-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => markTrendingMutation.mutate({ id: item.id, isTrending: !item.isTrending })}
                        className={`p-1.5 rounded-lg transition-colors ${
                          item.isTrending
                            ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                            : 'bg-forest-50 text-forest-400 hover:bg-forest-100'
                        }`}
                        title={item.isTrending ? 'Remove trending' : 'Mark trending'}
                      >
                        <TrendingUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 rounded-lg bg-forest-50 text-forest-500 hover:bg-forest-100 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(item.id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <StockItemForm open={formOpen} onOpenChange={handleFormClose} editItem={editItem} />
    </div>
  );
}
