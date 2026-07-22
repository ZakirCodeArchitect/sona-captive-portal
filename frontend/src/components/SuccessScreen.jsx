import { CheckCircle2 } from 'lucide-react';
import { formatRegistrationTime } from '../utils/formatters';

export default function SuccessScreen({ registrationTime }) {
  return (
    <div className="flex flex-col items-center px-2 py-2 text-center animate-fade-in">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-tower-success-light/20">
        <CheckCircle2 className="h-7 w-7 text-tower-success-light" strokeWidth={1.5} />
      </div>
      <h2 className="mb-2 text-lg font-semibold text-tower-text">Registration Successful</h2>
      <p className="mb-3 max-w-sm text-sm leading-snug text-tower-text-secondary">
        You are now connected to Sona Tower Guest WiFi. You may close this page and start browsing.
      </p>
      {registrationTime && (
        <p className="text-[13px] text-tower-text-muted">
          Registered at {formatRegistrationTime(registrationTime)}
        </p>
      )}
    </div>
  );
}
