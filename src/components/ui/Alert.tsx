'use client'

import React, { useState } from 'react'

type AlertVariant =
  | 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  dismissible?: boolean
  heading?: string
}

export function Alert({
  variant = 'primary',
  dismissible = false,
  heading,
  className = '',
  children,
  ...props
}: AlertProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  const classes = [
    'alert',
    `alert-${variant}`,
    dismissible ? 'alert-dismissible fade show' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="alert" {...props}>
      {heading && <h4 className="alert-heading">{heading}</h4>}
      {children}
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setVisible(false)}
        />
      )}
    </div>
  )
}
