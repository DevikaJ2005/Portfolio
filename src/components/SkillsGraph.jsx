import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as d3 from 'd3'
import SectionLabel from './SectionLabel'
import { skills, skillEdges, projectNames } from '../data/data'

const ACCENT   = '#E8380D'
const DIMMED   = 0.14
const NODE_S   = 26  // square side length
const LABEL_DY = 34  // label offset below node center

export default function SkillsGraph() {
  const svgRef  = useRef(null)
  const wrapRef = useRef(null)
  const [tooltip, setTooltip]   = useState(null)  // { skill, svgX, svgY, wrapRect }
  const [isMobile, setIsMobile] = useState(false)

  // ── Breakpoint detection ──────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Close tooltip on Escape or outside click ──────────────────────────────
  useEffect(() => {
    if (!tooltip) return
    const onKey = (e) => { if (e.key === 'Escape') setTooltip(null) }
    const onClick = (e) => {
      // Only close if the click is inside the SVG wrapper but not on a node
      if (e.target.closest('.graph-tooltip')) return
      setTooltip(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [tooltip])

  // ── D3 force simulation (desktop only) ───────────────────────────────────
  useEffect(() => {
    if (isMobile || !svgRef.current || !wrapRef.current) return

    const wrap = wrapRef.current
    const W = wrap.clientWidth  || 960
    const H = Math.max(430, Math.min(W * 0.48, 560))

    const svg = d3.select(svgRef.current)
    svg.attr('width', W).attr('height', H).attr('viewBox', `0 0 ${W} ${H}`)
    svg.selectAll('*').remove()  // Clear on re-render

    // Deep-copy data so d3 can mutate position properties
    const nodes = skills.map(s => ({ ...s }))
    const links = skillEdges.map(e => ({ ...e }))

    // ── Force simulation ──
    // alphaDecay tuned high so the graph settles quickly without jitter
    const sim = d3.forceSimulation(nodes)
      .force('link',    d3.forceLink(links).id(d => d.id).distance(118).strength(0.3))
      .force('charge',  d3.forceManyBody().strength(-430))
      .force('center',  d3.forceCenter(W / 2, H / 2))
      .force('x',       d3.forceX(W / 2).strength(0.035))
      .force('y',       d3.forceY(H / 2).strength(0.045))
      .force('collide', d3.forceCollide(d => NODE_S / 2 + LABEL_DY + Math.min(18, d.name.length * 1.2)))
      .alphaDecay(0.038)
      .velocityDecay(0.46)

    // ── SVG elements ──
    const linkEl = svg.append('g')
      .attr('class', 'sg-links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', 'var(--border-lt)')
      .attr('stroke-width', 1.1)
      .attr('stroke-opacity', 0.62)

    const nodeEl = svg.append('g')
      .attr('class', 'sg-nodes')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer')

    // Invisible hit area — larger than visible rect for easy clicking
    const half = NODE_S / 2
    nodeEl.append('rect')
      .attr('x', -(half + 14))
      .attr('y', -(half + 14))
      .attr('width',  NODE_S + 28)
      .attr('height', NODE_S + 28)
      .attr('fill', 'transparent')
      .attr('class', 'hit-area')

    // Visible node square
    nodeEl.append('rect')
      .attr('x', -half)
      .attr('y', -half)
      .attr('width',  NODE_S)
      .attr('height', NODE_S)
      .attr('fill', 'var(--skill-node)')
      .attr('stroke', 'var(--border-lt)')
      .attr('stroke-width', 1.2)
      .attr('class', 'node-rect')

    // Label below node
    nodeEl.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', LABEL_DY)
      .attr('font-family', "'DM Mono', monospace")
      .attr('font-size', d => d.name.length > 12 ? '9.5px' : '10.5px')
      .attr('letter-spacing', '0.02em')
      .attr('fill', 'var(--ink)')
      .attr('class', 'node-label')
      .style('pointer-events', 'none')
      .style('user-select', 'none')

    // ── Drag behavior ──
    const drag = d3.drag()
      .on('start', (event, d) => {
        if (!event.active) sim.alphaTarget(0.3).restart()
        d.fx = d.x; d.fy = d.y
      })
      .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y })
      .on('end',  (event, d) => {
        if (!event.active) sim.alphaTarget(0)
        d.fx = null; d.fy = null
      })

    nodeEl.call(drag)

    // ── Hover: highlight connected sub-graph, dim the rest ──
    nodeEl.on('mouseenter', function(_, d) {
      const connected = new Set([d.id])
      links.forEach(l => {
        const sid = typeof l.source === 'object' ? l.source.id : l.source
        const tid = typeof l.target === 'object' ? l.target.id : l.target
        if (sid === d.id) connected.add(tid)
        if (tid === d.id) connected.add(sid)
      })

      nodeEl.selectAll('.node-rect')
        .attr('stroke',       n => connected.has(n.id) ? ACCENT : 'var(--border-lt)')
        .attr('stroke-width', n => n.id === d.id ? 3 : 1.4)
        .attr('fill',         n => n.id === d.id ? 'var(--skill-node-active)' : connected.has(n.id) ? 'var(--skill-node-connected)' : 'var(--skill-node)')
        .attr('opacity',      n => connected.has(n.id) ? 1 : DIMMED)

      nodeEl.selectAll('.node-label')
        .attr('fill',    n => n.id === d.id ? ACCENT : connected.has(n.id) ? 'var(--ink)' : 'var(--border-lt)')
        .attr('opacity', n => connected.has(n.id) ? 1 : DIMMED)

      linkEl
        .attr('stroke', l => {
          const sid = typeof l.source === 'object' ? l.source.id : l.source
          const tid = typeof l.target === 'object' ? l.target.id : l.target
          return (sid === d.id || tid === d.id) ? ACCENT : 'var(--border-lt)'
        })
        .attr('stroke-width', l => {
          const sid = typeof l.source === 'object' ? l.source.id : l.source
          const tid = typeof l.target === 'object' ? l.target.id : l.target
          return (sid === d.id || tid === d.id) ? 2.4 : 1
        })
        .attr('opacity', l => {
          const sid = typeof l.source === 'object' ? l.source.id : l.source
          const tid = typeof l.target === 'object' ? l.target.id : l.target
          return (sid === d.id || tid === d.id) ? 1 : DIMMED
        })
    })

    nodeEl.on('mouseleave', function() {
      nodeEl.selectAll('.node-rect')
        .attr('stroke', 'var(--border-lt)').attr('stroke-width', 1.2)
        .attr('fill', 'var(--skill-node)').attr('opacity', 1)
      nodeEl.selectAll('.node-label')
        .attr('fill', 'var(--ink)').attr('opacity', 1)
      linkEl.attr('stroke', 'var(--border-lt)').attr('stroke-width', 1.1).attr('opacity', 0.62)
    })

    // ── Click: show React tooltip ──
    nodeEl.on('click', function(event, d) {
      event.stopPropagation()
      // Get position of clicked node relative to the SVG wrapper
      const wrapRect = wrapRef.current.getBoundingClientRect()
      const nodeRect = this.getBoundingClientRect()
      setTooltip({
        skill: d,
        // Position: centered above the node
        x: nodeRect.left - wrapRect.left + nodeRect.width / 2,
        y: nodeRect.top  - wrapRect.top,
      })
    })

    // ── Tick: update positions ──
    const halfS = NODE_S / 2
    sim.on('tick', () => {
      nodes.forEach(n => {
        n.x = Math.max(halfS + 32, Math.min(W - halfS - 32, n.x))
        n.y = Math.max(halfS + 28, Math.min(H - halfS - LABEL_DY - 24, n.y))
      })

      linkEl
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y)

      nodeEl.attr('transform', d => `translate(${d.x},${d.y})`)
    })

    return () => sim.stop()
  }, [isMobile])

  // ── Tooltip: scroll to project ──
  const scrollToProject = () => {
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTooltip(null)
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <SectionLabel text="Technical Skills" num="02 / 06" />

        <div className="skills__intro">
          <h2 className="skills__heading">TECH STACK</h2>
          <p className="skills__note">
            Technologies connected through real project experience.
          </p>
        </div>

        {/* ── Desktop: D3 force graph ── */}
        {!isMobile && (
          <div className="skills__graph-wrap" ref={wrapRef}>
            <svg ref={svgRef} style={{ display: 'block', width: '100%' }} />

            {/* Overlay hint */}
            <span className="skills__graph-hint">drag · hover · click</span>

            {/* Tooltip (React-rendered, positioned over SVG) */}
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  className="graph-tooltip"
                  style={{
                    position: 'absolute',
                    // Position centered above the node, shift up by tooltip height estimate
                    left: Math.max(10, Math.min(tooltip.x - 90, (wrapRef.current?.clientWidth || 800) - 250)),
                    top:  Math.max(10, tooltip.y - 140),
                  }}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{    opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                >
                  <button
                    className="graph-tooltip__close"
                    onClick={() => setTooltip(null)}
                    aria-label="Close tooltip"
                  >
                    ×
                  </button>

                  <div className="graph-tooltip__name">{tooltip.skill.name}</div>

                  <div className="graph-tooltip__projects">
                    {tooltip.skill.projectRefs.length > 0 ? (
                      <>
                        <strong>Used in</strong>
                        {tooltip.skill.projectRefs.map(ref => (
                          <div key={ref}>{projectNames[ref] || ref}</div>
                        ))}
                        <button
                          className="graph-tooltip__link"
                          onClick={scrollToProject}
                        >
                          View projects →
                        </button>
                      </>
                    ) : (
                      <span style={{ color: '#9B9B9B' }}>
                        In my skill set — not yet tied to a listed project.
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ── Mobile: static pill grid fallback ── */}
        {isMobile && (
          <div className="skills__mobile-grid">
            {skills.map(s => (
              <div key={s.id} className="skills__mobile-pill">{s.name}</div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
