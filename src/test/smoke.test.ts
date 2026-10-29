import { describe, it, expect } from 'vitest'

describe('Smoke test environment', () => {
  it('has access to DOM document', () => {
    expect(document).toBeDefined()
    expect(document.body).toBeDefined()
  })

  it('verifies basic math', () => {
    expect(1 + 1).toBe(2)
  })
})
