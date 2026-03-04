import { Link } from "@tanstack/react-router";
import { ArrowLeft, DollarSign } from "lucide-react";
import React from "react";
import IncomeTracking from "../components/IncomeTracking";

export default function IncomePage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-forest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl gradient-card-teal flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-white" />
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
