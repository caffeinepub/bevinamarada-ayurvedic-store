import { useGetCustomers, useUpdateRepeatCustomerStatus } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Star } from 'lucide-react';

export default function CustomerManagement() {
  const { data: customers, isLoading } = useGetCustomers();
  const updateRepeatStatus = useUpdateRepeatCustomerStatus();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-sage-700" />
      </div>
    );
  }

  const repeatCustomers = customers?.filter((c) => c.isRepeatCustomer) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-earth-900 mb-2">Customer Management</h1>
        <p className="text-earth-600">View and manage customer information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-sage-200">
          <CardHeader>
            <CardTitle className="text-lg">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-earth-900">{customers?.length || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-sage-200">
          <CardHeader>
            <CardTitle className="text-lg">Repeat Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-sage-700">{repeatCustomers.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          {customers && customers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-earth-600">No customers yet. Customers will appear here when they submit enquiries.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers?.map((customer) => (
                    <TableRow key={Number(customer.id)}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        {customer.isRepeatCustomer ? (
                          <Badge className="bg-sage-700">
                            <Star className="h-3 w-3 mr-1" />
                            Repeat Customer
                          </Badge>
                        ) : (
                          <Badge variant="outline">New Customer</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {!customer.isRepeatCustomer && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateRepeatStatus.mutate(customer.id)}
                            disabled={updateRepeatStatus.isPending}
                          >
                            Mark as Repeat
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
