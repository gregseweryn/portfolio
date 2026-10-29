import React from 'react'
import type { Easing, Spring, Duration } from './tokens'

export interface CurvePreviewProps {
  value: Easing | Spring | Duration
  width?: number
  height?: number
}

export const CurvePreview: React.FC<CurvePreviewProps> = ({
  value,
  width = 240,
  height = 120
}) => {
  const pad = 12
  const innerW = width - pad * 2
  const innerH = height - pad * 2

  let pathD = ''
  let handlesD = ''

  if (value.type === 'bezier') {
    const [x1, y1, x2, y2] = value.points
    const startX = pad
    const startY = height - pad
    const endX = width - pad
    const endY = pad

    const cp1x = pad + x1 * innerW
    const cp1y = height - pad - y1 * innerH
    const cp2x = pad + x2 * innerW
    const cp2y = height - pad - y2 * innerH

    pathD = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`
    handlesD = `M ${startX} ${startY} L ${cp1x} ${cp1y} M ${endX} ${endY} L ${cp2x} ${cp2y}`
  } else if (value.type === 'spring') {
    const { stiffness, damping, mass } = value
    const w0 = Math.sqrt(stiffness / mass)
    const zeta = damping / (2 * Math.sqrt(stiffness * mass))

    const points: [number, number][] = []
    const steps = 60
    const totalTime = 1.2

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * totalTime
      let pos = 1
      if (zeta < 1) {
        const wd = w0 * Math.sqrt(1 - zeta * zeta)
        pos = 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t))
      } else {
        pos = 1 - (1 + w0 * t) * Math.exp(-w0 * t)
      }

      const x = pad + (i / steps) * innerW
      const y = height - pad - pos * (innerH * 0.75)
      points.push([x, y])
    }

    pathD = points.reduce((acc, [x, y], idx) => {
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`
    }, '')
  } else if (value.type === 'duration') {
    const startX = pad
    const startY = height - pad
    const endX = width - pad
    const endY = pad
    pathD = `M ${startX} ${startY} L ${endX} ${endY}`
  }

  return (
    <div className="relative rounded border border-zinc-800 bg-zinc-950 p-2 overflow-hidden select-none">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Grid lines */}
        <line
          x1={pad}
          y1={pad}
          x2={width - pad}
          y2={pad}
          stroke="#27272a"
          strokeDasharray="3 3"
          strokeWidth="1"
        />
        <line
          x1={pad}
          y1={height - pad}
          x2={width - pad}
          y2={height - pad}
          stroke="#27272a"
          strokeWidth="1"
        />

        {/* Handles if bezier */}
        {handlesD && (
          <path
            d={handlesD}
            fill="none"
            stroke="#52525b"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        )}

        {/* Curve */}
        <path
          d={pathD}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2.5"
          className="curve-path"
        />

        {/* Start / Target indicators */}
        <circle cx={pad} cy={height - pad} r="3" fill="#a1a1aa" />
        <circle cx={width - pad} cy={pad} r="3" fill="#22d3ee" />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] font-mono text-zinc-500">
        <span>0ms (Origin)</span>
        <span>Target (1.0)</span>
      </div>
    </div>
  )
}
