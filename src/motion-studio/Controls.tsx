import React, { useState } from 'react'
import { useMotionTokens } from './MotionContext'
import { CurvePreview } from './CurvePreview'
import { BOUNDS, parseNumberInput } from './validate'
import type { Duration, Spring, Easing } from './tokens'

export const Controls: React.FC = () => {
  const { tokens, updateToken, resetToken } = useMotionTokens()
  const [selectedId, setSelectedId] = useState<string>('spring-snappy')
  const [activeTier, setActiveTier] = useState<'all' | 'primitive' | 'semantic' | 'component'>('all')
  const [lastWarning, setLastWarning] = useState<string | null>(null)

  const selectedToken = tokens.find((t) => t.id === selectedId) || tokens[0]

  const filteredTokens = tokens.filter((t) => activeTier === 'all' || t.tier === activeTier)

  const handleDurationChange = (val: number) => {
    if (!selectedToken) return
    const next: Duration = { type: 'duration', ms: val }
    const res = updateToken(selectedToken.id, next)
    setLastWarning(res.warnings[0] || null)
  }

  const handleSpringChange = (field: 'stiffness' | 'damping' | 'mass', val: number) => {
    if (!selectedToken || selectedToken.value.type !== 'spring') return
    const current = selectedToken.value
    const next: Spring = { ...current, [field]: val }
    const res = updateToken(selectedToken.id, next)
    setLastWarning(res.warnings[0] || null)
  }

  const handleBezierChange = (index: number, val: number) => {
    if (!selectedToken || selectedToken.value.type !== 'bezier') return
    const points = [...selectedToken.value.points] as [number, number, number, number]
    points[index] = val
    const next: Easing = { type: 'bezier', points }
    const res = updateToken(selectedToken.id, next)
    setLastWarning(res.warnings[0] || null)
  }

  const handleReset = () => {
    if (selectedToken) {
      resetToken(selectedToken.id)
      setLastWarning(null)
    }
  }

  return (
    <div className="flex flex-col h-full rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-zinc-100">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 flex-wrap gap-2">
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
          Token Inspector
        </h3>
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTier('all')}
            className={`px-2 py-0.5 rounded ${
              activeTier === 'all' ? 'bg-zinc-800 text-cyan-300' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActiveTier('primitive')}
            className={`px-2 py-0.5 rounded ${
              activeTier === 'primitive' ? 'bg-zinc-800 text-cyan-300' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Primitives
          </button>
          <button
            type="button"
            onClick={() => setActiveTier('semantic')}
            className={`px-2 py-0.5 rounded ${
              activeTier === 'semantic' ? 'bg-zinc-800 text-cyan-300' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Semantics
          </button>
          <button
            type="button"
            onClick={() => setActiveTier('component')}
            className={`px-2 py-0.5 rounded ${
              activeTier === 'component' ? 'bg-zinc-800 text-cyan-300' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Components
          </button>
        </div>
      </div>

      {/* Token Selector Grid */}
      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2 motion-studio-scroll">
        {filteredTokens.map((t) => {
          const isSelected = t.id === selectedId
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setSelectedId(t.id)
                setLastWarning(null)
              }}
              className={`px-2.5 py-1 text-[11px] font-mono rounded whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 font-medium'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              {t.label.en}
            </button>
          )
        })}
      </div>

      {/* Active Token Curve Preview */}
      {selectedToken && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
            <span className="font-semibold text-zinc-200">{selectedToken.id}</span>
            <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              {selectedToken.value.type}
            </span>
          </div>

          <CurvePreview value={selectedToken.value} height={110} />

          <p className="mt-2 text-[11px] text-zinc-400 leading-normal">
            {selectedToken.hint.en}
          </p>

          {lastWarning && (
            <div className="mt-2 text-[10px] font-mono px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
              {lastWarning}
            </div>
          )}

          {/* Value Editor Controls */}
          <div className="mt-4 space-y-3 pt-3 border-t border-zinc-900">
            {selectedToken.value.type === 'duration' && (
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <label htmlFor="duration-slider" className="text-zinc-400">Duration (ms)</label>
                  <span className="text-cyan-300 font-semibold">{selectedToken.value.ms}ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="duration-slider"
                    type="range"
                    min={BOUNDS.duration.min}
                    max={BOUNDS.duration.max}
                    step={10}
                    value={selectedToken.value.ms}
                    onChange={(e) => handleDurationChange(Number(e.target.value))}
                    className="flex-1 accent-cyan-400"
                  />
                  <input
                    type="number"
                    value={selectedToken.value.ms}
                    onChange={(e) =>
                      handleDurationChange(
                        parseNumberInput(
                          e.target.value,
                          (selectedToken?.value as Duration).ms,
                          BOUNDS.duration.min,
                          BOUNDS.duration.max
                        )
                      )
                    }
                    className="w-16 px-1.5 py-0.5 text-xs font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-100 text-right focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            )}

            {selectedToken.value.type === 'spring' && (
              <>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <label htmlFor="stiffness-slider" className="text-zinc-400">Stiffness</label>
                    <span className="text-cyan-300 font-semibold">{selectedToken.value.stiffness}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="stiffness-slider"
                      type="range"
                      min={BOUNDS.stiffness.min}
                      max={BOUNDS.stiffness.max}
                      step={10}
                      value={selectedToken.value.stiffness}
                      onChange={(e) => handleSpringChange('stiffness', Number(e.target.value))}
                      className="flex-1 accent-cyan-400"
                    />
                    <input
                      type="number"
                      value={selectedToken.value.stiffness}
                      onChange={(e) =>
                        handleSpringChange(
                          'stiffness',
                          parseNumberInput(
                            e.target.value,
                            (selectedToken?.value as Spring).stiffness,
                            BOUNDS.stiffness.min,
                            BOUNDS.stiffness.max
                          )
                        )
                      }
                      className="w-16 px-1.5 py-0.5 text-xs font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-100 text-right focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <label htmlFor="damping-slider" className="text-zinc-400">Damping</label>
                    <span className="text-cyan-300 font-semibold">{selectedToken.value.damping}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="damping-slider"
                      type="range"
                      min={BOUNDS.damping.min}
                      max={BOUNDS.damping.max}
                      step={1}
                      value={selectedToken.value.damping}
                      onChange={(e) => handleSpringChange('damping', Number(e.target.value))}
                      className="flex-1 accent-cyan-400"
                    />
                    <input
                      type="number"
                      value={selectedToken.value.damping}
                      onChange={(e) =>
                        handleSpringChange(
                          'damping',
                          parseNumberInput(
                            e.target.value,
                            (selectedToken?.value as Spring).damping,
                            BOUNDS.damping.min,
                            BOUNDS.damping.max
                          )
                        )
                      }
                      className="w-16 px-1.5 py-0.5 text-xs font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-100 text-right focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <label htmlFor="mass-slider" className="text-zinc-400">Mass</label>
                    <span className="text-cyan-300 font-semibold">{selectedToken.value.mass}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="mass-slider"
                      type="range"
                      min={BOUNDS.mass.min}
                      max={BOUNDS.mass.max}
                      step={0.1}
                      value={selectedToken.value.mass}
                      onChange={(e) => handleSpringChange('mass', Number(e.target.value))}
                      className="flex-1 accent-cyan-400"
                    />
                    <input
                      type="number"
                      step={0.1}
                      value={selectedToken.value.mass}
                      onChange={(e) =>
                        handleSpringChange(
                          'mass',
                          parseNumberInput(
                            e.target.value,
                            (selectedToken?.value as Spring).mass,
                            BOUNDS.mass.min,
                            BOUNDS.mass.max
                          )
                        )
                      }
                      className="w-16 px-1.5 py-0.5 text-xs font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-100 text-right focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </>
            )}

            {selectedToken.value.type === 'bezier' && (
              <div className="space-y-2">
                <div className="text-xs font-mono text-zinc-400 mb-1">Cubic Bezier Coordinates</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {selectedToken.value.points.map((p, idx) => (
                    <div key={idx}>
                      <span className="text-[10px] font-mono text-zinc-500 block mb-0.5">
                        {idx === 0 ? 'X1' : idx === 1 ? 'Y1' : idx === 2 ? 'X2' : 'Y2'}
                      </span>
                      <input
                        type="number"
                        step={0.05}
                        value={p}
                        onChange={(e) =>
                          handleBezierChange(
                            idx,
                            parseNumberInput(
                              e.target.value,
                              p,
                              idx % 2 === 0 ? BOUNDS.bezierX.min : BOUNDS.bezierY.min,
                              idx % 2 === 0 ? BOUNDS.bezierX.max : BOUNDS.bezierY.max
                            )
                          )
                        }
                        className="w-full px-1.5 py-0.5 text-xs font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-100 text-center focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="px-2.5 py-1 text-xs font-mono rounded border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
              >
                Reset Token
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
