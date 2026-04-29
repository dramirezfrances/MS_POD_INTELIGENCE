import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  imgSrc?: string
  imgAlt?: string
  imgPosition?: 'top' | 'bottom'
}

export function Card({
  title,
  subtitle,
  footer,
  imgSrc,
  imgAlt = '',
  imgPosition = 'top',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div className={`card ${className}`} {...props}>
      {imgSrc && imgPosition === 'top' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgSrc} className="card-img-top" alt={imgAlt} />
      )}
      <div className="card-body">
        {title && <h5 className="card-title">{title}</h5>}
        {subtitle && (
          <h6 className="card-subtitle mb-2 text-body-secondary">{subtitle}</h6>
        )}
        {children}
      </div>
      {imgSrc && imgPosition === 'bottom' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgSrc} className="card-img-bottom" alt={imgAlt} />
      )}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
