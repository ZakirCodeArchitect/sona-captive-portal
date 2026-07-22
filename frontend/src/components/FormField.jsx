import { AlertCircle } from 'lucide-react';

export default function FormField({
  id,
  label,
  icon: Icon,
  error,
  children,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-tower-text-secondary">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tower-text-muted"
            aria-hidden="true"
          />
        )}
        {children}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-[13px] text-tower-error-light" role="alert">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export function getInputClassName({ hasError, hasIcon }) {
  return [
    'h-10 w-full rounded-lg border bg-white/[0.06] text-sm text-tower-text',
    'placeholder:text-tower-text-muted transition-all duration-200',
    'focus:outline-none focus:bg-white/10',
    hasIcon ? 'pl-9 pr-3' : 'px-3',
    hasError
      ? 'border-tower-error bg-tower-error/10 focus:border-tower-error focus:ring-4 focus:ring-tower-error/20'
      : 'border-white/14 focus:border-tower-gold focus:ring-4 focus:ring-tower-gold/25',
  ].join(' ');
}
