import type { BrewState } from '../data/types'

export function BrewingExplanation({ state }: { state: BrewState }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-stone-900 dark:text-stone-50">{state.stage}</h2>
      <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{state.explanation}</p>
    </div>
  )
}
