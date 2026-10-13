// src/components/Footer/Footer.jsx
import { motion } from 'framer-motion';
import { FiArrowUp, FiHeart } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">
        <div className="footer__left">
          <span className="footer__logo">YS</span>
          <p className="footer__copy">
            © 2026 Yuda Sena. Dibuat dengan{' '}
            <FiHeart aria-label="cinta" className="footer__heart" /> dan terlalu banyak
            kopi.
          </p>
          <p className="footer__stack">
            Dibangun dengan React + Vite + Framer Motion
          </p>
        </div>

        <div className="footer__socials">
          <a
            href="https://github.com/YudaaINFORMATIC"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
            aria-label="GitHub Yuda Sena"
          >
            <FaGithub aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/yuda-sena-setiya-yuwana/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
            aria-label="LinkedIn Yuda Sena"
          >
            <FaLinkedin aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/yudasenaa19_/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
            aria-label="Instagram Yuda Sena"
          >
            <FaInstagram aria-hidden="true" />
          </a>
        </div>

        <motion.button
          className="footer__to-top"
          onClick={scrollTop}
          aria-label="Kembali ke atas"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowUp aria-hidden="true" />
        </motion.button>
      </div>
    </footer>
  );
}
