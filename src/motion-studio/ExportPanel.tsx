import React, { useState } from 'react'
import { useMotionTokens } from './MotionContext'
import { toCss, toTailwind, toFramer, toW3cJson } from './exporters'

type TabType = 'css' | 'tailwind' | 'framer' | 'w3c'

export const ExportPanel: React.FC = () => {
  const { tokens } = useMotionTokens()
  const [activeTab, setActiveTab] = useState<TabType>('css')
  const [copied, setCopied] = useState(false)

  let code = ''
  switch (activeTab) {
    case 'css':
      code = toCss(tokens)
      break
    case 'tailwind':
      code = toTailwind(tokens)
      break
    case 'framer':
      code = toFramer(tokens)
      break
    case 'w3c':
      code = toW3cJson(tokens)
      break
  }

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col h-full rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-zinc-100">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('css')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'css'
                ? 'bg-zinc-800 text-cyan-300 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            CSS
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tailwind')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'tailwind'
                ? 'bg-zinc-800 text-cyan-300 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Tailwind
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('framer')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'framer'
                ? 'bg-zinc-800 text-cyan-300 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Framer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('w3c')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'w3c'
                ? 'bg-zinc-800 text-cyan-300 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            W3C JSON
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
        </button>
      </div>

      {/* Screen-reader announcement region for Jakob Nielsen Heuristic 1 */}
      <div role="status" aria-live="polite" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </div>

      <div className="flex-1 mt-3 overflow-auto max-h-[460px] motion-studio-scroll rounded bg-zinc-900/50 p-3 border border-zinc-900">
        <pre className="text-[11px] font-mono leading-relaxed text-zinc-300 select-all whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
