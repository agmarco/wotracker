import { useState, useCallback } from 'react'

function readKey(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v !== null ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

function writeKey(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function useLocalState(key, fallback) {
  const [value, setValue] = useState(() => readKey(key, fallback))

  const set = useCallback((next) => {
    const v = typeof next === 'function' ? next(readKey(key, fallback)) : next
    writeKey(key, v)
    setValue(v)
  }, [key, fallback])

  return [value, set]
}

// Completions: { [workoutKey]: { done, note, completedAt } }
export function useCompletions() {
  const [completions, setCompletions] = useLocalState('wotracker_completions', {})

  const markDone = useCallback((key, note = '') => {
    setCompletions(prev => ({
      ...prev,
      [key]: { done: true, note, completedAt: new Date().toISOString() }
    }))
  }, [setCompletions])

  const updateNote = useCallback((key, note) => {
    setCompletions(prev => ({
      ...prev,
      [key]: { ...prev[key], note }
    }))
  }, [setCompletions])

  const toggleDone = useCallback((key) => {
    setCompletions(prev => {
      if (prev[key]?.done) {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return { ...prev, [key]: { done: true, note: '', completedAt: new Date().toISOString() } }
    })
  }, [setCompletions])

  return { completions, markDone, updateNote, toggleDone }
}
