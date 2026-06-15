import { useMemo, useState } from 'react';
import { submitChatLog } from '../utils/schoolApi';

const botAnswers = [
  {
    match: ['hello', 'hi', 'hey', 'assalam', 'salam'],
    reply: 'How can I help you today?',
  },
  {
    match: ['admission', 'admissions', 'apply'],
    reply: 'Admission details are handled by our team. They will contact you shortly with the information you need.',
  },
  {
    match: ['staff', 'login'],
    reply: 'Staff Login opens in a new tab from the top bar. Use your staff credentials to continue.',
  },
  {
    match: ['timing', 'time', 'school time'],
    reply: 'Our team will contact you shortly with the school timings.',
  },
  {
    match: ['contact', 'phone', 'whatsapp'],
    reply: 'Our team will contact you on the number you share, or you can use WhatsApp for a quick follow-up.',
  },
  {
    match: ['fee', 'fees', 'fees structure', 'admission fee', 'information', 'details', 'location', 'map'],
    reply: 'Thanks for asking. Our team will contact you shortly with the required information.',
  },
];

function getBotReply(message, profile) {
  const normalized = message.toLowerCase();
  const match = botAnswers.find((item) => item.match.some((keyword) => normalized.includes(keyword)));
  const intro = profile?.name ? `Thanks ${profile.name}. ` : '';

  if (match) {
    return `${intro}${match.reply}`;
  }

  return `${intro}Our team will review your query and contact you on ${profile?.contact || 'your shared number'} soon.`;
}

function parseProfileMessage(message) {
  const normalized = message.trim();
  const emailMatch = normalized.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const contactMatch = normalized.match(/(?:\+?\d[\d\s-]{7,}\d)/);

  const namePatterns = [
    /(?:my name is|name is|i am|i'm)\s+([a-zA-Z][a-zA-Z\s'.-]*)/i,
    /name\s*:\s*([a-zA-Z][a-zA-Z\s'.-]*)/i,
  ];

  const nameMatch =
    namePatterns
      .map((pattern) => normalized.match(pattern))
      .find(Boolean) ||
    (() => {
      if (!emailMatch && !contactMatch) return null;
      const cutPoint = Math.min(
        emailMatch?.index ?? normalized.length,
        contactMatch?.index ?? normalized.length,
      );
      const beforePoint = normalized.slice(0, cutPoint);
      return beforePoint.match(/([a-zA-Z][a-zA-Z\s'.-]{1,40})$/);
    })();

  if (!nameMatch || !emailMatch || !contactMatch) {
    return null;
  }

  return {
    name: nameMatch[1].trim(),
    email: emailMatch[0].trim(),
    contact: contactMatch[0].trim(),
  };
}

function isGreetingMessage(message) {
  return /^(hi|hello|hey|assalam|salam|assalamualaikum|assalam-o-alaikum)\b/i.test(message.trim());
}

function isInfoQuestion(message) {
  return /admission|admissions|apply|fee|fees|timing|time|contact|phone|whatsapp|location|map|information|details|open/i.test(
    message,
  );
}

function ChatBubble({ role, text }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
          isUser
            ? 'bg-schoolBlueDark text-white'
            : 'border border-slate-200 bg-white text-slate-700'
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default function FloatingSupport() {
  const [openChat, setOpenChat] = useState(false);
  const [draft, setDraft] = useState('');
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Assalam-o-Alaikum! How can I help you today?',
    },
  ]);

  const whatsappUrl = useMemo(() => {
    const phone = '923008600135';
    const text = encodeURIComponent('Assalam-o-Alaikum, I need help from Zia Public High School.');
    return `https://wa.me/${phone}?text=${text}`;
  }, []);

  const sendMessage = (messageText) => {
    const text = messageText.trim();
    if (!text) return;

    setMessages((current) => [...current, { role: 'user', text }]);
    setDraft('');

    window.setTimeout(() => {
      let botReply = '';

      if (!profile) {
        const parsed = parseProfileMessage(text);
        if (parsed) {
          setProfile(parsed);
          botReply = `Thanks ${parsed.name}. How can I help you today?`;
          void submitChatLog(text, botReply).catch(() => {});
          setMessages((current) => [...current, { role: 'bot', text: botReply }]);
          return;
        }

        if (isGreetingMessage(text)) {
          botReply = 'How can I help you today?';
          void submitChatLog(text, botReply).catch(() => {});
          setMessages((current) => [...current, { role: 'bot', text: botReply }]);
          return;
        }

        if (isInfoQuestion(text)) {
          botReply =
            'Please share your name, email, and contact number first, then I can help you properly.';
          void submitChatLog(text, botReply).catch(() => {});
          setMessages((current) => [...current, { role: 'bot', text: botReply }]);
          return;
        }

        botReply = 'Please share your name, email, and contact number first.';
        void submitChatLog(text, botReply).catch(() => {});
        setMessages((current) => [...current, { role: 'bot', text: botReply }]);
        return;
      }

      if (isInfoQuestion(text)) {
        // The bot answer is saved together with the original user message.
        botReply = getBotReply(text, profile);
        void submitChatLog(text, botReply).catch(() => {});
        setMessages((current) => [...current, { role: 'bot', text: botReply }]);
        return;
      }

      botReply = getBotReply(text, profile);
      void submitChatLog(text, botReply).catch(() => {});
      setMessages((current) => [...current, { role: 'bot', text: botReply }]);
    }, 450);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-4 left-4 z-[140] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_35px_rgba(37,211,102,0.35)] transition hover:-translate-y-1 hover:scale-105 sm:bottom-6 sm:left-6 sm:h-16 sm:w-16"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden="true">
          <path d="M20.5 4.5A11.1 11.1 0 0 0 3.6 18.2L2.5 22l3.9-1A11.1 11.1 0 0 0 20.5 4.5Zm-5.1 12.4c-.2.5-1.1 1-1.6 1.1-.4.1-.9.1-1.4 0-.4-.1-.9-.2-1.5-.4-2.6-1-4.4-3.6-4.5-3.8-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2.1 1-2.4.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.8c.1.3.1.5 0 .7-.1.2-.2.4-.4.6l-.3.4c-.1.1-.2.3-.1.5.1.2.4.9.9 1.5.7.9 1.4 1.4 2.2 1.8.2.1.4.1.6 0 .2-.1.4-.3.6-.5l.5-.7c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.3.4.6.1.2 0 .5-.1.7Z" />
        </svg>
      </a>

      <div className="fixed bottom-4 right-4 z-[140] sm:bottom-6 sm:right-6">
        {openChat && (
          <div className="mb-3 w-[calc(100vw-2rem)] overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_26px_80px_rgba(0,0,0,0.22)] sm:w-[22rem]">
            <div className="bg-schoolBlueDark px-4 py-4 text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/70">Chatbot</p>
                  <h3 className="mt-1 text-lg font-bold">School Assistant</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenChat(false)}
                  className="rounded-full border border-white/20 px-3 py-1 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="max-h-[22rem] space-y-3 overflow-y-auto bg-[#f7f9ff] px-4 py-4">
              {messages.map((message, index) => (
                <ChatBubble key={`${message.role}-${index}`} role={message.role} text={message.text} />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3">
              <div className="flex items-center gap-2">
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Type your message..."
                  className="input-field min-w-0 flex-1 border-slate-200 bg-[#f8fbff]"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-schoolRed px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpenChat((current) => !current)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-schoolRed text-white shadow-[0_18px_35px_rgba(209,63,63,0.35)] transition hover:-translate-y-1 hover:scale-105 sm:h-16 sm:w-16"
          aria-label="Open chat support"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden="true">
            <path d="M12 3C6.5 3 2 6.7 2 11.3c0 2.6 1.4 5 3.7 6.5L5 22l4.5-2.1c.8.1 1.6.2 2.5.2 5.5 0 10-3.7 10-8.3S17.5 3 12 3Zm-4 10.2H7a1.2 1.2 0 1 1 0-2.4h1a1.2 1.2 0 1 1 0 2.4Zm4.5 0h-1a1.2 1.2 0 1 1 0-2.4h1a1.2 1.2 0 1 1 0 2.4Zm4.5 0h-1a1.2 1.2 0 1 1 0-2.4h1a1.2 1.2 0 1 1 0 2.4Z" />
          </svg>
        </button>
      </div>
    </>
  );
}
