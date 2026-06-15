const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8000/api';

export function getSchoolApiBaseUrl() {
  return (import.meta.env.VITE_SCHOOL_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');
}

export function buildInquiryPayload(formType, values = {}, meta = {}) {
  // Keep the exact field names from the form so the backend can store them 1:1.
  const exactValues = { ...values };

  return {
    form_type: formType,
    name:
      values.name ||
      values.student_name ||
      values.applicant_name ||
      values.staff_id ||
      values.user_name ||
      null,
    email: values.email || null,
    contact_number: values.contact_number || values.mobile_number || values.phone || null,
    subject:
      values.subject ||
      values.class_applying_for ||
      values.position ||
      values.department ||
      values.purpose ||
      null,
    message:
      values.message ||
      values.feedback ||
      values.complaint_details ||
      values.cv_note ||
      values.address ||
      values.previous_school ||
      null,
    fields: exactValues,
    payload: exactValues,
    source_url: meta.sourceUrl || (typeof window !== 'undefined' ? window.location.href : null),
  };
}

export async function submitSchoolInquiry(formType, values = {}, meta = {}) {
  const response = await fetch(`${getSchoolApiBaseUrl()}/school-inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(buildInquiryPayload(formType, values, meta)),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.status === false) {
    throw new Error(data.message || 'Unable to submit the form right now.');
  }

  return data;
}

export async function submitChatLog(userMessage, botReply) {
  const response = await fetch(`${getSchoolApiBaseUrl()}/chat-logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      user_message: userMessage,
      bot_reply: botReply,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.status === false) {
    throw new Error(data.message || 'Unable to save the chat message right now.');
  }

  return data;
}

export async function fetchAdminSchoolData() {
  const response = await fetch(`${getSchoolApiBaseUrl()}/admin/school-data`, {
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.status === false) {
    throw new Error(data.message || 'Unable to load admin data right now.');
  }

  return data;
}
