import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddProduct, useEditProduct } from '../hooks/useQueries';
import { useState, useEffect } from 'react';
import { ProductCategory } from '../backend';
import type { Product } from '../backend';
import { Loader2 } from 'lucide-react';

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSuccess: () => void;
}

const categories = [
  ProductCategory.electronics,
  ProductCategory.clothing,
  ProductCategory.food,
  ProductCategory.furniture,
  ProductCategory.toys,
];

export default function ProductForm({ open, onOpenChange, product, onSuccess }: ProductFormProps) {
  const addProduct = useAddProduct();
  const editProduct = useEditProduct();

  const [formData, setFormData] = useState({
    name: '',
    category: ProductCategory.food,
    price: '',
    quantity: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: Number(product.price).toString(),
        quantity: Number(product.quantity).toString(),
        imageUrl: product.imageUrl || '',
      });
    } else {
      setFormData({
        name: '',
        category: ProductCategory.food,
        price: '',
        quantity: '',
        imageUrl: '',
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      category: formData.category,
      price: BigInt(formData.price),
      quantity: BigInt(formData.quantity),
      imageUrl: formData.imageUrl || null,
    };

    if (product) {
      editProduct.mutate(
        { id: product.id, ...data },
        {
          onSuccess: () => {
            onSuccess();
          },
        }
      );
    } else {
      addProduct.mutate(data, {
        onSuccess: () => {
          onSuccess();
        },
      });
    }
  };

  const isLoading = addProduct.isPending || editProduct.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as ProductCategory })}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Price (₹) *</Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Enter price"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="Enter quantity"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="mt-1"
            />
            <p className="text-xs text-earth-500 mt-1">Leave empty to use default image</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-sage-700 hover:bg-sage-800">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : product ? (
                'Update Product'
              ) : (
                'Add Product'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
