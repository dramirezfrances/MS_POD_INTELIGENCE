'use client'

import { useEffect, useRef, useState } from 'react'

export interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (selected: string[]) => void
  label?: string
  placeholder?: string
  helpText?: string
  error?: string
  disabled?: boolean
  id?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select options…',
  helpText,
  error,
  disabled = false,
  id,
}: MultiSelectProps) {
  const isControlled = value !== undefined
  const [internalSelected, setInternalSelected] = useState<string[]>([])
  const selected = isControlled ? value! : internalSelected

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const inputId = id ?? `ms-multiselect-${Math.random().toString(36).slice(2, 8)}`

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus search when dropdown opens
  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

  const toggle = (val: string) => {
    const next = selected.includes(val)
      ? selected.filter((v) => v !== val)
      : [...selected, val]
    if (!isControlled) setInternalSelected(next)
    onChange?.(next)
  }

  const remove = (val: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const next = selected.filter((v) => v !== val)
    if (!isControlled) setInternalSelected(next)
    onChange?.(next)
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isControlled) setInternalSelected([])
    onChange?.([])
  }

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  )

  const selectedLabels = selected
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean) as string[]

  const hasError = Boolean(error)
  const fieldsetClass = [
    'ms-multiselect',
    open ? 'ms-multiselect--open' : '',
    hasError ? 'ms-multiselect--error' : '',
    disabled ? 'ms-multiselect--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={fieldsetClass} ref={containerRef}>
      {label && (
        <label className="ms-multiselect__label" htmlFor={inputId}>
          {label}
        </label>
      )}

      {/* Trigger / chip container */}
      <div
        id={inputId}
        className="ms-multiselect__control"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((o) => !o) }
          if (e.key === 'Escape') { setOpen(false); setSearch('') }
        }}
      >
        <div className="ms-multiselect__chips">
          {selectedLabels.length === 0 && (
            <span className="ms-multiselect__placeholder">{placeholder}</span>
          )}
          {selectedLabels.map((label, i) => (
            <span key={selected[i]} className="ms-multiselect__chip">
              {label}
              <button
                type="button"
                className="ms-multiselect__chip-remove"
                aria-label={`Remove ${label}`}
                onClick={(e) => remove(selected[i], e)}
                tabIndex={-1}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="ms-multiselect__actions">
          {selected.length > 0 && !disabled && (
            <button
              type="button"
              className="ms-multiselect__clear"
              aria-label="Clear all"
              onClick={clearAll}
              tabIndex={-1}
            >
              ×
            </button>
          )}
          <span className={`ms-multiselect__chevron${open ? ' ms-multiselect__chevron--up' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="ms-multiselect__dropdown" role="listbox" aria-multiselectable="true">
          {/* Search */}
          <div className="ms-multiselect__search-wrap">
            <svg className="ms-multiselect__search-icon" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              ref={searchRef}
              type="text"
              className="ms-multiselect__search"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options */}
          <ul className="ms-multiselect__list">
            {filtered.length === 0 && (
              <li className="ms-multiselect__empty">No options found</li>
            )}
            {filtered.map((opt) => {
              const checked = selected.includes(opt.value)
              return (
                <li
                  key={opt.value}
                  className={`ms-multiselect__option${checked ? ' ms-multiselect__option--checked' : ''}`}
                  role="option"
                  aria-selected={checked}
                  onClick={(e) => { e.stopPropagation(); toggle(opt.value) }}
                >
                  <span className="ms-multiselect__checkbox" aria-hidden="true">
                    {checked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  <span className="ms-multiselect__option-label">{opt.label}</span>
                </li>
              )
            })}
          </ul>

          {/* Footer count */}
          {selected.length > 0 && (
            <div className="ms-multiselect__footer">
              {selected.length} of {options.length} selected
            </div>
          )}
        </div>
      )}

      {/* Help / error text */}
      {error && <p className="ms-multiselect__feedback ms-multiselect__feedback--error">{error}</p>}
      {helpText && !error && <p className="ms-multiselect__feedback">{helpText}</p>}
    </div>
  )
}
