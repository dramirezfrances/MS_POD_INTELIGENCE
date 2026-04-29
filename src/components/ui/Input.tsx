import React from 'react'

type InputSize = 'sm' | 'lg'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helpText?: string
  error?: string
  inputSize?: InputSize
}

export function Input({
  label,
  helpText,
  error,
  inputSize,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const classes = [
    'form-control',
    inputSize ? `form-control-${inputSize}` : '',
    error ? 'is-invalid' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="form-label fw-semibold">
          {label}
        </label>
      )}
      <input id={inputId} className={classes} {...props} />
      {error && <div className="invalid-feedback">{error}</div>}
      {helpText && !error && (
        <div className="form-text">{helpText}</div>
      )}
    </div>
  )
}
