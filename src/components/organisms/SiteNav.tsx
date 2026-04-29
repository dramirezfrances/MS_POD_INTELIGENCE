import React from 'react'
import { Button } from '@/components/ui/Button'

interface NavLink {
  label: string
  href: string
  active?: boolean
}

interface SiteNavProps {
  links?: NavLink[]
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Wealth Management', href: '#' },
  { label: 'Investment Banking', href: '#' },
  { label: 'Research', href: '#' },
  { label: 'About', href: '#' },
]

export function SiteNav({ links = DEFAULT_LINKS }: SiteNavProps) {
  return (
    <nav className="navbar ms-navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#">
          Morgan Stanley
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#msNav"
          aria-controls="msNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="msNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((link) => (
              <li className="nav-item" key={link.label}>
                <a
                  className={`nav-link${link.active ? ' active' : ''}`}
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2">
            <Button variant="outline-light" size="sm">Log In</Button>
            <Button variant="primary" size="sm">Open Account</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
