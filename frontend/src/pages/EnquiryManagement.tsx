import { useState } from 'react';
import { MessageSquare, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  product: string;
  message: string;
  date: string;
}

const STORAGE_KEY = 'bevinamarada_public_enquiries';

function loadEnquiries(): Enquiry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export default function EnquiryManagement() {
  const [enquiries] = useState<Enquiry[]>(loadEnquiries);

  const today = new Date().toISOString().split('T')[0];
  const todaysEnquiries = enquiries.filter((e) => e.date === today);

  const EnquiryRow = ({ enquiry }: { enquiry: Enquiry }) => (
    <div className="bg-white rounded-xl p-4 border border-forest-100 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-forest-800">{enquiry.name}</p>
          {enquiry.phone && <p className="text-sm text-forest-500">{enquiry.phone}</p>}
          <p className="text-sm text-forest-600 mt-1">
            Product: <span className="font-medium">{enquiry.product}</span>
          </p>
          {enquiry.message && <p className="text-sm text-forest-500 mt-1">{enquiry.message}</p>}
        </div>
        <div className="flex items-center gap-1 text-xs text-forest-400 whitespace-nowrap ml-4">
          <Calendar className="w-3.5 h-3.5" />
          {enquiry.date}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-forest-600 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-forest-800 font-display">Enquiry Management</h1>
          <p className="text-forest-500 text-sm">{enquiries.length} total enquiries</p>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Enquiries ({enquiries.length})</TabsTrigger>
          <TabsTrigger value="today">Today ({todaysEnquiries.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {enquiries.length === 0 ? (
            <div className="text-center py-12 text-forest-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No enquiries yet</p>
              <p className="text-sm mt-1">Enquiries submitted via the contact form will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {enquiries.slice().reverse().map((enq) => (
                <EnquiryRow key={enq.id} enquiry={enq} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="today">
          {todaysEnquiries.length === 0 ? (
            <div className="text-center py-12 text-forest-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No enquiries today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todaysEnquiries.slice().reverse().map((enq) => (
                <EnquiryRow key={enq.id} enquiry={enq} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
