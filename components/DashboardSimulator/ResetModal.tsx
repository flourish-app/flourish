'use client'

import { RefreshCw } from 'lucide-react'

type Props = {
  show: boolean
  resetting: boolean
  onOpen: () => void
  onClose: () => void
  onConfirm: () => void
}

export default function ResetModal({ show, resetting, onOpen, onClose, onConfirm }: Props) {
  return (
    <>
      <div className="sim-reset-zone">
        <button className="sim-reset-btn" onClick={onOpen}>
          <RefreshCw className="sim-reset-btn__icon" aria-hidden="true" size={14} strokeWidth={2} />
          Reset portfolio
        </button>
      </div>

      {show && (
        <div className="sim-modal-overlay" onClick={() => !resetting && onClose()}>
          <div className="sim-modal" onClick={e => e.stopPropagation()}>
            <h2 className="sim-modal__title">Reset portfolio?</h2>
            <p className="sim-modal__body">
              This will clear all your holdings and restore your cash to £10,000.
              Your transaction history will be kept.
            </p>
            <div className="sim-modal__actions">
              <button
                className="btn btn--outline"
                onClick={onClose}
                disabled={resetting}
              >
                Cancel
              </button>
              <button
                className="btn btn--danger"
                onClick={onConfirm}
                disabled={resetting}
              >
                {resetting ? 'Resetting…' : 'Yes, reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
