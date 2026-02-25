import { Link } from '@tanstack/react-router';
import { ArrowLeft, DollarSign } from 'lucide-react';
import RevenueOverview from '../components/RevenueOverview';

export default function RevenuePage() {
  return (
    <div className="min-h-screen bg-neon-black p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin" className="text-gray-500 hover:text-neon-green transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <DollarSign className="w-5 h-5 text-neon-green" />
        <h1 className="font-orbitron text-xl font-bold text-white">REVENUE OVERVIEW</h1>
      </div>
      <RevenueOverview />
    </div>
  );
}
