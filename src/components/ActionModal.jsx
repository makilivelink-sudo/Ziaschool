import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { submitSchoolInquiry } from '../utils/schoolApi';

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

function ModalField({ field, value, onChange, disabled = false }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-700">{field.label}</span>
      {field.type === 'textarea' ? (
        <textarea
          name={fieldName(field.label)}
          rows="4"
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="input-field resize-none border-slate-200 bg-white"
        />
      ) : (
        <input
          name={fieldName(field.label)}
          type={field.type || 'text'}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="input-field border-slate-200 bg-white"
        />
      )}
    </label>
  );
}

const modalConfigs = {
  login: {
    heading: 'Login',
    formType: 'login',
    fields: [
      { label: 'User Name', placeholder: 'Enter user name' },
      { label: 'Password', type: 'password', placeholder: 'Enter password' },
    ],
    button: 'Login',
  },
  staffLogin: {
    heading: 'Staff Login',
    formType: 'staff_login',
    fields: [
      { label: 'Staff ID', placeholder: 'Enter staff ID' },
      { label: 'Password', type: 'password', placeholder: 'Enter password' },
      { label: 'Department', placeholder: 'Department name' },
      { label: 'Mobile Number', placeholder: '03xx-xxxxxxx' },
    ],
    button: 'Login',
  },
  onlineAdmission: {
    heading: 'Online Admission',
    formType: 'online_admission_modal',
    fields: [
      { label: 'Student Name', placeholder: 'Student full name' },
      { label: 'Father Name', placeholder: 'Father name' },
      { label: 'Class', placeholder: 'Class you want to apply for' },
      { label: 'Contact Number', placeholder: 'Phone number' },
    ],
    button: 'Submit Admission',
  },
  complain: {
    heading: 'Complain',
    formType: 'complain',
    fields: [
      { label: 'Name', placeholder: 'Your name' },
      { label: 'Subject', placeholder: 'Complaint subject' },
      { label: 'Complaint Details', type: 'textarea', placeholder: 'Write your complaint here' },
    ],
    button: 'Send Complaint',
  },
  feedback: {
    heading: 'Feedback',
    formType: 'feedback',
    fields: [
      { label: 'Name', placeholder: 'Your name' },
      { label: 'Email', type: 'email', placeholder: 'Your email' },
      { label: 'Feedback', type: 'textarea', placeholder: 'Write your feedback here' },
    ],
    button: 'Send Feedback',
  },
  downloads: {
    heading: 'Downloads',
    formType: 'downloads',
    fields: [
      { label: 'Student Name', placeholder: 'Enter student name' },
      { label: 'Class', placeholder: 'Class or grade' },
      { label: 'Purpose', placeholder: 'What do you need to download?' },
    ],
    button: 'Request Download',
  },
  jobs: {
    heading: 'Jobs',
    formType: 'jobs',
    fields: [
      { label: 'Applicant Name', placeholder: 'Your name' },
      { label: 'Position', placeholder: 'Position applied for' },
      { label: 'Email', type: 'email', placeholder: 'Your email' },
      { label: 'CV Note', type: 'textarea', placeholder: 'Brief note about your experience' },
    ],
    button: 'Apply Now',
  },
};

export default function ActionModal({ open, title, variant, onClose }) {
  const content = modalConfigs[variant];
  const [values, setValues] = useState(() => buildInitialValues(content?.fields || []));
  const [submitState, setSubmitState] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setValues(buildInitialValues(content?.fields || []));
    setSubmitState({ type: '', message: '' });
  };

  const sanitizedHeading = useMemo(() => content?.heading || title, [content, title]);

  useEffect(() => {
    if (content) {
      setValues(buildInitialValues(content.fields));
      setSubmitState({ type: '', message: '' });
    }
  }, [content, variant]);

  if (!open) return null;

  if (!content) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ type: '', message: '' });

    try {
      await submitSchoolInquiry(content.formType, values);
      setSubmitState({
        type: 'success',
        message: 'Your request has been submitted. Our team will contact you shortly.',
      });
      resetForm();
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-black/55 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="relative z-[1001] my-auto w-full max-w-2xl max-h-[calc(100vh-3rem)] overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-schoolBlue">Zia Public High School</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{sanitizedHeading}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-lg leading-none text-slate-600"
          >
            ×
          </button>
        </div>

        {variant === 'about' ? (
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
            <p>Zia Public High School Bhalwal is committed to disciplined, value-driven learning for every student.</p>
            <p>Use the main page to explore school overview, programs, and quick access links.</p>
            <Link to="/page/chairman-message" onClick={onClose} className="btn-red w-full sm:w-auto">
              Open Chairman Message
            </Link>
          </div>
        ) : (
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {content.fields.map((field) => (
                <ModalField
                  key={field.label}
                  field={field}
                  value={values[fieldName(field.label)]}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              ))}
            </div>

            {submitState.message ? (
              <div
                className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-medium ${
                  submitState.type === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    : 'border-red-200 bg-red-50 text-red-700'
                }`}
              >
                {submitState.message}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="btn-red w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? 'Please wait...' : content.button}
              </button>
              <button type="button" onClick={resetForm} className="btn-outline-red w-full sm:w-auto">
                Reset
              </button>
              <button type="button" onClick={onClose} className="btn-outline-red w-full sm:w-auto">
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
