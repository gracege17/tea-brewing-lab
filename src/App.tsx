import { useMemo, useState } from 'react'
import { Timeline } from './components/Timeline'
import { TeaVessel } from './components/TeaVessel'
import { FlavorDimensions } from './components/FlavorDimensions'
import { WaterSelector } from './components/WaterSelector'
import { OriginInfo } from './components/OriginInfo'
import { BrewingExplanation } from './components/BrewingExplanation'
import { getBrewState } from './lib/brew'
import type { WaterType } from './data/types'

function App() {
  const [seconds, setSeconds] = useState(60)
  const [water, setWater] = useState<WaterType>('balanced')

  const state = useMemo(() => getBrewState(seconds, water), [seconds, water])

  return (
    <div className="min-h-svh bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <header className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <p className="text-xs font-medium tracking-wide text-stone-400 uppercase">
            Tea Brewing Lab
          </p>
          <h1 className="text-xl font-medium">Anxi Tieguanyin</h1>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="flex flex-col items-center gap-6">
          <TeaVessel
            color={state.color}
            leafExpansion={state.leafExpansion}
            aroma={state.aroma.intensity}
          />
          <div className="w-full max-w-sm">
            <Timeline value={seconds} onChange={setSeconds} />
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <BrewingExplanation state={state} />

          <div>
            <h2 className="mb-3 text-sm font-medium text-stone-800 dark:text-stone-200">
              Flavor profile
            </h2>
            <FlavorDimensions state={state} />
          </div>

          <div>
            <h2 className="mb-3 text-sm font-medium text-stone-800 dark:text-stone-200">
              Water
            </h2>
            <WaterSelector value={water} onChange={setWater} />
          </div>

          <OriginInfo />
        </section>
      </main>
    </div>
  )
}

export default App
