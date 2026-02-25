import { useState, useEffect } from 'react';
import { Users, Plus, Search, Edit2, Trash2, Phone, Mail, ShoppingBag, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  visitCount: number;
  totalSpent: number;
  lastVisit: string;
  createdAt: string;
}

interface Enquiry {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  message: string;
  date: string;
}

const STORAGE_KEY = 'bevinamarada_customers';
const ENQUIRY_STORAGE_KEY = 'bevinamarada_enquiries';

function loadCustomers(): Customer[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCustomers(customers: Customer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

function loadEnquiries(): Enquiry[] {
  try {
    const data = localStorage.getItem(ENQUIRY_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveEnquiries(enquiries: Enquiry[]) {
  localStorage.setItem(ENQUIRY_STORAGE_KEY, JSON.stringify(enquiries));
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>(loadCustomers);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(loadEnquiries);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', notes: '',
  });
  const [enquiryData, setEnquiryData] = useState({ product: '', message: '' });

  useEffect(() => { saveCustomers(customers); }, [customers]);
  useEffect(() => { saveEnquiries(enquiries); }, [enquiries]);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const repeatCustomers = customers.filter(c => c.visitCount > 1);

  const openAddForm = () => {
    setEditCustomer(null);
    setFormData({ name: '', phone: '', email: '', address: '', notes: '' });
    setShowForm(true);
  };

  const openEditForm = (customer: Customer) => {
    setEditCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      notes: customer.notes,
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;
    if (editCustomer) {
      setCustomers(prev => prev.map(c =>
        c.id === editCustomer.id ? { ...c, ...formData } : c
      ));
    } else {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...formData,
        visitCount: 1,
        totalSpent: 0,
        lastVisit: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCustomers(prev => [...prev, newCustomer]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const openEnquiryForm = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEnquiryData({ product: '', message: '' });
    setShowEnquiryForm(true);
  };

  const handleSaveEnquiry = () => {
    if (!selectedCustomer || !enquiryData.product.trim()) return;
    const newEnquiry: Enquiry = {
      id: Date.now().toString(),
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      product: enquiryData.product,
      message: enquiryData.message,
      date: new Date().toISOString().split('T')[0],
    };
    setEnquiries(prev => [...prev, newEnquiry]);
    setCustomers(prev => prev.map(c =>
      c.id === selectedCustomer.id
        ? { ...c, visitCount: c.visitCount + 1, lastVisit: new Date().toISOString().split('T')[0] }
        : c
    ));
    setShowEnquiryForm(false);
  };

  const CustomerCard = ({ customer }: { customer: Customer }) => (
    <div className="bg-white rounded-2xl p-5 border border-forest-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-500 to-sage-600 flex items-center justify-center text-white font-bold text-sm">
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-forest-800">{customer.name}</h3>
            <p className="text-xs text-forest-500">Since {customer.createdAt}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => openEnquiryForm(customer)}
            className="p-1.5 text-forest-400 hover:text-forest-600 hover:bg-forest-50 rounded-lg transition-colors"
            title="Record Enquiry"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => openEditForm(customer)}
            className="p-1.5 text-forest-400 hover:text-forest-600 hover:bg-forest-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(customer.id)}
            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="space-y-1.5 text-sm">
        {customer.phone && (
          <div className="flex items-center gap-2 text-forest-600">
            <Phone className="w-3.5 h-3.5 text-forest-400" />
            {customer.phone}
          </div>
        )}
        {customer.email && (
          <div className="flex items-center gap-2 text-forest-600">
            <Mail className="w-3.5 h-3.5 text-forest-400" />
            {customer.email}
          </div>
        )}
      </div>
      <div className="mt-3 pt-3 border-t border-forest-100 flex items-center justify-between text-xs text-forest-500">
        <span className="flex items-center gap-1">
          <ShoppingBag className="w-3.5 h-3.5" />
          {customer.visitCount} visit{customer.visitCount !== 1 ? 's' : ''}
        </span>
        <span>Last: {customer.lastVisit}</span>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-500 to-sage-600 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-forest-800 font-display">Customer Management</h1>
            <p className="text-forest-500 text-sm">{customers.length} total customers</p>
          </div>
        </div>
        <Button
          onClick={openAddForm}
          className="bg-gradient-to-r from-forest-600 to-sage-600 hover:from-forest-700 hover:to-sage-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Customers ({customers.length})</TabsTrigger>
          <TabsTrigger value="repeat">Repeat Customers ({repeatCustomers.length})</TabsTrigger>
          <TabsTrigger value="enquiries">Enquiry History ({enquiries.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customers..."
                className="pl-9 border-forest-200"
              />
            </div>
          </div>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12 text-forest-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No customers found</p>
              <p className="text-sm mt-1">Add your first customer to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCustomers.map(c => <CustomerCard key={c.id} customer={c} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="repeat">
          {repeatCustomers.length === 0 ? (
            <div className="text-center py-12 text-forest-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No repeat customers yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repeatCustomers.map(c => <CustomerCard key={c.id} customer={c} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="enquiries">
          {enquiries.length === 0 ? (
            <div className="text-center py-12 text-forest-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No enquiries recorded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {enquiries.slice().reverse().map(enq => (
                <div key={enq.id} className="bg-white rounded-xl p-4 border border-forest-100 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-forest-800">{enq.customerName}</p>
                      <p className="text-sm text-forest-600 mt-0.5">Product: <span className="font-medium">{enq.product}</span></p>
                      {enq.message && <p className="text-sm text-forest-500 mt-1">{enq.message}</p>}
                    </div>
                    <span className="text-xs text-forest-400 whitespace-nowrap ml-4">{enq.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add/Edit Customer Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-forest-800 font-display">
              {editCustomer ? 'Edit Customer' : 'Add New Customer'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Name *</Label>
              <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Customer name" />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Address</Label>
              <Input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="Address" />
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Any notes..." rows={2} />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.name.trim()} className="flex-1 bg-gradient-to-r from-forest-600 to-sage-600 text-white">
                {editCustomer ? 'Update' : 'Add Customer'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enquiry Dialog */}
      <Dialog open={showEnquiryForm} onOpenChange={setShowEnquiryForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-forest-800 font-display">
              Record Enquiry — {selectedCustomer?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Product Enquired *</Label>
              <Input value={enquiryData.product} onChange={e => setEnquiryData({ ...enquiryData, product: e.target.value })} placeholder="Product name" />
            </div>
            <div className="space-y-1.5">
              <Label>Message / Notes</Label>
              <Textarea value={enquiryData.message} onChange={e => setEnquiryData({ ...enquiryData, message: e.target.value })} placeholder="Additional notes..." rows={3} />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowEnquiryForm(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleSaveEnquiry} disabled={!enquiryData.product.trim()} className="flex-1 bg-gradient-to-r from-forest-600 to-sage-600 text-white">
                Save Enquiry
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
