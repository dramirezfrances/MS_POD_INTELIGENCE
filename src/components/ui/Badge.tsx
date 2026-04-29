import React from 'react'

type BadgeVariant =
  | 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  pill?: boolean
}

export function Badge({
  variant = 'primary',
  pill = false,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const classes = [
    'badge',
    `text-bg-${variant}`,
    pill ? 'rounded-pill' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}
