/* Reusable section divider label: LABEL ──────── 01 / 08 */
export default function SectionLabel({ text, num }) {
  return (
    <div className="section-label">
      <span className="section-label__text">{text}</span>
      <div className="section-label__line" />
      {num && <span className="section-label__num">{num}</span>}
    </div>
  )
}
