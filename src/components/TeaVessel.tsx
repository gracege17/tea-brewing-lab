import { hslString } from '../lib/brew'
import type { ColorHSL } from '../data/types'

interface Leaf {
  x: number
  y: number
  rotation: number
  scaleJitter: number
}

const LEAVES: Leaf[] = [
  { x: 74, y: 152, rotation: -22, scaleJitter: 0.95 },
  { x: 122, y: 172, rotation: 26, scaleJitter: 1.05 },
  { x: 100, y: 128, rotation: -2, scaleJitter: 1 },
  { x: 90, y: 190, rotation: 48, scaleJitter: 0.9 },
]

const GRADUATIONS = [
  { y: 70, label: '100' },
  { y: 108, label: '75' },
  { y: 146, label: '50' },
  { y: 184, label: '25' },
]

function LeafShape({ x, y, rotation, scaleJitter, expansion }: Leaf & { expansion: number }) {
  const openness = expansion / 100
  const scaleX = (0.32 + 0.58 * openness) * scaleJitter
  const scaleY = (0.5 + 0.5 * openness) * scaleJitter
  const veinOpacity = Math.max(0, openness - 0.3) / 0.7
  const curlDrift = (1 - openness) * 10 * (rotation < 0 ? -1 : 1)

  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotation + curlDrift}) scale(${scaleX} ${scaleY})`}
      style={{ transition: 'transform 250ms ease-out' }}
    >
      <path
        d="M0,-20 C11,-15 11,15 0,20 C-11,15 -11,-15 0,-20 Z"
        fill="#3f6b3f"
        fillOpacity={0.8}
        stroke="#2a462a"
        strokeOpacity={0.45}
        strokeWidth={1}
      />
      <path d="M0,-20 C4,-16 5,-4 3,0 C1,4 -2,2 -1,-8 Z" fill="#5c8a5c" fillOpacity={0.5} />
      <line x1="0" y1="-16" x2="0" y2="16" stroke="#2a462a" strokeWidth={0.8} opacity={veinOpacity} />
    </g>
  )
}

interface TeaVesselProps {
  color: ColorHSL
  leafExpansion: number
  aroma: number
}

export function TeaVessel({ color, leafExpansion, aroma }: TeaVesselProps) {
  const fill = hslString(color)
  const fillDeep = hslString({ h: color.h, s: color.s, l: Math.max(0, color.l - 12) })
  const highlightFill = hslString({ h: color.h, s: color.s * 0.6, l: Math.min(100, color.l + 25) })
  const steamOpacity = 0.12 + (aroma / 10) * 0.35

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <svg viewBox="0 0 200 260" className="h-full w-full" role="img" aria-label="Brewing vessel">
        <defs>
          <clipPath id="vesselClip">
            <path d="M40,40 L160,40 C160,40 152,210 148,215 C140,224 60,224 52,215 C48,210 40,40 40,40 Z" />
          </clipPath>
          <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="35%" stopColor="white" stopOpacity="0.05" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="liquidGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} />
            <stop offset="100%" stopColor={fillDeep} />
          </linearGradient>
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="black" stopOpacity="0.18" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* steam */}
        <g opacity={steamOpacity} className="text-stone-400">
          <path
            d="M85,36 C80,26 92,20 86,8"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <path
            d="M112,36 C107,24 119,18 113,4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </g>

        {/* liquid + leaves, clipped to vessel interior */}
        <g clipPath="url(#vesselClip)">
          <rect
            x="30"
            y="55"
            width="140"
            height="170"
            fill="url(#liquidGradient)"
            style={{ transition: 'fill 300ms ease-out' }}
          />
          <rect x="30" y="55" width="140" height="8" fill={highlightFill} opacity={0.5} />
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
          className="text-stone-300"
        />
        <path
          d="M40,40 L160,40 C160,40 152,210 148,215 C140,224 60,224 52,215 C48,210 40,40 40,40 Z"
          fill="url(#glassShine)"
        />

        {/* graduation ticks, laboratory glassware detail */}
        <g className="text-stone-300">
          {GRADUATIONS.map(({ y, label }) => (
            <g key={y}>
              <line x1={148} y1={y} x2={158} y2={y} stroke="currentColor" strokeWidth={1.5} />
              <text x={162} y={y + 3} fontSize={8} fill="currentColor" className="font-mono">
                {label}
              </text>
            </g>
          ))}
        </g>

        {/* spout lip */}
        <path
          d="M34,40 C34,34 166,34 166,40"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          className="text-stone-300"
        />

        {/* ground shadow */}
        <ellipse cx="100" cy="232" rx="60" ry="10" fill="url(#groundShadow)" />
      </svg>
    </div>
  )
}
