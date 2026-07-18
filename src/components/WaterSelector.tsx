import { waterModifiers } from '../data/water'
import type { WaterType } from '../data/types'

const ORDER: WaterType[] = ['soft', 'balanced', 'hard']

interface WaterSelectorProps {
  value: WaterType
  onChange: (water: WaterType) => void
}

export function WaterSelector({ value, onChange }: WaterSelectorProps) {
  const active = waterModifiers[value]

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {ORDER.map((key) => {
          const mod = waterModifiers[key]
          const selected = key === value
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              aria-pressed={selected}
              className={`rounded-lg border px-3 py-2 text-left transition-colors ${
                selected
                  ? 'border-stone-800 bg-stone-800 text-stone-50'
                  : 'border-stone-300 text-stone-600 hover:border-stone-400'
              }`}
            >
              <div className="text-sm font-medium">{mod.label}</div>
              <div className={`text-xs ${selected ? 'opacity-80' : 'opacity-60'}`}>{mod.tagline}</div>
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-xs text-stone-500">{active.description}</p>
    </div>
  )
}
