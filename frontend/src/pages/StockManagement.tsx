import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Plus, Search, Package, AlertTriangle, TrendingUp, Edit, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useGetAllStockItems, useDeleteStockItem, useAddSale, useMarkTrending } from '../hooks/useQueries';
import { StockItem } from '../backend';
import StockItemForm from '../components/StockItemForm';

type FilterTab = 'all' | 'low-stock' | 'trending' | 'expiring';

export default function StockManagement() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<StockItem | undefined>(undefined);

  const { data: stockItems = [], isLoading } = useGetAllStockItems();
  const deleteItem = useDeleteStockItem();
  const addSale = useAddSale();
  const markTrending = useMarkTrending();

  const now = Date.now() * 1_000_000;
  const thirtyDaysNanos = 30 * 24 * 60 * 60 * 1_000_000_000;

  const filtered = stockItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'low-stock') return item.isLowStock;
    if (activeTab === 'trending') return item.isTrending;
    if (activeTab === 'expiring') {
      if (!item.expiryDate) return false;
      const expiry = Number(item.expiryDate);
      return expiry > now && expiry - now <= thirtyDaysNanos;
    }
    return true;
  });

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: stockItems.length },
    { key: 'low-stock', label: 'Low Stock', count: stockItems.filter(i => i.isLowStock).length },
    { key: 'trending', label: 'Trending', count: stockItems.filter(i => i.isTrending).length },
    { key: 'expiring', label: 'Expiring', count: stockItems.filter(i => {
      if (!i.expiryDate) return false;
      const expiry = Number(i.expiryDate);
      return expiry > now && expiry - now <= thirtyDaysNanos;
    }).length },
  ];

  return (
    <div className="min-h-screen bg-neon-black p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin" className="text-gray-500 hover:text-neon-green transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Package className="w-5 h-5 text-neon-green" />
            <h1 className="font-orbitron text-xl font-bold text-white">STOCK MANAGEMENT</h1>
          </div>
          <p className="text-gray-500 font-mono text-xs">{stockItems.length} items in inventory</p>
        </div>
        <button
          onClick={() => { setEditItem(undefined); setFormOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 neon-btn-solid rounded-md font-orbitron text-xs font-bold tracking-wider"
        >
          <Plus className="w-4 h-4" />
          ADD ITEM
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-neon-green/10 text-neon-green border border-neon-green/50'
                : 'text-gray-500 border border-transparent hover:text-neon-green hover:border-neon-green/20'
            }`}
          >
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded text-xs ${activeTab === tab.key ? 'bg-neon-green/20 text-neon-green' : 'bg-gray-800 text-gray-500'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 neon-input rounded-md font-mono text-sm"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 rounded-lg bg-neon-surface animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 font-mono text-sm">No items found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neon-border">
                <th className="text-left py-3 px-4 text-xs font-mono text-gray-500 uppercase tracking-widest">Product</th>
                <th className="text-left py-3 px-4 text-xs font-mono text-gray-500 uppercase tracking-widest hidden sm:table-cell">Category</th>
                <th className="text-right py-3 px-4 text-xs font-mono text-gray-500 uppercase tracking-widest">Qty</th>
                <th className="text-right py-3 px-4 text-xs font-mono text-gray-500 uppercase tracking-widest hidden md:table-cell">Price</th>
                <th className="text-center py-3 px-4 text-xs font-mono text-gray-500 uppercase tracking-widest">Status</th>
                <th className="text-right py-3 px-4 text-xs font-mono text-gray-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id.toString()} className="border-b border-neon-border/30 hover:bg-neon-green/3 transition-colors group">
                  <td className="py-3 px-4">
                    <p className="font-rajdhani font-semibold text-white text-sm group-hover:text-neon-green transition-colors">{item.name}</p>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className="text-xs font-mono text-gray-500 px-2 py-0.5 rounded border border-neon-border">{item.category}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-mono text-sm font-bold ${item.isLowStock ? 'text-yellow-400' : 'text-neon-green'}`}>
                      {item.quantity.toString()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right hidden md:table-cell">
                    <span className="font-mono text-sm text-gray-300">₹{Number(item.unitPrice).toLocaleString('en-IN')}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {item.isLowStock && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                          <AlertTriangle className="w-3 h-3" />
                          Low
                        </span>
                      )}
                      {item.isTrending && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-neon-green/10 text-neon-green border border-neon-green/30">
                          <TrendingUp className="w-3 h-3" />
                          Hot
                        </span>
                      )}
                      {!item.isLowStock && !item.isTrending && (
                        <span className="text-xs font-mono text-gray-600">—</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => addSale.mutate({ stockItemId: item.id, quantity: 1n })}
                        disabled={addSale.isPending || Number(item.quantity) === 0}
                        title="Record Sale"
                        className="p-1.5 text-gray-500 hover:text-neon-green hover:bg-neon-green/10 rounded transition-all disabled:opacity-30"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => markTrending.mutate({ id: item.id, isTrending: !item.isTrending })}
                        disabled={markTrending.isPending}
                        title={item.isTrending ? 'Remove Trending' : 'Mark Trending'}
                        className={`p-1.5 rounded transition-all ${item.isTrending ? 'text-neon-green hover:bg-neon-green/10' : 'text-gray-500 hover:text-neon-green hover:bg-neon-green/10'}`}
                      >
                        <TrendingUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => { setEditItem(item); setFormOpen(true); }}
                        title="Edit"
                        className="p-1.5 text-gray-500 hover:text-neon-green hover:bg-neon-green/10 rounded transition-all"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${item.name}"?`)) {
                            deleteItem.mutate(item.id);
                          }
                        }}
                        disabled={deleteItem.isPending}
                        title="Delete"
                        className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all disabled:opacity-30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <StockItemForm
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditItem(undefined); }}
        editItem={editItem}
      />
    </div>
  );
}
