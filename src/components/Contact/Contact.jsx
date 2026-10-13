// src/components/Contact/Contact.jsx
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Contact.css';

const FORM_ACTION_URL = 'https://formsubmit.co/ajax/yudavehung@gmail.com';

const socials = [
  {
    id: 'contact-github',
    icon: <FaGithub />,
    label: 'GitHub',
    // ⚠️ Ganti dengan URL asli
    href: 'https://github.com/YudaaINFORMATIC',
    color: 'cyan',
  },
  {
    id: 'contact-linkedin',
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    // ⚠️ Ganti dengan URL asli
    href: 'https://www.linkedin.com/in/yuda-sena-setiya-yuwana/',
    color: 'cyan',
  },
  {
    id: 'contact-instagram',
    icon: <FaInstagram />,
    label: 'Instagram',
    href: 'https://www.instagram.com/yudasenaa19_/',
    color: 'purple',
  },
];

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Nama tidak boleh kosong.';
  if (!fields.email.trim()) {
    errors.email = 'Email tidak boleh kosong.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Format email tidak valid.';
  }
  if (!fields.message.trim()) errors.message = 'Pesan tidak boleh kosong.';
  else if (fields.message.trim().length < 20) errors.message = 'Pesan terlalu pendek (min. 20 karakter).';
  return errors;
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('loading');
    try {
      const response = await fetch(FORM_ACTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...fields,
          _subject: 'Pesan baru dari portfolio Yuda Sena',
        }),
      });
      const result = await response.json();
      if (response.ok && (result.success === true || result.success === 'true')) {
        setStatus('success');
        setFields({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact section" id="contact" aria-label="Kontak Yuda Sena">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="contact__header"
        >
          <span className="section-label">06 — Contact</span>
          <h2 className="section-title">Hubungi Saya</h2>
          <p className="contact__subtitle">
            Ada proyek kolaborasi, peluang magang, atau sekadar ingin ngobrol soal game?
            Saya senang mendengarnya!
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Info column */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact__email-card">
              <FiMail className="contact__email-icon" aria-hidden="true" />
              <div>
                <div className="contact__email-label">Email</div>
                <a
                  href="mailto:yudavehung@gmail.com"
                  className="contact__email-addr"
                  aria-label="Email Yuda Sena"
                >
                  yudavehung@gmail.com
                </a>
              </div>
            </div>

            <div className="contact__socials">
              <h3 className="contact__socials-title">Temukan Saya</h3>
              {socials.map((s) => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`contact__social-link contact__social-link--${s.color}`}
                  aria-label={`${s.label} Yuda Sena`}
                >
                  <span className="contact__social-icon" aria-hidden="true">{s.icon}</span>
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            className="contact__form-col"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {status === 'success' ? (
              <div className="contact__success" role="alert">
                <FiCheck aria-hidden="true" />
                <h3>Pesan Terkirim! 🎉</h3>
                <p>Terima kasih sudah menghubungi saya. Saya akan membalas sesegera mungkin.</p>
                <button
                  className="btn btn-outline"
                  onClick={() => setStatus('idle')}
                  id="contact-send-another"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form
                className="contact__form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Form kontak"
              >
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Nama</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className={`form-input${errors.name ? ' form-input--error' : ''}`}
                    placeholder="Nama kamu"
                    value={fields.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <span id="error-name" className="form-error" role="alert">
                      <FiAlertCircle aria-hidden="true" /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={`form-input${errors.email ? ' form-input--error' : ''}`}
                    placeholder="email@kamu.com"
                    value={fields.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <span id="error-email" className="form-error" role="alert">
                      <FiAlertCircle aria-hidden="true" /> {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Pesan</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={`form-textarea${errors.message ? ' form-input--error' : ''}`}
                    placeholder="Halo Yuda, saya ingin..."
                    rows={5}
                    value={fields.message}
                    onChange={handleChange}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span id="error-message" className="form-error" role="alert">
                      <FiAlertCircle aria-hidden="true" /> {errors.message}
                    </span>
                  )}
                </div>

                {status === 'error' && (
                  <div className="contact__error-msg" role="alert">
                    <FiAlertCircle aria-hidden="true" />
                    Gagal mengirim pesan. Coba lagi atau hubungi lewat email langsung.
                  </div>
                )}

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="btn btn-primary contact__submit"
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>Mengirim...</>
                  ) : (
                    <>
                      <FiSend aria-hidden="true" /> Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
