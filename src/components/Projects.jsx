import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { projects } from '../data/data'

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardFade = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

// ── Featured project (index 0) ────────────────────────────────────────────────
function ProjectFeatured({ project }) {
  const { number, type, title, description, tech, image, imageAlt, imageStyle, github, live, badge } = project

  return (
    <motion.div className="project-featured" variants={fadeUp}>
      {/* Left: screenshot or placeholder */}
      <div className="project-featured__img">
        {image ? (
          <>
            <img src={image} alt={imageAlt} style={imageStyle || {}} />
            <div className="project-card__overlay">
              {github && <a href={github} target="_blank" rel="noopener noreferrer" className="project-card__overlay-btn">GitHub ↗</a>}
              {live   && <a href={live}   target="_blank" rel="noopener noreferrer" className="project-card__overlay-btn">Live ↗</a>}
            </div>
          </>
        ) : (
          <div className="project-featured__placeholder">
            <div className="project-featured__placeholder-label display">
              {/* Show 2-char abbreviation from title */}
              {title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div className="project-featured__placeholder-note">
              Add screenshot → public/{project.id}-screenshot.png
            </div>
          </div>
        )}
      </div>

      {/* Right: content */}
      <div className="project-featured__content">
        <div className="project-featured__number display">{number}</div>
        <div className="project-featured__meta">{type}</div>
        <div className="project-featured__title display">{title}</div>
        <p className="project-featured__desc">{description}</p>
        <div className="project-featured__tech">{tech.join(' · ')}</div>

        <div className="project-featured__links">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="project-featured__link">
              GitHub ↗
            </a>
          )}
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" className="project-featured__link">
              Live ↗
            </a>
          )}
        </div>

        {badge && (
          <div style={{ marginTop: 16 }}>
            <span className="project-card__badge">{badge}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Standard card (middle grid) ───────────────────────────────────────────────
function ProjectCard({ project }) {
  const { number, type, title, description, tech, image, imageAlt, imageStyle, github, live, badge } = project

  return (
    <motion.div className="project-card" variants={cardFade}>
      {/* Screenshot area */}
      <div className="project-card__img-wrap">
        {image ? (
          <>
            <img src={image} alt={imageAlt} style={imageStyle || {}} />
            <div className="project-card__overlay">
              {github && <a href={github} target="_blank" rel="noopener noreferrer" className="project-card__overlay-btn">GitHub ↗</a>}
              {live   && <a href={live}   target="_blank" rel="noopener noreferrer" className="project-card__overlay-btn">Live ↗</a>}
            </div>
          </>
        ) : (
          <div className="project-card__placeholder">
            <div className="project-card__placeholder-label display">
              {title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div className="project-card__placeholder-note">
              Add screenshot → public/{project.id}-screenshot.png
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="project-card__body">
        <div className="project-card__num">{number} · {type}</div>
        <div className="project-card__title display">{title}</div>
        <p className="project-card__desc">{description}</p>

        <div className="project-card__footer">
          <div className="project-card__tags">
            {tech.map(t => <span key={t} className="project-card__tag">{t}</span>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {badge && <span className="project-card__badge">{badge}</span>}
            <div className="project-card__icons">
              {github && <a href={github} target="_blank" rel="noopener noreferrer" className="project-card__icon" title="GitHub">↗</a>}
              {live   && <a href={live}   target="_blank" rel="noopener noreferrer" className="project-card__icon" title="Live">↗</a>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Research typographic strip (last project) ─────────────────────────────────
function ProjectResearch({ project }) {
  const { number, type, title, description, badge, github } = project

  return (
    <motion.div className="project-research" variants={fadeUp}>
      <div className="project-research__number display">{number}</div>

      <div className="project-research__content">
        <div className="project-research__type">{type}</div>
        <div className="project-research__title display">{title}</div>
        <p className="project-research__desc">{description}</p>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', marginTop: 14,
              fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--mid)', borderBottom: '1px solid var(--border-lt)',
            }}
          >
            GitHub ↗
          </a>
        )}
      </div>

      {badge && <div className="project-research__badge">{badge}</div>}
    </motion.div>
  )
}

// ── Main Projects section ─────────────────────────────────────────────────────
// Layout:
//   [0] EasyDine             → featured full-width
//   [1] FraudShield          ┐
//   [2] PlanMyEvent          ├ auto-fit grid (2 or 3 cols)
//   [3] Smart Content Simplifier ┘
//   [4] Research Paper       → typographic strip
export default function Projects() {
  const [featured, ...rest] = projects
  const middleCards = rest.slice(0, -1)   // all except last
  const research    = rest[rest.length - 1] // last = research paper

  return (
    <section id="projects" className="projects">
      <div className="container">
        <SectionLabel text="Selected Work" num="03 / 06" />

        {/* Heading row */}
        <div className="projects__header">
          <h2 className="projects__heading">My <em>Projects</em></h2>
          <a
            href="https://github.com/DevikaJ2005"
            target="_blank"
            rel="noopener noreferrer"
            className="projects__github-link"
          >
            All on GitHub →
          </a>
        </div>

        {/* ── 1. Featured (EasyDine) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <ProjectFeatured project={featured} />
        </motion.div>

        {/* ── 2. Middle cards grid (FraudShield, PlanMyEvent, Smart Content Simplifier) ── */}
        <motion.div
          className="projects__cards-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {middleCards.map(p => p && (
            <ProjectCard key={p.id} project={p} />
          ))}
        </motion.div>

        {/* ── 3. Research strip ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {research && <ProjectResearch project={research} />}
        </motion.div>
      </div>
    </section>
  )
}
