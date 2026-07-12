import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { certifications } from '../data/data'

const gridVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const certVariant = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Certifications() {
  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <SectionLabel text="Certifications" num="05 / 06" />

        <h2 className="certifications__heading">
          Certifi<em>cations</em>
        </h2>

        <motion.div
          className="certifications__grid"
          variants={gridVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {certifications.map((cert, i) => (
            <motion.div key={i} className="cert-card" variants={certVariant}>
              <div className="cert-card__year">{cert.year}</div>
              <div className="cert-card__name">{cert.name}</div>
              <div className="cert-card__issuer">{cert.issuer}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
