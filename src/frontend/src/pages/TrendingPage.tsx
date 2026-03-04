import { Link } from "@tanstack/react-router";
import { ArrowLeft, TrendingUp } from "lucide-react";
import React from "react";
import TrendingStocksPanel from "../components/TrendingStocksPanel";

export default function TrendingPage() {
  return (
    <div className="p-6 lg:p-8 page-enter">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/admin"
          data-ocid="trending.back.link"
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
          <TrendingUp
            className="w-5 h-5"
            style={{ color: "oklch(0.72 0.18 200)" }}
          />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Trending Products
          </h1>
          <p className="text-muted-foreground text-sm">
            Products currently marked as trending
          </p>
        </div>
      </div>
      <TrendingStocksPanel />
    </div>
  );
}
