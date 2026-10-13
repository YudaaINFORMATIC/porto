// src/components/Hero/Hero.jsx
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import profileFallback from '../../assets/hero.png';
import './Hero.css';

const ROLES = ['Game Developer', 'Gameplay Programmer', 'Unity Developer'];

function useTypingEffect(words, typingSpeed = 80, deletingSpeed = 40, pauseMs = 1800) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    const tick = () => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          timeout.current = setTimeout(() => setIsDeleting(true), pauseMs);
          return;
        }
        timeout.current = setTimeout(tick, typingSpeed);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex(i => i + 1);
          return;
        }
        timeout.current = setTimeout(tick, deletingSpeed);
      }
    };

    timeout.current = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout.current);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}

export default function Hero() {
  const typedRole = useTypingEffect(ROLES);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero section" id="hero" aria-label="Hero — Perkenalan Yuda Sena">
      <div className="hero__container container">
        {/* Text side */}
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.span
            className="hero__greeting"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            &gt; Halo, saya
          </motion.span>

          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Yuda Sena Setiya Yuwana
          </motion.h1>

          <motion.div
            className="hero__role-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <span className="hero__role-prefix">~/</span>
            <span className="hero__role" aria-live="polite" aria-label={`Peran: ${typedRole}`}>
              {typedRole}
            </span>
            <span className="hero__cursor" aria-hidden="true">|</span>
          </motion.div>

          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Membangun pengalaman bermain yang berkesan melalui kode, kreativitas, dan kecintaan
            pada game design.
          </motion.p>

          <motion.div
            className="hero__cta-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
          >
            <button
              id="hero-btn-projects"
              className="btn btn-primary"
              onClick={scrollToProjects}
            >
              Lihat Proyek
              <FiArrowDown aria-hidden="true" />
            </button>
            <button
              id="hero-btn-contact"
              className="btn btn-outline"
              onClick={scrollToContact}
            >
              <FiMail aria-hidden="true" />
              Hubungi Saya
            </button>
          </motion.div>

          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            {/* ⚠️ Ganti '#' dengan URL akun asli kamu */}
            <a
              href="https://github.com/YudaaINFORMATIC"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Yuda Sena"
              className="hero__social-link"
            >
              <FaGithub aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/yuda-sena-setiya-yuwana/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Yuda Sena"
              className="hero__social-link"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/yudasenaa19_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Yuda Sena"
              className="hero__social-link"
            >
              <FaInstagram aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        {/* Photo side */}
        <motion.div
          className="hero__photo-wrapper"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="hero__photo-frame" aria-hidden="true">
            <div className="hero__photo-glow" />
            <div className="hero__photo-corner hero__photo-corner--tl" />
            <div className="hero__photo-corner hero__photo-corner--br" />
            <img
              src="/yuda-sena.jpg"
              onError={(event) => { event.currentTarget.src = profileFallback; }}
              alt="Foto profil Yuda Sena, Game Developer"
              className="hero__photo"
              loading="eager"
              width={360}
              height={360}
            />
            <div className="hero__hud-label" aria-hidden="true">
              <span className="hero__hud-dot" />
              GAME DEV
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        aria-hidden="true"
      >
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
