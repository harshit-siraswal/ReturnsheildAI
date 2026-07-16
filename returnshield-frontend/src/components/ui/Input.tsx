import React, { type InputHTMLAttributes, type ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  kbd?: string
  className?: string
}

export const SearchField = React.forwardRef<HTMLLabelElement, InputProps>(
  ({ icon, kbd, className = '', ...props }, ref) => (
    <label
      ref={ref}
      className={`w-[255px] h-[34px] flex items-center gap-2 px-2.5 rounded-[11px] text-[#718398] bg-[rgba(221,238,249,0.047)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${className}`}
    >
      {icon}
      <input
        {...props}
        className="flex-1 min-w-0 border-0 outline-0 text-[#e7f0f8] bg-transparent text-[11px] placeholder:text-[#718398]"
      />
      {kbd && (
        <kbd className="px-1.25 py-0.75 rounded-[5px] text-[#728398] bg-[rgba(214,232,245,0.07)] font-mono text-[8px] whitespace-nowrap">
          {kbd}
        </kbd>
      )}
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
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-[11px] font-[540] text-[#dce7f1]">{label}</label>}
      <input
        ref={ref}
        {...props}
        className="px-3 py-2 rounded-[12px] text-[11px] bg-[rgba(221,238,249,0.047)] border border-[rgba(197,219,236,0.08)] text-[#e7f0f8] placeholder:text-[#718398] focus-visible:outline-[2px] focus-visible:outline-[#60e7dd] focus-visible:outline-offset-[3px]"
      />
      {error && <span className="text-[9px] text-[#fb8073]">{error}</span>}
      {helperText && <span className="text-[9px] text-[#7d90a5]">{helperText}</span>}
    </div>
  ),
)

TextField.displayName = 'TextField'
