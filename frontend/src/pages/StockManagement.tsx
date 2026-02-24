import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Star,
  StarOff,
  Edit2,
  Trash2,
  ShoppingCart,
  AlertTriangle,
  Package,
  Loader2,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  useGetAllStockItems,
  useDeleteStockItem,
  useMarkTrendingStockItem,
  useAddSale,
} from '../hooks/useQueries';
import StockItemForm from '../components/StockItemForm';
import type { StockItem } from '../backend';

function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function StockManagement() {
  const { data: stockItems, isLoading } = useGetAllStockItems();
  const deleteItem = useDeleteStockItem();
  const markTrending = useMarkTrendingStockItem();
  const addSale = useAddSale();

  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editItem, setEditItem] = useState<StockItem | null>(null);
  const [saleItem, setSaleItem] = useState<StockItem | null>(null);
  const [saleQty, setSaleQty] = useState('1');
  const [deleteConfirm, setDeleteConfirm] = useState<StockItem | null>(null);

  const filtered = useMemo(() => {
    if (!stockItems) return [];
    const q = search.toLowerCase();
    return stockItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [stockItems, search]);

  const handleDelete = async (item: StockItem) => {
    await deleteItem.mutateAsync(item.id);
    setDeleteConfirm(null);
  };

  const handleToggleTrending = async (item: StockItem) => {
    await markTrending.mutateAsync({ id: item.id, isTrending: !item.isTrending });
  };

  const handleSale = async () => {
    if (!saleItem) return;
    const qty = parseInt(saleQty);
    if (isNaN(qty) || qty <= 0) return;
    await addSale.mutateAsync({ stockItemId: saleItem.id, quantity: BigInt(qty) });
    setSaleItem(null);
    setSaleQty('1');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 animate-fade-in-up">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Stock Management
          </h1>
          <p className="text-muted-foreground font-semibold mt-1">
            Manage your inventory — {stockItems?.length ?? 0} items
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="btn-transition bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-green h-11 px-5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Stock Item
        </Button>
      </div>

      {/* Search */}
      <div
        className="relative mb-5 animate-fade-in-up"
        style={{ animationDelay: '100ms' }}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or category..."
          className="pl-9 h-11 bg-card border-border rounded-xl font-medium focus:border-primary"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Table */}
      <div
        className="bg-card border border-border rounded-2xl overflow-hidden shadow-card animate-fade-in-up"
        style={{ animationDelay: '200ms' }}
      >
        {isLoading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
            <p className="text-muted-foreground font-semibold">
              Loading stock items...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground font-semibold">
              {search
                ? 'No items match your search'
                : 'No stock items yet'}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30 border-border">
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                  Product
                </TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                  Category
                </TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">
                  Qty
                </TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">
                  Unit Price
                </TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">
                  Threshold
                </TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-center">
                  Status
                </TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-center">
                  Trending
                </TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow
                  key={item.id.toString()}
                  className="table-row-hover border-border"
                >
                  <TableCell className="font-bold text-foreground">
                    {item.name}
                  </TableCell>
                  <TableCell>
                    <span className="badge-green px-2 py-0.5 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right metric-value font-extrabold text-foreground">
                    {item.quantity.toString()}
                  </TableCell>
                  <TableCell className="text-right metric-value font-extrabold text-accent">
                    {formatINR(Number(item.unitPrice))}
                  </TableCell>
                  <TableCell className="text-right font-bold text-muted-foreground">
                    {item.lowStockThreshold.toString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.isLowStock ? (
                      <span className="badge-red px-2 py-0.5 rounded-full text-xs flex items-center gap-1 justify-center w-fit mx-auto">
                        <AlertTriangle className="w-3 h-3" />
                        Low
                      </span>
                    ) : (
                      <span className="badge-green px-2 py-0.5 rounded-full text-xs w-fit mx-auto block text-center">
                        OK
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      onClick={() => handleToggleTrending(item)}
                      disabled={markTrending.isPending}
                      className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
                        item.isTrending
                          ? 'text-accent bg-accent/10 hover:bg-accent/20'
                          : 'text-muted-foreground hover:text-accent hover:bg-accent/10'
                      }`}
                      title={
                        item.isTrending
                          ? 'Remove from trending'
                          : 'Mark as trending'
                      }
                    >
                      {item.isTrending ? (
                        <Star className="w-4 h-4 fill-current" />
                      ) : (
                        <StarOff className="w-4 h-4" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSaleItem(item)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 hover:scale-110"
                        title="Record Sale"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditItem(item)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200 hover:scale-110"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(item)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-110"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editItem) && (
        <StockItemForm
          item={editItem ?? undefined}
          onClose={() => {
            setShowAddForm(false);
            setEditItem(null);
          }}
        />
      )}

      {/* Sale Dialog */}
      <Dialog open={!!saleItem} onOpenChange={(open) => !open && setSaleItem(null)}>
        <DialogContent className="bg-card border-border rounded-2xl animate-scale-in">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-xl text-foreground">
              Record Sale — {saleItem?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label className="font-bold text-sm text-foreground mb-1.5 block">
                Quantity to Sell
              </Label>
              <Input
                type="number"
                min="1"
                max={saleItem ? Number(saleItem.quantity) : undefined}
                value={saleQty}
                onChange={(e) => setSaleQty(e.target.value)}
                className="h-11 bg-muted/50 border-border rounded-xl font-medium focus:border-primary"
              />
            </div>
            {saleItem && (
              <div className="bg-muted/30 rounded-xl p-3 border border-border">
                <p className="text-sm font-semibold text-muted-foreground">
                  Available:{' '}
                  <span className="font-extrabold text-foreground metric-value">
                    {saleItem.quantity.toString()}
                  </span>
                </p>
                <p className="text-sm font-semibold text-muted-foreground mt-1">
                  Total:{' '}
                  <span className="font-extrabold text-accent metric-value">
                    {formatINR(
                      Number(saleItem.unitPrice) * (parseInt(saleQty) || 0)
                    )}
                  </span>
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setSaleItem(null)}
              className="font-bold border-border rounded-xl hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSale}
              disabled={
                addSale.isPending || !saleQty || parseInt(saleQty) <= 0
              }
              className="btn-transition bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-green"
            >
              {addSale.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Recording...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" /> Record Sale
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
      >
        <DialogContent className="bg-card border-border rounded-2xl animate-scale-in">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-xl text-foreground">
              Delete Item
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground font-medium py-2">
            Are you sure you want to delete{' '}
            <span className="font-bold text-foreground">
              "{deleteConfirm?.name}"
            </span>
            ? This action cannot be undone.
          </p>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              className="font-bold border-border rounded-xl hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={deleteItem.isPending}
              variant="destructive"
              className="font-bold rounded-xl btn-transition"
            >
              {deleteItem.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
