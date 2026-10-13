// src/components/Process/Process.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiUsers, FiStar, FiUploadCloud } from 'react-icons/fi';
import { FaLightbulb } from 'react-icons/fa';
import './Process.css';

const steps = [
  {
    id: 'step-ideation',
    step: '01',
    icon: <FaLightbulb />,
    title: 'Ideation',
    desc: 'Brainstorming konsep, tema, dan mekanik inti. Menggunakan metode "Core Loop First" — menentukan gameplay loop sebelum apapun.',
    color: 'cyan',
  },
  {
    id: 'step-prototyping',
    step: '02',
    icon: <FiCode />,
    title: 'Prototyping',
    desc: 'Membangun prototipe kasar secepat mungkin untuk memvalidasi apakah mekanik terasa menyenangkan. "Make it work, then make it good."',
    color: 'purple',
  },
  {
    id: 'step-playtesting',
    step: '03',
    icon: <FiUsers />,
    title: 'Playtesting',
    desc: 'Mengajak orang lain memainkan dan mengamati tanpa memberi petunjuk. Feedback dari pemain nyata jauh lebih berharga dari asumsi developer.',
    color: 'cyan',
  },
  {
    id: 'step-polishing',
    step: '04',
    icon: <FiStar />,
    title: 'Polishing',
    desc: 'Menyempurnakan juice — animasi, sound effect, screen shake, particle. Detail kecil yang membuat game terasa "responsive" dan memuaskan.',
    color: 'purple',
  },
  {
    id: 'step-release',
    step: '05',
    icon: <FiUploadCloud />,
    title: 'Release',
    desc: 'Deploy ke itch.io atau platform target, iterasi berdasarkan review komunitas, dan dokumentasi untuk portofolio.',
    color: 'cyan',
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="process section" id="process" aria-label="Alur kerja game development Yuda Sena">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="process__header"
        >
          <span className="section-label">05 — Process</span>
          <h2 className="section-title">Game Dev Workflow</h2>
          <p className="process__subtitle">
            Bagaimana saya mengubah sebuah ide menjadi game yang bisa dimainkan.
          </p>
        </motion.div>

        <div className="process__steps" role="list">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              id={step.id}
              className={`process-step process-step--${step.color}`}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="process-step__connector" aria-hidden="true" />
              )}

              <div className="process-step__number" aria-hidden="true">{step.step}</div>

              <div className="process-step__icon" aria-hidden="true">
                {step.icon}
              </div>

              <div className="process-step__content">
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
