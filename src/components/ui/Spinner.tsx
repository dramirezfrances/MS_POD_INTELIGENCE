import React from 'react'

type SpinnerVariant = 'border' | 'grow'
type SpinnerColor =
  | 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark'

interface SpinnerProps {
  variant?: SpinnerVariant
  color?: SpinnerColor
  size?: 'sm'
  label?: string
}

export function Spinner({
  variant = 'border',
  color = 'primary',
  size,
  label = 'Loading...',
}: SpinnerProps) {
  const classes = [
    `spinner-${variant}`,
    `text-${color}`,
    size ? `spinner-${variant}-${size}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="status">
      <span className="visually-hidden">{label}</span>
    </div>
  )
}
