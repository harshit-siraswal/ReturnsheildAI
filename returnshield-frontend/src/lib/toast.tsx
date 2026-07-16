import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { CheckCircle, Info, Warning, X } from '@phosphor-icons/react'

export type ToastTone = 'success' | 'info' | 'warning'

type Toast = {
  id: number
  title: string
  body?: string
  tone: ToastTone
}

type ToastContextValue = {
  pushToast: (toast: { title: string; body?: string; tone?: ToastTone }) => void
}

const ToastContext = createContext<ToastContextValue>({ pushToast: () => {} })

export const useToast = () => useContext(ToastContext)

const toneIcon: Record<ToastTone, ReactNode> = {
  success: <CheckCircle size={17} weight="light" />,
  info: <Info size={17} weight="light" />,
  warning: <Warning size={17} weight="light" />,
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const idRef = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(
    ({ title, body, tone = 'success' }: { title: string; body?: string; tone?: ToastTone }) => {
      const id = ++idRef.current
      setToasts((current) => [...current.slice(-2), { id, title, body, tone }])
      window.setTimeout(() => dismiss(id), 4600)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <div className="toast-stack" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.tone}`}>
            <span className="toast-icon">{toneIcon[toast.tone]}</span>
            <span className="toast-copy">
              <strong>{toast.title}</strong>
              {toast.body && <small>{toast.body}</small>}
            </span>
            <button type="button" className="toast-close" onClick={() => dismiss(toast.id)} aria-label="Dismiss notification">
              <X size={14} weight="light" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
