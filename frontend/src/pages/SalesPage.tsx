import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import TodaysSalesPanel from '../components/TodaysSalesPanel';

export default function SalesPage() {
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
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-extrabold text-foreground">
              Today's Sales
            </h1>
            <p className="text-muted-foreground font-semibold text-sm mt-0.5">
              All sales transactions recorded today
            </p>
          </div>
        </div>
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <TodaysSalesPanel />
      </div>
    </div>
  );
}
