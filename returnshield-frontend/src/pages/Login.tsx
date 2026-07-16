import { useState, type FormEvent } from 'react'
import {
  ArrowUpRight,
  CircleNotch,
  Copy,
  Eye,
  EyeSlash,
  LockKey,
  ShieldCheck,
  Sparkle,
  User,
} from '@phosphor-icons/react'
import { DEMO_EMAIL, DEMO_PASSWORD } from '../lib/data'
import { useToast } from '../lib/toast'

interface LoginProps {
  onLogin: () => void
}

const loginTrend = [42, 39, 47, 44, 53, 58, 51, 64, 61, 72, 69, 83]

function sparkPoints(values: number[]) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  return values
    .map((value, index) => {
      const x = 8 + (index * 284) / (values.length - 1)
      const y = 92 - ((value - min) / range) * 66
      return `${x},${y}`
    })
    .join(' ')
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const { pushToast } = useToast()

  const fillDemo = () => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    setError(null)
    pushToast({ title: 'Demo credentials filled', body: 'Select Sign in to open the workspace.', tone: 'info' })
  }

  const copyDemo = async () => {
    try {
      await navigator.clipboard.writeText(`${DEMO_EMAIL} / ${DEMO_PASSWORD}`)
      pushToast({ title: 'Credentials copied', body: 'Email and password are on your clipboard.', tone: 'info' })
    } catch {
      pushToast({ title: 'Copy unavailable', body: 'Select the credentials and copy manually.', tone: 'warning' })
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (isSigningIn) return

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail || !password) {
      setError('Enter the demo email and password to continue.')
      return
    }
    if (cleanEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('Those credentials do not match the demo account. Use the demo access card below.')
      return
    }

    setError(null)
    setIsSigningIn(true)
    window.setTimeout(() => {
      onLogin()
    }, 720)
  }

  return (
    <div className="login-shell">
      <div className="login-frame">
        {/* Left: sign-in panel */}
        <section className="login-panel" aria-labelledby="login-title">
          <a className="brand login-brand" href="#login" aria-label="ReturnShield AI">
            <span className="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
            <span>ReturnShield</span>
          </a>

          <div className="login-copy">
            <div className="eyebrow"><Sparkle size={13} weight="light" /> Revenue protection control room</div>
            <h1 id="login-title">Sign in to act before the return happens.</h1>
            <p>
              Score every order, understand why it is risky, and apply an approved intervention —
              all before dispatch turns a prediction into a loss.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label className="login-field">
              <span>Work email</span>
              <div className={`login-input ${error ? 'has-error' : ''}`}>
                <User size={17} weight="light" aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  placeholder="you@company.in"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value); setError(null) }}
                />
              </div>
            </label>

            <label className="login-field">
              <span>Password</span>
              <div className={`login-input ${error ? 'has-error' : ''}`}>
                <LockKey size={17} weight="light" aria-hidden="true" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => { setPassword(event.target.value); setError(null) }}
                />
                <button
                  type="button"
                  className="login-reveal"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeSlash size={16} weight="light" /> : <Eye size={16} weight="light" />}
                </button>
              </div>
            </label>

            {error && <p className="login-error" role="alert">{error}</p>}

            <button className="apply-button login-submit" type="submit" disabled={isSigningIn}>
              {isSigningIn ? (
                <><CircleNotch size={17} weight="light" className="spin" /> Opening workspace…</>
              ) : (
                <>Sign in to workspace <span><ArrowUpRight size={16} weight="light" /></span></>
              )}
            </button>
          </form>

          <div className="demo-card" aria-label="Demo access credentials">
            <div className="demo-card-head">
              <span className="recommended-caption"><ShieldCheck size={15} weight="light" /> Demo access</span>
              <button type="button" className="demo-copy" onClick={copyDemo}>
                <Copy size={14} weight="light" /> Copy
              </button>
            </div>
            <dl className="demo-rows">
              <div><dt>Email</dt><dd>{DEMO_EMAIL}</dd></div>
              <div><dt>Password</dt><dd>{DEMO_PASSWORD}</dd></div>
            </dl>
            <button type="button" className="demo-fill" onClick={fillDemo}>
              Use demo credentials <ArrowUpRight size={14} weight="light" />
            </button>
          </div>

          <p className="login-foot">Internal dashboard · Pilot tenant Northstar Retail · Model v2.4</p>
        </section>

        {/* Right: live exposure preview */}
        <aside className="login-visual" aria-hidden="true">
          <div className="login-visual-core">
            <div className="login-visual-head">
              <span className="section-kicker">Live portfolio</span>
              <span className="live-label"><span></span> Scoring</span>
            </div>
            <strong className="login-visual-value">INR 12.84L</strong>
            <small className="login-visual-sub">revenue at risk · next 30 days</small>
            <div className="login-spark">
              <svg viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="login-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#69ded5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#69ded5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points={`8,96 ${sparkPoints(loginTrend)} 292,96`} fill="url(#login-fill)" />
                <polyline
                  points={sparkPoints(loginTrend)}
                  fill="none"
                  stroke="#69ded5"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="login-visual-stats">
              <div><small>Critical orders</small><strong>93</strong></div>
              <div><small>Loss prevented</small><strong>INR 2.37L</strong></div>
              <div><small>Action SLA</small><strong>88%</strong></div>
            </div>
            <div className="login-visual-quote">
              "A prediction is useful only when it is financially material, explainable, and connected to an action."
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
