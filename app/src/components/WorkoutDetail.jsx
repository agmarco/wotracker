import { useState } from 'react'

const typeConfig = {
  run:      { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',   icon: '🏃' },
  strength: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', icon: '💪' },
  rest:     { bg: 'bg-stone-50',  border: 'border-stone-200',  badge: 'bg-stone-100 text-stone-500',  icon: '😴' },
  race:     { bg: 'bg-amber-50',  border: 'border-amber-200',  badge: 'bg-amber-100 text-amber-700',  icon: '🏁' },
}

export default function WorkoutDetail({ workout, workoutKey, completion, onMarkDone, onUpdateNote, onToggleDone, showDate }) {
  const [editingNote, setEditingNote] = useState(false)
  const [noteText, setNoteText] = useState(completion?.note || '')

  const type = workout.type || 'run'
  const cfg = typeConfig[type] || typeConfig.run
  const isDone = completion?.done
  const isRestOrStrength = type === 'rest' || type === 'strength'

  function handleSaveNote() {
    onUpdateNote(workoutKey, noteText)
    setEditingNote(false)
  }

  function handleMarkDone() {
    onMarkDone(workoutKey, noteText)
    setEditingNote(false)
  }

  return (
    <div className={`rounded-2xl border-2 ${isDone ? 'border-green-300 bg-green-50' : `${cfg.border} ${cfg.bg}`} p-5 transition-all`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isDone ? 'bg-green-100 text-green-700' : cfg.badge}`}>
              {cfg.icon} {workout.label || type}
            </span>
            {workout.recovery && <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-0.5 rounded-full">Recovery week</span>}
            {workout.peak && <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">Peak week</span>}
            {isDone && <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">✓ Done</span>}
          </div>
          <h3 className="font-bold text-stone-900 text-base leading-tight">{workout.title}</h3>
          {showDate && workout.date && (
            <p className="text-xs text-stone-400 mt-0.5">{formatDate(workout.date)}</p>
          )}
        </div>
        {!isRestOrStrength && (
          <button
            onClick={() => onToggleDone(workoutKey)}
            className={`flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all active:scale-90 ${
              isDone ? 'bg-green-500 border-green-500 text-white' : 'border-stone-300 bg-white text-stone-400 hover:border-green-400'
            }`}
          >
            {isDone ? '✓' : '○'}
          </button>
        )}
      </div>

      {/* Details */}
      <ul className="space-y-1.5 mb-4">
        {workout.details.map((d, i) => (
          <li key={i} className="flex gap-2 text-sm text-stone-700">
            <span className="text-stone-400 mt-0.5 flex-shrink-0">•</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>

      {/* Note section — only for runs and races */}
      {!isRestOrStrength && (
        <div className="border-t border-stone-200 pt-3">
          {isDone && !editingNote && (
            <div>
              {completion.note ? (
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-stone-600 italic">"{completion.note}"</p>
                  <button onClick={() => { setNoteText(completion.note); setEditingNote(true) }} className="text-xs text-stone-400 hover:text-stone-600 flex-shrink-0">edit</button>
                </div>
              ) : (
                <button onClick={() => setEditingNote(true)} className="text-sm text-stone-400 hover:text-stone-600">+ add note</button>
              )}
            </div>
          )}
          {!isDone && !editingNote && (
            <div className="flex gap-2">
              <button
                onClick={handleMarkDone}
                className="flex-1 bg-green-500 text-white font-semibold rounded-xl py-2.5 text-sm active:scale-95 transition-all"
              >
                Mark done
              </button>
              <button
                onClick={() => setEditingNote(true)}
                className="px-3 bg-white border border-stone-300 text-stone-600 font-semibold rounded-xl py-2.5 text-sm active:scale-95 transition-all"
              >
                + note
              </button>
            </div>
          )}
          {editingNote && (
            <div>
              <textarea
                autoFocus
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="How did it go?"
                rows={3}
                className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none mb-2"
              />
              <div className="flex gap-2">
                {!isDone && (
                  <button onClick={handleMarkDone} className="flex-1 bg-green-500 text-white font-semibold rounded-xl py-2 text-sm active:scale-95 transition-all">
                    Done + save
                  </button>
                )}
                {isDone && (
                  <button onClick={handleSaveNote} className="flex-1 bg-blue-500 text-white font-semibold rounded-xl py-2 text-sm active:scale-95 transition-all">
                    Save note
                  </button>
                )}
                <button onClick={() => setEditingNote(false)} className="px-4 bg-stone-100 text-stone-600 font-semibold rounded-xl py-2 text-sm active:scale-95 transition-all">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}
