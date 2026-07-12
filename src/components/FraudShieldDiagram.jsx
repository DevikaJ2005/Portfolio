import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { fraudshieldPipeline, fraudshieldSupport } from '../data/data'

// ── Animation config ──────────────────────────────────────────────────────────
// Total duration: 6 stages × 0.25s stagger + 0.4s each ≈ 1.9s — plays ONCE on scroll-in

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 }
  },
}

const stageVariants = {
  hidden:  { opacity: 0, y: 16, scale: 0.94 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
}

const arrowVariants = {
  hidden:  { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1,
    transition: { duration: 0.25, ease: 'easeOut' }
  },
}

const supportVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.8 } },
}

const chipVariant = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

// ── Stage box ─────────────────────────────────────────────────────────────────
function PipelineStage({ stage, isLast }) {
  const [hovering, setHovering] = useState(false)
  const isOutput = stage.id === 'output'

  return (
    <div className="pipeline-stage">
      <motion.div variants={stageVariants} style={{ position: 'relative' }}>
        <div
          className={`pipeline-stage__box ${isOutput ? 'active' : ''}`}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
          style={isOutput ? {
            borderColor: 'var(--accent)',
            background: '#FFF7F5',
          } : {}}
        >
          <div
            className="pipeline-stage__label"
            style={isOutput ? { color: 'var(--accent)' } : {}}
          >
            {stage.label}
          </div>

          {/* Tooltip: shows on hover — 1-line plain-English description */}
          {hovering && (
            <motion.div
              className="pipeline-stage__tooltip"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              {stage.tooltip}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Arrow connector between stages */}
      {!isLast && (
        <motion.div className="pipeline-arrow" variants={arrowVariants}>
          <div className="pipeline-arrow__line" />
          <div className="pipeline-arrow__head" />
        </motion.div>
      )}
    </div>
  )
}

// ── Support chip ──────────────────────────────────────────────────────────────
function SupportChip({ item }) {
  const [hovering, setHovering] = useState(false)

  return (
    <motion.div
      className="support-chip"
      variants={chipVariant}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {item.label}
      {hovering && (
        <div className="support-chip__tooltip">{item.tooltip}</div>
      )}
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FraudShieldDiagram() {
  return (
    <section id="fraudshield" className="fraudshield">
      <div className="container">
        <SectionLabel text="FraudShield — Architecture" num="04 / 07" />

        <motion.div
          className="fraudshield__intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="fraudshield__heading">
            FraudShield <em>Pipeline</em>
          </h2>
          <p className="fraudshield__sub">
            An illustrative view of how the detection system moves from a raw
            transaction to a plain-English decision. Hover any stage for a
            one-line explanation.
          </p>
        </motion.div>

        {/* ── Main detection pipeline — animates left-to-right on scroll ── */}
        <motion.div
          className="fraudshield__pipeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {fraudshieldPipeline.map((stage, i) => (
            <PipelineStage
              key={stage.id}
              stage={stage}
              isLast={i === fraudshieldPipeline.length - 1}
            />
          ))}
        </motion.div>

        {/* ── Support layer — smaller, secondary ── */}
        <div className="fraudshield__support">
          <div className="fraudshield__support-label">Supporting infrastructure</div>
          <motion.div
            className="fraudshield__support-row"
            variants={supportVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {fraudshieldSupport.map(item => (
              <SupportChip key={item.label} item={item} />
            ))}
          </motion.div>
        </div>

        <p className="fraudshield__caption">
          Simplified view of FraudShield's detection pipeline — built for the Meta PyTorch OpenEnv Hackathon
        </p>
      </div>
    </section>
  )
}
