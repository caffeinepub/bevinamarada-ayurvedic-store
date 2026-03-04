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

  const cardStyle = {
    background: "oklch(0.14 0.008 250)",
    border: "1px solid oklch(0.22 0.015 250)",
  };

  return (
    <div className="p-6 lg:p-8 page-enter">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/admin"
          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "oklch(0.62 0.22 25 / 0.12)" }}
        >
          <MessageSquare className="w-5 h-5 text-destructive" />
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
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={
              tab === t
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
            {t === "all" ? "All Enquiries" : "Today's"}
            <span
              className="ml-2 px-1.5 py-0.5 rounded-full text-xs"
              style={
                tab === t
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
          className="rounded-xl py-16 text-center shadow-card"
          style={cardStyle}
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
        <div
          className="rounded-xl overflow-hidden shadow-card"
          style={cardStyle}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
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
                {displayed.map((enq, idx) => (
                  <tr
                    key={enq.id}
                    className="transition-colors"
                    style={{
                      borderBottom: "1px solid oklch(0.22 0.015 250 / 0.4)",
                    }}
                    data-ocid={`enquiries.item.${idx + 1}`}
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
                    <td className="px-4 py-3 text-sm font-medium text-foreground">
                      {enq.customerName}
                    </td>
                    <td className="px-4 py-3 text-sm text-primary font-medium">
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
