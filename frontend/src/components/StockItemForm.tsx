import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload, X } from 'lucide-react';
import { useAddStockItem, useUpdateStockItem } from '../hooks/useQueries';
import { StockItem, ExternalBlob } from '../backend';

export interface StockItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editItem?: StockItem | null;
}

const CATEGORIES = [
  'Herbs & Botanicals',
  'Oils & Ghee',
  'Powders & Churnas',
  'Tablets & Capsules',
  'Syrups & Tonics',
  'Skin Care',
  'Hair Care',
  'Digestive Health',
  'Immunity Boosters',
  'Other',
];

export default function StockItemForm({ open, onOpenChange, editItem }: StockItemFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('10');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<ExternalBlob | null>(null);
  const [expiryDate, setExpiryDate] = useState('');

  const addItem = useAddStockItem();
  const updateItem = useUpdateStockItem();

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setCategory(editItem.category);
      setQuantity(editItem.quantity.toString());
      setUnitPrice(editItem.unitPrice.toString());
      setLowStockThreshold(editItem.lowStockThreshold.toString());
      setExistingImage(editItem.image ?? null);
      setImageFile(null);
      setImagePreview(null);
      if (editItem.expiryDate) {
        const date = new Date(Number(editItem.expiryDate) / 1_000_000);
        setExpiryDate(date.toISOString().split('T')[0]);
      } else {
        setExpiryDate('');
      }
    } else {
      setName('');
      setCategory('');
      setQuantity('');
      setUnitPrice('');
      setLowStockThreshold('10');
      setImageFile(null);
      setImagePreview(null);
      setExistingImage(null);
      setExpiryDate('');
    }
  }, [editItem, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setExistingImage(null);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setExistingImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !quantity || !unitPrice) return;

    let imageBlob: ExternalBlob | null = existingImage;
    if (imageFile) {
      const bytes = new Uint8Array(await imageFile.arrayBuffer());
      imageBlob = ExternalBlob.fromBytes(bytes);
    }

    const expiryTimestamp = expiryDate
      ? BigInt(new Date(expiryDate).getTime()) * 1_000_000n
      : null;

    if (editItem) {
      await updateItem.mutateAsync({
        id: editItem.id,
        name,
        category,
        quantity: BigInt(quantity),
        unitPrice: BigInt(unitPrice),
        lowStockThreshold: BigInt(lowStockThreshold),
        image: imageBlob,
        expiryDate: expiryTimestamp,
      });
    } else {
      await addItem.mutateAsync({
        name,
        category,
        quantity: BigInt(quantity),
        unitPrice: BigInt(unitPrice),
        lowStockThreshold: BigInt(lowStockThreshold),
        image: imageBlob,
        expiryDate: expiryTimestamp,
      });
    }

    onOpenChange(false);
  };

  const isPending = addItem.isPending || updateItem.isPending;
  const currentImageUrl = imagePreview || (existingImage ? existingImage.getDirectURL() : null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-forest-800 font-display">
            {editItem ? 'Edit Stock Item' : 'Add New Stock Item'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Ashwagandha Powder"
                required
              />
            </div>

            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="unitPrice">Unit Price (₹) *</Label>
              <Input
                id="unitPrice"
                type="number"
                min="0"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lowStockThreshold">Low Stock Alert</Label>
              <Input
                id="lowStockThreshold"
                type="number"
                min="0"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(e.target.value)}
                placeholder="10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5">
            <Label>Product Image</Label>
            {currentImageUrl ? (
              <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                <img src={currentImageUrl} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-forest-400 hover:bg-forest-50 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload image</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !name || !category || !quantity || !unitPrice}
              className="flex-1 bg-gradient-to-r from-forest-600 to-sage-600 hover:from-forest-700 hover:to-sage-700 text-white"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {editItem ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                editItem ? 'Update Item' : 'Add Item'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
