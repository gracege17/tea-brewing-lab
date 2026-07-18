import { keyframes, TIMELINE_MAX_SECONDS } from '../data/keyframes'
import { waterModifiers } from '../data/water'
import type { BrewState, ColorHSL, WaterType } from '../data/types'

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function lerpColor(a: ColorHSL, b: ColorHSL, t: number): ColorHSL {
  return {
    h: lerp(a.h, b.h, t),
    s: lerp(a.s, b.s, t),
    l: lerp(a.l, b.l, t),
  }
}

/**
 * Find `lo` as the last keyframe at or before `seconds` (so text fields step
 * exactly at keyframe timestamps), `hi` as the next one for numeric lerp.
 */
function bracket(seconds: number) {
  const clamped = clamp(seconds, 0, TIMELINE_MAX_SECONDS)
  let loIndex = 0
  for (let i = keyframes.length - 1; i >= 0; i--) {
    if (keyframes[i].t <= clamped) {
      loIndex = i
      break
    }
  }
  const lo = keyframes[loIndex]
  const hi = keyframes[Math.min(loIndex + 1, keyframes.length - 1)]

  const span = hi.t - lo.t
  const t = span === 0 ? 0 : (clamped - lo.t) / span
  return { lo, hi, t }
}

export function getBrewState(seconds: number, water: WaterType): BrewState {
  const { lo, hi, t } = bracket(seconds)
  const mod = waterModifiers[water]

  const rawColor = lerpColor(lo.color, hi.color, t)
  const color: ColorHSL = {
    h: rawColor.h,
    s: clamp(rawColor.s * mod.colorSaturation, 0, 100),
    l: clamp(rawColor.l + mod.colorLightnessShift, 0, 100),
  }

  return {
    t: clamp(seconds, 0, TIMELINE_MAX_SECONDS),
    stage: lo.stage,
    explanation: lo.explanation,
    color,
    leafExpansion: clamp(lerp(lo.leafExpansion, hi.leafExpansion, t), 0, 100),
    aroma: {
      intensity: clamp(lerp(lo.aroma.intensity, hi.aroma.intensity, t) * mod.aroma, 0, 10),
      descriptor: lo.aroma.descriptor,
    },
    freshness: clamp(lerp(lo.freshness, hi.freshness, t) * mod.freshness, 0, 10),
    body: clamp(lerp(lo.body, hi.body, t) * mod.body, 0, 10),
    bitterness: clamp(lerp(lo.bitterness, hi.bitterness, t) * mod.bitterness, 0, 10),
    astringency: clamp(lerp(lo.astringency, hi.astringency, t) * mod.astringency, 0, 10),
  }
}

export function hslString({ h, s, l }: ColorHSL): string {
  return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`
}
