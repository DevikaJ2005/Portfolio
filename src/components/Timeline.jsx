import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { timeline } from '../data/data'

const itemVariant = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Timeline() {
  return (
    <section id="experience" className="timeline">
      <div className="container">
        <SectionLabel text="Education &amp; Experience" num="04 / 06" />

        <h2 className="timeline__heading">
          Education &amp; <em>Experience</em>
        </h2>

        <div className="timeline__list">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.id}
              className="timeline__entry"
              variants={itemVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className="timeline__period mono">{entry.period}</div>
              <div className="timeline__body">
                <div className="timeline__role">{entry.role}</div>
                <div className="timeline__org">{entry.org}</div>
                <ul className="timeline__details">
                  {entry.details.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
