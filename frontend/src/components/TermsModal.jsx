import { X } from 'lucide-react';

const TERMS_TEXT = `Guest WiFi Terms & Conditions

By connecting to Sona Tower Guest WiFi, you agree to the following:

1. This network is provided for legitimate guest use during your visit to Sona Tower.
2. You must provide accurate registration information including your CNIC, full name, phone number, and company name.
3. Internet access is subject to Sona Tower's acceptable use policies. Illegal activities, unauthorized access, and misuse of the network are strictly prohibited.

For assistance, contact the Sona Tower IT Help Desk.`;

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-title"
      onClick={onClose}
    >
      <div
        className="glass-card max-h-[80dvh] w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/8 px-6 py-4">
          <h2 id="terms-title" className="text-lg font-semibold text-tower-text">
            Terms & Conditions
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-tower-text-secondary transition-colors hover:bg-black/5 hover:text-tower-text focus:outline-none focus:ring-2 focus:ring-tower-gold"
            aria-label="Close terms"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-4">
          <p className="whitespace-pre-line text-sm leading-relaxed text-tower-text-secondary">
            {TERMS_TEXT}
          </p>
        </div>
        <div className="border-t border-black/8 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-2xl bg-tower-green font-semibold text-white transition-all hover:bg-tower-green-dark focus:outline-none focus:ring-2 focus:ring-tower-gold focus:ring-offset-2 focus:ring-offset-white"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
