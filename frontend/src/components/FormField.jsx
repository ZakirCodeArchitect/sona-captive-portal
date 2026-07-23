import { AlertCircle } from 'lucide-react';

export default function FormField({
  id,
  label,
  icon: Icon,
  error,
  optional = false,
  required = false,
  children,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-tower-text-secondary">
        {label}
        {required && <span className="ml-0.5 text-tower-error" aria-hidden="true">*</span>}
        {optional && (
          <span className="ml-1 font-normal text-tower-text-muted">(optional)</span>
        )}
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
        <p className="flex items-center gap-1.5 text-[13px] text-tower-error" role="alert">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export function getInputClassName({ hasError, hasIcon }) {
  return [
    'h-10 w-full rounded-lg border bg-white text-sm text-tower-text',
    'placeholder:text-tower-text-muted transition-all duration-200',
    'focus:outline-none focus:bg-white',
    hasIcon ? 'pl-9 pr-3' : 'px-3',
    hasError
      ? 'border-tower-error bg-tower-error/5 focus:border-tower-error focus:ring-4 focus:ring-tower-error/15'
      : 'border-black/10 focus:border-tower-gold focus:ring-4 focus:ring-tower-gold/20',
  ].join(' ');
}
