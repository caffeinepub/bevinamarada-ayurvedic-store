import { Link } from "@tanstack/react-router";
import { ArrowLeft, IndianRupee } from "lucide-react";
import React from "react";
import IncomeTracking from "../components/IncomeTracking";

export default function IncomePage() {
  return (
    <div className="p-6 lg:p-8 page-enter">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/admin"
          data-ocid="income.back.link"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "oklch(0.72 0.18 200 / 0.12)" }}
        >
          <IndianRupee
            className="w-5 h-5"
            style={{ color: "oklch(0.72 0.18 200)" }}
          />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Income Tracking
          </h1>
          <p className="text-muted-foreground text-sm">
            Monitor your store's income over time
          </p>
        </div>
      </div>
      <IncomeTracking />
    </div>
  );
}
