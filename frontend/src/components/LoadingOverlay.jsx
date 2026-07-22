import { Loader2 } from 'lucide-react';

export default function LoadingOverlay({ message = 'Connecting you to WiFi…' }) {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[20px] bg-tower-dark/60 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Submitting registration"
    >
      <Loader2 className="h-8 w-8 animate-spin text-tower-text" aria-hidden="true" />
      <p className="mt-4 text-sm text-tower-text-secondary">{message}</p>
    </div>
  );
}
