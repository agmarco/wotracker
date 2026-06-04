// Abi's half marathon training plan — week-indexed (no fixed dates)
// Goal: Complete a half marathon (13.1 miles) | 17 weeks | 3 runs/week
// All runs at 11:00–11:30/mile | Treadmill: 5.2–5.5 mph

const plan = [
  // PHASE 1 — BUILDING FROM 10K (weeks 1–4)
  {
    week: 1, phase: 'Building from 10K',
    runs: [
      { id: 'w1r1', label: 'Run 1', title: '3 miles easy',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w1r2', label: 'Run 2', title: '3 miles easy',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w1r3', label: 'Long run', title: '5 miles easy',
        details: ['5 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'Should feel very comfortable — easier than your 10K race effort.'] },
    ]
  },
  {
    week: 2, phase: 'Building from 10K',
    runs: [
      { id: 'w2r1', label: 'Run 1', title: '3 miles easy',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w2r2', label: 'Run 2', title: '4 miles easy',
        details: ['4 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w2r3', label: 'Long run', title: '6 miles easy',
        details: ['6 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'Just under your 10K distance. Keep it conversational the whole way.'] },
    ]
  },
  {
    week: 3, phase: 'Building from 10K',
    runs: [
      { id: 'w3r1', label: 'Run 1', title: '3 miles easy',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w3r2', label: 'Run 2', title: '4 miles easy',
        details: ['4 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w3r3', label: 'Long run', title: '7 miles easy',
        details: ['7 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'First run beyond your 10K distance. Take it easy.'] },
    ]
  },
  {
    week: 4, phase: 'Building from 10K', recovery: true,
    runs: [
      { id: 'w4r1', label: 'Run 1', title: '3 miles easy (recovery)',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w4r2', label: 'Run 2', title: '3 miles easy (recovery)',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w4r3', label: 'Long run', title: '5 miles easy (recovery)',
        details: ['5 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'This should feel noticeably easy. That\'s exactly right.'] },
    ]
  },

  // PHASE 2 — PUSHING INTO DOUBLE DIGITS (weeks 5–11)
  {
    week: 5, phase: 'Pushing into Double Digits',
    runs: [
      { id: 'w5r1', label: 'Run 1', title: '3 miles easy',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w5r2', label: 'Run 2', title: '4 miles easy',
        details: ['4 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w5r3', label: 'Long run', title: '8 miles easy',
        details: ['8 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'Fuel tip: bring a gel or energy chew and take it at mile 5.'] },
    ]
  },
  {
    week: 6, phase: 'Pushing into Double Digits',
    runs: [
      { id: 'w6r1', label: 'Run 1', title: '3 miles easy',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w6r2', label: 'Run 2', title: '4 miles easy',
        details: ['4 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w6r3', label: 'Long run', title: '9 miles easy',
        details: ['9 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'Fuel: gel at mile 5.'] },
    ]
  },
  {
    week: 7, phase: 'Pushing into Double Digits',
    runs: [
      { id: 'w7r1', label: 'Run 1', title: '4 miles easy',
        details: ['4 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w7r2', label: 'Run 2', title: '4 miles easy',
        details: ['4 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w7r3', label: 'Long run', title: '10 miles easy',
        details: ['10 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'First double digit run. Fuel: gel at miles 5 and 8.'] },
    ]
  },
  {
    week: 8, phase: 'Pushing into Double Digits', recovery: true,
    runs: [
      { id: 'w8r1', label: 'Run 1', title: '3 miles easy (recovery)',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w8r2', label: 'Run 2', title: '3 miles easy (recovery)',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w8r3', label: 'Long run', title: '7 miles easy (recovery)',
        details: ['7 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'You\'ve hit 10 miles — let it absorb. This week should feel easy.'] },
    ]
  },
  {
    week: 9, phase: 'Pushing into Double Digits',
    runs: [
      { id: 'w9r1', label: 'Run 1', title: '4 miles easy',
        details: ['4 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w9r2', label: 'Run 2', title: '4 miles easy',
        details: ['4 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w9r3', label: 'Long run', title: '10 miles easy',
        details: ['10 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'Fuel: gel at miles 5 and 8.'] },
    ]
  },
  {
    week: 10, phase: 'Pushing into Double Digits',
    runs: [
      { id: 'w10r1', label: 'Run 1', title: '4 miles easy',
        details: ['4 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w10r2', label: 'Run 2', title: '5 miles easy',
        details: ['5 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w10r3', label: 'Long run', title: '11 miles easy',
        details: ['11 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'Fuel: gel at miles 5 and 9.'] },
    ]
  },
  {
    week: 11, phase: 'Pushing into Double Digits', peak: true,
    runs: [
      { id: 'w11r1', label: 'Run 1', title: '4 miles easy',
        details: ['4 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w11r2', label: 'Run 2', title: '5 miles easy',
        details: ['5 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w11r3', label: 'Long run', title: '12 miles easy — PEAK',
        details: ['12 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'Fuel: gel at miles 5, 9 and 11.', 'Finish this feeling controlled. If you feel good, resist the urge to push the final miles.'] },
    ]
  },

  // PHASE 3 — TAPER (weeks 12–17)
  {
    week: 12, phase: 'Taper',
    runs: [
      { id: 'w12r1', label: 'Run 1', title: '3 miles easy',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w12r2', label: 'Run 2', title: '4 miles easy',
        details: ['4 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w12r3', label: 'Long run', title: '9 miles easy',
        details: ['9 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
    ]
  },
  {
    week: 13, phase: 'Taper',
    runs: [
      { id: 'w13r1', label: 'Run 1', title: '3 miles easy',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w13r2', label: 'Run 2', title: '3 miles easy',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w13r3', label: 'Long run', title: '7 miles easy',
        details: ['7 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
    ]
  },
  {
    week: 14, phase: 'Taper',
    runs: [
      { id: 'w14r1', label: 'Run 1', title: '3 miles easy',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w14r2', label: 'Run 2', title: '3 miles easy',
        details: ['3 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w14r3', label: 'Long run', title: '5 miles easy',
        details: ['5 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
    ]
  },
  {
    week: 15, phase: 'Taper',
    runs: [
      { id: 'w15r1', label: 'Run 1', title: '2 miles easy',
        details: ['2 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w15r2', label: 'Run 2', title: '2 miles easy',
        details: ['2 miles at easy pace', 'Pace: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph'] },
      { id: 'w15r3', label: 'Shakeout', title: '3 miles + 4 strides',
        details: ['3 miles easy then 4 strides', 'Easy miles: 11:00–11:30/mile | Treadmill: 5.2–5.5 mph', 'Each stride: run fast for 20 seconds at 7.5 mph, then walk 90 seconds. Repeat 4 times.'] },
    ]
  },
  {
    week: 16, phase: 'Taper',
    runs: [
      { id: 'w16r1', label: 'Run 1', title: '2 miles easy',
        details: ['2 miles at easy pace', 'Pace: 11:30/mile | Treadmill: 5.2 mph'] },
      { id: 'w16r2', label: 'Shakeout', title: '2 miles + 4 strides',
        details: ['2 miles easy then 4 strides', 'Each stride: run fast for 20 seconds at 7.5 mph, then walk 90 seconds. Repeat 4 times.'] },
      { id: 'w16r3', label: 'Rest', title: 'Rest — save it for race day',
        details: ['No running. Save it for race day.'], type: 'rest' },
    ]
  },
  {
    week: 17, phase: 'Race Week',
    runs: [
      { id: 'w17r1', label: 'Shakeout', title: '2 miles easy shakeout',
        details: ['2 miles easy at 11:00–11:30/mile', 'Relaxed. No effort at all.'] },
      { id: 'w17r2', label: 'Optional', title: 'Optional 20-min easy jog',
        details: ['20 minute very easy jog or walk', 'If legs feel heavy, skip it entirely.'] },
      { id: 'w17r3', label: 'Race Day', title: 'RACE DAY — Half Marathon', type: 'race',
        details: [
          'Goal: finish strong and enjoy every mile',
          'Pace: 11:00–11:30/mile — start here and hold it',
          'Fuel: gel at miles 4, 7 and 10',
          'Walk through water stations — small sips every mile',
          'Miles 1–3 will feel easy. Do not speed up.',
          'Mile 10 is where it gets real. Shorten your stride, keep breathing steady.',
          'You\'ve done the work. Trust it.',
        ] },
    ]
  },
]

export function getAbiWeek(weekNum) {
  return plan.find(w => w.week === weekNum) || null
}

export const abiTotalWeeks = plan.length

export default plan
