// Форма запроса предложения.
// Отправка: POST JSON на PUBLIC_FORM_ENDPOINT. Пока адреса нет — честный запасной путь:
// заявка собирается в текст и уходит в WhatsApp (или копируется). Ложного «отправлено» нет.
// Проверка — по месту, после ухода с поля; при отправке фокус переходит к первой ошибке.
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

type Strings = Record<string, string>;
interface Option {
  id: string;
  name: string;
}
interface Props {
  s: Strings;
  crops: Option[];
  regions: Option[];
  endpoint?: string;
  whatsapp: string;
  phoneHref: string;
  phoneDisplay: string;
  privacyHref: string;
  lang: 'ru' | 'en';
}

type Field = 'role' | 'name' | 'email' | 'phone' | 'crop' | 'message' | 'consent';
type Values = Record<Exclude<Field, 'consent'>, string> & { consent: boolean; website: string };
type Errors = Partial<Record<Field | 'contact', string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm(props: Props) {
  const { s, crops, regions, endpoint, whatsapp, phoneHref, phoneDisplay, privacyHref, lang } = props;
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [v, setV] = useState<Values>({
    role: 'buyer',
    name: '',
    email: '',
    phone: '',
    crop: '',
    message: '',
    consent: false,
    website: '', // ловушка для ботов
  });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [state, setState] = useState<'edit' | 'sending' | 'sent' | 'error' | 'offline'>('edit');
  const [copied, setCopied] = useState(false);

  // Предзаполнение из адреса: ?crop=wheat&dest=asia&role=supplier
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const dest = regions.find((r) => r.id === q.get('dest'));
    setV((prev) => ({
      ...prev,
      crop: crops.some((c) => c.id === q.get('crop')) ? q.get('crop')! : prev.crop,
      role: q.get('role') === 'supplier' ? 'supplier' : prev.role,
      message: dest ? `${lang === 'ru' ? 'Направление' : 'Destination'}: ${dest.name}` : prev.message,
    }));
  }, []);

  const errors: Errors = useMemo(() => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = s.required;
    if (v.email && !EMAIL.test(v.email.trim())) e.email = s.invalidEmail;
    if (v.phone && v.phone.replace(/\D/g, '').length < 7) e.phone = s.invalidPhone;
    if (!v.email.trim() && !v.phone.trim()) e.contact = s.needContact;
    if (!v.consent) e.consent = s.needConsent;
    return e;
  }, [v, s]);

  const show = (f: Field | 'contact') => {
    if (f === 'contact') return (touched.email || touched.phone) && errors.contact;
    return touched[f] && errors[f];
  };

  const set = (f: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setV((p) => ({ ...p, [f]: val }));
  };
  const blur = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  const cropName = crops.find((c) => c.id === v.crop)?.name;
  const summary = [
    s.waIntro,
    `${s.role}: ${v.role === 'supplier' ? s.roleSupplier : s.roleBuyer}`,
    `${s.name}: ${v.name}`,
    v.email && `${s.email}: ${v.email}`,
    v.phone && `${s.phone}: ${v.phone}`,
    cropName && `${s.crop}: ${cropName}`,
    v.message && `${s.message}: ${v.message}`,
  ]
    .filter(Boolean)
    .join('\n');

  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, consent: true });
    if (Object.keys(errors).length) {
      // фокус к первой ошибке
      const order: (Field | 'contact')[] = ['name', 'contact', 'email', 'phone', 'consent'];
      const first = order.find((f) => errors[f]);
      const id = first === 'contact' ? 'cf-email' : `cf-${first}`;
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`#${id}`)?.focus());
      return;
    }
    if (v.website) return; // бот
    if (!endpoint) {
      setState('offline');
      return;
    }
    setState('sending');
    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...v, cropName, lang, page: location.href, text: summary }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setState('sent');
    } catch {
      setState('error');
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* буфер недоступен — остаётся WhatsApp и телефон */
    }
  };

  const fade = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, transform: 'translateY(8px)', filter: 'blur(4px)' },
        animate: { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' },
        exit: { opacity: 0, transform: 'translateY(-6px)', filter: 'blur(4px)' },
      };

  return (
    <div className="cf">
      <AnimatePresence mode="wait" initial={false}>
        {state === 'edit' || state === 'sending' || state === 'error' ? (
          <motion.form
            key="form"
            ref={formRef}
            className="cf__form"
            onSubmit={submit}
            noValidate
            {...fade}
            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
          >
            <fieldset className="cf__role">
              <legend className="field__label">{s.role}</legend>
              <div className="cf__seg">
                {(['buyer', 'supplier'] as const).map((r) => (
                  <label key={r} className="cf__seg-opt">
                    <input type="radio" name="role" value={r} checked={v.role === r} onChange={set('role')} />
                    <span>{r === 'buyer' ? s.roleBuyer : s.roleSupplier}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="cf__grid">
              <Input id="cf-name" label={s.name} value={v.name} onChange={set('name')} onBlur={blur('name')} error={show('name')} autoComplete="name" required />
              <Input id="cf-email" label={s.email} type="email" value={v.email} onChange={set('email')} onBlur={blur('email')} error={show('email') || show('contact')} autoComplete="email" inputMode="email" />
              <Input id="cf-phone" label={s.phone} type="tel" value={v.phone} onChange={set('phone')} onBlur={blur('phone')} error={show('phone')} autoComplete="tel" inputMode="tel" />
              <div className="field">
                <label className="field__label" htmlFor="cf-crop">{s.crop}</label>
                <select id="cf-crop" className="field__control" value={v.crop} onChange={set('crop')}>
                  <option value="">{s.cropAny}</option>
                  {crops.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="cf__hint">{s.contactHint}</p>

            <div className="field">
              <label className="field__label" htmlFor="cf-message">{s.message}</label>
              <textarea id="cf-message" className="field__control" rows={4} placeholder={s.messagePh} value={v.message} onChange={set('message')} />
            </div>

            {/* ловушка: скрыта от людей и программ чтения экрана */}
            <input className="cf__hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={v.website} onChange={set('website')} />

            <div className={`cf__consent${show('consent') ? ' is-invalid' : ''}`}>
              <label>
                <input id="cf-consent" type="checkbox" checked={v.consent} onChange={set('consent')} onBlur={blur('consent')} aria-invalid={show('consent') ? true : undefined} aria-describedby="cf-consent-err" />
                <span>
                  {s.consent} (<a href={privacyHref}>{s.consentLink}</a>)
                </span>
              </label>
              <p id="cf-consent-err" className="field__error" role="alert">{show('consent') || ''}</p>
            </div>

            {state === 'error' && (
              <p className="cf__error" role="alert">
                {s.errorText} <a href={phoneHref}>{phoneDisplay}</a>
              </p>
            )}

            <button data-magnet="" className="btn btn--gold cf__submit" type="submit" disabled={state === 'sending'}>
              <span className="btn__label">{state === 'sending' ? s.sending : s.submit}</span>
              <span className="btn__dot" aria-hidden="true">
                {state === 'sending' ? (
                  <span className="cf__spin" />
                ) : (
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8h9M8.5 4l4 4-4 4" /></svg>
                )}
              </span>
            </button>
          </motion.form>
        ) : state === 'sent' ? (
          <motion.div key="sent" className="cf__state" role="status" {...fade} transition={{ type: 'spring', bounce: 0, duration: 0.4 }}>
            <p className="cf__state-title">{s.sentTitle}</p>
            <p>{s.sentText}</p>
          </motion.div>
        ) : (
          <motion.div key="offline" className="cf__state" role="status" {...fade} transition={{ type: 'spring', bounce: 0, duration: 0.4 }}>
            <p className="cf__state-title">{s.offlineTitle}</p>
            <p>{s.offlineText}</p>
            <pre className="cf__summary">{summary}</pre>
            <div className="actions">
              <a data-magnet="" className="btn btn--gold" href={`${whatsapp}?text=${encodeURIComponent(summary)}`} target="_blank" rel="noopener">
                <span className="btn__label">{s.offlineWa}</span>
                <span className="btn__dot" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8h9M8.5 4l4 4-4 4" /></svg>
                </span>
              </a>
              <button data-magnet="" className="btn btn--line" type="button" onClick={copy}>
                <span className="btn__label" aria-live="polite">{copied ? s.copied : s.offlineCopy}</span>
              </button>
            </div>
            <button className="cf__back" type="button" onClick={() => setState('edit')}>
              ← {s.back}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({
  id,
  label,
  error,
  ...rest
}: { id: string; label: string; error?: string | false } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="field" data-invalid={error ? '' : undefined}>
      <label className="field__label" htmlFor={id}>
        {label}
        {rest.required && <span aria-hidden="true"> *</span>}
      </label>
      <input id={id} className="field__control" aria-invalid={error ? true : undefined} aria-describedby={`${id}-err`} {...rest} />
      <p id={`${id}-err`} className="field__error">{error || ''}</p>
    </div>
  );
}
