import { useGetTrialStatus } from '../hooks/useQueries';
import { AlertTriangle, Clock } from 'lucide-react';

export default function TrialStatusBanner() {
  const { data: trialStatus } = useGetTrialStatus();

  if (!trialStatus || !trialStatus.trialActive) return null;

  const daysRemaining = Number(trialStatus.daysRemaining);
  const isUrgent = daysRemaining <= 2;

  return (
    <div className={`px-4 py-2 text-sm flex items-center gap-2 ${
      isUrgent
        ? 'bg-red-50 text-red-700 border-b border-red-200'
        : 'bg-amber-50 text-amber-700 border-b border-amber-200'
    }`}>
      {isUrgent ? (
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
      ) : (
        <Clock className="w-4 h-4 flex-shrink-0" />
      )}
      <span>
        {isUrgent
          ? `⚠️ Trial expires in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}! Please upgrade to continue.`
          : `Trial period: ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining.`
        }
      </span>
    </div>
  );
}
