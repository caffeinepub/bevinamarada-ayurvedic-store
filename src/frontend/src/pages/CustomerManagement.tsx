import {
  Edit,
  MessageSquare,
  Plus,
  Save,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

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

const STORAGE_KEY = "pharma_customers";
const ENQUIRY_KEY = "pharma_enquiries";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

const emptyCustomer: Omit<Customer, "id" | "visitCount" | "lastVisit"> = {
  name: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
};

const avatarColors = [
  { bg: "oklch(0.75 0.22 150 / 0.12)", text: "oklch(0.75 0.22 150)" },
  { bg: "oklch(0.72 0.18 200 / 0.12)", text: "oklch(0.72 0.18 200)" },
  { bg: "oklch(0.75 0.18 72 / 0.12)", text: "oklch(0.75 0.18 72)" },
  { bg: "oklch(0.65 0.22 250 / 0.12)", text: "oklch(0.65 0.22 250)" },
];

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "repeat" | "enquiries">(
    "all",
  );
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState(emptyCustomer);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryData, setEnquiryData] = useState({
    customerId: "",
    product: "",
    message: "",
  });

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
    if (!formData.name.trim()) return alert("Name is required");
    if (editCustomer) {
      saveCustomers(
        customers.map((c) =>
          c.id === editCustomer.id ? { ...editCustomer, ...formData } : c,
        ),
      );
    } else {
      saveCustomers([
        ...customers,
        {
          id: generateId(),
          ...formData,
          visitCount: 1,
          lastVisit: new Date().toLocaleDateString("en-IN"),
        },
      ]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this customer?"))
      saveCustomers(customers.filter((c) => c.id !== id));
  };

  const handleAddEnquiry = () => {
    if (!enquiryData.customerId || !enquiryData.product)
      return alert("Please fill all fields");
    const customer = customers.find((c) => c.id === enquiryData.customerId);
    saveEnquiries([
      ...enquiries,
      {
        id: generateId(),
        customerId: enquiryData.customerId,
        customerName: customer?.name || "Unknown",
        product: enquiryData.product,
        message: enquiryData.message,
        date: new Date().toLocaleDateString("en-IN"),
      },
    ]);
    setEnquiryData({ customerId: "", product: "", message: "" });
    setShowEnquiryForm(false);
  };

  const filteredCustomers = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "repeat") return matchSearch && c.visitCount > 1;
    return matchSearch;
  });

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl text-foreground placeholder:text-muted-foreground/50 text-sm transition-all neon-input";
  const inputStyle = {
    background: "oklch(0.18 0.01 250)",
    border: "1px solid oklch(0.22 0.015 250)",
  };
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";

  const cardStyle = {
    background: "oklch(0.14 0.008 250)",
    border: "1px solid oklch(0.22 0.015 250)",
  };

  return (
    <div className="p-6 lg:p-8 page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">
            Customer Management
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage customer records and enquiries
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowEnquiryForm(true)}
            data-ocid="customers.add_enquiry.button"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-foreground font-semibold rounded-xl hover:bg-muted transition-colors text-sm h-11"
            style={cardStyle}
          >
            <MessageSquare className="w-4 h-4" />
            Add Enquiry
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            data-ocid="customers.primary_button"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl transition-colors text-sm h-11 neon-btn"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "all", label: "All Customers", count: customers.length },
          {
            key: "repeat",
            label: "Repeat Customers",
            count: customers.filter((c) => c.visitCount > 1).length,
          },
          { key: "enquiries", label: "Enquiries", count: enquiries.length },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            data-ocid={`customers.${tab.key}.tab`}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={
              activeTab === tab.key
                ? {
                    background: "oklch(0.75 0.22 150)",
                    color: "oklch(0.09 0.005 250)",
                    boxShadow: "0 0 8px oklch(0.75 0.22 150 / 0.3)",
                  }
                : {
                    background: "oklch(0.14 0.008 250)",
                    color: "oklch(0.94 0.01 250)",
                    border: "1px solid oklch(0.22 0.015 250)",
                  }
            }
          >
            {tab.label}
            <span
              className="ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium"
              style={
                activeTab === tab.key
                  ? {
                      background: "oklch(0 0 0 / 0.2)",
                      color: "oklch(0.09 0.005 250)",
                    }
                  : {
                      background: "oklch(0.18 0.01 250)",
                      color: "oklch(0.55 0.02 250)",
                    }
              }
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      {activeTab !== "enquiries" && (
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="customers.search_input"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-foreground placeholder:text-muted-foreground/50 text-sm transition-all neon-input"
            style={{
              background: "oklch(0.14 0.008 250)",
              border: "1px solid oklch(0.22 0.015 250)",
            }}
          />
        </div>
      )}

      {/* Content */}
      {activeTab === "enquiries" ? (
        <div
          className="rounded-xl overflow-hidden shadow-card"
          style={cardStyle}
        >
          {enquiries.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-muted-foreground"
              data-ocid="customers.enquiries.empty_state"
            >
              <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
              <p className="font-semibold text-foreground">No enquiries yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" data-ocid="customers.enquiries.table">
                <thead>
                  <tr
                    style={{
                      background: "oklch(0.18 0.01 250 / 0.5)",
                      borderBottom: "1px solid oklch(0.22 0.015 250)",
                    }}
                  >
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Message
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq, idx) => (
                    <tr
                      key={enq.id}
                      className="transition-colors"
                      style={{
                        borderBottom: "1px solid oklch(0.22 0.015 250 / 0.5)",
                      }}
                      data-ocid={`customers.enquiry.item.${idx + 1}`}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLTableRowElement
                        ).style.background = "oklch(0.18 0.01 250 / 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLTableRowElement
                        ).style.background = "";
                      }}
                    >
                      <td className="px-4 py-4 text-sm font-semibold text-foreground">
                        {enq.customerName}
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground">
                        {enq.product}
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground max-w-xs truncate">
                        {enq.message || "—"}
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">
                        {enq.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden shadow-card"
          style={cardStyle}
        >
          {filteredCustomers.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-muted-foreground"
              data-ocid="customers.empty_state"
            >
              <Users className="w-12 h-12 mb-3 opacity-30" />
              <p className="font-semibold text-foreground">
                No customers found
              </p>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="mt-3 text-sm text-primary hover:text-primary/80 font-semibold hover:underline transition-colors"
              >
                Add your first customer
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" data-ocid="customers.table">
                <thead>
                  <tr
                    style={{
                      background: "oklch(0.18 0.01 250 / 0.5)",
                      borderBottom: "1px solid oklch(0.22 0.015 250)",
                    }}
                  >
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Visits
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, idx) => {
                    const colorStyle = avatarColors[idx % avatarColors.length];
                    return (
                      <tr
                        key={customer.id}
                        className="transition-colors"
                        style={{
                          borderBottom: "1px solid oklch(0.22 0.015 250 / 0.5)",
                        }}
                        data-ocid={`customers.item.${idx + 1}`}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background = "oklch(0.18 0.01 250 / 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background = "";
                        }}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: colorStyle.bg }}
                            >
                              <span
                                className="text-xs font-bold"
                                style={{ color: colorStyle.text }}
                              >
                                {customer.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="font-semibold text-foreground text-sm">
                              {customer.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          {customer.phone || "—"}
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          {customer.email || "—"}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={
                              customer.visitCount > 1
                                ? {
                                    background: "oklch(0.75 0.22 150 / 0.12)",
                                    color: "oklch(0.75 0.22 150)",
                                  }
                                : {
                                    background: "oklch(0.18 0.01 250)",
                                    color: "oklch(0.55 0.02 250)",
                                  }
                            }
                          >
                            {customer.visitCount}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          {customer.lastVisit}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(customer)}
                              data-ocid={`customers.edit_button.${idx + 1}`}
                              className="p-1.5 rounded-lg transition-colors"
                              style={{ color: "oklch(0.72 0.18 200)" }}
                              onMouseEnter={(e) => {
                                (
                                  e.currentTarget as HTMLButtonElement
                                ).style.background =
                                  "oklch(0.72 0.18 200 / 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                (
                                  e.currentTarget as HTMLButtonElement
                                ).style.background = "";
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(customer.id)}
                              data-ocid={`customers.delete_button.${idx + 1}`}
                              className="p-1.5 rounded-lg text-destructive transition-colors"
                              onMouseEnter={(e) => {
                                (
                                  e.currentTarget as HTMLButtonElement
                                ).style.background =
                                  "oklch(0.62 0.22 25 / 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                (
                                  e.currentTarget as HTMLButtonElement
                                ).style.background = "";
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Customer Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: "oklch(0 0 0 / 0.7)" }}
            role="button"
            tabIndex={0}
            aria-label="Close dialog"
            onClick={() => setShowForm(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowForm(false);
            }}
          />
          <div
            className="relative rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-modal"
            style={cardStyle}
            data-ocid="customers.dialog"
          >
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid oklch(0.22 0.015 250)" }}
            >
              <h2 className="text-lg font-bold text-foreground font-heading">
                {editCustomer ? "Edit Customer" : "Add New Customer"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                data-ocid="customers.close_button"
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="cust-name" className={labelClass}>
                  Full Name *
                </label>
                <input
                  id="cust-name"
                  data-ocid="customers.name.input"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter customer name"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="cust-phone" className={labelClass}>
                  Phone Number
                </label>
                <input
                  id="cust-phone"
                  data-ocid="customers.phone.input"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="cust-email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="cust-email"
                  data-ocid="customers.email.input"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="cust-address" className={labelClass}>
                  Address
                </label>
                <textarea
                  id="cust-address"
                  data-ocid="customers.address.textarea"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter address"
                  rows={2}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="cust-notes" className={labelClass}>
                  Notes
                </label>
                <textarea
                  id="cust-notes"
                  data-ocid="customers.notes.textarea"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Additional notes"
                  rows={2}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>
            <div
              className="flex gap-3 px-6 py-4"
              style={{ borderTop: "1px solid oklch(0.22 0.015 250)" }}
            >
              <button
                type="button"
                onClick={() => setShowForm(false)}
                data-ocid="customers.cancel_button"
                className="flex-1 px-4 py-2.5 text-foreground font-semibold rounded-xl hover:bg-muted transition-colors text-sm h-11"
                style={{ border: "1px solid oklch(0.22 0.015 250)" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustomer}
                data-ocid="customers.save_button"
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 h-11 neon-btn"
              >
                <Save className="w-4 h-4" />
                {editCustomer ? "Save Changes" : "Add Customer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Enquiry Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: "oklch(0 0 0 / 0.7)" }}
            role="button"
            tabIndex={0}
            aria-label="Close dialog"
            onClick={() => setShowEnquiryForm(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowEnquiryForm(false);
            }}
          />
          <div
            className="relative rounded-2xl w-full max-w-md shadow-modal"
            style={cardStyle}
            data-ocid="customers.enquiry.dialog"
          >
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid oklch(0.22 0.015 250)" }}
            >
              <h2 className="text-lg font-bold text-foreground font-heading">
                Add Enquiry
              </h2>
              <button
                type="button"
                onClick={() => setShowEnquiryForm(false)}
                data-ocid="customers.enquiry.close_button"
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="enq-customer" className={labelClass}>
                  Customer *
                </label>
                <select
                  id="enq-customer"
                  data-ocid="customers.enquiry.customer.select"
                  value={enquiryData.customerId}
                  onChange={(e) =>
                    setEnquiryData({
                      ...enquiryData,
                      customerId: e.target.value,
                    })
                  }
                  className={inputClass}
                  style={inputStyle}
                >
                  <option
                    value=""
                    style={{ background: "oklch(0.14 0.008 250)" }}
                  >
                    Select customer
                  </option>
                  {customers.map((c) => (
                    <option
                      key={c.id}
                      value={c.id}
                      style={{ background: "oklch(0.14 0.008 250)" }}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="enq-product" className={labelClass}>
                  Product *
                </label>
                <input
                  id="enq-product"
                  data-ocid="customers.enquiry.product.input"
                  type="text"
                  value={enquiryData.product}
                  onChange={(e) =>
                    setEnquiryData({ ...enquiryData, product: e.target.value })
                  }
                  placeholder="Product name"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="enq-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="enq-message"
                  data-ocid="customers.enquiry.message.textarea"
                  value={enquiryData.message}
                  onChange={(e) =>
                    setEnquiryData({ ...enquiryData, message: e.target.value })
                  }
                  placeholder="Enquiry details"
                  rows={3}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>
            <div
              className="flex gap-3 px-6 py-4"
              style={{ borderTop: "1px solid oklch(0.22 0.015 250)" }}
            >
              <button
                type="button"
                onClick={() => setShowEnquiryForm(false)}
                data-ocid="customers.enquiry.cancel_button"
                className="flex-1 px-4 py-2.5 text-foreground font-semibold rounded-xl hover:bg-muted transition-colors text-sm h-11"
                style={{ border: "1px solid oklch(0.22 0.015 250)" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddEnquiry}
                data-ocid="customers.enquiry.submit_button"
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 h-11 neon-btn"
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
