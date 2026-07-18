import { hslString } from '../lib/brew'
import type { ColorHSL } from '../data/types'

interface Leaf {
  x: number
  y: number
  rotation: number
}

const LEAVES: Leaf[] = [
  { x: 78, y: 150, rotation: -18 },
  { x: 118, y: 168, rotation: 24 },
  { x: 100, y: 130, rotation: -4 },
]

function LeafShape({ x, y, rotation, expansion }: Leaf & { expansion: number }) {
  const openness = expansion / 100
  const scaleX = 0.35 + 0.55 * openness
  const scaleY = 0.55 + 0.45 * openness
  const veinOpacity = Math.max(0, openness - 0.3) / 0.7

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scaleX} ${scaleY})`}>
      <path
        d="M0,-20 C11,-15 11,15 0,20 C-11,15 -11,-15 0,-20 Z"
        fill="#3f6b3f"
        fillOpacity={0.75}
        stroke="#2d4d2d"
        strokeOpacity={0.4}
        strokeWidth={1}
      />
      <line
        x1="0"
        y1="-16"
        x2="0"
        y2="16"
        stroke="#2d4d2d"
        strokeWidth={0.8}
        opacity={veinOpacity}
      />
    </g>
  )
}

interface TeaVesselProps {
  color: ColorHSL
  leafExpansion: number
}

export function TeaVessel({ color, leafExpansion }: TeaVesselProps) {
  const fill = hslString(color)
  const highlightFill = hslString({ h: color.h, s: color.s * 0.6, l: Math.min(100, color.l + 25) })

  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm drop-shadow-xl">
      <svg viewBox="0 0 200 240" className="h-full w-full" role="img" aria-label="Brewing vessel">
        <defs>
          <clipPath id="vesselClip">
            <path d="M40,40 L160,40 C160,40 152,210 148,215 C140,224 60,224 52,215 C48,210 40,40 40,40 Z" />
          </clipPath>
          <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="35%" stopColor="white" stopOpacity="0.05" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* liquid + leaves, clipped to vessel interior */}
        <g clipPath="url(#vesselClip)">
          <rect
            x="30"
            y="55"
            width="140"
            height="170"
            fill={fill}
            style={{ transition: 'fill 300ms ease-out' }}
          />
          <rect x="30" y="55" width="140" height="10" fill={highlightFill} opacity={0.5} />
          {LEAVES.map((leaf, i) => (
            <LeafShape key={i} {...leaf} expansion={leafExpansion} />
          ))}
        </g>

        {/* vessel outline (beaker) */}
        <path
          d="M40,40 L160,40 C160,40 152,210 148,215 C140,224 60,224 52,215 C48,210 40,40 40,40 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className="text-stone-300 dark:text-stone-600"
        />
        <path
          d="M40,40 L160,40 C160,40 152,210 148,215 C140,224 60,224 52,215 C48,210 40,40 40,40 Z"
          fill="url(#glassShine)"
        />
        {/* spout lip */}
        <path
          d="M34,40 C34,34 166,34 166,40"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          className="text-stone-300 dark:text-stone-600"
        />
      </svg>
    </div>
  )
}
