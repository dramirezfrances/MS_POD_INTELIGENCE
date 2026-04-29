import React from 'react'
import { Button } from '@/components/ui/Button'

interface HeroBannerProps {
  eyebrow?: string
  title?: string
  body?: string
  primaryCta?: string
  secondaryCta?: string
}

export function HeroBanner({
  eyebrow = 'Wealth Management',
  title = 'Invest With Confidence. Plan With Clarity.',
  body = 'Morgan Stanley combines global insight with personalized guidance to help you build and protect what matters most.',
  primaryCta = 'Get Started',
  secondaryCta = 'Learn More',
}: HeroBannerProps) {
  return (
    <div className="ms-hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <p className="ms-hero__eyebrow">{eyebrow}</p>
            <h1 className="ms-hero__title">{title}</h1>
            <p className="ms-hero__body">{body}</p>
            <div className="d-flex flex-wrap gap-3">
              <Button variant="primary" size="lg">{primaryCta}</Button>
              <Button variant="outline-light" size="lg">{secondaryCta}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
