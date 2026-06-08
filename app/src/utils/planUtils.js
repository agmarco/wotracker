import { marcoPlanByDate, getMarcoWeek, marcoWeeks } from '../data/marco-plan'
import { getAbiWeek, abiTotalWeeks } from '../data/abi-plan'

export function toDateString(date) {
  return date.toISOString().slice(0, 10)
}

export function today() {
  return toDateString(new Date())
}

export function marcoWorkoutKey(date) {
  return `marco_${date}`
}

export function abiWorkoutKey(week, id) {
  return `abi_w${week}_${id}`
}

function isAddressed(completion) {
  return !!(completion?.done || completion?.skipped)
}

// Strength and rest workouts aren't manually tracked — treat past ones as auto-complete
function isAutoAddressed(workout) {
  const autoTypes = ['strength', 'rest']
  return autoTypes.includes(workout.type) && (!workout.date || workout.date <= today())
}

// Returns the week number (1-based) Abi is currently on, based on her
// completion history: the week of her most recently addressed run, or
// the next week once every run in that week has been done/skipped.
export function getAbiCurrentWeek(completions = {}) {
  let latestWeek = null
  let latestTime = null
  for (let week = 1; week <= abiTotalWeeks; week++) {
    const weekData = getAbiWeek(week)
    if (!weekData) continue
    for (const r of weekData.runs) {
      const c = completions[abiWorkoutKey(week, r.id)]
      if (isAddressed(c) && (!latestTime || c.completedAt > latestTime)) {
        latestTime = c.completedAt
        latestWeek = week
      }
    }
  }
  if (latestWeek === null) return 1

  const weekData = getAbiWeek(latestWeek)
  const allAddressed = weekData.runs.every(r => isAddressed(completions[abiWorkoutKey(latestWeek, r.id)]))
  return allAddressed ? Math.min(latestWeek + 1, abiTotalWeeks) : latestWeek
}

// Returns the calendar week number that contains a given date string
export function getMarcoWeekForDate(dateStr) {
  const workout = marcoPlanByDate.get(dateStr)
  return workout ? workout.week : null
}

// Returns all workouts for a given Marco week
export function getMarcoWeekWorkouts(weekNum) {
  return getMarcoWeek(weekNum)
}

// Returns [weekStart, weekEnd] date strings for a Marco week
export function getMarcoWeekRange(weekNum) {
  const workouts = getMarcoWeek(weekNum)
  if (!workouts.length) return [null, null]
  const dates = workouts.map(w => w.date).sort()
  return [dates[0], dates[dates.length - 1]]
}

// Returns the week number (1-based) Marco is currently on, based on his
// completion history: the week of his most recently addressed workout, or
// the next week once every workout in that week has been done/skipped.
export function getMarcoCurrentWeek(completions = {}) {
  let latestWeek = null
  let latestTime = null
  for (const week of marcoWeeks) {
    for (const w of getMarcoWeek(week)) {
      const c = completions[marcoWorkoutKey(w.date)]
      if (isAddressed(c) && (!latestTime || c.completedAt > latestTime)) {
        latestTime = c.completedAt
        latestWeek = week
      }
    }
  }
  if (latestWeek === null) return marcoWeeks[0]

  const allAddressed = getMarcoWeek(latestWeek).every(w => {
    const c = completions[marcoWorkoutKey(w.date)]
    return isAddressed(c) || isAutoAddressed(w)
  })
  if (allAddressed) {
    const idx = marcoWeeks.indexOf(latestWeek)
    return marcoWeeks[idx + 1] ?? latestWeek
  }
  return latestWeek
}

export function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function isToday(dateStr) {
  return dateStr === today()
}

export const typeColors = {
  run: 'blue',
  strength: 'purple',
  rest: 'gray',
  race: 'yellow',
}
