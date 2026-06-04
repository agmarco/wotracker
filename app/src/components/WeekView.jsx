import WorkoutDetail from './WorkoutDetail'
import { isToday } from '../utils/planUtils'

export default function WeekView({ workouts, weekLabel, phaseLabel, completions, onMarkDone, onUpdateNote, onToggleDone, makeKey }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-bold text-stone-900">{weekLabel}</h2>
        {phaseLabel && <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">{phaseLabel}</span>}
      </div>
      <div className="space-y-3">
        {workouts.map((w) => {
          const key = makeKey(w)
          const todayFlag = w.date ? isToday(w.date) : false
          return (
            <div key={key} className={todayFlag ? 'ring-2 ring-blue-400 ring-offset-2 rounded-2xl' : ''}>
              {todayFlag && (
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 px-1">Today</div>
              )}
              <WorkoutDetail
                workout={w}
                workoutKey={key}
                completion={completions[key]}
                onMarkDone={onMarkDone}
                onUpdateNote={onUpdateNote}
                onToggleDone={onToggleDone}
                showDate={!!w.date}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
