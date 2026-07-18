import type { BrewState } from '../data/types'

interface DimensionRowProps {
  label: string
  value: number
  detail?: string
}

function DimensionRow({ label, value, detail }: DimensionRowProps) {
  const pct = (value / 10) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-stone-700 dark:text-stone-300">{label}</span>
        <span className="font-mono text-xs tabular-nums text-stone-400">{value.toFixed(1)}</span>
      </div>
      <div className="mt-1 h-1.5 w-full rounded-full bg-stone-200 dark:bg-stone-800">
        <div
          className="h-full rounded-full bg-stone-700 transition-[width] duration-200 ease-out dark:bg-stone-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      {detail && <p className="mt-1 text-xs text-stone-500 dark:text-stone-500">{detail}</p>}
    </div>
  )
}

export function FlavorDimensions({ state }: { state: BrewState }) {
  return (
    <div className="flex flex-col gap-4">
      <DimensionRow label="Aroma" value={state.aroma.intensity} detail={state.aroma.descriptor} />
      <DimensionRow label="Freshness" value={state.freshness} />
      <DimensionRow label="Body" value={state.body} />
      <DimensionRow label="Bitterness" value={state.bitterness} />
      <DimensionRow label="Astringency" value={state.astringency} />
    </div>
  )
}
