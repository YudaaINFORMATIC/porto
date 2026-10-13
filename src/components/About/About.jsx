// src/components/About/About.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiZap, FiHeart } from 'react-icons/fi';
import profileFallback from '../../assets/hero.png';
import './About.css';

const stats = [
  { value: '4',    label: 'Ide Latihan',       icon: <FiZap />, id: 'stat-projects' },
  { value: '3',    label: 'Game Engine',       icon: <FiCode />, id: 'stat-engines' },
  { value: '1+',   label: 'Tahun Belajar',     icon: <FiHeart />, id: 'stat-years' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="about section" id="about" aria-label="Tentang Yuda Sena Setiya Yuwana">
      <div className="container">
        <motion.div
          ref={ref}
          className="about__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Photo column */}
          <motion.div className="about__photo-col" variants={itemVariants}>
            <div className="about__photo-frame">
              <img
                src="/yuda-sena.jpg"
                onError={(event) => { event.currentTarget.src = profileFallback; }}
                alt="Yuda Sena Setiya Yuwana — Game Developer, tampak samping"
                className="about__photo"
                loading="lazy"
                width={380}
                height={460}
              />
              <div className="about__photo-badge" aria-hidden="true">
                <span className="about__photo-badge-icon">🎮</span>
                <div>
                  <div className="about__photo-badge-title">Game Developer</div>
                  <div className="about__photo-badge-sub">Unity · UE5 · Godot</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <div className="about__text-col">
            <motion.span className="section-label" variants={itemVariants}>
              01 — About Me
            </motion.span>
            <motion.h2 className="section-title" variants={itemVariants}>
              Siapa Yuda Sena Setiya Yuwana?
            </motion.h2>

            <motion.p className="about__para" variants={itemVariants}>
              Saya seorang <strong>Game Developer</strong> dengan fokus pada{' '}
              <em>gameplay programming</em> dan <em>game design</em>. Saya percaya bahwa sebuah
              game yang baik lahir dari harmoni antara mekanik yang solid, desain level yang
              cerdas, dan feel yang memuaskan saat dimainkan. Saya membangun game dengan Unity
              (C#) sebagai engine utama, dan terus mengeksplorasi Unreal Engine 5 (C++) serta
              Godot 4 (GDScript) untuk memperluas kemampuan saya.
            </motion.p>
            <motion.p className="about__para" variants={itemVariants}>
              Di luar coding, saya senang mencoba tools, engine, dan mekanik baru. Saya menikmati
              proses membuat prototipe kecil, menguji ide, lalu menyempurnakannya sebagai bagian
              dari proses belajar.
            </motion.p>

            {/* Stats */}
            <motion.div className="about__stats" variants={itemVariants}>
              {stats.map((s) => (
                <div key={s.id} id={s.id} className="about__stat-card">
                  <div className="about__stat-icon" aria-hidden="true">{s.icon}</div>
                  <div className="about__stat-value">{s.value}</div>
                  <div className="about__stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
