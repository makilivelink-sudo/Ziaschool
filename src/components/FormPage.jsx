import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitSchoolInquiry } from '../utils/schoolApi';
import { createPortalSession, isPortalAuthenticated, setPortalSession } from '../utils/portalAuth';

const pageConfigs = {
  'staff-login': {
    badge: 'Staff Portal',
    title: 'Staff Login',
    subtitle: 'Use your school credentials to access the staff area.',
    background: '',
    accent: 'from-schoolBlueDark/78 via-schoolBlueDark/46 to-schoolRed/62',
    adminName: 'Admin Office',
    whatsappNumber: '+92 300 1234567',
    phoneNumber: '+92 301 2345678',
    mapQuery: 'Zia Public High School Bhalwal campus locations',
    campusNotes: [
      'Main Campus',
      'Zia Girls High School',
      'Toheed Campus',
      'Amina Girls',
      'Hostel',
      'Zia Ul Quran',
      'Phularwan',
      'Hadi Pura',
      'Nabi Shah',
      'Al Fazal Town',
      'Mohgian Campus',
    ],
    button: 'Sign In',
    fields: [
      { label: 'Staff ID', placeholder: 'Enter your staff ID' },
      { label: 'Password', type: 'password', placeholder: 'Enter your password' },
      { label: 'Department', placeholder: 'Department name' },
      { label: 'Mobile Number', placeholder: '03xx-xxxxxxx' },
    ],
    extra: 'Forgot password?',
  },
  'online-admission': {
    badge: 'ADMIN',
    title: 'Choudhary Waheed',
    subtitle: 'Contact admin for admission support and school assistance.',
    background: '/zia/hero/07.png',
    accent: 'from-schoolBlueDark/14 via-white/4 to-schoolRed/10',
    adminName: 'Choudhary Waheed',
    whatsappNumber: '+92 300 8600135',
    phoneNumber: '+92 300 8600135',
    mapQuery: 'Zia Public High School Bhalwal campus locations',
    campusNotes: [
      'Main Campus',
      'Zia Girls High School',
      'Toheed Campus',
      'Amina Girls',
      'Hostel',
      'Zia Ul Quran',
      'Phularwan',
      'Hadi Pura',
      'Nabi Shah',
      'Al Fazal Town',
      'Mohgian Campus',
    ],
    button: 'Contact Admin',
    fields: [
      { label: 'Student Name', placeholder: 'Student full name' },
      { label: 'Father Name', placeholder: 'Father / guardian name' },
      { label: 'Class Applying For', placeholder: 'Nursery, Prep, 1...' },
      { label: 'Date of Birth', type: 'date', placeholder: 'Date of birth' },
      { label: 'Previous School', placeholder: 'Previous school name' },
      { label: 'Contact Number', placeholder: '03xx-xxxxxxx' },
      { label: 'Home Address', type: 'textarea', placeholder: 'Enter complete address' },
    ],
    extra: 'Need help with admission?',
  },
};

function fieldName(label) {
  return label
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function buildInitialValues(fields) {
  return fields.reduce((acc, field) => {
    acc[fieldName(field.label)] = '';
    return acc;
  }, {});
}

function FormField({ field, value, onChange, disabled = false }) {
  const inputClass =
    'mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-schoolBlueDark focus:ring-2 focus:ring-schoolBlueDark/15';
  const name = fieldName(field.label);

  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{field.label}</span>
      {field.type === 'textarea' ? (
        <textarea
          name={name}
          rows="4"
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={inputClass}
        />
      ) : (
        <input
          name={name}
          type={field.type || 'text'}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={inputClass}
        />
      )}
    </label>
  );
}

function ContactItem({ label, value, href }) {
  const content = (
    <div className="rounded-2xl border border-white/20 bg-white/15 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}

export default function FormPage({ variant }) {
  const config = pageConfigs[variant];
  const showInfoPanel = variant === 'online-admission' || variant === 'staff-login';
  const navigate = useNavigate();
  const initialFields = config?.fields || [];
  const [formValues, setFormValues] = useState(() => buildInitialValues(initialFields));
  const [submitState, setSubmitState] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (variant === 'staff-login' && isPortalAuthenticated()) {
      navigate('/', { replace: true });
    }
  }, [navigate, variant]);

  if (!config) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ type: '', message: '' });

    if (variant === 'staff-login') {
      setPortalSession(
        createPortalSession({
          email: formValues.staff_id || 'staff@zia.edu.pk',
          role: 'staff',
          name: formValues.department || 'Staff',
        }),
      );

      setSubmitState({
        type: 'success',
        message: 'Staff login successful. Redirecting to the website...',
      });

      setIsSubmitting(false);
      window.setTimeout(() => {
        navigate('/', { replace: true });
      }, 700);
      return;
    }

    try {
      await submitSchoolInquiry(variant, formValues);
      setSubmitState({
        type: 'success',
        message:
          variant === 'online-admission'
            ? 'Admission request submitted successfully. Our team will contact you shortly.'
            : 'Your request has been submitted successfully. Our team will contact you shortly.',
      });
      setFormValues(buildInitialValues(config.fields));
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          variant === 'staff-login'
            ? 'linear-gradient(135deg, #143a7b 0%, #0e3f8e 52%, #d13f3f 100%)'
            : '#f5f7fb',
      }}
    >
      {config.background ? (
        <img
          src={config.background}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{
            objectPosition: variant === 'online-admission' ? 'center 26%' : 'center center',
            filter:
              variant === 'online-admission'
                ? 'saturate(1.1) contrast(1.05) brightness(1.02)'
                : 'saturate(1.02) contrast(1.02) brightness(0.92)',
          }}
        />
      ) : null}
      <div className={`absolute inset-0 z-10 bg-gradient-to-br ${config.accent}`} />
      <div
        className={`absolute inset-0 z-20 ${
          variant === 'online-admission'
            ? 'bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_26%)]'
            : 'bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]'
        }`}
      />

      <div className="relative z-30 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className={`grid gap-6 ${showInfoPanel ? 'lg:grid-cols-[1.1fr_0.95fr] lg:items-center' : 'place-items-center'}`}>
            {showInfoPanel && (
              <div className="rounded-[32px] border border-white/16 bg-white/10 p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.14)] backdrop-blur-md sm:p-8 lg:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-schoolBlueDark/85">{config.badge}</p>
                <h1 className="mt-3 text-3xl font-black text-schoolBlueDark sm:text-4xl">{config.title}</h1>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/85 sm:text-base">{config.subtitle}</p>

                <div className="mt-8 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ContactItem
                      label="Phone"
                      value={config.phoneNumber}
                      href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                    />
                  </div>

                  <div className="rounded-2xl border border-white/14 bg-white/8 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.1)] backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">Campus Locations</p>
                    <p className="mt-2 text-sm text-white/90">
                      Main and branch campus locations are shown below. You can update these later with exact pins.
                    </p>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-white/14 bg-white/8">
                      <iframe
                        title="Campus locations map"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(config.mapQuery)}&output=embed`}
                        className="h-64 w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {config.campusNotes.map((campus) => (
                        <span
                          key={campus}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90"
                        >
                          {campus}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`rounded-[34px] border p-5 shadow-[0_26px_80px_rgba(0,0,0,0.22)] sm:p-7 ${
                showInfoPanel
                  ? 'border-white/18 bg-[linear-gradient(135deg,rgba(20,58,123,0.94)_0%,rgba(20,58,123,0.82)_48%,rgba(209,63,63,0.88)_100%)]'
                  : 'w-full max-w-2xl border-white/20 bg-[#0e3f8e]/92'
              }`}
            >
              <div className="rounded-[28px] bg-white p-5 shadow-[0_16px_45px_rgba(0,0,0,0.16)] sm:p-6">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-schoolRed">{config.badge}</p>
                    <h2 className="mt-2 text-2xl font-bold text-schoolBlueDark">
                      {variant === 'online-admission' ? 'Online Admission' : config.title}
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-schoolBlueDark text-2xl text-white shadow-[0_12px_25px_rgba(20,58,123,0.22)]">
                    ★
                  </div>
                </div>

                <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                  {config.fields.map((field) => (
                    <FormField
                      key={field.label}
                      field={field}
                      value={formValues[fieldName(field.label)]}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  ))}

                  {submitState.message ? (
                    <div
                      className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                        submitState.type === 'success'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border-red-200 bg-red-50 text-red-700'
                      }`}
                    >
                      {submitState.message}
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-red w-full disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? 'Please wait...' : config.button}
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormValues(buildInitialValues(config.fields))}
                      className="btn-outline-red w-full"
                    >
                      Reset
                    </button>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-xl border border-schoolRed px-5 py-3 text-sm font-bold text-schoolRed transition hover:bg-schoolRed hover:text-white sm:w-auto"
                  >
                    {config.extra}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
