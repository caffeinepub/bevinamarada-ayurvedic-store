import { Link } from '@tanstack/react-router';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import IncomeTracking from '../components/IncomeTracking';

export default function IncomePage() {
  return (
    <div className="min-h-screen bg-neon-black p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin" className="text-gray-500 hover:text-neon-green transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <BarChart3 className="w-5 h-5 text-neon-green" />
        <h1 className="font-orbitron text-xl font-bold text-white">INCOME TRACKING</h1>
      </div>
      <IncomeTracking />
    </div>
  );
}
