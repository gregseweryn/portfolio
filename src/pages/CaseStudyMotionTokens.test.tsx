import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CaseStudyMotionTokens } from './CaseStudyMotionTokens'
import { LanguageProvider } from '../context/LanguageContext'

describe('CaseStudyMotionTokens', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
      writable: true
    })
  })

  it('renders editorial hero heading, embedded studio, 10 Nielsen heuristic rows, and explicit limitations', () => {
    const { container } = render(
      <LanguageProvider>
        <CaseStudyMotionTokens navigate={() => {}} />
      </LanguageProvider>
    )

    // Heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

    // Embedded studio
    expect(screen.getAllByText(/motion tokens studio/i).length).toBeGreaterThanOrEqual(2)

    // 10 Nielsen heuristic rows in the table
    const table = container.querySelector('table.nielsen-table')
    expect(table).toBeInTheDocument()
    const rows = table?.querySelectorAll('tbody tr')
    expect(rows?.length).toBe(10)

    // Explicit limits notice
    expect(
      screen.getByText(/expert heuristic inspection|heuristic evaluation/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/not a claim of user testing with human participants|nie stanowi twierdzenia o testach z użytkownikami/i)
    ).toBeInTheDocument()
  })
})
