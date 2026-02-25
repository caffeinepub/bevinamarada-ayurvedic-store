import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { useGetTrialStatus } from '../hooks/useQueries';

function formatExpiryDate(trialStartTime: bigint): string {
  // trialStartTime is in nanoseconds
  const startMs = Number(trialStartTime) / 1_000_000;
  const expiryMs = startMs + 7 * 24 * 60 * 60 * 1000;
  const expiry = new Date(expiryMs);
  const day = String(expiry.getDate()).padStart(2, '0');
  const month = String(expiry.getMonth() + 1).padStart(2, '0');
  const year = expiry.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function TrialStatusBanner() {
  const { data: trialStatus, isLoading } = useGetTrialStatus();

  if (isLoading || !trialStatus) return null;

  const { trialActive, daysRemaining, trialStartTime } = trialStatus;

  if (trialStartTime === 0n) return null;

  if (!trialActive) {
    return (
      <div className="w-full bg-red-600 text-white px-4 py-3 flex items-center gap-3 shadow-md">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <p className="font-black text-base tracking-wide">
          ⛔ TRIAL EXPIRED — Your 7-day free trial has ended. All admin actions are disabled. Please contact support to continue.
        </p>
      </div>
    );
  }

  const days = Number(daysRemaining);
  const expiryDate = formatExpiryDate(trialStartTime);
  const isUrgent = days <= 2;

  return (
    <div
      className={`w-full px-4 py-2.5 flex items-center gap-3 shadow-sm ${
        isUrgent
          ? 'bg-orange-500 text-white'
          : 'bg-amber-50 text-amber-900 border-b border-amber-200'
      }`}
    >
      <Clock className={`w-4 h-4 flex-shrink-0 ${isUrgent ? 'text-white' : 'text-amber-600'}`} />
      <p className={`text-sm ${isUrgent ? 'font-black' : 'font-bold'}`}>
        🕐 Free Trial:{' '}
        <span className="font-black">{days} day{days !== 1 ? 's' : ''} remaining</span>
        {' · '}
        Expires on: <span className="font-black underline">{expiryDate}</span>
        {isUrgent && <span className="ml-2 font-black animate-pulse">⚠ Expiring Soon!</span>}
      </p>
    </div>
  );
}
