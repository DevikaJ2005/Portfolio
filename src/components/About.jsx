import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const facts = [
  { key: 'Degree', val: 'BSc Computer Science', isOpen: false },
  { key: 'College', val: 'MOP Vaishnav College for Women', isOpen: false },
  { key: 'Year', val: '3rd Year · 2024 – 2027', isOpen: false },
  { key: 'CGPA', val: '7.3', isOpen: false },
  { key: 'Location', val: 'Chennai, Tamil Nadu', isOpen: false },
  { key: 'Status', val: '● Open to Work', isOpen: true },
]

const nowItems = [
  'Leading TechGen, the Computer Science Department Club at MOP Vaishnav College',
  'Applying internship learnings (Flutter, Supabase, backend integration) to new projects',
  'Strengthening core computer science fundamentals',
  'Exploring different areas of software development through hands-on practice',
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <SectionLabel text="About" num="01 / 06" />

        <div className="about__grid">
          {/* ── Left: photo + nameplate ── */}
          <motion.div
            className="about__photo-wrap"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <img
              src="/photo.jpg.jpeg"
              alt="Devika J"
              className="about__photo"
              draggable={false}
              onContextMenu={e => e.preventDefault()}
            />
            <div className="about__nameplate">
              <div className="about__nameplate-name display">Devika J.</div>
              <div className="about__nameplate-role">Student · Tech Enthusiast</div>
            </div>
          </motion.div>

          {/* ── Right: bio + facts + currently ── */}
          <div>
            <motion.h2
              className="about__heading"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              Get to <em>Know Me</em>
            </motion.h2>

            <motion.p
              className="about__bio"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              I am a second-year Computer Science student, currently serving as
              President of <strong>TechGen</strong>, the Computer Science Department
              Club at MOP Vaishnav College. I enjoy building practical software and
              understanding how different parts of a system work together.
            </motion.p>

            <motion.p
              className="about__bio"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              I interned at <strong>Prodapt</strong> as an App Developer, where I
              contributed to EasyDine — a multi-role cafeteria platform built with
              Flutter and Supabase. I have also explored backend development, team
              leadership on group projects, and research work presented at an
              international conference (ICCCMIT 2026).
            </motion.p>

            {/* Quick facts grid */}
            <motion.div
              className="about__facts"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {facts.map(({ key, val, isOpen }) => (
                <div key={key} className="about__fact">
                  <div className="about__fact-key">{key}</div>
                  <div className={`about__fact-val ${isOpen ? 'open' : ''}`}>{val}</div>
                </div>
              ))}
            </motion.div>

            {/* Currently working on */}
            <motion.div
              className="about__now"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="about__now-label">Currently</div>
              <ul className="about__now-list">
                {nowItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
