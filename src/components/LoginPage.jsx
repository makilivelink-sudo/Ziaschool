import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_PASSWORD,
  createPortalSession,
  isPortalAuthenticated,
  setPortalSession,
} from '../utils/portalAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEMO_ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isPortalAuthenticated()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const allowed =
      normalizedEmail === DEMO_ADMIN_EMAIL.toLowerCase() && normalizedPassword === DEMO_ADMIN_PASSWORD;

    if (!allowed) {
      setMessage('Email ya password theek nahi hai.');
      setIsSubmitting(false);
      return;
    }

    setPortalSession(
      createPortalSession({
        email: normalizedEmail,
        role: 'admin',
        name: 'Admin',
      }),
    );

    navigate('/', { replace: true });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#143a7b_0%,#0e3f8e_45%,#d13f3f_100%)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%)]" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <div className="rounded-[34px] border border-white/18 bg-white/12 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-7">
            <div className="rounded-[28px] bg-white p-6 text-slate-900 shadow-[0_16px_45px_rgba(0,0,0,0.12)] sm:p-8">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-schoolRed">Portal</p>
                  <h1 className="mt-2 text-2xl font-bold text-schoolBlueDark">Login</h1>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-schoolBlueDark text-2xl text-white shadow-[0_12px_25px_rgba(20,58,123,0.22)]">
                  ★
                </div>
              </div>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter admin email"
                    className="input-field border-slate-200 bg-white"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    className="input-field border-slate-200 bg-white"
                  />
                </label>

                {message ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {message}
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-red w-full disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Please wait...' : 'Login'}
                  </button>
                  <Link to="/forms/staff-login" className="btn-outline-red w-full text-center">
                    Staff Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
