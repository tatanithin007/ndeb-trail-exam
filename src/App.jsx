import React, { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import ExamScreen from './components/ExamScreen'
import ResultsScreen from './components/ResultsScreen'

export default function App() {
  const [screen, setScreen] = useState('start')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'questions.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load questions')
        return res.json()
      })
      .then(data => setQuestions(data))
      .catch(err => setError(err.message))
  }, [])

  function handleStart() {
    setAnswers([])
    setScreen('exam')
  }

  function handleSubmit(submittedAnswers) {
    setAnswers(submittedAnswers)
    setScreen('results')
  }

  function handleRestart() {
    setScreen('start')
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>Could not load questions</h2>
        <p>{error}</p>
        <p>Make sure <code>public/questions.json</code> exists.</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return <div className="app-loading">Loading questions...</div>
  }

  return (
    <div className="app">
      {screen === 'start' && (
        <StartScreen questionCount={questions.length} onStart={handleStart} />
      )}
      {screen === 'exam' && (
        <ExamScreen key={Date.now()} questions={questions} onSubmit={handleSubmit} />
      )}
      {screen === 'results' && (
        <ResultsScreen
          questions={questions}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
