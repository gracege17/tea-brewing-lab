import type { WaterModifier, WaterType } from './types'

/**
 * Per-dimension multipliers applied on top of the baseline keyframe curve.
 * Balanced is the neutral baseline (all ×1.0). Hard water is modeled as
 * scientifically dulling aroma and flattening the cup (mineral suppression
 * of aroma release), not simply "stronger" — see mvp_content_decisions memory.
 */
export const waterModifiers: Record<WaterType, WaterModifier> = {
  soft: {
    label: 'Soft Water',
    tagline: 'Low minerals',
    description: 'Brews lighter and brighter — florals come through clearly, less bitterness and astringency.',
    aroma: 1.15,
    freshness: 1.1,
    body: 0.9,
    bitterness: 0.85,
    astringency: 0.85,
    colorSaturation: 1.1,
    colorLightnessShift: 3,
  },
  balanced: {
    label: 'Balanced Water',
    tagline: 'Moderate minerals',
    description: 'A well-rounded, everyday brew — the reference cup this app is calibrated against.',
    aroma: 1,
    freshness: 1,
    body: 1,
    bitterness: 1,
    astringency: 1,
    colorSaturation: 1,
    colorLightnessShift: 0,
  },
  hard: {
    label: 'Hard Water',
    tagline: 'High minerals',
    description: 'Minerals suppress aroma and flatten the taste — the cup can taste duller even though it feels heavier.',
    aroma: 0.75,
    freshness: 0.85,
    body: 1.15,
    bitterness: 1.15,
    astringency: 1.2,
    colorSaturation: 0.85,
    colorLightnessShift: -5,
  },
}
