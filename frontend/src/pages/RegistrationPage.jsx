import { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import SuccessScreen from '../components/SuccessScreen';

export default function RegistrationPage() {
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registrationTime, setRegistrationTime] = useState(null);

  const handleSuccess = (data) => {
    setRegistrationTime(data?.registrationTime);
    setRegistrationComplete(true);
  };

  return (
    <div className="relative flex h-dvh max-h-dvh flex-col overflow-hidden md:flex-row">
      {/* Mobile — soft light wash over building photo */}
      <div className="pointer-events-none fixed inset-0 md:hidden" aria-hidden="true">
        <img
          src="/sona-tower.png"
          alt=""
          className="h-full w-full scale-105 object-cover object-center blur-[12px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#e4e8e6]/90 via-[#e4e8e6]/95 to-[#d8dedb]" />
      </div>

      {/* Desktop — left panel, image fills entire half */}
      <div className="relative hidden overflow-hidden md:block md:h-full md:w-1/2">
        <img
          src="/sona-tower.png"
          alt="Sona Tower"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>

      {/* Form panel */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col bg-tower-dark/95 md:w-1/2 md:bg-tower-dark">
        <main className="flex flex-1 items-center justify-center overflow-hidden px-5 py-3 sm:px-8">
          <div className="w-full max-w-[400px] animate-fade-in-up">
            <header className="mb-4 text-center md:mb-5">
              <div className="mb-3 flex justify-center">
                <img
                  src="/sona-logo.png"
                  alt="Sona"
                  className="h-16 w-16 rounded-md object-contain shadow-md shadow-black/10 sm:h-[4.5rem] sm:w-[4.5rem]"
                />
              </div>
              <p className="mb-1 text-sm font-semibold tracking-[0.12em] text-tower-gold uppercase">
                Sona Tower
              </p>
              {!registrationComplete && (
                <>
                  <h1 className="text-lg font-semibold text-tower-text sm:text-xl">
                    Guest WiFi Registration
                  </h1>
                  <p className="mt-1 text-xs leading-snug text-tower-text-secondary sm:text-sm">
                    Welcome to Sona Tower. Please register to access guest internet.
                  </p>
                </>
              )}
            </header>

            {registrationComplete ? (
              <SuccessScreen registrationTime={registrationTime} />
            ) : (
              <RegistrationForm onSuccess={handleSuccess} />
            )}
          </div>
        </main>

        <footer className="shrink-0 px-4 pb-3 pt-1 text-center">
          <p className="text-[10px] text-tower-text-muted">
            © {new Date().getFullYear()} Sona Tower · Fauji Fertilizer Company Limited
          </p>
          <p className="mt-0.5 text-[10px] text-tower-text-muted">
            <a
              href="mailto:ithelp@ffc.com.pk"
              className="rounded-sm transition-colors hover:text-tower-gold focus:outline-none focus:ring-2 focus:ring-tower-gold"
            >
              IT Support
            </a>
            {' · '}
            <button
              type="button"
              className="rounded-sm transition-colors hover:text-tower-gold focus:outline-none focus:ring-2 focus:ring-tower-gold"
              onClick={() => {}}
            >
              Privacy Policy
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
}
