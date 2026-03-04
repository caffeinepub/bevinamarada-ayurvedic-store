import { Link } from "@tanstack/react-router";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { useState } from "react";

interface Enquiry {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  message: string;
  date: string;
}

function loadEnquiries(): Enquiry[] {
  try {
    return JSON.parse(localStorage.getItem("ayurveda_enquiries") || "[]");
  } catch {
    return [];
  }
}

function isToday(dateStr: string): boolean {
  const today = new Date().toLocaleDateString("en-IN");
  return dateStr === today;
}

export default function EnquiryManagement() {
  const [tab, setTab] = useState<"all" | "today">("all");
  const enquiries = loadEnquiries();

  const displayed =
    tab === "today" ? enquiries.filter((e) => isToday(e.date)) : enquiries;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/admin"
          className="p-2 rounded-lg text-muted-foreground hover:text-forest hover:bg-sage-light transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="w-9 h-9 rounded-xl bg-forest/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-forest" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground font-heading">
            Enquiries
          </h1>
          <p className="text-muted-foreground text-sm">
            Customer enquiry history
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "today"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              tab === t
                ? "bg-forest text-white shadow-pharma"
                : "bg-white text-foreground border border-border hover:bg-sage-light hover:border-forest/30"
            }`}
          >
            {t === "all" ? "All Enquiries" : "Today's"}
            <span
              className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                t === tab
                  ? "bg-white/20 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {t === "all"
                ? enquiries.length
                : enquiries.filter((e) => isToday(e.date)).length}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {displayed.length === 0 ? (
        <div
          className="bg-white rounded-xl border border-border shadow-card py-16 text-center"
          data-ocid="enquiries.empty_state"
        >
          <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground font-medium text-sm">
            No enquiries found
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Customer enquiries from the Contact page appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-forest/5 border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-forest uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-forest uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-forest uppercase tracking-wider">
                    Message
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-forest uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {displayed.map((enq, idx) => (
                  <tr
                    key={enq.id}
                    className="hover:bg-sage-light/30 transition-colors"
                    data-ocid={`enquiries.item.${idx + 1}`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-foreground">
                      {enq.customerName}
                    </td>
                    <td className="px-4 py-3 text-sm text-forest font-medium">
                      {enq.product}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">
                      {enq.message || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
                      {enq.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
