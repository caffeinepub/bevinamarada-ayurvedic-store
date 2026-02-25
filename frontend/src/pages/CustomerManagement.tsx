import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Users, Plus, Edit, Trash2, MessageSquare, Search } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  visitCount: number;
  lastVisit: string;
  notes: string;
}

interface Enquiry {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  message: string;
  date: string;
}

const CUSTOMERS_KEY = 'ayurveda_customers';
const ENQUIRIES_KEY = 'ayurveda_enquiries';

function loadCustomers(): Customer[] {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMERS_KEY) || '[]');
  } catch { return []; }
}

function saveCustomers(customers: Customer[]) {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
}

function loadEnquiries(): Enquiry[] {
  try {
    return JSON.parse(localStorage.getItem(ENQUIRIES_KEY) || '[]');
  } catch { return []; }
}

function saveEnquiries(enquiries: Enquiry[]) {
  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
}

export default function CustomerManagement() {
  const [tab, setTab] = useState<'all' | 'repeat' | 'enquiries'>('all');
  const [customers, setCustomers] = useState<Customer[]>(loadCustomers);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(loadEnquiries);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryCustomer, setEnquiryCustomer] = useState<Customer | null>(null);

  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', notes: '' });
  const [enquiryForm, setEnquiryForm] = useState({ product: '', message: '' });

  useEffect(() => { saveCustomers(customers); }, [customers]);
  useEffect(() => { saveEnquiries(enquiries); }, [enquiries]);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const repeatCustomers = filteredCustomers.filter(c => c.visitCount > 1);

  const handleSaveCustomer = () => {
    if (!form.name.trim()) return;
    if (editCustomer) {
      setCustomers(prev => prev.map(c => c.id === editCustomer.id ? { ...c, ...form } : c));
    } else {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...form,
        visitCount: 1,
        lastVisit: new Date().toLocaleDateString('en-IN'),
      };
      setCustomers(prev => [...prev, newCustomer]);
    }
    setShowForm(false);
    setEditCustomer(null);
    setForm({ name: '', phone: '', email: '', address: '', notes: '' });
  };

  const handleDeleteCustomer = (id: string) => {
    if (confirm('Delete this customer?')) {
      setCustomers(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleAddEnquiry = () => {
    if (!enquiryCustomer || !enquiryForm.product.trim()) return;
    const newEnquiry: Enquiry = {
      id: Date.now().toString(),
      customerId: enquiryCustomer.id,
      customerName: enquiryCustomer.name,
      product: enquiryForm.product,
      message: enquiryForm.message,
      date: new Date().toLocaleDateString('en-IN'),
    };
    setEnquiries(prev => [...prev, newEnquiry]);
    setCustomers(prev => prev.map(c =>
      c.id === enquiryCustomer.id
        ? { ...c, visitCount: c.visitCount + 1, lastVisit: new Date().toLocaleDateString('en-IN') }
        : c
    ));
    setShowEnquiryForm(false);
    setEnquiryCustomer(null);
    setEnquiryForm({ product: '', message: '' });
  };

  const displayList = tab === 'repeat' ? repeatCustomers : filteredCustomers;

  return (
    <div className="min-h-screen bg-neon-black p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin" className="text-gray-500 hover:text-neon-green transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Users className="w-5 h-5 text-neon-green" />
            <h1 className="font-orbitron text-xl font-bold text-white">CUSTOMERS</h1>
          </div>
          <p className="text-gray-500 font-mono text-xs">{customers.length} total customers</p>
        </div>
        <button
          onClick={() => { setEditCustomer(null); setForm({ name: '', phone: '', email: '', address: '', notes: '' }); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 neon-btn-solid rounded-md font-orbitron text-xs font-bold tracking-wider"
        >
          <Plus className="w-4 h-4" />
          ADD
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {(['all', 'repeat', 'enquiries'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-md text-xs font-mono font-medium transition-all duration-200 capitalize ${
              tab === t
                ? 'bg-neon-green/10 text-neon-green border border-neon-green/50'
                : 'text-gray-500 border border-transparent hover:text-neon-green hover:border-neon-green/20'
            }`}
          >
            {t === 'all' ? 'All Customers' : t === 'repeat' ? 'Repeat Customers' : 'Enquiry History'}
          </button>
        ))}
      </div>

      {/* Search */}
      {tab !== 'enquiries' && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 neon-input rounded-md font-mono text-sm"
          />
        </div>
      )}

      {/* Content */}
      {tab === 'enquiries' ? (
        <div className="space-y-3">
          {enquiries.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 font-mono text-sm">No enquiries yet</p>
            </div>
          ) : (
            enquiries.map((enq) => (
              <div key={enq.id} className="neon-card rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-rajdhani font-semibold text-white text-sm">{enq.customerName}</p>
                    <p className="text-neon-green text-xs font-mono mt-0.5">{enq.product}</p>
                    {enq.message && <p className="text-gray-500 text-xs font-mono mt-1">{enq.message}</p>}
                  </div>
                  <span className="text-xs font-mono text-gray-600">{enq.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {displayList.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 font-mono text-sm">No customers found</p>
            </div>
          ) : (
            displayList.map((customer) => (
              <div key={customer.id} className="neon-card rounded-lg p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-rajdhani font-semibold text-white text-sm">{customer.name}</p>
                    {customer.visitCount > 1 && (
                      <span className="px-1.5 py-0.5 rounded text-xs font-mono bg-neon-green/10 text-neon-green border border-neon-green/30">
                        ×{customer.visitCount}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs font-mono text-gray-500">
                    {customer.phone && <span>{customer.phone}</span>}
                    {customer.email && <span>{customer.email}</span>}
                    <span>Last: {customer.lastVisit}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { setEnquiryCustomer(customer); setEnquiryForm({ product: '', message: '' }); setShowEnquiryForm(true); }}
                    title="Add Enquiry"
                    className="p-1.5 text-gray-500 hover:text-neon-green hover:bg-neon-green/10 rounded transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => { setEditCustomer(customer); setForm({ name: customer.name, phone: customer.phone, email: customer.email, address: customer.address, notes: customer.notes }); setShowForm(true); }}
                    title="Edit"
                    className="p-1.5 text-gray-500 hover:text-neon-green hover:bg-neon-green/10 rounded transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(customer.id)}
                    title="Delete"
                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Customer Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="neon-card rounded-xl p-6 w-full max-w-md">
            <h2 className="font-orbitron text-sm font-bold text-neon-green mb-5">
              {editCustomer ? 'EDIT CUSTOMER' : 'ADD CUSTOMER'}
            </h2>
            <div className="space-y-4">
              {[
                { key: 'name', label: 'Name *', placeholder: 'Customer name' },
                { key: 'phone', label: 'Phone', placeholder: 'Phone number' },
                { key: 'email', label: 'Email', placeholder: 'Email address' },
                { key: 'address', label: 'Address', placeholder: 'Address' },
                { key: 'notes', label: 'Notes', placeholder: 'Additional notes' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-widest">{field.label}</label>
                  <input
                    type="text"
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2.5 neon-input rounded-md font-mono text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSaveCustomer} className="flex-1 py-2.5 neon-btn-solid rounded-md font-orbitron text-xs font-bold tracking-wider">
                SAVE
              </button>
              <button onClick={() => { setShowForm(false); setEditCustomer(null); }} className="flex-1 py-2.5 neon-btn rounded-md font-orbitron text-xs font-bold tracking-wider">
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Form Modal */}
      {showEnquiryForm && enquiryCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="neon-card rounded-xl p-6 w-full max-w-md">
            <h2 className="font-orbitron text-sm font-bold text-neon-green mb-1">ADD ENQUIRY</h2>
            <p className="text-gray-500 font-mono text-xs mb-5">For: {enquiryCustomer.name}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-widest">Product *</label>
                <input
                  type="text"
                  value={enquiryForm.product}
                  onChange={(e) => setEnquiryForm(prev => ({ ...prev, product: e.target.value }))}
                  placeholder="Product name"
                  className="w-full px-3 py-2.5 neon-input rounded-md font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-widest">Message</label>
                <textarea
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enquiry details..."
                  rows={3}
                  className="w-full px-3 py-2.5 neon-input rounded-md font-mono text-sm resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleAddEnquiry} className="flex-1 py-2.5 neon-btn-solid rounded-md font-orbitron text-xs font-bold tracking-wider">
                SAVE
              </button>
              <button onClick={() => { setShowEnquiryForm(false); setEnquiryCustomer(null); }} className="flex-1 py-2.5 neon-btn rounded-md font-orbitron text-xs font-bold tracking-wider">
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
