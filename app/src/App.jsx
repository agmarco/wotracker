import { useState } from 'react'
import UserPicker from './components/UserPicker'
import AbiSetup from './components/AbiSetup'
import WeekView from './components/WeekView'
import { useLocalState, useCompletions } from './hooks/useStorage'
import { getMarcoWeekWorkouts, getMarcoCurrentWeek, getAbiCurrentWeek, marcoWorkoutKey, abiWorkoutKey, today } from './utils/planUtils'
import { getAbiWeek, abiTotalWeeks } from './data/abi-plan'
import marcoPlan from './data/marco-plan'

const MARCO_WEEKS = [...new Set(marcoPlan.map(w => w.week))].sort((a, b) => a - b)

export default function App() {
  const [user, setUser] = useLocalState('wotracker_user', null)
  const [abiStartDate, setAbiStartDate] = useLocalState('wotracker_abi_start', null)
  const { completions, markDone, updateNote, toggleDone, toggleSkipped } = useCompletions()
  const [viewWeek, setViewWeek] = useState(null)
  const [showDone, setShowDone] = useState(false)

  function handleSelectUser(u) {
    setUser(u)
    setViewWeek(null)
  }

  function handleSwitchUser() {
    setUser(null)
    setViewWeek(null)
  }

  if (!user) return <UserPicker onSelect={handleSelectUser} />
  if (user === 'abi' && !abiStartDate) {
    return <AbiSetup onSave={(d) => { setAbiStartDate(d); setViewWeek(null) }} />
  }

  const isMarco = user === 'marco'
  let currentWeek, weekLabel, phaseLabel, workouts, makeKey, totalWeeks, weekOptions

  if (isMarco) {
    currentWeek = viewWeek ?? getMarcoCurrentWeek(completions)
    const ww = getMarcoWeekWorkouts(currentWeek)
    workouts = ww
    phaseLabel = ww[0]?.phase || ''
    weekLabel = `Week ${currentWeek} of ${MARCO_WEEKS.length}`
    totalWeeks = MARCO_WEEKS.length
    weekOptions = MARCO_WEEKS
    makeKey = (w) => marcoWorkoutKey(w.date)
  } else {
    const curW = getAbiCurrentWeek(completions)
    currentWeek = viewWeek ?? curW
    const weekData = getAbiWeek(currentWeek)
    workouts = weekData ? weekData.runs.map(r => ({ ...r, type: r.type || 'run' })) : []
    phaseLabel = weekData?.phase || ''
    const flags = [weekData?.recovery && 'Recovery', weekData?.peak && 'Peak'].filter(Boolean)
    weekLabel = `Week ${currentWeek} of ${abiTotalWeeks}${flags.length ? ` · ${flags.join(', ')}` : ''}`
    totalWeeks = abiTotalWeeks
    weekOptions = Array.from({ length: abiTotalWeeks }, (_, i) => i + 1)
    makeKey = (w) => abiWorkoutKey(currentWeek, w.id)
  }

  const avatarBg = isMarco ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
  const prevWeek = weekOptions[weekOptions.indexOf(currentWeek) - 1]
  const nextWeek = weekOptions[weekOptions.indexOf(currentWeek) + 1]

  const autoCompleteTypes = ['strength', 'rest']
  const visibleWorkouts = showDone
    ? workouts
    : workouts.filter(w => {
        const c = completions[makeKey(w)]
        if (c?.done || c?.skipped) return false
        if (autoCompleteTypes.includes(w.type) && w.date && w.date <= today()) return false
        return true
      })

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{isMarco ? '🏃' : '🏃🏼‍♀️'}</span>
          <span className="font-bold text-stone-900 text-base">WO Tracker</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDone(v => !v)}
            className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all active:scale-95 ${
              showDone
                ? 'bg-stone-800 text-white border-stone-800'
                : 'bg-white text-stone-500 border-stone-300'
            }`}
          >
            {showDone ? 'Hide done' : 'Show all'}
          </button>
          <button
            onClick={handleSwitchUser}
            className={`flex items-center gap-2 ${avatarBg} rounded-full pl-2 pr-3 py-1.5 text-sm font-semibold active:scale-95 transition-all`}
          >
            <span className="w-5 h-5 rounded-full bg-white/60 flex items-center justify-center text-xs font-bold">
              {isMarco ? 'M' : 'A'}
            </span>
            {isMarco ? 'Marco' : 'Abi'}
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 px-4 py-5 max-w-lg mx-auto w-full pb-28">
        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-stone-400 mb-1">
            <span>{phaseLabel}</span>
            <span>Week {currentWeek} / {totalWeeks}</span>
          </div>
          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isMarco ? 'bg-blue-400' : 'bg-pink-400'}`}
              style={{ width: `${(currentWeek / totalWeeks) * 100}%` }}
            />
          </div>
        </div>

        <WeekView
          workouts={visibleWorkouts}
          weekLabel={weekLabel}
          completions={completions}
          onMarkDone={markDone}
          onUpdateNote={updateNote}
          onToggleDone={toggleDone}
          onToggleSkipped={toggleSkipped}
          makeKey={makeKey}
        />
      </main>

      {/* Week nav footer */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-3 flex items-center justify-between">
        <button
          disabled={!prevWeek}
          onClick={() => setViewWeek(prevWeek)}
          className="flex items-center gap-1 text-sm font-semibold text-stone-600 disabled:text-stone-300 active:scale-95 transition-all px-3 py-2 rounded-xl hover:bg-stone-100 disabled:hover:bg-transparent"
        >
          ← Prev
        </button>
        <button
          onClick={() => setViewWeek(null)}
          className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all active:scale-95 ${
            viewWeek === null
              ? isMarco ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
              : 'text-stone-500 hover:bg-stone-100'
          }`}
        >
          This week
        </button>
        <button
          disabled={!nextWeek}
          onClick={() => setViewWeek(nextWeek)}
          className="flex items-center gap-1 text-sm font-semibold text-stone-600 disabled:text-stone-300 active:scale-95 transition-all px-3 py-2 rounded-xl hover:bg-stone-100 disabled:hover:bg-transparent"
        >
          Next →
        </button>
      </nav>
    </div>
  )
}
