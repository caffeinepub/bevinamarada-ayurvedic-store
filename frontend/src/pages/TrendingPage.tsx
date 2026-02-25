import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import TrendingStocksPanel from '../components/TrendingStocksPanel';

export default function TrendingPage() {
  return (
    <div className="p-4 md:p-6 space-y-5 bg-white min-h-full">
      <div className="flex items-center gap-3">
        <Link to="/admin" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <TrendingUp className="w-6 h-6 text-amber-500" />
        <h1 className="text-2xl font-black text-gray-900">Trending Products</h1>
      </div>
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <TrendingStocksPanel />
      </div>
    </div>
  );
}
