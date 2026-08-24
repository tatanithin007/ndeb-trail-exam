import React, { useState, useCallback } from 'react'
import Timer from './Timer'
import QuestionNav from './QuestionNav'
import { useTimer } from '../hooks/useTimer'

export default function ExamScreen({ questions, onSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [flagged, setFlagged] = useState(new Set())
  const [showConfirm, setShowConfirm] = useState(false)

  const handleExpire = useCallback(() => {
    onSubmit(answers)
  }, [answers, onSubmit])

  const { minutes, seconds, remaining, start, running } = useTimer(30 * 60, handleExpire)

  React.useEffect(() => {
    start()
  }, [start])

  const question = questions[currentIndex]

  function selectAnswer(optionIndex) {
    const next = [...answers]
    next[currentIndex] = optionIndex
    setAnswers(next)
  }

  function toggleFlag() {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(currentIndex)) {
        next.delete(currentIndex)
      } else {
        next.add(currentIndex)
      }
      return next
    })
  }

  function handleSubmit() {
    const unanswered = answers.filter(a => a == null).length
    if (unanswered > 0) {
      setShowConfirm(true)
    } else {
      onSubmit(answers)
    }
  }

  const answeredCount = answers.filter(a => a != null).length

  return (
    <div className="exam-screen">
      <div className="exam-header">
        <div className="exam-header-left">
          <span className="question-counter">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="answered-counter">
            {answeredCount}/{questions.length} answered
          </span>
        </div>
        <Timer minutes={minutes} seconds={seconds} remaining={remaining} />
      </div>

      <QuestionNav
        total={questions.length}
        current={currentIndex}
        answers={answers}
        flagged={flagged}
        onNavigate={setCurrentIndex}
      />

      <div className="question-area">
        <div className="question-text">{question.question}</div>
        <div className="options-list">
          {question.options.map((option, i) => (
            <button
              key={i}
              className={`option-btn ${answers[currentIndex] === i ? 'option-selected' : ''}`}
              onClick={() => selectAnswer(i)}
            >
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="exam-footer">
        <div className="nav-buttons">
          <button
            className="btn-nav"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(i => i - 1)}
          >
            Previous
          </button>
          <button
            className={`btn-flag ${flagged.has(currentIndex) ? 'btn-flag-active' : ''}`}
            onClick={toggleFlag}
          >
            {flagged.has(currentIndex) ? '⚑ Flagged' : '⚐ Flag'}
          </button>
          <button
            className="btn-nav"
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex(i => i + 1)}
          >
            Next
          </button>
        </div>
        <button className="btn-submit" onClick={handleSubmit}>
          Submit Exam
        </button>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Submit Exam?</h3>
            <p>
              You have {answers.filter(a => a == null).length} unanswered
              question{answers.filter(a => a == null).length !== 1 ? 's' : ''}.
            </p>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
                Go Back
              </button>
              <button className="btn-confirm" onClick={() => onSubmit(answers)}>
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
