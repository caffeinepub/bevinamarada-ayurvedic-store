import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Users, MessageSquare, X, Save, Eye } from 'lucide-react';

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

const STORAGE_KEY = 'pharma_customers';
const ENQUIRY_KEY = 'pharma_enquiries';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

const emptyCustomer: Omit<Customer, 'id' | 'visitCount' | 'lastVisit'> = {
  name: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
};

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'repeat' | 'enquiries'>('all');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState(emptyCustomer);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryData, setEnquiryData] = useState({ customerId: '', product: '', message: '' });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setCustomers(JSON.parse(stored));
    const storedEnq = localStorage.getItem(ENQUIRY_KEY);
    if (storedEnq) setEnquiries(JSON.parse(storedEnq));
  }, []);

  const saveCustomers = (data: Customer[]) => {
    setCustomers(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const saveEnquiries = (data: Enquiry[]) => {
    setEnquiries(data);
    localStorage.setItem(ENQUIRY_KEY, JSON.stringify(data));
  };

  const handleOpenAdd = () => {
    setEditCustomer(null);
    setFormData(emptyCustomer);
    setShowForm(true);
  };

  const handleOpenEdit = (customer: Customer) => {
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

  const handleSaveCustomer = () => {
    if (!formData.name.trim()) return alert('Name is required');
    if (editCustomer) {
      const updated = customers.map((c) =>
        c.id === editCustomer.id ? { ...editCustomer, ...formData } : c
      );
      saveCustomers(updated);
    } else {
      const newCustomer: Customer = {
        id: generateId(),
        ...formData,
        visitCount: 1,
        lastVisit: new Date().toLocaleDateString('en-IN'),
      };
      saveCustomers([...customers, newCustomer]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this customer?')) {
      saveCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const handleAddEnquiry = () => {
    if (!enquiryData.customerId || !enquiryData.product) return alert('Please fill all fields');
    const customer = customers.find((c) => c.id === enquiryData.customerId);
    const newEnquiry: Enquiry = {
      id: generateId(),
      customerId: enquiryData.customerId,
      customerName: customer?.name || 'Unknown',
      product: enquiryData.product,
      message: enquiryData.message,
      date: new Date().toLocaleDateString('en-IN'),
    };
    saveEnquiries([...enquiries, newEnquiry]);
    setEnquiryData({ customerId: '', product: '', message: '' });
    setShowEnquiryForm(false);
  };

  const filteredCustomers = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) || c.email.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'repeat') return matchSearch && c.visitCount > 1;
    return matchSearch;
  });

  const inputClass = "w-full px-3 py-2.5 border border-[oklch(0.88_0.01_200)] rounded-lg text-[oklch(0.15_0.02_220)] placeholder-[oklch(0.65_0.02_200)] bg-white focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.15_195)] focus:border-transparent text-sm";
  const labelClass = "block text-sm font-medium text-[oklch(0.25_0.03_220)] mb-1.5";

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[oklch(0.15_0.02_220)] font-heading">Customer Management</h1>
          <p className="text-[oklch(0.5_0.03_200)] text-sm mt-0.5">Manage customer records and enquiries</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowEnquiryForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[oklch(0.88_0.01_200)] text-[oklch(0.3_0.03_220)] font-semibold rounded-lg hover:bg-[oklch(0.95_0.02_200)] transition-colors text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            Add Enquiry
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[oklch(0.45_0.15_195)] hover:bg-[oklch(0.4_0.15_195)] text-white font-semibold rounded-lg transition-colors shadow-pharma-sm text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {[
          { key: 'all', label: 'All Customers', count: customers.length },
          { key: 'repeat', label: 'Repeat Customers', count: customers.filter((c) => c.visitCount > 1).length },
          { key: 'enquiries', label: 'Enquiries', count: enquiries.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-[oklch(0.45_0.15_195)] text-white shadow-pharma-sm'
                : 'bg-white text-[oklch(0.3_0.03_220)] border border-[oklch(0.88_0.01_200)] hover:bg-[oklch(0.95_0.02_200)]'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
              activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-[oklch(0.92_0.01_200)] text-[oklch(0.4_0.03_220)]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      {activeTab !== 'enquiries' && (
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.6_0.03_200)]" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[oklch(0.88_0.01_200)] rounded-lg text-[oklch(0.15_0.02_220)] placeholder-[oklch(0.65_0.02_200)] bg-white focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.15_195)] focus:border-transparent text-sm"
          />
        </div>
      )}

      {/* Content */}
      {activeTab === 'enquiries' ? (
        <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_200)] shadow-card overflow-hidden">
          {enquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-[oklch(0.5_0.03_200)]">
              <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
              <p className="font-medium">No enquiries yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[oklch(0.97_0.01_200)] border-b border-[oklch(0.88_0.01_200)]">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Product</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Message</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[oklch(0.94_0.01_200)]">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-[oklch(0.98_0.005_200)] transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-[oklch(0.15_0.02_220)]">{enq.customerName}</td>
                      <td className="px-4 py-3 text-sm text-[oklch(0.3_0.03_220)]">{enq.product}</td>
                      <td className="px-4 py-3 text-sm text-[oklch(0.4_0.03_220)] max-w-xs truncate">{enq.message || '—'}</td>
                      <td className="px-4 py-3 text-sm text-[oklch(0.5_0.03_200)]">{enq.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[oklch(0.88_0.01_200)] shadow-card overflow-hidden">
          {filteredCustomers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-[oklch(0.5_0.03_200)]">
              <Users className="w-12 h-12 mb-3 opacity-30" />
              <p className="font-medium">No customers found</p>
              <button onClick={handleOpenAdd} className="mt-3 text-sm text-[oklch(0.45_0.15_195)] hover:underline">
                Add your first customer
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[oklch(0.97_0.01_200)] border-b border-[oklch(0.88_0.01_200)]">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Phone</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Visits</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Last Visit</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-[oklch(0.4_0.03_220)] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[oklch(0.94_0.01_200)]">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-[oklch(0.98_0.005_200)] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[oklch(0.92_0.05_195)] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-[oklch(0.35_0.15_195)]">
                              {customer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-[oklch(0.15_0.02_220)] text-sm">{customer.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[oklch(0.3_0.03_220)]">{customer.phone || '—'}</td>
                      <td className="px-4 py-3 text-sm text-[oklch(0.3_0.03_220)]">{customer.email || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          customer.visitCount > 1
                            ? 'bg-[oklch(0.92_0.06_155)] text-[oklch(0.35_0.15_155)]'
                            : 'bg-[oklch(0.92_0.01_200)] text-[oklch(0.4_0.03_220)]'
                        }`}>
                          {customer.visitCount}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[oklch(0.5_0.03_200)]">{customer.lastVisit}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(customer)}
                            className="p-1.5 rounded-lg text-[oklch(0.45_0.15_230)] hover:bg-[oklch(0.92_0.05_230)] transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
                            className="p-1.5 rounded-lg text-[oklch(0.5_0.18_25)] hover:bg-[oklch(0.95_0.05_25)] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Customer Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-modal border border-[oklch(0.88_0.01_200)] w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.92_0.01_200)]">
              <h2 className="text-lg font-bold text-[oklch(0.15_0.02_220)] font-heading">
                {editCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-lg hover:bg-[oklch(0.95_0.02_200)] text-[oklch(0.4_0.03_220)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter customer name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter address"
                  rows={2}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes"
                  rows={2}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-[oklch(0.92_0.01_200)]">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2.5 border border-[oklch(0.88_0.01_200)] text-[oklch(0.3_0.03_220)] font-medium rounded-lg hover:bg-[oklch(0.95_0.02_200)] transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCustomer}
                className="flex-1 px-4 py-2.5 bg-[oklch(0.45_0.15_195)] hover:bg-[oklch(0.4_0.15_195)] text-white font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editCustomer ? 'Save Changes' : 'Add Customer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Enquiry Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowEnquiryForm(false)} />
          <div className="relative bg-white rounded-2xl shadow-modal border border-[oklch(0.88_0.01_200)] w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.92_0.01_200)]">
              <h2 className="text-lg font-bold text-[oklch(0.15_0.02_220)] font-heading">Add Enquiry</h2>
              <button
                onClick={() => setShowEnquiryForm(false)}
                className="p-2 rounded-lg hover:bg-[oklch(0.95_0.02_200)] text-[oklch(0.4_0.03_220)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={labelClass}>Customer *</label>
                <select
                  value={enquiryData.customerId}
                  onChange={(e) => setEnquiryData({ ...enquiryData, customerId: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select customer</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Product *</label>
                <input
                  type="text"
                  value={enquiryData.product}
                  onChange={(e) => setEnquiryData({ ...enquiryData, product: e.target.value })}
                  placeholder="Product name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Message</label>
                <textarea
                  value={enquiryData.message}
                  onChange={(e) => setEnquiryData({ ...enquiryData, message: e.target.value })}
                  placeholder="Enquiry details"
                  rows={3}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-[oklch(0.92_0.01_200)]">
              <button
                onClick={() => setShowEnquiryForm(false)}
                className="flex-1 px-4 py-2.5 border border-[oklch(0.88_0.01_200)] text-[oklch(0.3_0.03_220)] font-medium rounded-lg hover:bg-[oklch(0.95_0.02_200)] transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEnquiry}
                className="flex-1 px-4 py-2.5 bg-[oklch(0.45_0.15_195)] hover:bg-[oklch(0.4_0.15_195)] text-white font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Add Enquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
