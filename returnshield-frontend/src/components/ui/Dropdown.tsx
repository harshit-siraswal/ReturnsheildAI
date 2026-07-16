import { useEffect, useRef, useState, type ReactNode } from 'react'

// Small dropdown menu built on the existing design language.
// Closes on outside pointer-down and Escape; positions below the trigger.

interface DropdownProps {
  trigger: (open: boolean) => ReactNode
  options: string[]
  value: string
  onSelect: (option: string) => void
  align?: 'left' | 'right'
  className?: string
}

export function Dropdown({ trigger, options, value, onSelect, align = 'right', className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={`dropdown ${className}`.trim()} ref={rootRef}>
      <div onClick={() => setOpen((o) => !o)}>{trigger(open)}</div>
      {open && (
        <div className={`dropdown-menu align-${align}`} role="listbox" aria-label="Options">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={option === value}
              className={option === value ? 'is-selected' : ''}
              onClick={() => {
                onSelect(option)
                setOpen(false)
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
