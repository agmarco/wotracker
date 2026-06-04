export default function UserPicker({ onSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-6">
      <div className="mb-10 text-center">
        <div className="text-4xl mb-3">🏃</div>
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">WO Tracker</h1>
        <p className="text-stone-500 mt-2">Who's training today?</p>
      </div>
      <div className="flex gap-4 w-full max-w-xs">
        <button
          onClick={() => onSelect('marco')}
          className="flex-1 flex flex-col items-center gap-2 bg-white border-2 border-stone-200 rounded-2xl py-8 px-4 hover:border-blue-400 hover:bg-blue-50 active:scale-95 transition-all shadow-sm"
        >
          <span className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">M</span>
          <span className="font-semibold text-stone-800 text-lg">Marco</span>
          <span className="text-xs text-stone-400">Full Marathon</span>
        </button>
        <button
          onClick={() => onSelect('abi')}
          className="flex-1 flex flex-col items-center gap-2 bg-white border-2 border-stone-200 rounded-2xl py-8 px-4 hover:border-pink-400 hover:bg-pink-50 active:scale-95 transition-all shadow-sm"
        >
          <span className="w-14 h-14 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-2xl font-bold">A</span>
          <span className="font-semibold text-stone-800 text-lg">Abi</span>
          <span className="text-xs text-stone-400">Half Marathon</span>
        </button>
      </div>
    </div>
  )
}
