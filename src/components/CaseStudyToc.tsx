import React from 'react'

interface CaseStudyTocProps {
  items: Array<{ id: string; label: string }>
  activeId: string
  onSelect: (e: React.MouseEvent, id: string) => void
  label?: string
  badge?: string
}

export const CaseStudyToc: React.FC<CaseStudyTocProps> = ({
  items,
  activeId,
  onSelect,
  label = 'Contents',
  badge,
}) => {
  return (
    <aside className="cs-toc-rail" aria-label={label}>
      <nav className="cs-toc" aria-label={label}>
        <div className="cs-toc-header">
          <p className="cs-toc-label">{label}</p>
          {badge && <span className="cs-toc-badge">{badge}</span>}
        </div>
        <div className="cs-toc-links">
          {items.map((item) => {
            const isActive = activeId === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => onSelect(e, item.id)}
                className={`cs-toc-link ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}
