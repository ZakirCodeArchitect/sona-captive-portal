import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Building2,
  CreditCard,
  Lock,
  Phone,
  User,
} from 'lucide-react';
import FormField, { getInputClassName } from './FormField';
import TermsModal from './TermsModal';
import LoadingOverlay from './LoadingOverlay';
import { submitRegistration } from '../api/client';
import { formatCnic, formatPhone } from '../utils/formatters';
import {
  validateCnic,
  validateCompany,
  validateFullName,
  validatePhone,
  validateTerms,
} from '../utils/validation';

export default function RegistrationForm({ onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cnic: '',
      fullName: '',
      phoneNumber: '',
      company: '',
      acceptTerms: false,
    },
    mode: 'onBlur',
  });

  const acceptTerms = watch('acceptTerms');

  const onSubmit = async (data) => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const result = await submitRegistration({
        cnic: data.cnic,
        fullName: data.fullName.trim(),
        phoneNumber: data.phoneNumber,
        company: data.company.trim(),
      });

      onSuccess?.(result.data);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative flex flex-col gap-2.5">
        {isSubmitting && <LoadingOverlay />}

        <FormField id="cnic" label="CNIC" icon={CreditCard} error={errors.cnic?.message}>
          <input
            id="cnic"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="12345-1234567-1"
            className={getInputClassName({ hasError: !!errors.cnic, hasIcon: true })}
            {...register('cnic', {
              validate: validateCnic,
              onChange: (e) => setValue('cnic', formatCnic(e.target.value), { shouldValidate: false }),
            })}
          />
        </FormField>

        <FormField id="fullName" label="Full Name" icon={User} error={errors.fullName?.message}>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            className={getInputClassName({ hasError: !!errors.fullName, hasIcon: true })}
            {...register('fullName', { validate: validateFullName })}
          />
        </FormField>

        <FormField id="phoneNumber" label="Phone Number" icon={Phone} error={errors.phoneNumber?.message}>
          <input
            id="phoneNumber"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="03XX-XXXXXXX"
            className={getInputClassName({ hasError: !!errors.phoneNumber, hasIcon: true })}
            {...register('phoneNumber', {
              validate: validatePhone,
              onChange: (e) =>
                setValue('phoneNumber', formatPhone(e.target.value), { shouldValidate: false }),
            })}
          />
        </FormField>

        <FormField id="company" label="Company Name" icon={Building2} error={errors.company?.message}>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Enter your company name"
            className={getInputClassName({ hasError: !!errors.company, hasIcon: true })}
            {...register('company', { validate: validateCompany })}
          />
        </FormField>

        <div>
          <label className="flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-white/30 bg-white/5 accent-tower-gold focus:ring-2 focus:ring-tower-gold focus:ring-offset-0"
              {...register('acceptTerms', { validate: validateTerms })}
            />
            <span className="text-xs leading-snug text-tower-text-secondary">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="font-medium text-tower-gold underline-offset-2 transition-colors hover:text-tower-gold-bright hover:underline focus:outline-none focus:ring-2 focus:ring-tower-gold rounded-sm"
              >
                Terms & Conditions
              </button>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1.5 text-[13px] text-tower-error-light" role="alert">
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        {submitError && (
          <div
            className="rounded-xl border border-tower-error/40 bg-tower-error/10 px-4 py-3 text-sm text-tower-error-light"
            role="alert"
          >
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !acceptTerms}
          className="mt-1 flex h-10 w-full items-center justify-center rounded-xl bg-tower-green text-sm font-semibold text-white shadow-[0_4px_12px_rgba(27,67,50,0.35)] transition-all duration-200 hover:-translate-y-px hover:bg-tower-green-dark hover:shadow-[0_6px_16px_rgba(27,67,50,0.45)] focus:outline-none focus:ring-2 focus:ring-tower-gold focus:ring-offset-2 focus:ring-offset-tower-charcoal disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Connect to WiFi
        </button>

        <p className="text-center text-[11px] leading-snug text-tower-text-muted">
          <Lock className="mr-1 inline h-3 w-3 -translate-y-px" aria-hidden="true" />
          Your information is collected for security purposes and is not shared with third parties.
        </p>
      </form>

      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </>
  );
}
