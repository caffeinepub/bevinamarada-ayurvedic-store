import { useGetTrialStatus } from '../hooks/useQueries';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function TrialStatusCard() {
  const { data: trialStatus, isLoading } = useGetTrialStatus();

  if (isLoading) return null;
  if (!trialStatus) return null;

  const daysRemaining = Number(trialStatus.daysRemaining);
  const isActive = trialStatus.trialActive;
  const isUrgent = isActive && daysRemaining <= 2;

  return (
    <div className={`rounded-2xl p-4 border ${
      !isActive
        ? 'bg-gray-50 border-gray-200'
        : isUrgent
        ? 'bg-red-50 border-red-200'
        : 'bg-amber-50 border-amber-200'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          !isActive ? 'bg-gray-200' : isUrgent ? 'bg-red-100' : 'bg-amber-100'
        }`}>
          {!isActive ? (
            <CheckCircle className="w-5 h-5 text-gray-500" />
          ) : isUrgent ? (
            <AlertTriangle className="w-5 h-5 text-red-500" />
          ) : (
            <Clock className="w-5 h-5 text-amber-600" />
          )}
        </div>
        <div>
          <p className={`font-semibold text-sm ${
            !isActive ? 'text-gray-700' : isUrgent ? 'text-red-700' : 'text-amber-700'
          }`}>
            {!isActive ? 'Trial Ended' : isUrgent ? 'Trial Expiring Soon!' : 'Trial Active'}
          </p>
          <p className={`text-xs ${
            !isActive ? 'text-gray-500' : isUrgent ? 'text-red-600' : 'text-amber-600'
          }`}>
            {!isActive
              ? 'Your trial period has ended'
              : `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
