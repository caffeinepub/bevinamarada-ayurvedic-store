import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Package, Save } from 'lucide-react';
import { useAddStockItem, useUpdateStockItem } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import type { StockItem } from '../backend';

export interface StockItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editItem?: StockItem;
}

const categories = [
  'Tablets', 'Capsules', 'Syrups', 'Injections', 'Topical',
  'Vitamins', 'Supplements', 'Ayurvedic', 'Homeopathic', 'Other'
];

export default function StockItemForm({ open, onOpenChange, editItem }: StockItemFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Tablets');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('10');
  const [expiryDate, setExpiryDate] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addMutation = useAddStockItem();
  const updateMutation = useUpdateStockItem();

  useEffect(() => {
    if (open) {
      if (editItem) {
        setName(editItem.name);
        setCategory(editItem.category);
        setQuantity(String(editItem.quantity));
        setUnitPrice(String(editItem.unitPrice));
        setLowStockThreshold(String(editItem.lowStockThreshold));
        setExpiryDate(
          editItem.expiryDate
            ? new Date(Number(editItem.expiryDate) / 1_000_000).toISOString().split('T')[0]
            : ''
        );
        setImagePreview(editItem.image ? editItem.image.getDirectURL() : null);
      } else {
        setName('');
        setCategory('Tablets');
        setQuantity('');
        setUnitPrice('');
        setLowStockThreshold('10');
        setExpiryDate('');
        setImagePreview(null);
      }
      setImageFile(null);
      setUploadProgress(0);
    }
  }, [open, editItem]);

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
    if (!name.trim()) return alert('Product name is required');

    let imageBlob: ExternalBlob | null = null;
    if (imageFile) {
      const bytes = new Uint8Array(await imageFile.arrayBuffer());
      imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => setUploadProgress(pct));
    } else if (editItem?.image) {
      imageBlob = editItem.image;
    }

    const expiryTimestamp = expiryDate
      ? BigInt(new Date(expiryDate).getTime()) * 1_000_000n
      : null;

    if (editItem) {
      await updateMutation.mutateAsync({
        id: editItem.id,
        name: name.trim(),
        category,
        quantity: BigInt(quantity || '0'),
        unitPrice: BigInt(unitPrice || '0'),
        lowStockThreshold: BigInt(lowStockThreshold || '10'),
        image: imageBlob,
        expiryDate: expiryTimestamp,
      });
    } else {
      await addMutation.mutateAsync({
        name: name.trim(),
        category,
        quantity: BigInt(quantity || '0'),
        unitPrice: BigInt(unitPrice || '0'),
        lowStockThreshold: BigInt(lowStockThreshold || '10'),
        image: imageBlob,
        expiryDate: expiryTimestamp,
      });
    }
    onOpenChange(false);
  };

  const isLoading = addMutation.isPending || updateMutation.isPending;

  const inputClass = "w-full px-3 py-2.5 border border-[oklch(0.88_0.01_200)] rounded-lg text-[oklch(0.15_0.02_220)] placeholder-[oklch(0.65_0.02_200)] bg-white focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.15_195)] focus:border-transparent text-sm";
  const labelClass = "block text-sm font-medium text-[oklch(0.25_0.03_220)] mb-1.5";

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={() => !isLoading && onOpenChange(false)} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-modal border border-[oklch(0.88_0.01_200)] w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.92_0.01_200)] sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.92_0.05_195)] flex items-center justify-center">
              <Package className="w-4 h-4 text-[oklch(0.45_0.15_195)]" />
            </div>
            <h2 className="text-lg font-bold text-[oklch(0.15_0.02_220)] font-heading">
              {editItem ? 'Edit Stock Item' : 'Add New Item'}
            </h2>
          </div>
          <button
            onClick={() => !isLoading && onOpenChange(false)}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-[oklch(0.95_0.02_200)] text-[oklch(0.4_0.03_220)] transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Image Upload */}
          <div>
            <label className={labelClass}>Product Image</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[oklch(0.88_0.01_200)] rounded-xl p-4 text-center cursor-pointer hover:border-[oklch(0.45_0.15_195)] hover:bg-[oklch(0.97_0.01_200)] transition-all"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg mx-auto" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[oklch(0.5_0.03_200)]">
                  <Upload className="w-8 h-8 opacity-50" />
                  <p className="text-sm">Click to upload image</p>
                  <p className="text-xs opacity-60">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-2">
                <div className="h-1.5 bg-[oklch(0.92_0.01_200)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[oklch(0.45_0.15_195)] rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-[oklch(0.5_0.03_200)] mt-1">{uploadProgress}% uploaded</p>
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <label className={labelClass}>Product Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Paracetamol 500mg"
              required
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                min="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Unit Price (₹)</label>
              <input
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="0"
                min="0"
                className={inputClass}
              />
            </div>
          </div>

          {/* Low Stock Threshold */}
          <div>
            <label className={labelClass}>Low Stock Threshold</label>
            <input
              type="number"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              placeholder="10"
              min="0"
              className={inputClass}
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className={labelClass}>Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => !isLoading && onOpenChange(false)}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 border border-[oklch(0.88_0.01_200)] text-[oklch(0.3_0.03_220)] font-medium rounded-lg hover:bg-[oklch(0.95_0.02_200)] transition-colors text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-[oklch(0.45_0.15_195)] hover:bg-[oklch(0.4_0.15_195)] text-white font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {uploadProgress > 0 ? `Uploading ${uploadProgress}%` : 'Saving...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {editItem ? 'Save Changes' : 'Add Item'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
