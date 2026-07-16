import React, { type InputHTMLAttributes, type ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  kbd?: string
  className?: string
}

export const SearchField = React.forwardRef<HTMLLabelElement, InputProps>(
  ({ icon, kbd, className = '', ...props }, ref) => (
    <label ref={ref} className={`search-field ${className}`.trim()}>
      {icon}
      <input {...props} />
      {kbd && <kbd>{kbd}</kbd>}
    </label>
  ),
)

SearchField.displayName = 'SearchField'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  className?: string
}

export const TextField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, helperText, error, className = '', ...props }, ref) => (
    <div className={`text-field ${className}`.trim()}>
      {label && <label className="text-field-label">{label}</label>}
      <input ref={ref} {...props} className={`text-field-input ${error ? 'has-error' : ''}`.trim()} />
      {error && <span className="text-field-error">{error}</span>}
      {helperText && !error && <span className="text-field-help">{helperText}</span>}
    </div>
  ),
)

TextField.displayName = 'TextField'
