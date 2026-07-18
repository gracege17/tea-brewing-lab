export type WaterType = 'soft' | 'balanced' | 'hard'

export interface ColorHSL {
  h: number
  s: number
  l: number
}

/** A single point on the brewing timeline. Numeric fields lerp between
 * adjacent keyframes; text fields (stage, explanation, aroma descriptor)
 * step to the current bracket's lower keyframe instead of blending. */
export interface Keyframe {
  t: number
  stage: string
  explanation: string
  color: ColorHSL
  leafExpansion: number
  aroma: {
    intensity: number
    descriptor: string
  }
  freshness: number
  body: number
  bitterness: number
  astringency: number
}

export interface WaterModifier {
  label: string
  tagline: string
  description: string
  aroma: number
  freshness: number
  body: number
  bitterness: number
  astringency: number
  colorSaturation: number
  colorLightnessShift: number
}

export interface BrewState {
  t: number
  stage: string
  explanation: string
  color: ColorHSL
  leafExpansion: number
  aroma: {
    intensity: number
    descriptor: string
  }
  freshness: number
  body: number
  bitterness: number
  astringency: number
}
