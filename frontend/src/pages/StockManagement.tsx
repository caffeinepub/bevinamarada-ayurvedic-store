import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Filter,
  Calendar,
} from 'lucide-react';
import {
  useGetAllStockItems,
  useGetLowStockItems,
  useGetExpiringStockItems,
  useGetExpiredStockItems,
  useDeleteStockItem,
  useMarkTrending,
  useAddSale,
} from '../hooks/useQueries';
import StockItemForm from '../components/StockItemForm';
import { Skeleton } from '@/components/ui/skeleton';
import type { StockItem } from '../backend';

const formatINR = (amount: bigint | number) => {
  const num = typeof amount === 'bigint' ? Number(amount) : amount;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
};

type FilterTab = 'all' | 'low' | 'out' | 'expiring' | 'expired';

export default function StockManagement() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState<StockItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [saleItem, setSaleItem] = useState<StockItem | null>(null);
  const [saleQty, setSaleQty] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<StockItem | null>(null);

  const { data: allItems = [], isLoading } = useGetAllStockItems();
  const { data: lowItems = [] } = useGetLowStockItems();
  const { data: expiringItems = [] } = useGetExpiringStockItems();
  const { data: expiredItems = [] } = useGetExpiredStockItems();

  const deleteMutation = useDeleteStockItem();
  const markTrendingMutation = useMarkTrending();
  const addSaleMutation = useAddSale();

  const outOfStockItems = allItems.filter((i) => Number(i.quantity) === 0);

  const getFilteredItems = (): StockItem[] => {
    let items: StockItem[] = [];
    switch (activeFilter) {
      case 'all': items = allItems; break;
      case 'low': items = lowItems; break;
      case 'out': items = outOfStockItems; break;
      case 'expiring': items = expiringItems; break;
      case 'expired': items = expiredItems; break;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    }
    return items;
  };

  const filteredItems = getFilteredItems();

  const filterTabs = [
    { id: 'all' as FilterTab, label: 'All', count: allItems.length, color: 'text-saffron bg-saffron-light' },
    { id: 'low' as FilterTab, label: 'Low Stock', count: lowItems.length, color: 'text-gold bg-gold-light' },
    { id: 'out' as FilterTab, label: 'Out of Stock', count: outOfStockItems.length, color: 'text-coral bg-coral-light' },
    { id: 'expiring' as FilterTab, label: 'Expiring', count: expiringItems.length, color: 'text-teal bg-teal-light' },
    { id: 'expired' as FilterTab, label: 'Expired', count: expiredItems.length, color: 'text-destructive bg-destructive/10' },
  ];

  const getExpiryStatus = (item: StockItem) => {
    if (!item.expiryDate) return null;
    const nowMs = Date.now();
    const expiryMs = Number(item.expiryDate) / 1_000_000;
    if (expiryMs <= nowMs) return { label: 'Expired', cls: 'badge-coral' };
    const days = Math.floor((expiryMs - nowMs) / (24 * 60 * 60 * 1000));
    if (days <= 30) return { label: `${days}d left`, cls: 'badge-gold' };
    return { label: new Date(expiryMs).toLocaleDateString('en-IN'), cls: 'badge-teal' };
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    await deleteMutation.mutateAsync(deleteConfirm.id);
    setDeleteConfirm(null);
  };

  const handleSale = async () => {
    if (!saleItem) return;
    await addSaleMutation.mutateAsync({ stockItemId: saleItem.id, quantity: BigInt(saleQty) });
    setSaleItem(null);
    setSaleQty(1);
  };

  const handleOpenAdd = () => {
    setEditItem(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (item: StockItem) => {
    setEditItem(item);
    setFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    if (!open) setEditItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center shadow-teal">
              <Package size={20} className="text-white" />
            </div>
            Stock Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage your inventory and products</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-saffron text-white font-semibold shadow-saffron hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 border ${
              activeFilter === tab.id
                ? `${tab.color} border-current shadow-sm`
                : 'bg-card text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            <Filter size={13} />
            {tab.label}
            <span className="text-xs px-1.5 py-0.5 rounded-full font-bold bg-black/10">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron transition-colors"
        />
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <Package size={48} className="mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground font-medium">No products found</p>
              <p className="text-muted-foreground/60 text-sm mt-1">
                {search ? 'Try a different search term' : 'Add your first product to get started'}
              </p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Expiry</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const expiry = getExpiryStatus(item);
                  return (
                    <tr key={String(item.id)}>
                      <td>
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <img
                              src={item.image.getDirectURL()}
                              alt={item.name}
                              className="w-9 h-9 rounded-lg object-cover border border-border"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-lg gradient-saffron flex items-center justify-center">
                              <Package size={14} className="text-white" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-foreground text-sm">{item.name}</p>
                            {item.isTrending && (
                              <span className="badge-gold text-xs">
                                <TrendingUp size={10} /> Trending
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge-teal">{item.category}</span>
                      </td>
                      <td className="font-semibold text-teal">{formatINR(item.unitPrice)}</td>
                      <td>
                        <span
                          className={
                            Number(item.quantity) === 0
                              ? 'badge-coral'
                              : item.isLowStock
                              ? 'badge-gold'
                              : 'badge-success'
                          }
                        >
                          {Number(item.quantity)} units
                        </span>
                      </td>
                      <td>
                        {expiry ? (
                          <span className={expiry.cls}>
                            <Calendar size={11} />
                            {expiry.label}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {item.isLowStock && Number(item.quantity) > 0 && (
                            <span className="badge-gold">
                              <AlertTriangle size={10} /> Low
                            </span>
                          )}
                          {Number(item.quantity) === 0 && (
                            <span className="badge-coral">Out</span>
                          )}
                          {!item.isLowStock && Number(item.quantity) > 0 && (
                            <span className="badge-success">In Stock</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSaleItem(item)}
                            disabled={Number(item.quantity) === 0}
                            className="p-1.5 rounded-lg bg-teal-light text-teal hover:bg-teal hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Record Sale"
                          >
                            <ShoppingCart size={14} />
                          </button>
                          <button
                            onClick={() => markTrendingMutation.mutate({ id: item.id, isTrending: !item.isTrending })}
                            className={`p-1.5 rounded-lg transition-colors ${
                              item.isTrending
                                ? 'bg-gold text-white hover:opacity-80'
                                : 'bg-gold-light text-gold hover:bg-gold hover:text-white'
                            }`}
                            title={item.isTrending ? 'Remove Trending' : 'Mark Trending'}
                          >
                            <TrendingUp size={14} />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg bg-saffron-light text-saffron hover:bg-saffron hover:text-white transition-colors"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(item)}
                            className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add/Edit Form — uses the existing StockItemForm with open/onOpenChange/editItem props */}
      <StockItemForm
        open={formOpen}
        onOpenChange={handleFormClose}
        editItem={editItem}
      />

      {/* Sale Modal */}
      {saleItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-card-hover w-full max-w-sm p-6 animate-scale-in">
            <h3 className="text-xl font-bold text-foreground mb-1">Record Sale</h3>
            <p className="text-muted-foreground text-sm mb-5">{saleItem.name}</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={Number(saleItem.quantity)}
                  value={saleQty}
                  onChange={(e) => setSaleQty(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
                <p className="text-xs text-muted-foreground mt-1">Available: {Number(saleItem.quantity)}</p>
              </div>
              <div className="bg-teal-light rounded-xl p-3">
                <p className="text-sm text-teal font-semibold">
                  Total: {formatINR(Number(saleItem.unitPrice) * saleQty)}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setSaleItem(null); setSaleQty(1); }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border text-foreground hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSale}
                disabled={addSaleMutation.isPending || saleQty < 1 || saleQty > Number(saleItem.quantity)}
                className="flex-1 px-4 py-2.5 rounded-xl gradient-teal text-white font-semibold shadow-teal hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {addSaleMutation.isPending ? 'Recording...' : 'Confirm Sale'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-card-hover w-full max-w-sm p-6 animate-scale-in">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
              <Trash2 size={22} className="text-destructive" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1">Delete Product</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border text-foreground hover:bg-muted transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="flex-1 px-4 py-2.5 rounded-xl bg-destructive text-white font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-50"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
