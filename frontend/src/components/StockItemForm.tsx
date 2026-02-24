import React, { useState, useRef } from 'react';
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
import { Loader2, Upload, X, ImageIcon } from 'lucide-react';
import { useAddStockItem, useUpdateStockItem } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import type { StockItem } from '../backend';

interface StockItemFormProps {
  item?: StockItem;
  onClose: () => void;
}

export default function StockItemForm({ item, onClose }: StockItemFormProps) {
  const [name, setName] = useState(item?.name ?? '');
  const [category, setCategory] = useState(item?.category ?? '');
  const [quantity, setQuantity] = useState(item ? item.quantity.toString() : '');
  const [unitPrice, setUnitPrice] = useState(item ? item.unitPrice.toString() : '');
  const [lowStockThreshold, setLowStockThreshold] = useState(item ? item.lowStockThreshold.toString() : '10');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    item?.image ? item.image.getDirectURL() : null
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addItem = useAddStockItem();
  const updateItem = useUpdateStockItem();
  const isPending = addItem.isPending || updateItem.isPending;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !category.trim() || !quantity || !unitPrice) return;

    let imageBlob: ExternalBlob | null = null;
    if (imageFile) {
      const bytes = new Uint8Array(await imageFile.arrayBuffer());
      imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => setUploadProgress(pct));
    } else if (item?.image) {
      imageBlob = item.image;
    }

    const params = {
      name: name.trim(),
      category: category.trim(),
      quantity: BigInt(parseInt(quantity)),
      unitPrice: BigInt(parseInt(unitPrice)),
      lowStockThreshold: BigInt(parseInt(lowStockThreshold) || 10),
      image: imageBlob,
    };

    if (item) {
      await updateItem.mutateAsync({ id: item.id, ...params });
    } else {
      await addItem.mutateAsync(params);
    }
    onClose();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card border-border rounded-2xl max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-xl text-foreground">
            {item ? 'Edit Stock Item' : 'Add New Stock Item'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Image Upload */}
          <div>
            <Label className="font-bold text-sm text-foreground mb-1.5 block">Product Image (Optional)</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative h-32 bg-muted/30 border-2 border-dashed border-border rounded-xl flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 overflow-hidden"
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }}
                    className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-8 h-8 text-muted-foreground/40 mx-auto mb-1" />
                  <p className="text-muted-foreground text-xs font-semibold">Click to upload image</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-2">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground font-medium mt-1">Uploading... {uploadProgress}%</p>
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <Label className="font-bold text-sm text-foreground mb-1.5 block">Product Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Ashwagandha Powder"
              className="h-11 bg-muted/50 border-border rounded-xl font-medium focus:border-primary"
            />
          </div>

          {/* Category */}
          <div>
            <Label className="font-bold text-sm text-foreground mb-1.5 block">Category *</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Herbs, Oils, Supplements"
              className="h-11 bg-muted/50 border-border rounded-xl font-medium focus:border-primary"
            />
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="font-bold text-sm text-foreground mb-1.5 block">Quantity *</Label>
              <Input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="h-11 bg-muted/50 border-border rounded-xl font-medium focus:border-primary"
              />
            </div>
            <div>
              <Label className="font-bold text-sm text-foreground mb-1.5 block">Unit Price (₹) *</Label>
              <Input
                type="number"
                min="0"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="0"
                className="h-11 bg-muted/50 border-border rounded-xl font-medium focus:border-primary"
              />
            </div>
          </div>

          {/* Low Stock Threshold */}
          <div>
            <Label className="font-bold text-sm text-foreground mb-1.5 block">Low Stock Threshold</Label>
            <Input
              type="number"
              min="0"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              placeholder="10"
              className="h-11 bg-muted/50 border-border rounded-xl font-medium focus:border-primary"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="font-bold border-border rounded-xl hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !name.trim() || !category.trim() || !quantity || !unitPrice}
            className="btn-transition bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-green"
          >
            {isPending ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {item ? 'Updating...' : 'Adding...'}</>
            ) : (
              item ? 'Update Item' : 'Add Item'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
