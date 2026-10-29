import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { MotionProvider, useMotionTokens } from './MotionContext'
import { defaultTokens, chaoticTokens } from './tokens'

describe('MotionContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MotionProvider>{children}</MotionProvider>
  )

  it('initializes with default tokens and "after" mode', () => {
    const { result } = renderHook(() => useMotionTokens(), { wrapper })
    expect(result.current.mode).toBe('after')
    expect(result.current.tokens.length).toBe(defaultTokens.length)
    expect(result.current.tokens[0].value).toEqual(defaultTokens[0].value)
  })

  it('updates a token value and validates it', () => {
    const { result } = renderHook(() => useMotionTokens(), { wrapper })
    act(() => {
      const res = result.current.updateToken('duration-fast', { type: 'duration', ms: 150 })
      expect(res.warnings).toEqual([])
    })
    const fastToken = result.current.tokens.find((t) => t.id === 'duration-fast')
    expect(fastToken?.value).toEqual({ type: 'duration', ms: 150 })
  })

  it('resets a single token to its default value', () => {
    const { result } = renderHook(() => useMotionTokens(), { wrapper })
    act(() => {
      result.current.updateToken('duration-fast', { type: 'duration', ms: 180 })
    })
    expect(result.current.tokens.find((t) => t.id === 'duration-fast')?.value).toEqual({
      type: 'duration',
      ms: 180
    })

    act(() => {
      result.current.resetToken('duration-fast')
    })
    expect(result.current.tokens.find((t) => t.id === 'duration-fast')?.value).toEqual(
      defaultTokens.find((t) => t.id === 'duration-fast')?.value
    )
  })

  it('resets all tokens to default values', () => {
    const { result } = renderHook(() => useMotionTokens(), { wrapper })
    act(() => {
      result.current.updateToken('duration-fast', { type: 'duration', ms: 180 })
      result.current.updateToken('duration-base', { type: 'duration', ms: 400 })
    })

    act(() => {
      result.current.resetAll()
    })
    expect(result.current.tokens).toEqual(defaultTokens)
  })

  it('swaps between chaotic tokens and user tokens when toggling mode', () => {
    const { result } = renderHook(() => useMotionTokens(), { wrapper })
    expect(result.current.mode).toBe('after')

    act(() => {
      result.current.setMode('before')
    })
    expect(result.current.mode).toBe('before')
    expect(result.current.tokens[0].id).toBe(chaoticTokens[0].id)
    expect(result.current.tokens[0].value).toEqual(chaoticTokens[0].value)

    act(() => {
      result.current.setMode('after')
    })
    expect(result.current.mode).toBe('after')
    expect(result.current.tokens[0].value).toEqual(defaultTokens[0].value)
  })

  it('respects reducedOverride over system media query', () => {
    const { result } = renderHook(() => useMotionTokens(), { wrapper })
    expect(result.current.reducedOverride).toBeNull()

    act(() => {
      result.current.setReducedOverride(true)
    })
    expect(result.current.reducedOverride).toBe(true)
    expect(result.current.effectiveReduced).toBe(true)

    act(() => {
      result.current.setReducedOverride(false)
    })
    expect(result.current.reducedOverride).toBe(false)
    expect(result.current.effectiveReduced).toBe(false)
  })

  it('handles corrupted localStorage gracefully by falling back to defaults', () => {
    localStorage.setItem('motion-studio-v1', '{ invalid json syntax !!!')
    const { result } = renderHook(() => useMotionTokens(), { wrapper })
    expect(result.current.tokens).toEqual(defaultTokens)
  })
})
