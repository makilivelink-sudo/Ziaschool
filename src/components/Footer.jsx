import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { footerLogo } from '../data/siteData';
import FallbackImage from './FallbackImage';
import ActionModal from './ActionModal';
import { submitSchoolInquiry } from '../utils/schoolApi';

const socialLinks = [
  {
    label: 'WhatsApp',
    bg: '#25D366',
    href: '#',
    icon: (
      <path d="M20.5 4.5A11.1 11.1 0 0 0 3.6 18.2L2.5 22l3.9-1A11.1 11.1 0 0 0 20.5 4.5Zm-5.1 12.4c-.2.5-1.1 1-1.6 1.1-.4.1-.9.1-1.4 0-.4-.1-.9-.2-1.5-.4-2.6-1-4.4-3.6-4.5-3.8-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2.1 1-2.4.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.8c.1.3.1.5 0 .7-.1.2-.2.4-.4.6l-.3.4c-.1.1-.2.3-.1.5.1.2.4.9.9 1.5.7.9 1.4 1.4 2.2 1.8.2.1.4.1.6 0 .2-.1.4-.3.6-.5l.5-.7c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.3.4.6.1.2 0 .5-.1.7Z" />
    ),
  },
  {
    label: 'Facebook',
    bg: '#1877F2',
    href: '#',
    icon: <path d="M13.5 22v-8.2H16l.4-3.1h-2.9V8.7c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.4-.1-2.7-.1-2.8 0-4.6 1.7-4.6 4.8v1.7H6.8v3.1h2.5V22h4.2Z" />,
  },
  {
    label: 'LinkedIn',
    bg: '#0A66C2',
    href: '#',
    icon: (
      <path d="M6.5 6.8A1.8 1.8 0 1 1 6.4 3a1.8 1.8 0 0 1 .1 3.8ZM4.9 21V8.7h3.2V21H4.9Zm5.3 0V8.7h3.1v1.7h.1c.4-.8 1.5-2 3.2-2 3.4 0 4 2.2 4 5V21h-3.2v-6.1c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21h-3.2Z" />
    ),
  },
];

function fieldName(label) {
  return label
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export default function Footer() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSection = (id) => {
    navigate('/');
    window.setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await submitSchoolInquiry('footer_contact', values);
      setStatus({
        type: 'success',
        message: 'Thanks. Your message has been sent and our team will contact you shortly.',
      });
      setValues({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to send your message right now.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <footer className="bg-[#0e3f8e] text-white">
        <div className="container-page py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-4">
            <div>
              <FallbackImage
                src={footerLogo.src}
                originalSrc={footerLogo.original}
                alt="Footer logo"
                className="h-16 w-16 overflow-hidden rounded-full bg-white p-1 sm:h-20 sm:w-20"
                imgClassName="h-full w-full rounded-full object-cover"
              />
              <p className="mt-4 max-w-xs text-sm leading-7 text-white/90">
                Our School is the best in Punjab
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[0_12px_25px_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5"
                    style={{ backgroundColor: item.bg, color: item.fg || '#ffffff' }}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      {item.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">Quick Links</h3>
              <div className="mt-4 space-y-1 text-[15px] font-semibold tracking-wide text-white/90">
                {[
                  { label: 'Home', action: openHome, kind: 'link', href: '/' },
                  { label: 'About Us', action: () => openSection('about'), kind: 'button' },
                  { label: 'Complain', action: () => setModal('complain'), kind: 'button' },
                  { label: 'Feedback', action: () => setModal('feedback'), kind: 'button' },
                ].map((item) => {
                  const sharedClass =
                    'group flex w-full items-center justify-between py-2 text-left transition duration-300 hover:text-white';

                  if (item.kind === 'link') {
                    return (
                      <Link key={item.label} to={item.href} onClick={item.action} className={sharedClass}>
                        <span>{item.label}</span>
                        <span className="opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                          -&gt;
                        </span>
                      </Link>
                    );
                  }

                  return (
                    <button key={item.label} type="button" onClick={item.action} className={sharedClass}>
                      <span>{item.label}</span>
                      <span className="opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        -&gt;
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="text-xl font-bold">Address</h3>
              <div className="mt-4 space-y-3 text-sm leading-7 text-white/90 break-words">
                <p>Chak No 5 SB. Bhalwal</p>
                <p>0322-6644145</p>
                <p className="max-w-full break-words">waheed_zps@yahoo.com</p>
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="text-xl font-bold">Contact Form</h3>
              <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name={fieldName('Name')}
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="input-field w-full border-white/20 bg-white text-slate-900 placeholder:text-slate-500"
                />
                <input
                  type="email"
                  name={fieldName('Email')}
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="input-field w-full border-white/20 bg-white text-slate-900 placeholder:text-slate-500"
                />
                <textarea
                  rows="4"
                  name={fieldName('Message')}
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="input-field w-full border-white/20 bg-white text-slate-900 placeholder:text-slate-500"
                />
                {status.message ? (
                  <div
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      status.type === 'success'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-red-200 bg-red-50 text-red-700'
                    }`}
                  >
                    {status.message}
                  </div>
                ) : null}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-red w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 border-t border-white/20 pt-6 text-center text-xs font-medium text-white/90 sm:text-sm">
            Zia School 2021. All Rights Reserved | Zia Public High School Bhalwal
          </div>
        </div>
      </footer>

      <ActionModal
        open={Boolean(modal)}
        title={modal === 'complain' ? 'Complain' : 'Feedback'}
        variant={modal || 'complain'}
        onClose={() => setModal(null)}
      />
    </>
  );
}
