import React, { type ButtonHTMLAttributes } from 'react'
import { CircleNotch } from '@phosphor-icons/react'

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'text' | 'icon' | 'quiet'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  isLoading?: boolean
}

// Variants map onto the hand-tuned classes in App.css — this project does not
// use Tailwind, so utility-style class strings would render as nothing.
const variantClass: Record<ButtonVariant, string> = {
  primary: 'review-button',
  secondary: 'date-button',
  accent: 'export-button',
  text: 'text-button',
  icon: 'icon-button',
  quiet: 'quiet-button',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'secondary',
      size = 'md',
      className = '',
      children,
      isLoading = false,
      disabled = false,
      type = 'button',
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={`${variantClass[variant]} btn-${size} ${className}`.trim()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <CircleNotch size={15} weight="light" className="spin" aria-hidden="true" />}
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
