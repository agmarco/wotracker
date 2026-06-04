import { marcoPlanByDate, getMarcoWeek, marcoWeeks } from '../data/marco-plan'
import { getAbiWeek, abiTotalWeeks } from '../data/abi-plan'

export function toDateString(date) {
  return date.toISOString().slice(0, 10)
}

export function today() {
  return toDateString(new Date())
}

// Returns the workout for today, or null
export function getTodayWorkout(user, abiStartDate) {
  const t = today()
  if (user === 'marco') {
    return marcoPlanByDate.get(t) || null
  }
  if (user === 'abi' && abiStartDate) {
    const week = getAbiCurrentWeek(abiStartDate)
    const weekData = getAbiWeek(week)
    return weekData ? { ...weekData, isAbiWeek: true } : null
  }
  return null
}

// Returns the week number (1-based) Abi is currently on
export function getAbiCurrentWeek(abiStartDate) {
  const start = new Date(abiStartDate)
  const now = new Date()
  const daysDiff = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  const week = Math.floor(daysDiff / 7) + 1
  return Math.max(1, Math.min(week, abiTotalWeeks))
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

// Returns the current Marco week number based on today's date
export function getMarcoCurrentWeek() {
  const t = today()
  const workout = marcoPlanByDate.get(t)
  if (workout) return workout.week
  // Find the nearest week
  const allDates = [...marcoPlanByDate.keys()].sort()
  if (t < allDates[0]) return 1
  if (t > allDates[allDates.length - 1]) return Math.max(...marcoWeeks)
  // Find week containing today or just before
  for (let i = allDates.length - 1; i >= 0; i--) {
    if (allDates[i] <= t) {
      return marcoPlanByDate.get(allDates[i]).week
    }
  }
  return 1
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
