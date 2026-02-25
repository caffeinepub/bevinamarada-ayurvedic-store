import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, MessageSquare } from 'lucide-react';

interface Enquiry {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  message: string;
  date: string;
}

function loadEnquiries(): Enquiry[] {
  try {
    return JSON.parse(localStorage.getItem('ayurveda_enquiries') || '[]');
  } catch { return []; }
}

function isToday(dateStr: string): boolean {
  const today = new Date().toLocaleDateString('en-IN');
  return dateStr === today;
}

export default function EnquiryManagement() {
  const [tab, setTab] = useState<'all' | 'today'>('all');
  const enquiries = loadEnquiries();

  const displayed = tab === 'today' ? enquiries.filter(e => isToday(e.date)) : enquiries;

  return (
    <div className="min-h-screen bg-neon-black p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin" className="text-gray-500 hover:text-neon-green transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <MessageSquare className="w-5 h-5 text-neon-green" />
        <h1 className="font-orbitron text-xl font-bold text-white">ENQUIRIES</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'today'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-md text-xs font-mono font-medium transition-all duration-200 ${
              tab === t
                ? 'bg-neon-green/10 text-neon-green border border-neon-green/50'
                : 'text-gray-500 border border-transparent hover:text-neon-green hover:border-neon-green/20'
            }`}
          >
            {t === 'all' ? 'All Enquiries' : "Today's"}
            <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${t === tab ? 'bg-neon-green/20 text-neon-green' : 'bg-gray-800 text-gray-500'}`}>
              {t === 'all' ? enquiries.length : enquiries.filter(e => isToday(e.date)).length}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {displayed.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 font-mono text-sm">No enquiries found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((enq) => (
            <div key={enq.id} className="neon-card rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-rajdhani font-semibold text-white text-sm">{enq.customerName}</p>
                  <p className="text-neon-green text-xs font-mono mt-0.5">{enq.product}</p>
                  {enq.message && <p className="text-gray-500 text-xs font-mono mt-1 line-clamp-2">{enq.message}</p>}
                </div>
                <span className="text-xs font-mono text-gray-600 whitespace-nowrap">{enq.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
