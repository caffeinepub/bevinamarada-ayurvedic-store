import { ShoppingBag, Leaf } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Products() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Leaf className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Our Products</h1>
          <p className="text-sm text-muted-foreground">Authentic Ayurvedic medicines and wellness products</p>
        </div>
      </div>

      <div className="text-center py-20 text-muted-foreground">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
        <p className="text-lg font-medium">Product catalog coming soon</p>
        <p className="text-sm mt-2">
          Please{' '}
          <Link to="/contact" className="text-primary hover:underline">
            contact us
          </Link>{' '}
          to enquire about our products.
        </p>
      </div>
    </div>
  );
}
