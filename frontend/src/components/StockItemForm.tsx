import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAddStockItem, useUpdateStockItem } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import type { StockItem } from '../backend';

export interface StockItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editItem?: StockItem | null;
}

const CATEGORIES = [
  'Herbs & Spices',
  'Oils & Ghee',
  'Powders',
  'Tablets & Capsules',
  'Syrups & Tonics',
  'Skin Care',
  'Hair Care',
  'Digestive',
  'Immunity',
  'Other',
];

export default function StockItemForm({ open, onOpenChange, editItem }: StockItemFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('10');
  const [isTrending, setIsTrending] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const addMutation = useAddStockItem();
  const updateMutation = useUpdateStockItem();

  const isEditing = !!editItem;
  const isPending = addMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setCategory(editItem.category);
      setQuantity(editItem.quantity.toString());
      setUnitPrice(editItem.unitPrice.toString());
      setLowStockThreshold(editItem.lowStockThreshold.toString());
      setIsTrending(editItem.isTrending);
      setExpiryDate(
        editItem.expiryDate
          ? new Date(Number(editItem.expiryDate) / 1_000_000).toISOString().split('T')[0]
          : '',
      );
      if (editItem.image) {
        setImagePreview(editItem.image.getDirectURL());
      } else {
        setImagePreview(null);
      }
      setImageFile(null);
    } else {
      setName('');
      setCategory(CATEGORIES[0]);
      setQuantity('');
      setUnitPrice('');
      setLowStockThreshold('10');
      setIsTrending(false);
      setExpiryDate('');
      setImageFile(null);
      setImagePreview(null);
    }
    setUploadProgress(0);
  }, [editItem, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quantity || !unitPrice) return;

    let imageBlob: ExternalBlob | null = null;
    if (imageFile) {
      const buffer = await imageFile.arrayBuffer();
      imageBlob = ExternalBlob.fromBytes(new Uint8Array(buffer)).withUploadProgress(
        (pct) => setUploadProgress(pct),
      );
    } else if (editItem?.image) {
      imageBlob = editItem.image;
    }

    const expiryTimestamp = expiryDate
      ? BigInt(new Date(expiryDate).getTime()) * 1_000_000n
      : null;

    const params = {
      name: name.trim(),
      category,
      quantity: BigInt(quantity),
      unitPrice: BigInt(unitPrice),
      lowStockThreshold: BigInt(lowStockThreshold || '0'),
      image: imageBlob,
      expiryDate: expiryTimestamp,
    };

    if (isEditing && editItem) {
      await updateMutation.mutateAsync({ id: editItem.id, ...params });
    } else {
      await addMutation.mutateAsync(params);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Stock Item' : 'Add Stock Item'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="item-name">Product Name *</Label>
            <Input
              id="item-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ashwagandha Powder"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label htmlFor="item-category">Category</Label>
            <select
              id="item-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="item-qty">Quantity *</Label>
              <Input
                id="item-qty"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="item-price">Unit Price (₹) *</Label>
              <Input
                id="item-price"
                type="number"
                min="0"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Low Stock Threshold */}
          <div className="space-y-1.5">
            <Label htmlFor="item-threshold">Low Stock Threshold</Label>
            <Input
              id="item-threshold"
              type="number"
              min="0"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              placeholder="10"
            />
          </div>

          {/* Expiry Date */}
          <div className="space-y-1.5">
            <Label htmlFor="item-expiry">Expiry Date (optional)</Label>
            <Input
              id="item-expiry"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5">
            <Label htmlFor="item-image">Product Image (optional)</Label>
            <Input
              id="item-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2 rounded-lg overflow-hidden border border-border h-32">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {isPending && uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-1">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </div>

          {/* Trending Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="item-trending"
              checked={isTrending}
              onCheckedChange={(checked) => setIsTrending(!!checked)}
            />
            <Label htmlFor="item-trending" className="cursor-pointer text-amber-600 font-medium">
              Mark as Trending
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? isEditing
                  ? 'Saving...'
                  : 'Adding...'
                : isEditing
                ? 'Save Changes'
                : 'Add Item'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
