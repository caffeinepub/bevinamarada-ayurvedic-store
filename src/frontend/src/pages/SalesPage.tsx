import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import React from "react";
import TodaysSalesPanel from "../components/TodaysSalesPanel";

export default function SalesPage() {
  return (
    <div className="p-6 lg:p-8 page-enter">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/admin"
          data-ocid="sales.back.link"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Today's Sales
          </h1>
          <p className="text-muted-foreground text-sm">
            Sales transactions for today
          </p>
        </div>
      </div>
      <TodaysSalesPanel />
    </div>
  );
}
