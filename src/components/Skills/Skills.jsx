// src/components/Skills/Skills.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiUnity, SiUnrealengine, SiGodotengine,
  SiCplusplus, SiJavascript, SiPython,
  SiGit, SiBlender, SiAseprite, SiFigma,
} from 'react-icons/si';
import { TbBrandCSharp, TbBrandVisualStudio } from 'react-icons/tb';
import { FaGamepad, FaCode, FaTools, FaDiceD6, FaDiceD20 } from 'react-icons/fa';
import { skillGroups, levelToWidth } from '../../data/skills';
import './Skills.css';

const iconMap = {
  SiUnity, SiUnrealengine, SiGodotengine,
  SiCplusplus, SiJavascript, SiPython,
  SiGit, SiBlender, SiAseprite, SiFigma,
  SiCsharp: TbBrandCSharp,
  SiVisualstudio: TbBrandVisualStudio,
};

const groupIconMap = {
  FaGamepad, FaCode, FaTools, FaDiceD6, FaDiceD20,
};

const levelColors = {
  Expert:       'var(--clr-cyan)',
  Advanced:     'var(--clr-cyan)',
  Intermediate: 'var(--clr-purple)',
  Beginner:     '#64748b',
};

function SkillCard({ skill, delay }) {
  const Icon = iconMap[skill.icon] || null;
  const barWidth = levelToWidth[skill.level];
  const color = levelColors[skill.level];

  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
    >
      <div className="skill-card__header">
        {Icon && (
          <span className="skill-card__icon" aria-hidden="true">
            <Icon />
          </span>
        )}
        <span className="skill-card__name">{skill.name}</span>
        <span
          className="skill-card__level"
          style={{ color }}
          aria-label={`Level: ${skill.level}`}
        >
          {skill.level}
        </span>
      </div>
      <div className="skill-card__bar-track" role="progressbar" aria-valuetext={skill.level}>
        <motion.div
          className="skill-card__bar-fill"
          style={{ background: color === 'var(--clr-cyan)' ? 'var(--grad-primary)' : color }}
          initial={{ width: 0 }}
          whileInView={{ width: barWidth }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
        />
      </div>
      <div className="skill-card__exp">{skill.yearsExp} yr exp</div>
    </motion.div>
  );
}

function SkillGroup({ group, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const GroupIcon = groupIconMap[group.icon] || FaGamepad;

  return (
    <motion.div
      ref={ref}
      className={`skill-group skill-group--${group.color}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="skill-group__header">
        <span className="skill-group__icon" aria-hidden="true">
          <GroupIcon />
        </span>
        <h3 className="skill-group__title">{group.label}</h3>
      </div>
      <div className="skill-group__cards">
        {group.skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} delay={i * 0.07} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="skills section" id="skills" aria-label="Skills Yuda Sena">
      <div className="container">
        <div className="skills__header">
          <span className="section-label">02 — Skills</span>
          <h2 className="section-title">Senjata di Arsenal</h2>
          <p className="skills__subtitle">
            Teknologi dan tools yang saya gunakan untuk membangun game dari nol hingga release.
          </p>
        </div>

        <div className="skills__legend" aria-label="Level keterampilan">
          {Object.entries(levelColors).map(([level, color]) => (
            <div key={level} className="skills__legend-item">
              <span
                className="skills__legend-dot"
                style={{ background: color }}
                aria-hidden="true"
              />
              {level}
            </div>
          ))}
        </div>

        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
