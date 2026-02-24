import { useGetAdminDashboard, useGetAllProducts } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Package, AlertTriangle, MessageSquare, TrendingUp, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const { data: dashboard, isLoading } = useGetAdminDashboard();
  const { data: allProducts } = useGetAllProducts();

  const lowStockProducts = allProducts?.filter((p) => Number(p.quantity) > 0 && Number(p.quantity) < 5) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-sage-700" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-earth-900 mb-2">Dashboard</h1>
        <p className="text-earth-600">Overview of your store's performance</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-sage-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-earth-600">Today's Income</CardTitle>
            <IndianRupee className="h-4 w-4 text-sage-700" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-earth-900">₹{Number(dashboard?.todaysIncome || 0)}</div>
            <p className="text-xs text-earth-500 mt-1">Revenue from today's sales</p>
          </CardContent>
        </Card>

        <Card className="border-sage-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-earth-600">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-sage-700" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-earth-900">₹{Number(dashboard?.monthlyIncome || 0)}</div>
            <p className="text-xs text-earth-500 mt-1">Revenue this month</p>
          </CardContent>
        </Card>

        <Card className="border-sage-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-earth-600">Total Income</CardTitle>
            <IndianRupee className="h-4 w-4 text-sage-700" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-earth-900">₹{Number(dashboard?.totalIncome || 0)}</div>
            <p className="text-xs text-earth-500 mt-1">All-time revenue</p>
          </CardContent>
        </Card>

        <Card className="border-sage-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-earth-600">Total Products</CardTitle>
            <Package className="h-4 w-4 text-sage-700" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-earth-900">{Number(dashboard?.totalProducts || 0)}</div>
            <p className="text-xs text-earth-500 mt-1">Products in inventory</p>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-earth-600">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{Number(dashboard?.outOfStockProducts || 0)}</div>
            <p className="text-xs text-earth-500 mt-1">Products need restocking</p>
          </CardContent>
        </Card>

        <Card className="border-sage-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-earth-600">Total Enquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-sage-700" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-earth-900">{Number(dashboard?.totalEnquiries || 0)}</div>
            <p className="text-xs text-earth-500 mt-1">Customer enquiries received</p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription>
            <div className="font-semibold text-amber-900 mb-2">Low Stock Alert</div>
            <div className="space-y-2">
              {lowStockProducts.map((product) => (
                <div key={Number(product.id)} className="flex items-center justify-between">
                  <span className="text-sm text-amber-800">{product.name}</span>
                  <Badge variant="outline" className="border-amber-400 text-amber-700">
                    {Number(product.quantity)} left
                  </Badge>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
