import React from 'react'

export default function StartScreen({ questionCount, onStart }) {
  return (
    <div className="start-screen">
      <div className="start-card">
        <div className="start-icon">🦷</div>
        <h1>NDEB Practice Exam</h1>
        <p className="start-subtitle">National Dental Examining Board Preparation</p>
        <div className="start-info">
          <div className="info-item">
            <span className="info-label">Questions</span>
            <span className="info-value">{questionCount}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Time Limit</span>
            <span className="info-value">30 minutes</span>
          </div>
        </div>
        <button className="btn-start" onClick={onStart}>
          Start Exam
        </button>
        <p className="start-hint">You can flag questions to review before submitting.</p>
      </div>
    </div>
  )
}
