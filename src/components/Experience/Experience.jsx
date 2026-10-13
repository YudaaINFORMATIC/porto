// src/components/Experience/Experience.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaGraduationCap, FaLightbulb, FaCode, FaCompass,
} from 'react-icons/fa';
import { timelineItems } from '../../data/experience';
import './Experience.css';

const iconMap = { FaGraduationCap, FaLightbulb, FaCode, FaCompass };

const typeColors = {
  education: 'purple',
  exploration: 'cyan',
  personalproject: 'purple',
  selflearning: 'cyan',
};

const experienceFocus = {
  education: 'Pembelajaran dan praktik teknis',
  exploration: 'Mencari pengalaman dan ide baru',
  personalproject: 'Belajar dari proses mencoba',
  selflearning: 'Rasa ingin tahu dan adaptasi',
};

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = iconMap[item.icon] || FaGamepad;
  const color = typeColors[item.type] || 'cyan';

  return (
    <motion.div
      ref={ref}
      className={`timeline-item timeline-item--${color}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="timeline-item__dot" aria-hidden="true">
        <span className="timeline-item__icon"><Icon /></span>
      </div>
      <div className="timeline-item__card">
        {item.placeholder && (
          <span className="timeline-placeholder-badge" role="note">CONTOH</span>
        )}
        <div className="timeline-item__period">{item.period}</div>
        <div className="timeline-item__identity">
          {item.logo && (
            <img
              className="timeline-item__logo"
              src={item.logo}
              alt={`Logo ${item.organization}`}
              loading="lazy"
            />
          )}
          <div className="timeline-item__identity-copy">
            <h3 className="timeline-item__title">{item.title}</h3>
            <div className="timeline-item__org">{item.organization}</div>
          </div>
        </div>
        <p className="timeline-item__desc">{item.description}</p>
        <div className="timeline-item__focus">
          <span className="timeline-item__focus-label">Fokus pengalaman</span>
          <span className="timeline-item__focus-value">{experienceFocus[item.type] || 'Pengembangan diri'}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="experience section" id="experience" aria-label="Pengalaman dan Pendidikan Yuda Sena">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="experience__header"
        >
          <span className="section-label">04 — Experience</span>
          <h2 className="section-title">Perjalanan & Pendidikan</h2>
          <p className="experience__subtitle">
            Pendidikan formal dan eksplorasi mandiri, dengan semangat untuk terus mencoba hal baru.
          </p>
        </motion.div>

        <div className="timeline" role="list">
          {timelineItems.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
