import { useState } from 'react'

export default function AbiSetup({ onSave }) {
  const [date, setDate] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
        <div className="text-3xl mb-4 text-center">📅</div>
        <h2 className="text-xl font-bold text-stone-900 text-center mb-1">When did you start?</h2>
        <p className="text-stone-500 text-sm text-center mb-6">Enter the date you started (or plan to start) Week 1 of your training plan.</p>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full border border-stone-300 rounded-xl px-4 py-3 text-stone-800 text-base focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
        />
        <button
          disabled={!date}
          onClick={() => onSave(date)}
          className="w-full bg-pink-500 disabled:bg-stone-200 disabled:text-stone-400 text-white font-semibold rounded-xl py-3 text-base active:scale-95 transition-all"
        >
          Start tracking
        </button>
      </div>
    </div>
  )
}
