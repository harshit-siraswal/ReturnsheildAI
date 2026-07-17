import React from 'react'
import { X, Sparkle, ArrowUpRight, ShieldCheck } from '@phosphor-icons/react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import type { Order } from '../../lib/data'
import type { CustomOrderDraft } from '../../lib/orderScoring'

interface OrderComposerProps {
  open: boolean
  mode: 'create' | 'edit'
  draft: CustomOrderDraft
  preview: Order
  onClose: () => void
  onChange: <K extends keyof CustomOrderDraft>(field: K, value: CustomOrderDraft[K]) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onReset: () => void
}

const paymentOptions: Array<CustomOrderDraft['paymentMethod']> = ['COD', 'UPI', 'Card']
const shippingOptions: Array<CustomOrderDraft['shippingMethod']> = ['Express', 'Standard', 'Economy']
const customerOptions: Array<CustomOrderDraft['customerType']> = ['New', 'Returning']
const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say']
const categoryOptions = ['Electronics', 'Fashion', 'Home essentials', 'Kitchen', 'Footwear', 'Travel', 'Beauty', 'Sports']

function ComposerField({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="composer-field">
      <span className="composer-label-row">
        <strong>{label}</strong>
        {hint && <small>{hint}</small>}
      </span>
      {children}
    </label>
  )
}

export function OrderComposer({ open, mode, draft, preview, onClose, onChange, onSubmit, onReset }: OrderComposerProps) {
  if (!open) return null

  return (
    <div className="drawer-layer composer-layer" role="presentation" onMouseDown={onClose}>
      <div className="composer-modal" role="dialog" aria-modal="true" aria-labelledby="composer-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-heading composer-heading">
          <div>
            <span className="section-kicker">Local order intake</span>
            <h2 id="composer-title">{mode === 'edit' ? 'Edit a product/order entry' : 'Add a product/order entry'}</h2>
            <p>Enter the product and order details manually. The risk score updates instantly and the saved order stays on this device.</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close order composer">
            <X size={19} weight="light" />
          </button>
        </div>

        <form className="composer-grid" onSubmit={onSubmit}>
          <section className="composer-panel">
            <div className="composer-section-head">
              <span>Order details</span>
              <small>Single-order fields</small>
            </div>
            <div className="composer-fields composer-fields-order">
              <ComposerField label="Order ID" hint="Used in the queue">
                <input value={draft.orderId} onChange={(event) => onChange('orderId', event.target.value)} placeholder="#RS-20001" />
              </ComposerField>
              <ComposerField label="Customer name">
                <input value={draft.customerName} onChange={(event) => onChange('customerName', event.target.value)} placeholder="Aarav Mehta" />
              </ComposerField>
              <ComposerField label="Product name">
                <input value={draft.productName} onChange={(event) => onChange('productName', event.target.value)} placeholder="Pulse air purifier" />
              </ComposerField>
              <ComposerField label="Product category">
                <select value={draft.productCategory} onChange={(event) => onChange('productCategory', event.target.value)}>
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </ComposerField>
            </div>
          </section>

          <section className="composer-panel">
            <div className="composer-section-head">
              <span>AI input features</span>
              <small>15 fields from the model spec</small>
            </div>
            <div className="composer-fields composer-fields-ai">
              <ComposerField label="Product price">
                <input inputMode="numeric" value={draft.productPrice} onChange={(event) => onChange('productPrice', event.target.value)} placeholder="75000" />
              </ComposerField>
              <ComposerField label="Order quantity">
                <input inputMode="numeric" value={draft.orderQuantity} onChange={(event) => onChange('orderQuantity', event.target.value)} placeholder="1" />
              </ComposerField>
              <ComposerField label="User age">
                <input inputMode="numeric" value={draft.userAge} onChange={(event) => onChange('userAge', event.target.value)} placeholder="25" />
              </ComposerField>
              <ComposerField label="User gender">
                <select value={draft.userGender} onChange={(event) => onChange('userGender', event.target.value as CustomOrderDraft['userGender'])}>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </ComposerField>
              <ComposerField label="User location">
                <input value={draft.userLocation} onChange={(event) => onChange('userLocation', event.target.value)} placeholder="Delhi" />
              </ComposerField>
              <ComposerField label="Payment method">
                <select value={draft.paymentMethod} onChange={(event) => onChange('paymentMethod', event.target.value as CustomOrderDraft['paymentMethod'])}>
                  {paymentOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </ComposerField>
              <ComposerField label="Shipping method">
                <select value={draft.shippingMethod} onChange={(event) => onChange('shippingMethod', event.target.value as CustomOrderDraft['shippingMethod'])}>
                  {shippingOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </ComposerField>
              <ComposerField label="Discount applied">
                <input inputMode="numeric" value={draft.discountApplied} onChange={(event) => onChange('discountApplied', event.target.value)} placeholder="40" />
              </ComposerField>
              <ComposerField label="Seller rating">
                <input inputMode="decimal" value={draft.sellerRating} onChange={(event) => onChange('sellerRating', event.target.value)} placeholder="2.8" />
              </ComposerField>
              <ComposerField label="Product rating">
                <input inputMode="decimal" value={draft.productRating} onChange={(event) => onChange('productRating', event.target.value)} placeholder="2.5" />
              </ComposerField>
              <ComposerField label="Previous returns">
                <input inputMode="numeric" value={draft.previousReturns} onChange={(event) => onChange('previousReturns', event.target.value)} placeholder="6" />
              </ComposerField>
              <ComposerField label="Customer type">
                <select value={draft.customerType} onChange={(event) => onChange('customerType', event.target.value as CustomOrderDraft['customerType'])}>
                  {customerOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </ComposerField>
              <ComposerField label="Review count">
                <input inputMode="numeric" value={draft.productReviewCount} onChange={(event) => onChange('productReviewCount', event.target.value)} placeholder="12" />
              </ComposerField>
              <ComposerField label="Order value">
                <input inputMode="numeric" value={draft.orderValue} onChange={(event) => onChange('orderValue', event.target.value)} placeholder="75000" />
              </ComposerField>
            </div>
          </section>

          <aside className="composer-preview">
            <div className="composer-preview-card">
              <div className="composer-preview-head">
                <span className="recommended-caption"><Sparkle size={15} weight="light" /> Live prediction</span>
                <Badge variant="priority" priority={preview.priority.toLowerCase() as 'p0' | 'p1' | 'p2'}>{preview.priority}</Badge>
              </div>
              <strong>{preview.risk}% return risk</strong>
              <p>{preview.driver}</p>
              <div className="composer-preview-metrics">
                <div>
                  <small>Estimated loss</small>
                  <strong>{preview.loss}</strong>
                </div>
                <div>
                  <small>Suggested action</small>
                  <strong>{preview.action}</strong>
                </div>
              </div>
              <div className="composer-preview-list">
                {preview.alternatives.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="composer-actions">
              <button type="button" className="secondary-action" onClick={onReset}>Reset form</button>
              <Button variant="accent" size="md" type="submit">
                {mode === 'edit' ? 'Save changes' : 'Score and save'} <span><ArrowUpRight size={16} weight="light" /></span>
              </Button>
            </div>
            <div className="composer-note">
              <ShieldCheck size={15} weight="light" /> No database is used. The saved order stays in local storage on this browser.
            </div>
          </aside>
        </form>
      </div>
    </div>
  )
}
