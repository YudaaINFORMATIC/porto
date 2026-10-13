// src/components/Navbar/Navbar.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { useActiveSection } from '../../hooks/useActiveSection';
import './Navbar.css';

const NAV_LINKS = [
  { id: 'about',      label: 'About' },
  { id: 'skills',     label: 'Skills' },
  { id: 'projects',   label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'process',    label: 'Process' },
  { id: 'contact',    label: 'Contact' },
];

const SECTION_IDS = ['about', 'skills', 'projects', 'experience', 'process', 'contact'];

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (!e.target.closest('.navbar')) setMenuOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        {/* Logo */}
        <motion.button
          className="navbar__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Ke halaman atas"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="navbar__monogram">YS</span>
        </motion.button>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Navigasi utama">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              className={`navbar__link${activeSection === id ? ' navbar__link--active' : ''}`}
              onClick={() => scrollTo(id)}
              aria-current={activeSection === id ? 'true' : undefined}
            >
              {label}
              {activeSection === id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="navbar__link-dot"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <motion.button
            className="navbar__theme-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </motion.button>

          <a
            href="/cv-yuda-sena.pdf"
            className="btn btn-outline navbar__cv-btn"
            download
            aria-label="Unduh CV Yuda Sena (PDF)"
          >
            <FiDownload aria-hidden="true" />
            <span>Download CV</span>
          </a>

          {/* Hamburger */}
          <motion.button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="navbar__mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            aria-label="Navigasi mobile"
          >
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                className={`navbar__mobile-link${activeSection === id ? ' navbar__mobile-link--active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
            <a
              href="/cv-yuda-sena.pdf"
              className="btn btn-primary navbar__mobile-cv"
              download
            >
              <FiDownload aria-hidden="true" /> Download CV
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
