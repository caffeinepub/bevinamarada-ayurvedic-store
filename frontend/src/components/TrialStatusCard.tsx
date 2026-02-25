import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetTrialStatus } from '../hooks/useQueries';

function formatExpiryDateLong(trialStartTime: bigint): string {
  const startMs = Number(trialStartTime) / 1_000_000;
  const expiryMs = startMs + 7 * 24 * 60 * 60 * 1000;
  const expiry = new Date(expiryMs);
  return expiry.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function TrialStatusCard() {
  const { data: trialStatus, isLoading } = useGetTrialStatus();

  if (isLoading) {
    return (
      <Card className="rounded-2xl shadow-md border-2 border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-gray-500">Trial Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-100 rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (!trialStatus || trialStatus.trialStartTime === 0n) {
    return null;
  }

  const { trialActive, daysRemaining, trialStartTime } = trialStatus;
  const days = Number(daysRemaining);
  const expiryDate = formatExpiryDateLong(trialStartTime);

  const isExpired = !trialActive;
  const isUrgent = trialActive && days <= 2;

  const cardClass = isExpired
    ? 'rounded-2xl shadow-md border-2 border-red-400 bg-red-50'
    : isUrgent
    ? 'rounded-2xl shadow-md border-2 border-orange-400 bg-orange-50'
    : 'rounded-2xl shadow-md border-2 border-green-200 bg-green-50';

  const titleColor = isExpired ? 'text-red-700' : isUrgent ? 'text-orange-700' : 'text-green-700';
  const valueColor = isExpired ? 'text-red-800' : isUrgent ? 'text-orange-800' : 'text-green-800';

  return (
    <Card className={cardClass}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className={`text-sm font-bold ${titleColor}`}>Trial Status</CardTitle>
        {isExpired ? (
          <XCircle className="w-5 h-5 text-red-500" />
        ) : (
          <Clock className={`w-5 h-5 ${isUrgent ? 'text-orange-500' : 'text-green-500'}`} />
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          {isExpired ? (
            <Badge variant="destructive" className="font-black text-xs">EXPIRED</Badge>
          ) : (
            <Badge className={`font-black text-xs ${isUrgent ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`}>
              ACTIVE
            </Badge>
          )}
        </div>
        {isExpired ? (
          <p className={`text-lg font-black ${valueColor}`}>Trial Ended</p>
        ) : (
          <p className={`text-3xl font-black ${valueColor}`}>
            {days} <span className="text-base font-bold">day{days !== 1 ? 's' : ''} left</span>
          </p>
        )}
        <div className={`text-xs font-bold ${titleColor}`}>
          Expires: <span className="font-black">{expiryDate}</span>
        </div>
        {isUrgent && !isExpired && (
          <p className="text-xs font-black text-orange-700 animate-pulse">⚠ Expiring Soon! Contact support.</p>
        )}
        {isExpired && (
          <p className="text-xs font-black text-red-700">Contact support to continue using the app.</p>
        )}
      </CardContent>
    </Card>
  );
}
