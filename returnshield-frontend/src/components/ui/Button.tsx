import React, { type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'text' | 'icon' | 'quiet'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  isLoading?: boolean
}

const buttonStyles = {
  base: 'inline-flex items-center justify-center gap-2 border-0 transition-all duration-200 font-[480] rounded-lg',
  variants: {
    primary:
      'bg-[#8be5dc] text-[#08221f] hover:bg-[#b2f6ef] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]',
    secondary:
      'bg-rgba(221,238,249,0.047) text-[#bac8d5] hover:bg-rgba(221,238,249,0.1) border border-rgba(197,219,236,0.08) hover:text-[#f0f8ff] transition-colors',
    text: 'bg-transparent text-[#75dcd4] hover:text-[#bcfff8] font-[500]',
    icon: 'w-8.5 h-8.5 bg-rgba(221,238,249,0.047) border border-rgba(197,219,236,0.08) text-[#b8c5d1] hover:bg-rgba(221,238,249,0.1) hover:text-[#eef8ff]',
    quiet:
      'bg-transparent text-[#8ea0b2] hover:bg-rgba(221,238,249,0.08) hover:text-[#f0f8ff] px-2 py-1.5 font-[500]',
  },
  sizes: {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  },
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
      ...props
    },
    ref,
  ) => {
    const baseClasses = buttonStyles.base
    const variantClasses = buttonStyles.variants[variant]
    const sizeClasses = buttonStyles.sizes[size]

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <span className="animate-spin">⌛</span> : null}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
