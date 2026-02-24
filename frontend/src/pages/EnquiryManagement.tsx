import { useGetAllEnquiries, useGetTodaysEnquiries } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function EnquiryManagement() {
  const { data: allEnquiries, isLoading: allLoading } = useGetAllEnquiries();
  const { data: todaysEnquiries, isLoading: todayLoading } = useGetTodaysEnquiries();

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (allLoading || todayLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-sage-700" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-earth-900 mb-2">Enquiry Management</h1>
        <p className="text-earth-600">View and manage customer enquiries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-sage-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-sage-700" />
              Today's Enquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-earth-900">{todaysEnquiries?.length || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-sage-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-sage-700" />
              Total Enquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-earth-900">{allEnquiries?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Enquiries</TabsTrigger>
              <TabsTrigger value="today">Today's Enquiries</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              {allEnquiries && allEnquiries.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-earth-600">No enquiries yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allEnquiries?.map((enquiry) => (
                        <TableRow key={Number(enquiry.id)}>
                          <TableCell className="text-sm">{formatDate(enquiry.createdAt)}</TableCell>
                          <TableCell className="font-medium">{enquiry.name}</TableCell>
                          <TableCell>
                            <a href={`tel:${enquiry.phone}`} className="text-sage-700 hover:underline">
                              {enquiry.phone}
                            </a>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <p className="line-clamp-2">{enquiry.message}</p>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="today" className="mt-4">
              {todaysEnquiries && todaysEnquiries.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-earth-600">No enquiries today.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todaysEnquiries?.map((enquiry) => (
                        <TableRow key={Number(enquiry.id)}>
                          <TableCell className="text-sm">
                            <Badge variant="outline">{formatDate(enquiry.createdAt)}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{enquiry.name}</TableCell>
                          <TableCell>
                            <a href={`tel:${enquiry.phone}`} className="text-sage-700 hover:underline">
                              {enquiry.phone}
                            </a>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <p className="line-clamp-2">{enquiry.message}</p>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
