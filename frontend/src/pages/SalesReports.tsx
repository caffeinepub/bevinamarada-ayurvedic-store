import { useGetSalesReport, useGetAllProducts } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, TrendingUp, Package, DollarSign } from 'lucide-react';

export default function SalesReports() {
  const { data: report, isLoading } = useGetSalesReport();
  const { data: products } = useGetAllProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-sage-700" />
      </div>
    );
  }

  const getProductName = (productId: bigint) => {
    const product = products?.find((p) => p.id === productId);
    return product?.name || `Product #${productId}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-earth-900 mb-2">Sales Reports</h1>
        <p className="text-earth-600">View your sales performance and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-sage-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-sage-700" />
              Daily Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-earth-900">{Number(report?.dailySales || 0)}</div>
            <p className="text-sm text-earth-600 mt-1">Orders today</p>
          </CardContent>
        </Card>

        <Card className="border-sage-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sage-700" />
              Monthly Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-earth-900">{Number(report?.monthlySales || 0)}</div>
            <p className="text-sm text-earth-600 mt-1">Orders this month</p>
          </CardContent>
        </Card>

        <Card className="border-sage-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-sage-700" />
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-earth-900">{Number(report?.totalSales || 0)}</div>
            <p className="text-sm text-earth-600 mt-1">All-time orders</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product-wise Sales</CardTitle>
        </CardHeader>
        <CardContent>
          {report?.productWiseSales && report.productWiseSales.length > 0 ? (
            <div className="space-y-4">
              {report.productWiseSales.map(([productId, salesCount]) => (
                <div key={Number(productId)} className="flex items-center justify-between p-4 bg-sage-50 rounded-lg">
                  <div>
                    <p className="font-medium text-earth-900">{getProductName(productId)}</p>
                    <p className="text-sm text-earth-600">Product ID: {Number(productId)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-sage-700">{Number(salesCount)}</p>
                    <p className="text-sm text-earth-600">units sold</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-earth-600">No sales data available yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
