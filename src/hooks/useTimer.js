import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(totalSeconds, onExpire) {
  const [remaining, setRemaining] = useState(totalSeconds)
  const [running, setRunning] = useState(false)
  const onExpireRef = useRef(onExpire)
  const expiredRef = useRef(false)

  onExpireRef.current = onExpire

  const start = useCallback(() => {
    setRunning(true)
    expiredRef.current = false
  }, [])

  const stop = useCallback(() => {
    setRunning(false)
  }, [])

  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setRunning(false)
          if (!expiredRef.current) {
            expiredRef.current = true
            setTimeout(() => onExpireRef.current?.(), 0)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [running])

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60

  return { minutes, seconds, remaining, running, start, stop }
}
