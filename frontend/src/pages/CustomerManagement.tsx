import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Phone, Mail, MapPin, Search, X, Loader2, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGetTrialStatus } from '../hooks/useQueries';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  visitCount: number;
  lastVisit: string;
  notes: string;
  createdAt: string;
}

interface Enquiry {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  notes: string;
  date: string;
}

const STORAGE_KEY = 'ayurvedic_customers';
const ENQUIRY_KEY = 'ayurvedic_enquiries';

function loadCustomers(): Customer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCustomers(customers: Customer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

function loadEnquiries(): Enquiry[] {
  try {
    const raw = localStorage.getItem(ENQUIRY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEnquiries(enquiries: Enquiry[]) {
  localStorage.setItem(ENQUIRY_KEY, JSON.stringify(enquiries));
}

const emptyCustomer: Omit<Customer, 'id' | 'visitCount' | 'lastVisit' | 'createdAt'> = {
  name: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
};

export default function CustomerManagement() {
  const { data: trialStatus } = useGetTrialStatus();
  const trialExpired = trialStatus ? !trialStatus.trialActive : false;

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState('');

  // Add/Edit dialog
  const [formOpen, setFormOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({ ...emptyCustomer });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Delete dialog
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Enquiry dialog
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryCustomer, setEnquiryCustomer] = useState<Customer | null>(null);
  const [enquiryProduct, setEnquiryProduct] = useState('');
  const [enquiryNotes, setEnquiryNotes] = useState('');
  const [enquiryError, setEnquiryError] = useState('');

  useEffect(() => {
    setCustomers(loadCustomers());
    setEnquiries(loadEnquiries());
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const repeatCustomers = customers.filter((c) => c.visitCount >= 2);

  const handleOpenAdd = () => {
    if (trialExpired) return;
    setEditCustomer(null);
    setFormData({ ...emptyCustomer });
    setFormError('');
    setFormOpen(true);
  };

  const handleOpenEdit = (customer: Customer) => {
    if (trialExpired) return;
    setEditCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      notes: customer.notes,
    });
    setFormError('');
    setFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formData.name.trim()) {
      setFormError('Customer name is required.');
      return;
    }
    setFormLoading(true);
    try {
      if (editCustomer) {
        const updated = customers.map((c) =>
          c.id === editCustomer.id
            ? { ...c, ...formData, name: formData.name.trim() }
            : c
        );
        saveCustomers(updated);
        setCustomers(updated);
      } else {
        const newCustomer: Customer = {
          id: Date.now().toString(),
          ...formData,
          name: formData.name.trim(),
          visitCount: 1,
          lastVisit: new Date().toLocaleDateString('en-IN'),
          createdAt: new Date().toISOString(),
        };
        const updated = [...customers, newCustomer];
        saveCustomers(updated);
        setCustomers(updated);
      }
      setFormOpen(false);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    const updated = customers.filter((c) => c.id !== id);
    saveCustomers(updated);
    setCustomers(updated);
    setDeleteId(null);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryError('');
    if (!enquiryProduct.trim()) {
      setEnquiryError('Product name is required.');
      return;
    }
    if (!enquiryCustomer) return;
    const newEnquiry: Enquiry = {
      id: Date.now().toString(),
      customerId: enquiryCustomer.id,
      customerName: enquiryCustomer.name,
      product: enquiryProduct.trim(),
      notes: enquiryNotes.trim(),
      date: new Date().toLocaleDateString('en-IN'),
    };
    const updatedEnquiries = [...enquiries, newEnquiry];
    saveEnquiries(updatedEnquiries);
    setEnquiries(updatedEnquiries);

    // Increment visit count
    const updatedCustomers = customers.map((c) =>
      c.id === enquiryCustomer.id
        ? { ...c, visitCount: c.visitCount + 1, lastVisit: new Date().toLocaleDateString('en-IN') }
        : c
    );
    saveCustomers(updatedCustomers);
    setCustomers(updatedCustomers);

    setEnquiryOpen(false);
    setEnquiryProduct('');
    setEnquiryNotes('');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Customer Management</h1>
          <p className="text-muted-foreground mt-1">Track customers, visits, and enquiries</p>
        </div>
        <Button
          onClick={handleOpenAdd}
          disabled={trialExpired}
          className={trialExpired ? 'opacity-50 cursor-not-allowed' : ''}
          title={trialExpired ? 'Trial expired — admin actions disabled' : 'Add new customer'}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {trialExpired && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive font-medium">
          ⚠️ Your 7-day trial has expired. All admin actions are disabled.
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, phone, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Customers ({customers.length})</TabsTrigger>
          <TabsTrigger value="repeat">Repeat Customers ({repeatCustomers.length})</TabsTrigger>
          <TabsTrigger value="enquiries">Enquiry History ({enquiries.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {filteredCustomers.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {search ? 'No customers match your search.' : 'No customers yet. Add your first customer!'}
              </p>
              {!search && !trialExpired && (
                <Button onClick={handleOpenAdd} variant="outline" className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Customer
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCustomers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  trialExpired={trialExpired}
                  onEdit={() => handleOpenEdit(customer)}
                  onDelete={() => setDeleteId(customer.id)}
                  onEnquiry={() => {
                    setEnquiryCustomer(customer);
                    setEnquiryProduct('');
                    setEnquiryNotes('');
                    setEnquiryError('');
                    setEnquiryOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="repeat" className="mt-4">
          {repeatCustomers.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No repeat customers yet.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repeatCustomers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  trialExpired={trialExpired}
                  onEdit={() => handleOpenEdit(customer)}
                  onDelete={() => setDeleteId(customer.id)}
                  onEnquiry={() => {
                    setEnquiryCustomer(customer);
                    setEnquiryProduct('');
                    setEnquiryNotes('');
                    setEnquiryError('');
                    setEnquiryOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="enquiries" className="mt-4">
          {enquiries.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No enquiries recorded yet.</p>
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{enq.customerName}</td>
                      <td className="px-4 py-3 text-sm">{enq.product}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{enq.notes || '—'}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{enq.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add/Edit Customer Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editCustomer ? 'Edit Customer' : 'Add New Customer'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="cust-name">Name *</Label>
              <Input
                id="cust-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Customer name"
                disabled={formLoading}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cust-phone">Phone</Label>
              <Input
                id="cust-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                disabled={formLoading}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cust-email">Email</Label>
              <Input
                id="cust-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="customer@email.com"
                disabled={formLoading}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cust-address">Address</Label>
              <Input
                id="cust-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street, City"
                disabled={formLoading}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cust-notes">Notes</Label>
              <Input
                id="cust-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special notes..."
                disabled={formLoading}
              />
            </div>
            {formError && (
              <p className="text-sm text-destructive">{formError}</p>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)} disabled={formLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={formLoading}>
                {formLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {editCustomer ? 'Update Customer' : 'Add Customer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this customer? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Enquiry Dialog */}
      <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Record Enquiry</DialogTitle>
          </DialogHeader>
          {enquiryCustomer && (
            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="font-medium">{enquiryCustomer.name}</p>
                {enquiryCustomer.phone && (
                  <p className="text-sm text-muted-foreground">{enquiryCustomer.phone}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="enq-product">Product Enquired *</Label>
                <Input
                  id="enq-product"
                  value={enquiryProduct}
                  onChange={(e) => setEnquiryProduct(e.target.value)}
                  placeholder="e.g. Ashwagandha Powder"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="enq-notes">Notes</Label>
                <Input
                  id="enq-notes"
                  value={enquiryNotes}
                  onChange={(e) => setEnquiryNotes(e.target.value)}
                  placeholder="Any additional notes..."
                />
              </div>
              {enquiryError && (
                <p className="text-sm text-destructive">{enquiryError}</p>
              )}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEnquiryOpen(false)}>Cancel</Button>
                <Button type="submit">Record Enquiry</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface CustomerCardProps {
  customer: Customer;
  trialExpired: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onEnquiry: () => void;
}

function CustomerCard({ customer, trialExpired, onEdit, onDelete, onEnquiry }: CustomerCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">
              {customer.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{customer.name}</p>
            <p className="text-xs text-muted-foreground">
              {customer.visitCount} visit{customer.visitCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        {customer.visitCount >= 2 && (
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Repeat</Badge>
        )}
      </div>

      <div className="space-y-1 mb-3">
        {customer.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-3.5 h-3.5" />
            <span>{customer.phone}</span>
          </div>
        )}
        {customer.email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-3.5 h-3.5" />
            <span className="truncate">{customer.email}</span>
          </div>
        )}
        {customer.address && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{customer.address}</span>
          </div>
        )}
      </div>

      {customer.lastVisit && (
        <p className="text-xs text-muted-foreground mb-3">Last visit: {customer.lastVisit}</p>
      )}

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 text-xs"
          onClick={onEnquiry}
          disabled={trialExpired}
        >
          <ClipboardList className="w-3.5 h-3.5 mr-1" />
          Enquiry
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onEdit}
          disabled={trialExpired}
          className={trialExpired ? 'opacity-50 cursor-not-allowed' : ''}
        >
          <Edit className="w-3.5 h-3.5" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onDelete}
          disabled={trialExpired}
          className={`text-destructive hover:text-destructive ${trialExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
