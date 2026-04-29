import React from 'react'

type ButtonVariant =
  | 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark' | 'link'
  | 'outline-primary' | 'outline-secondary' | 'outline-success'
  | 'outline-danger' | 'outline-warning' | 'outline-info'
  | 'outline-light' | 'outline-dark'

type ButtonSize = 'sm' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  active?: boolean
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size,
  active,
  loading,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : '',
    active ? 'active' : '',
    loading ? 'disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}
