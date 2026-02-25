import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, TrendingUp, ShoppingCart, AlertTriangle, Package } from 'lucide-react';
import { useGetAllStockItems, useDeleteStockItem, useAddSale, useMarkTrending } from '../hooks/useQueries';
import StockItemForm from '../components/StockItemForm';
import type { StockItem } from '../backend';

type FilterTab = 'all' | 'low-stock' | 'trending' | 'out-of-stock';

export default function StockManagement() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<StockItem | undefined>(undefined);

  const { data: stockItems = [], isLoading } = useGetAllStockItems();
  const deleteMutation = useDeleteStockItem();
  const saleMutation = useAddSale();
  const trendingMutation = useMarkTrending();

  const filtered = stockItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'low-stock') return item.isLowStock;
    if (activeTab === 'trending') return item.isTrending;
    if (activeTab === 'out-of-stock') return Number(item.quantity) === 0;
    return true;
  });

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'All Items', count: stockItems.length },
    { key: 'low-stock', label: 'Low Stock', count: stockItems.filter((i) => i.isLowStock).length },
    { key: 'trending', label: 'Trending', count: stockItems.filter((i) => i.isTrending).length },
    { key: 'out-of-stock', label: 'Out of Stock', count: stockItems.filter((i) => Number(i.quantity) === 0).length },
  ];

  const handleEdit = (item: StockItem) => {
    setEditItem(item);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditItem(undefined);
    setFormOpen(true);
  };

  const handleDelete = (id: bigint) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSale = (item: StockItem) => {
    const qty = prompt(`Enter quantity to sell for "${item.name}" (available: ${item.quantity}):`);
    if (!qty) return;
    const quantity = parseInt(qty);
    if (isNaN(quantity) || quantity <= 0) return alert('Invalid quantity');
    if (quantity > Number(item.quantity)) return alert('Insufficient stock');
    saleMutation.mutate({ stockItemId: item.id, quantity: BigInt(quantity) });
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[oklch(0.15_0.02_220)] font-heading">Stock Management</h1>
          <p className="text-[oklch(0.5_0.03_200)] text-sm mt-0.5">Manage your pharmaceutical inventory</p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[oklch(0.45_0.15_195)] hover:bg-[oklch(0.4_0.15_195)] text-white font-semibold rounded-lg transition-colors shadow-pharma-sm text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-[oklch(0.45_0.15_195)] text-white shadow-pharma-sm'
                : 'bg-white text-[oklch(0.3_0.03_220)] border border-[oklch(0.88_0.01_200)] hover:bg-[oklch(0.95_0.02_200)]'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
              activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-[oklch(0.92_0.01_200)] text-[oklch(0.4_0.03_220)]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.6_0.03_200)]" />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-[oklch(0.88_0.01_200)] rounded-lg text-[oklch(0.15_0.02_220)] placeholder-[oklch(0.65_0.02_200)] bg-white focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.15_195)] focus:border-transparent text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_200)] shadow-card overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-3 border-[oklch(0.45_0.15_195)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[oklch(0.5_0.03_200)]">
            <Package className="w-12 h-12 mb-3 opacity-30" />
            <p className="font-medium">No items found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[oklch(0.97_0.01_200)] border-b border-[oklch(0.88_0.01_200)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Qty</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[oklch(0.94_0.01_200)]">
                {filtered.map((item) => (
                  <tr key={String(item.id)} className="hover:bg-[oklch(0.98_0.005_200)] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={item.image.getDirectURL()}
                            alt={item.name}
                            className="w-9 h-9 rounded-lg object-cover border border-[oklch(0.88_0.01_200)]"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-[oklch(0.92_0.05_195)] flex items-center justify-center">
                            <Package className="w-4 h-4 text-[oklch(0.45_0.15_195)]" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-[oklch(0.15_0.02_220)] text-sm">{item.name}</p>
                          {item.isTrending && (
                            <span className="inline-flex items-center gap-1 text-xs text-[oklch(0.5_0.15_75)] font-medium">
                              <TrendingUp className="w-3 h-3" /> Trending
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[oklch(0.4_0.03_220)]">{item.category}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${Number(item.quantity) === 0 ? 'text-[oklch(0.5_0.18_25)]' : item.isLowStock ? 'text-[oklch(0.55_0.15_50)]' : 'text-[oklch(0.15_0.02_220)]'}`}>
                        {String(item.quantity)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-[oklch(0.15_0.02_220)]">
                      ₹{Number(item.unitPrice).toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3">
                      {Number(item.quantity) === 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[oklch(0.95_0.05_25)] text-[oklch(0.45_0.18_25)]">
                          Out of Stock
                        </span>
                      ) : item.isLowStock ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[oklch(0.95_0.06_50)] text-[oklch(0.45_0.15_50)]">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[oklch(0.92_0.06_155)] text-[oklch(0.35_0.15_155)]">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleSale(item)}
                          disabled={Number(item.quantity) === 0}
                          title="Record Sale"
                          className="p-1.5 rounded-lg text-[oklch(0.45_0.15_155)] hover:bg-[oklch(0.92_0.06_155)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => trendingMutation.mutate({ id: item.id, isTrending: !item.isTrending })}
                          title={item.isTrending ? 'Remove Trending' : 'Mark Trending'}
                          className={`p-1.5 rounded-lg transition-colors ${item.isTrending ? 'text-[oklch(0.5_0.15_75)] bg-[oklch(0.95_0.06_75)]' : 'text-[oklch(0.6_0.03_200)] hover:bg-[oklch(0.95_0.02_200)]'}`}
                        >
                          <TrendingUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-[oklch(0.45_0.15_230)] hover:bg-[oklch(0.92_0.05_230)] transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-[oklch(0.5_0.18_25)] hover:bg-[oklch(0.95_0.05_25)] transition-colors"
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
      </div>

      {/* Stock Item Form Dialog */}
      <StockItemForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditItem(undefined);
        }}
        editItem={editItem}
      />
    </div>
  );
}
