import React from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface SearchBoxProps {
  placeholder?: string
  buttonLabel?: string
}

export function SearchBox({
  placeholder = 'Search...',
  buttonLabel = 'Search',
}: SearchBoxProps) {
  return (
    <div className="input-group">
      <input
        type="search"
        className="form-control"
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <Button variant="primary" type="button">
        {buttonLabel}
      </Button>
    </div>
  )
}

interface LabeledInputProps {
  label: string
  type?: string
  placeholder?: string
  helpText?: string
  required?: boolean
}

export function LabeledInput({
  label,
  type = 'text',
  placeholder,
  helpText,
  required,
}: LabeledInputProps) {
  return (
    <Input
      label={label}
      type={type}
      placeholder={placeholder}
      helpText={helpText}
      required={required}
    />
  )
}
