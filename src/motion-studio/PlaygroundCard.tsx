import React, { useState } from 'react'
import { Modal } from './components/Modal'
import { Tooltip } from './components/Tooltip'
import { Accordion } from './components/Accordion'
import { Dropdown } from './components/Dropdown'

export const PlaygroundCard: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState('snappy')

  const curveOptions = [
    { id: 'snappy', label: 'Snappy Spring' },
    { id: 'soft', label: 'Gentle Ease' },
    { id: 'fast', label: 'Fast Fade' }
  ]

  return (
    <div className="flex flex-col h-full rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-zinc-100">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 flex-wrap gap-2">
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
            Interactive Playground
          </h3>
          <p className="text-[11px] font-mono text-zinc-400">
            Real-time preview of 4 accessible components
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>READY / 60 FPS</span>
        </div>
      </div>

      <div className="flex-1 mt-4 space-y-4">
        {/* Row 1: Dropdown & Tooltip */}
        <div className="p-3 rounded-md border border-zinc-800/80 bg-zinc-900/30 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-[11px] font-mono text-zinc-400 mb-1.5">Preset Curve Menu</div>
            <Dropdown
              label="Select Preset"
              options={curveOptions}
              selectedId={selectedPreset}
              onSelect={(opt) => setSelectedPreset(opt.id)}
            />
          </div>

          <div>
            <div className="text-[11px] font-mono text-zinc-400 mb-1.5">Micro-interaction</div>
            <Tooltip text="Spring physics active: damping 28, stiffness 300">
              <button
                type="button"
                className="px-3.5 py-2 text-xs font-mono rounded border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                Hover or Tab for Tooltip
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Row 2: Dialog Modal */}
        <div className="p-3 rounded-md border border-zinc-800/80 bg-zinc-900/30 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-[11px] font-mono text-zinc-100 font-medium">Spring Dialog</div>
            <div className="text-[11px] font-mono text-zinc-400">
              Backdrop fade with scale and focus trap
            </div>
          </div>
          <Modal
            triggerText="Open Modal Dialog"
            title="Motion System Dialog"
            description="This dialog executes spring token physics. Press Escape or click Cancel to dismiss and restore focus."
          />
        </div>

        {/* Row 3: Accordion */}
        <div className="p-3 rounded-md border border-zinc-800/80 bg-zinc-900/30">
          <div className="text-[11px] font-mono text-zinc-400 mb-2">Height Disclosure</div>
          <Accordion title="Motion System Rationale & Guidelines" defaultOpen={true}>
            This accordion disclosure animates using tokenized ease-out curves. In reduced-motion mode, height and translation jumps are constrained to avoid cognitive disruption.
          </Accordion>
        </div>
      </div>
    </div>
  )
}
