import { useState, useRef, useEffect } from 'react'

// ── Command definitions ──────────────────────────────────────────────────────
// Mapping valid commands to their target section IDs for scroll navigation.
// Adding a new scrollable command: add it to SCROLL_TARGETS and optionally ALIASES.
const SCROLL_TARGETS = {
  projects: 'projects',
  about:    'about',
  skills:   'skills',
  contact:  'contact',
}

const HELP_LINES = [
  "Available commands:",
  "  projects  — view selected work",
  "  about     — learn more about me",
  "  skills    — explore my tech stack",
  "  contact   — get in touch",
]

// ── Terminal component ───────────────────────────────────────────────────────
export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: "Hi 👋  type 'help' to see available commands." },
  ])
  const [input, setInput] = useState('')
  const inputRef  = useRef(null)
  const bodyRef   = useRef(null)

  // Auto-scroll the terminal body whenever history changes
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history])

  // Process a submitted command string
  const handleCommand = (raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'help') {
      setHistory(h => [
        ...h,
        { type: 'input',  text: raw },
        ...HELP_LINES.map(line => ({ type: 'output', text: line })),
      ])
    } else if (SCROLL_TARGETS[cmd]) {
      // Valid scroll command — navigate and echo
      setHistory(h => [
        ...h,
        { type: 'input',  text: raw },
        { type: 'output', text: `→ navigating to ${cmd}...` },
      ])
      const target = document.getElementById(SCROLL_TARGETS[cmd])
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Unknown command
      setHistory(h => [
        ...h,
        { type: 'input', text: raw },
        { type: 'error', text: `command not found: '${cmd}'  —  try 'help'` },
      ])
    }

    setInput('')
  }

  return (
    <div
      className="terminal"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Interactive terminal"
    >
      {/* Terminal chrome */}
      <div className="terminal__header">
        <div className="terminal__dots" aria-hidden="true">
          <span /><span /><span />
        </div>
        <span className="terminal__title">~/devika</span>
      </div>

      {/* Output + input area */}
      <div className="terminal__body" ref={bodyRef}>
        {history.map((line, i) => (
          <div key={i} className={`terminal__line terminal__line--${line.type}`}>
            {line.type === 'input' && (
              <span className="terminal__prompt" aria-hidden="true">&gt;&nbsp;</span>
            )}
            <span>{line.text}</span>
          </div>
        ))}

        {/* Live input row */}
        <div className="terminal__input-row">
          <span className="terminal__prompt" aria-hidden="true">&gt;&nbsp;</span>
          <input
            ref={inputRef}
            id="terminal-input"
            className="terminal__input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleCommand(input)
            }}
            placeholder="type a command…"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="Terminal command input — type 'help' for available commands"
          />
        </div>
      </div>

      {/* Hint bar */}
      <div className="terminal__hint">
        projects · about · skills · contact · help
      </div>
    </div>
  )
}
