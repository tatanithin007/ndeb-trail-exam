import React from 'react'

export default function QuestionNav({ total, current, answers, flagged, onNavigate }) {
  return (
    <div className="question-nav">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current
        const isAnswered = answers[i] != null
        const isFlagged = flagged.has(i)

        let className = 'nav-dot'
        if (isActive) className += ' nav-dot-active'
        if (isAnswered) className += ' nav-dot-answered'
        if (isFlagged) className += ' nav-dot-flagged'

        return (
          <button
            key={i}
            className={className}
            onClick={() => onNavigate(i)}
            title={`Question ${i + 1}${isFlagged ? ' (flagged)' : ''}`}
          >
            {i + 1}
          </button>
        )
      })}
    </div>
  )
}
