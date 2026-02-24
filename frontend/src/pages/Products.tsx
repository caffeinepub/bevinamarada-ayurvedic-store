import { useGetProducts } from '../hooks/useQueries';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Package } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function Products() {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-sage-700 mx-auto mb-4" />
        <p className="text-earth-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-earth-900 mb-4">Our Products</h1>
        <p className="text-lg text-earth-600 max-w-2xl mx-auto">
          Discover our range of authentic Ayurvedic medicines and wellness products
        </p>
      </div>

      {products && products.length === 0 ? (
        <div className="text-center py-16">
          <Package className="h-16 w-16 text-earth-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-earth-700 mb-2">No Products Available</h3>
          <p className="text-earth-600 mb-6">Check back soon for new products!</p>
          <Link to="/contact">
            <Button className="bg-sage-700 hover:bg-sage-800">Contact Us for Enquiries</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <Card key={Number(product.id)} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-sage-50 flex items-center justify-center p-4">
                <img
                  src={product.imageUrl || '/assets/generated/medicine-bottle.dim_400x400.png'}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-lg text-earth-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-2xl font-bold text-sage-700 mb-3">₹{Number(product.price)}</p>
                <Badge
                  variant={product.inStock ? 'default' : 'destructive'}
                  className={product.inStock ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                </Badge>
              </CardContent>
              <CardFooter>
                <Link to="/contact" className="w-full">
                  <Button className="w-full bg-sage-700 hover:bg-sage-800" disabled={!product.inStock}>
                    Enquire Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
