import React from 'react'

export default function Timer({ minutes, seconds, remaining }) {
  const isLow = remaining < 300
  const isCritical = remaining < 60

  return (
    <div className={`timer ${isCritical ? 'timer-critical' : isLow ? 'timer-low' : ''}`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
      <span className="timer-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}
