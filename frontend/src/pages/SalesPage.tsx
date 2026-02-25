import { Link } from '@tanstack/react-router';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import TodaysSalesPanel from '../components/TodaysSalesPanel';

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-neon-black p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin" className="text-gray-500 hover:text-neon-green transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <TrendingUp className="w-5 h-5 text-neon-green" />
        <h1 className="font-orbitron text-xl font-bold text-white">TODAY'S SALES</h1>
      </div>
      <TodaysSalesPanel />
    </div>
  );
}
