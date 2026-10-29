import React, { useState } from 'react'
import { MotionProvider, useMotionTokens } from './MotionContext'
import { Controls } from './Controls'
import { PlaygroundCard } from './PlaygroundCard'
import { ExportPanel } from './ExportPanel'
import './studio.css'

type MobileTab = 'controls' | 'preview' | 'code'

const StudioInner: React.FC = () => {
  const {
    mode,
    setMode,
    reducedOverride,
    effectiveReduced,
    setReducedOverride,
    resetAll
  } = useMotionTokens()

  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('preview')

  return (
    <div className="motion-studio-root w-full max-w-full rounded-xl border border-zinc-800 bg-zinc-950 p-2 sm:p-4 text-zinc-100 shadow-2xl overflow-hidden">
      {/* Top Bar Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-zinc-800/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
          <div>
            <h2 className="text-sm font-mono font-bold tracking-tight text-zinc-100 flex items-center gap-2">
              <span>Motion Tokens Studio</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-normal">
                DEVTOOLS
              </span>
            </h2>
            <p className="text-[11px] font-mono text-zinc-400">
              Interactive motion token design system & code generator
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Before / After Mode Toggle */}
          <div className="flex items-center rounded-md border border-zinc-800 bg-zinc-900/80 p-0.5">
            <button
              type="button"
              aria-pressed={mode === 'before'}
              onClick={() => setMode('before')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                mode === 'before'
                  ? 'bg-amber-500/20 text-amber-300 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Before (Chaotic)
            </button>
            <button
              type="button"
              aria-pressed={mode === 'after'}
              onClick={() => setMode('after')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                mode === 'after'
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              After (Tokenized)
            </button>
          </div>

          {/* Reduced Motion Override */}
          <button
            type="button"
            aria-pressed={effectiveReduced}
            onClick={() =>
              setReducedOverride(reducedOverride === null ? !effectiveReduced : !reducedOverride)
            }
            className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
              effectiveReduced
                ? 'border-purple-500/50 bg-purple-500/20 text-purple-300'
                : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {effectiveReduced ? 'Reduced Motion: ON' : 'Simulate Reduced Motion'}
          </button>

          {/* Reset All */}
          <button
            type="button"
            onClick={resetAll}
            className="px-2.5 py-1 text-xs font-mono rounded border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Mobile Tab Selector (Visible on viewports < 1024px) */}
      <div className="mt-3 lg:hidden" role="tablist" aria-label="Studio view sections">
        <div className="grid grid-cols-3 gap-1 p-1 rounded-lg border border-zinc-800 bg-zinc-900/60 text-xs font-mono">
          <button
            role="tab"
            aria-selected={activeMobileTab === 'controls'}
            type="button"
            onClick={() => setActiveMobileTab('controls')}
            className={`py-1.5 text-center rounded transition-colors ${
              activeMobileTab === 'controls'
                ? 'bg-zinc-800 text-cyan-300 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Controls
          </button>
          <button
            role="tab"
            aria-selected={activeMobileTab === 'preview'}
            type="button"
            onClick={() => setActiveMobileTab('preview')}
            className={`py-1.5 text-center rounded transition-colors ${
              activeMobileTab === 'preview'
                ? 'bg-zinc-800 text-cyan-300 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Preview
          </button>
          <button
            role="tab"
            aria-selected={activeMobileTab === 'code'}
            type="button"
            onClick={() => setActiveMobileTab('code')}
            className={`py-1.5 text-center rounded transition-colors ${
              activeMobileTab === 'code'
                ? 'bg-zinc-800 text-cyan-300 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Code
          </button>
        </div>

        {/* Mobile Tab Panels */}
        <div className="mt-3">
          {activeMobileTab === 'controls' && <Controls />}
          {activeMobileTab === 'preview' && <PlaygroundCard />}
          {activeMobileTab === 'code' && <ExportPanel />}
        </div>
      </div>

      {/* Desktop 3-column Layout (Visible on viewports >= 1024px) */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-4 mt-4 items-stretch">
        <div className="lg:col-span-4">
          <Controls />
        </div>
        <div className="lg:col-span-5">
          <PlaygroundCard />
        </div>
        <div className="lg:col-span-3">
          <ExportPanel />
        </div>
      </div>
    </div>
  )
}

export const Studio: React.FC = () => {
  return (
    <MotionProvider>
      <StudioInner />
    </MotionProvider>
  )
}
