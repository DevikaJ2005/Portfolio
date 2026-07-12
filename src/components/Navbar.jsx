import { useEffect, useRef, useState } from 'react'

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const navRef = useRef(null)

  const navLinks = [
    { label: 'About',    href: '#about' },
    { label: 'Skills',   href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey',  href: '#experience' },
    { label: 'Contact',  href: '#contact' },
  ]

  // ── Scroll detection: active link + scrolled class ─────────────
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      let current = ''
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 180) current = s.id
      })
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Close drawer on outside click ──────────────────────────────
  useEffect(() => {
    if (!drawerOpen) return
    const handler = e => {
      if (navRef.current && !navRef.current.contains(e.target))
        setDrawerOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [drawerOpen])

  const closeDrawer = () => setDrawerOpen(false)

  const toggleLabel = theme === 'dark' ? '◑ Light' : '◐ Dark'

  return (
    <nav ref={navRef}>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#hero" className="navbar__logo">DJ.</a>

        {/* Desktop links */}
        <ul className="navbar__links">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {toggleLabel}
        </button>

        {/* Resume */}
        <a
          href="https://drive.google.com/file/d/1J2GuQVGHBTGf_GG4F-_xiHo4tnqIw1h6/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__resume"
        >
          Resume ↓
        </a>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${drawerOpen ? 'open' : ''}`}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setDrawerOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${drawerOpen ? 'open' : ''}`}>
        {navLinks.map(({ label, href }) => (
          <a key={href} href={href} onClick={closeDrawer}>{label}</a>
        ))}
        <a
          href="https://drive.google.com/file/d/1J2GuQVGHBTGf_GG4F-_xiHo4tnqIw1h6/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeDrawer}
        >
          Resume / CV ↓
        </a>
        {/* Theme toggle in mobile drawer */}
        <button
          className="theme-toggle"
          onClick={() => { onToggleTheme(); closeDrawer() }}
          aria-label="Toggle theme"
        >
          {toggleLabel}
        </button>
      </div>
    </nav>
  )
}
