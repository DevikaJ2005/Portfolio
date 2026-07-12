import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'

export default function Contact() {
  // ── Email: rendered via JS string-split to avoid Cloudflare encoding ──────
  // Never hardcode the full email in the JSX/HTML — assemble it at runtime.
  const [email, setEmail]       = useState('')
  const [copied, setCopied]     = useState(false)
  const [formState, setFormState] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'

  useEffect(() => {
    // Assemble email at mount time — not rendered in initial HTML
    setEmail(['devikaj2005', 'gmail.com'].join('@'))
  }, [])

  const copyEmail = () => {
    if (!email) return
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ── Contact form: Web3Forms submission ────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState('sending')
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(e.target),
      })
      const data = await res.json()
      if (data.success) {
        setFormState('sent')
        e.target.reset()
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const submitLabel =
    formState === 'sending' ? 'Sending…'
    : formState === 'sent'  ? '✓ Message Sent!'
    : formState === 'error' ? 'Try Again →'
    : 'Send Message →'

  const channels = [
    {
      name: 'Email',
      val: email || 'devikaj2005 @ gmail.com',
      arrow: '⧉',
      onClick: copyEmail,
      isCopied: copied,
    },
    {
      name: 'LinkedIn',
      val: 'linkedin.com/in/devikaj2005',
      arrow: '↗',
      href: 'https://www.linkedin.com/in/devikaj2005/',
    },
    {
      name: 'GitHub',
      val: 'github.com/DevikaJ2005',
      arrow: '↗',
      href: 'https://github.com/DevikaJ2005',
    },
    {
      name: 'Resume / CV',
      val: 'Download PDF',
      arrow: '↓',
      href: 'https://drive.google.com/file/d/1J2GuQVGHBTGf_GG4F-_xiHo4tnqIw1h6/view?usp=drive_link',
    },
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <SectionLabel text="Get In Touch" num="06 / 06" />

        <div className="contact__grid">
          {/* ── Left: heading + channels ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className="contact__heading">
              Let's <em>Work</em> Together
            </h2>
            <p className="contact__sub">
              I am currently looking for software development and backend
              internship opportunities where I can continue building real
              products and growing as an engineer. Feel free to reach out
              if you'd like to connect.
            </p>

            <div className="contact__channels">
              {channels.map(ch => {
                const inner = (
                  <>
                    <div className="contact__channel-left">
                      <span className="contact__channel-name">{ch.name}</span>
                      <span className={`contact__channel-val ${ch.isCopied ? 'copied' : ''}`}>
                        {ch.isCopied ? '✓ Copied!' : ch.val}
                      </span>
                    </div>
                    <span className="contact__channel-arrow">{ch.arrow}</span>
                  </>
                )

                return ch.href ? (
                  <a
                    key={ch.name}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__channel"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={ch.name}
                    className="contact__channel"
                    onClick={ch.onClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && ch.onClick?.()}
                    id="emailchan"
                  >
                    {inner}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* ── Right: contact form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <form
              id="cform"
              className="contact__form"
              onSubmit={handleSubmit}
            >
              {/* Web3Forms hidden fields */}
              <input type="hidden" name="access_key" value="755e6849-8ba2-459a-92d2-d3dc8ef27806" />
              <input type="hidden" name="subject"    value="Portfolio Inquiry — Devika J" />
              <input type="hidden" name="redirect"   value="false" />

              <div className="form__group">
                <label className="form__label" htmlFor="form-name">Your Name</label>
                <input
                  id="form-name"
                  type="text"
                  name="name"
                  className="form__input"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="form-email">Email Address</label>
                <input
                  id="form-email"
                  type="email"
                  name="email"
                  className="form__input"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="form-message">Message</label>
                <textarea
                  id="form-message"
                  name="message"
                  className="form__textarea"
                  required
                />
              </div>

              <button
                id="fsbtn"
                type="submit"
                className="form__submit"
                disabled={formState === 'sending' || formState === 'sent'}
                style={formState === 'sent' ? { background: '#2E7D32', borderColor: '#2E7D32' } : {}}
              >
                {submitLabel}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
