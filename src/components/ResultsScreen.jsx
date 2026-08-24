import React, { useState } from 'react'

export default function ResultsScreen({ questions, answers, onRestart }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const correct = questions.reduce(
    (count, q, i) => count + (answers[i] === q.answer ? 1 : 0),
    0
  )
  const total = questions.length
  const percentage = Math.round((correct / total) * 100)

  function toggleExpand(index) {
    setExpandedIndex(prev => (prev === index ? null : index))
  }

  return (
    <div className="results-screen">
      <div className="results-header">
        <h1>Exam Results</h1>
        <div className="score-card">
          <div className="score-circle">
            <span className="score-number">{percentage}%</span>
          </div>
          <div className="score-details">
            <span className="score-fraction">{correct} / {total} correct</span>
            <span className={`score-label ${percentage >= 75 ? 'score-pass' : 'score-fail'}`}>
              {percentage >= 75 ? 'Passing' : 'Needs Review'}
            </span>
          </div>
        </div>
        <button className="btn-restart" onClick={onRestart}>
          Take Another Exam
        </button>
      </div>

      <div className="results-list">
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.answer
          const isUnanswered = answers[i] == null
          const isExpanded = expandedIndex === i

          return (
            <div
              key={q.id}
              className={`result-item ${isCorrect ? 'result-correct' : 'result-wrong'}`}
            >
              <button className="result-header" onClick={() => toggleExpand(i)}>
                <span className={`result-icon ${isCorrect ? '' : 'icon-wrong'}`}>
                  {isCorrect ? '✓' : isUnanswered ? '—' : '✗'}
                </span>
                <span className="result-question-num">Q{i + 1}.</span>
                <span className="result-question-text">{q.question}</span>
                <span className="expand-arrow">{isExpanded ? '▾' : '▸'}</span>
              </button>

              {isExpanded && (
                <div className="result-details">
                  <div className="result-options">
                    {q.options.map((opt, j) => {
                      let className = 'result-option'
                      if (j === q.answer) className += ' option-correct'
                      if (j === answers[i] && j !== q.answer) className += ' option-wrong'

                      return (
                        <div key={j} className={className}>
                          <span className="option-letter">{String.fromCharCode(65 + j)}.</span>
                          <span>{opt}</span>
                          {j === q.answer && <span className="tag-correct">Correct</span>}
                          {j === answers[i] && j !== q.answer && (
                            <span className="tag-wrong">Your Answer</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="explanation">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
