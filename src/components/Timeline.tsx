import { TIMELINE_MAX_SECONDS } from '../data/keyframes'
import { formatTime } from '../lib/format'

const IDEAL_WINDOW_END = 120

const TICKS = [0, 60, 120, 180, 300, 480]

interface TimelineProps {
  value: number
  onChange: (seconds: number) => void
}

export function Timeline({ value, onChange }: TimelineProps) {
  const idealPct = (IDEAL_WINDOW_END / TIMELINE_MAX_SECONDS) * 100

  return (
    <div className="w-full select-none">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-stone-500">
          Steep time
        </span>
        <span className="font-mono text-lg tabular-nums text-stone-900">
          {formatTime(value)}
        </span>
      </div>

      <div className="relative h-10">
        {/* zone background */}
        <div className="pointer-events-none absolute top-1/2 left-0 h-2 w-full -translate-y-1/2 overflow-hidden rounded-full">
          <div
            className="absolute inset-y-0 left-0 bg-emerald-300/70"
            style={{ width: `${idealPct}%` }}
          />
          <div
            className="absolute inset-y-0 right-0 bg-gradient-to-r from-amber-300/70 to-red-400/70"
            style={{ width: `${100 - idealPct}%` }}
          />
        </div>

        <input
          type="range"
          min={0}
          max={TIMELINE_MAX_SECONDS}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Steep time"
          className="absolute inset-0 h-2 w-full translate-y-2/3 cursor-pointer appearance-none bg-transparent
            [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-stone-800
            [&::-moz-range-thumb]:shadow-md
            [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-stone-800
            [&::-webkit-slider-thumb]:shadow-md"
        />
      </div>

      <div className="relative mt-1 h-4 text-xs text-stone-400">
        {TICKS.map((t) => (
          <span
            key={t}
            className="absolute -translate-x-1/2"
            style={{ left: `${(t / TIMELINE_MAX_SECONDS) * 100}%` }}
          >
            {formatTime(t)}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-xs">
        <span className="font-medium text-emerald-700">
          Ideal brewing window
        </span>
        <span className="font-medium text-amber-700">
          Over-extraction demonstration
        </span>
      </div>
    </div>
  )
}
