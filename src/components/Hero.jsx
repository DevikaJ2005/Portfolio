import { useState } from 'react'
import { motion } from 'framer-motion'
import Terminal from './Terminal'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

export default function Hero() {
  const [copied, setCopied] = useState(false)

  // Email rendered via JS (string split) — avoids Cloudflare encoding issues
  const email = ['devikaj2005', 'gmail.com'].join('@')

  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const stats = [
    { num: '7.3',   label: 'CGPA',            sub: 'BSc Computer Science' },
    { num: '4+',    label: 'Projects Shipped', sub: 'Flutter, Full Stack, AI' },
    { num: '1',     label: 'Paper Presented',  sub: 'ICCCMIT 2026 · Intl. Conf.' },
    { num: '4',     label: 'Certifications',   sub: 'Google Cloud · MongoDB · Power BI' },
  ]

  return (
    <section id="hero" style={{ position: 'relative' }}>
      <div className="hero">
        {/* ── Left column: name + bio + contacts + stats ── */}
        <div>
          <motion.div
            className="hero__eyebrow"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            BSc CS · 2nd Year · MOP Vaishnav College · Chennai
          </motion.div>

          <motion.h1
            className="hero__name display"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            Devika <em>J.</em>
          </motion.h1>

          <motion.p
            className="hero__tagline"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <strong>Computer Science Student</strong>, President of{' '}
            <strong>TechGen</strong> (CS Dept. Club), and former{' '}
            <strong>App Developer Intern at Prodapt</strong>. I build practical
            software and enjoy understanding how systems work end-to-end. Currently
            looking for{' '}
            <strong>software development and backend internship opportunities</strong>.
          </motion.p>

          <motion.div
            className="hero__contacts"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            {/* Email: click to copy */}
            <span
              id="hero-email"
              className={`hero__contact-item ${copied ? 'copied' : ''}`}
              onClick={copyEmail}
              title="Click to copy"
            >
              {copied ? '✓ Copied!' : email}
            </span>

            <div className="hero__dot" aria-hidden="true" />

            <a
              href="https://github.com/DevikaJ2005"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__contact-item"
            >
              GitHub
            </a>

            <div className="hero__dot" aria-hidden="true" />

            <a
              href="https://www.linkedin.com/in/devikaj2005/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__contact-item"
            >
              LinkedIn
            </a>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            className="hero__stats"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            {stats.map(({ num, label, sub }) => (
              <div key={label} className="hero__stat">
                <div className="hero__stat-num display">{num}</div>
                <div className="hero__stat-label">{label}</div>
                <div className="hero__stat-sub">{sub}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column: terminal ── */}
        <motion.div
          className="hero__right"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
        >
          <Terminal />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="hero__scroll-cue" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
