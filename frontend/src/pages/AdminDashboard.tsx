import { Link } from '@tanstack/react-router';
import { LayoutDashboard, Package, Users, BarChart3, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-500 to-sage-600 flex items-center justify-center">
          <LayoutDashboard className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-forest-800 font-display">Dashboard</h1>
          <p className="text-forest-500 text-sm">Bevinamarada Ayurvedic Store</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/stock"
          className="bg-white rounded-2xl p-6 border border-forest-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-forest-800">Stock</span>
          </div>
          <ArrowRight className="w-4 h-4 text-forest-400 group-hover:text-forest-600 transition-colors" />
        </Link>

        <Link
          to="/admin/customers"
          className="bg-white rounded-2xl p-6 border border-forest-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-500 to-sage-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-forest-800">Customers</span>
          </div>
          <ArrowRight className="w-4 h-4 text-forest-400 group-hover:text-forest-600 transition-colors" />
        </Link>

        <Link
          to="/admin/sales-reports"
          className="bg-white rounded-2xl p-6 border border-forest-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-forest-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-forest-800">Reports</span>
          </div>
          <ArrowRight className="w-4 h-4 text-forest-400 group-hover:text-forest-600 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
