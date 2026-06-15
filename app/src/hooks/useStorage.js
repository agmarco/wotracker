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

  const toggleSkipped = useCallback((key) => {
    setCompletions(prev => {
      if (prev[key]?.skipped) {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return { ...prev, [key]: { done: false, skipped: true, note: prev[key]?.note || '', completedAt: new Date().toISOString() } }
    })
  }, [setCompletions])

  return { completions, markDone, updateNote, toggleDone, toggleSkipped }
}

// Goal overrides: { [workoutKey]: string }
export function useGoalOverrides() {
  const [overrides, setOverrides] = useLocalState('wotracker_overrides', {})

  const setGoal = useCallback((key, goal) => {
    setOverrides(prev => {
      if (!goal.trim()) {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return { ...prev, [key]: goal.trim() }
    })
  }, [setOverrides])

  return { overrides, setGoal }
}

const EXPORT_KEYS = ['wotracker_completions', 'wotracker_overrides', 'wotracker_user', 'wotracker_abi_start']

export function exportData() {
  const data = {}
  for (const key of EXPORT_KEYS) {
    const v = localStorage.getItem(key)
    if (v !== null) data[key] = JSON.parse(v)
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `wotracker-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importData(file, onDone) {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result)
      for (const key of EXPORT_KEYS) {
        if (key in data) localStorage.setItem(key, JSON.stringify(data[key]))
      }
      onDone(null)
    } catch {
      onDone('Invalid file — could not parse JSON.')
    }
  }
  reader.readAsText(file)
}
