import { Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3 } from "lucide-react";
import React from "react";
import RevenueOverview from "../components/RevenueOverview";

export default function RevenuePage() {
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
        <div className="w-10 h-10 rounded-xl gradient-card-green flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Revenue Overview
          </h1>
          <p className="text-muted-foreground text-sm">
            Comprehensive revenue analysis
          </p>
        </div>
      </div>
      <RevenueOverview />
    </div>
  );
}
