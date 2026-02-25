import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, X } from 'lucide-react';
import { useAddStockItem, useUpdateStockItem } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import type { StockItem } from '../backend';

export interface StockItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editItem?: StockItem | null;
  trialExpired?: boolean;
}

export default function StockItemForm({ open, onOpenChange, editItem, trialExpired = false }: StockItemFormProps) {
  const addMutation = useAddStockItem();
  const updateMutation = useUpdateStockItem();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('5');
  const [expiryDate, setExpiryDate] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');

  const isEditing = !!editItem;
  const isPending = addMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (open) {
      if (editItem) {
        setName(editItem.name);
        setCategory(editItem.category);
        setQuantity(String(editItem.quantity));
        setUnitPrice(String(editItem.unitPrice));
        setLowStockThreshold(String(editItem.lowStockThreshold));
        if (editItem.expiryDate) {
          const ms = Number(editItem.expiryDate) / 1_000_000;
          const d = new Date(ms);
          setExpiryDate(d.toISOString().split('T')[0]);
        } else {
          setExpiryDate('');
        }
        if (editItem.image) {
          setImagePreview(editItem.image.getDirectURL());
        } else {
          setImagePreview(null);
        }
        setImageFile(null);
      } else {
        setName('');
        setCategory('');
        setQuantity('');
        setUnitPrice('');
        setLowStockThreshold('5');
        setExpiryDate('');
        setImageFile(null);
        setImagePreview(null);
      }
      setError('');
    }
  }, [open, editItem]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (trialExpired) {
      setError('Your trial has expired. Please contact support to continue.');
      return;
    }

    if (!name.trim() || !category.trim() || !quantity || !unitPrice) {
      setError('Please fill in all required fields.');
      return;
    }

    const qty = parseInt(quantity, 10);
    const price = parseInt(unitPrice, 10);
    const threshold = parseInt(lowStockThreshold, 10) || 5;

    if (isNaN(qty) || qty < 0) {
      setError('Quantity must be a valid non-negative number.');
      return;
    }
    if (isNaN(price) || price < 0) {
      setError('Unit price must be a valid non-negative number.');
      return;
    }

    let imageBlob: ExternalBlob | null = null;
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      imageBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
    } else if (editItem?.image && !imageFile && imagePreview) {
      imageBlob = editItem.image;
    }

    let expiryDateNanos: bigint | null = null;
    if (expiryDate) {
      const ms = new Date(expiryDate).getTime();
      expiryDateNanos = BigInt(ms) * 1_000_000n;
    }

    try {
      if (isEditing && editItem) {
        await updateMutation.mutateAsync({
          id: editItem.id,
          name: name.trim(),
          category: category.trim(),
          quantity: BigInt(qty),
          unitPrice: BigInt(price),
          lowStockThreshold: BigInt(threshold),
          image: imageBlob,
          expiryDate: expiryDateNanos,
        });
      } else {
        await addMutation.mutateAsync({
          name: name.trim(),
          category: category.trim(),
          quantity: BigInt(qty),
          unitPrice: BigInt(price),
          lowStockThreshold: BigInt(threshold),
          image: imageBlob,
          expiryDate: expiryDateNanos,
        });
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(msg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? 'Edit Stock Item' : 'Add New Stock Item'}
          </DialogTitle>
        </DialogHeader>

        {trialExpired && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive">
            Your 7-day trial has expired. All admin actions are disabled.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="item-name">Name *</Label>
            <Input
              id="item-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ashwagandha Powder"
              disabled={isPending || trialExpired}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="item-category">Category *</Label>
            <Input
              id="item-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Herbs & Powders"
              disabled={isPending || trialExpired}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="item-quantity">Quantity *</Label>
              <Input
                id="item-quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                disabled={isPending || trialExpired}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="item-price">Unit Price (₹) *</Label>
              <Input
                id="item-price"
                type="number"
                min="0"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="0"
                disabled={isPending || trialExpired}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="item-threshold">Low Stock Threshold</Label>
            <Input
              id="item-threshold"
              type="number"
              min="0"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              placeholder="5"
              disabled={isPending || trialExpired}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="item-expiry">Expiry Date</Label>
            <Input
              id="item-expiry"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              disabled={isPending || trialExpired}
            />
          </div>

          <div className="space-y-1">
            <Label>Product Image</Label>
            {imagePreview ? (
              <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isPending || trialExpired}
                  className="absolute top-2 right-2 bg-background/80 rounded-full p-1 hover:bg-background transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${trialExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isPending || trialExpired}
                />
              </label>
            )}
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || trialExpired}>
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEditing ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                isEditing ? 'Update Item' : 'Add Item'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
