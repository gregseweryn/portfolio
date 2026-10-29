import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { defaultTokens, chaoticTokens, type MotionToken } from './tokens'
import { validateValue } from './validate'

const STORAGE_KEY = 'motion-studio-v1'

export interface MotionContextValue {
  tokens: MotionToken[]
  mode: 'before' | 'after'
  reducedOverride: boolean | null
  effectiveReduced: boolean
  setMode: (m: 'before' | 'after') => void
  setReducedOverride: (o: boolean | null) => void
  updateToken: (id: string, val: MotionToken['value']) => { warnings: string[] }
  resetToken: (id: string) => void
  resetAll: () => void
}

const MotionContext = createContext<MotionContextValue | undefined>(undefined)

function loadInitialTokens(): MotionToken[] {
  if (typeof window === 'undefined') return defaultTokens
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultTokens
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultTokens

    // Merge parsed tokens with default tokens to preserve schema consistency
    return defaultTokens.map((def) => {
      const saved = parsed.find((p: MotionToken) => p && p.id === def.id)
      if (saved && saved.value) {
        return { ...def, value: saved.value }
      }
      return def
    })
  } catch {
    return defaultTokens
  }
}

function saveTokens(tokens: MotionToken[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
  } catch {
    // Ignore localStorage write errors (e.g. storage quota or private browsing)
  }
}

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userTokens, setUserTokens] = useState<MotionToken[]>(loadInitialTokens)
  const [mode, setMode] = useState<'before' | 'after'>('after')
  const [reducedOverride, setReducedOverride] = useState<boolean | null>(null)
  const [systemReduced, setSystemReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setSystemReduced(e.matches)
    mql.addEventListener?.('change', handler)
    return () => mql.removeEventListener?.('change', handler)
  }, [])

  const updateToken = useCallback((id: string, rawVal: MotionToken['value']) => {
    const { value, warnings } = validateValue(rawVal)
    setUserTokens((prev) => {
      const next = prev.map((token) => (token.id === id ? { ...token, value } : token))
      saveTokens(next)
      return next
    })
    return { warnings }
  }, [])

  const resetToken = useCallback((id: string) => {
    const def = defaultTokens.find((t) => t.id === id)
    if (!def) return
    setUserTokens((prev) => {
      const next = prev.map((token) => (token.id === id ? { ...token, value: def.value } : token))
      saveTokens(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setUserTokens(defaultTokens)
    saveTokens(defaultTokens)
  }, [])

  const effectiveReduced = reducedOverride !== null ? reducedOverride : systemReduced
  const activeTokens = mode === 'before' ? chaoticTokens : userTokens

  const contextValue: MotionContextValue = {
    tokens: activeTokens,
    mode,
    reducedOverride,
    effectiveReduced,
    setMode,
    setReducedOverride,
    updateToken,
    resetToken,
    resetAll
  }

  return <MotionContext.Provider value={contextValue}>{children}</MotionContext.Provider>
}

export function useMotionTokens(): MotionContextValue {
  const ctx = useContext(MotionContext)
  if (!ctx) {
    throw new Error('useMotionTokens must be used within a MotionProvider')
  }
  return ctx
}
