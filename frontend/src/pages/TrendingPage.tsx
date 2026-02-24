import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import TrendingStocksPanel from '../components/TrendingStocksPanel';

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-6 animate-fade-in-up">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-primary/80 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-foreground">
              Trending Products
            </h1>
            <p className="text-muted-foreground font-semibold text-sm mt-0.5">
              Products currently marked as trending
            </p>
          </div>
        </div>
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <TrendingStocksPanel />
      </div>
    </div>
  );
}
