// src/components/Projects/Projects.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX, FiPlay, FiFilter } from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa';
import { projects, engineFilters } from '../../data/projects';
import './Projects.css';

function PlaceholderThumbnail({ project }) {
  const colors = { Unity: '#22d3ee', 'Unreal Engine 5': '#8b5cf6', Godot: '#47a853' };
  const bg = colors[project.engine] || '#22d3ee';
  return (
    <div
      className={`project-card__thumb-placeholder project-card__thumb-placeholder--${project.id}`}
      style={{ '--accent': bg }}
      role="img"
      aria-label={`Ilustrasi konsep ${project.title}, bukan tangkapan layar game`}
    >
      <span className="project-artwork__shape project-artwork__shape--one" aria-hidden="true" />
      <span className="project-artwork__shape project-artwork__shape--two" aria-hidden="true" />
      <div className="project-artwork__content">
        <span className="project-artwork__serial">PROJECT / 0{project.id}</span>
        <FaGamepad className="project-artwork__icon" aria-hidden="true" />
        <span className="project-artwork__title">{project.title}</span>
        <span className="project-artwork__genre">{project.genre} · {project.engine}</span>
        <span className="project-artwork__caption">Ilustrasi konsep</span>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Detail proyek: ${project.title}`}
      >
        <motion.div
          className="modal-box"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Tutup detail proyek"
          >
            <FiX />
          </button>

          <div className="modal-thumb">
            {project.thumbnail ? (
              <img src={project.thumbnail} alt={`Thumbnail ${project.title}`} loading="lazy" />
            ) : (
              <PlaceholderThumbnail project={project} />
            )}
          </div>

          <div className="modal-body">
            {project.practiceProject && (
              <div className="modal-placeholder-notice" role="note">
                Ide latihan sederhana, bukan klaim proyek yang sudah dirilis.
              </div>
            )}
            <div className="modal-meta">
              <span className="tag">{project.engine}</span>
              <span className="tag purple">{project.genre}</span>
              <span className="modal-year">{project.year}</span>
            </div>
            <h3 className="modal-title">{project.title}</h3>
            <p className="modal-role">
              <strong>Fokus:</strong> {project.role}
            </p>
            <p className="modal-desc">{project.description}</p>

            <div className="modal-tags">
              {project.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <div className="modal-actions">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FiPlay aria-hidden="true" /> Play / Demo
                </a>
              ) : (
                <button className="btn btn-ghost" disabled aria-disabled="true">
                  <FiPlay aria-hidden="true" /> Demo belum tersedia
                </button>
              )}

              {project.sourceUrl ? (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FiGithub aria-hidden="true" /> Source Code
                </a>
              ) : (
                <button className="btn btn-ghost" disabled aria-disabled="true">
                  <FiGithub aria-hidden="true" /> Source belum tersedia
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <motion.article
      className="project-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      onClick={() => onClick(project)}
      tabIndex={0}
      role="button"
      aria-label={`Lihat detail proyek ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
    >
      <div className="project-card__thumb">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={`Thumbnail game ${project.title}`} loading="lazy" />
        ) : (
          <PlaceholderThumbnail project={project} />
        )}
        {project.practiceProject && (
          <div className="project-card__placeholder-badge" aria-label="Ide proyek latihan">
            LATIHAN
          </div>
        )}
      </div>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="tag">{project.engine}</span>
          <span className="tag purple">{project.genre}</span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__role">{project.role}</p>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tags">
          {project.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
          {project.tags.length > 3 && (
            <span className="tag" aria-label={`${project.tags.length - 3} tag lainnya`}>
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="project-card__footer">
          <span className="project-card__see-more">
            Lihat detail <FiExternalLink aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.engine === activeFilter);

  return (
    <section className="projects section" id="projects" aria-label="Proyek game Yuda Sena">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="projects__header"
        >
          <span className="section-label">03 — Projects</span>
          <h2 className="section-title">Project Latihan</h2>
          <p className="projects__subtitle">
            Ide proyek sederhana untuk mencoba mekanik gameplay dan teknologi yang berbeda.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          className="projects__filters"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          role="group"
          aria-label="Filter proyek berdasarkan engine"
        >
          <FiFilter aria-hidden="true" className="projects__filter-icon" />
          {engineFilters.map((f) => (
            <button
              key={f}
              id={`filter-${f.toLowerCase().replace(/\s+/g, '-')}`}
              className={`projects__filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div className="projects__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="projects__empty">Tidak ada proyek dengan filter ini.</p>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
