import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Studio } from './Studio'
import { CurvePreview } from './CurvePreview'

describe('Studio Component', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined)
      },
      configurable: true,
      writable: true
    })
  })

  it('renders title, live status badge, and controls', () => {
    render(<Studio />)
    expect(screen.getByText(/motion tokens studio/i)).toBeInTheDocument()
    expect(screen.getAllByText(/60 fps/i)[0]).toBeInTheDocument()
  })

  it('toggles Before/After mode on switch click', async () => {
    const user = userEvent.setup()
    render(<Studio />)

    const beforeButton = screen.getByRole('button', { name: /before/i })
    await user.click(beforeButton)
    expect(beforeButton).toHaveAttribute('aria-pressed', 'true')

    const afterButton = screen.getByRole('button', { name: /after/i })
    await user.click(afterButton)
    expect(afterButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('copies code and announces via aria-live polite', async () => {
    const user = userEvent.setup()
    render(<Studio />)

    const copyButtons = screen.getAllByRole('button', { name: /copy snippet/i })
    await user.click(copyButtons[0])

    await waitFor(() => {
      expect(screen.getAllByText(/copied/i)[0]).toBeInTheDocument()
    })

    const liveRegions = screen.getAllByRole('status')
    expect(liveRegions[0]).toHaveAttribute('aria-live', 'polite')
  })

  it('toggles mobile tab buttons to switch visible panes', async () => {
    const user = userEvent.setup()
    render(<Studio />)

    const previewTab = screen.getByRole('tab', { name: /preview/i })
    const codeTab = screen.getByRole('tab', { name: /code/i })

    await user.click(codeTab)
    expect(codeTab).toHaveAttribute('aria-selected', 'true')

    await user.click(previewTab)
    expect(previewTab).toHaveAttribute('aria-selected', 'true')
  })
})

describe('CurvePreview', () => {
  it('renders a valid SVG path for cubic-bezier', () => {
    const { container } = render(
      <CurvePreview
        value={{ type: 'bezier', points: [0.23, 1, 0.32, 1] }}
        width={200}
        height={100}
      />
    )
    const path = container.querySelector('path.curve-path')
    expect(path).toBeInTheDocument()
    expect(path?.getAttribute('d')).toContain('M')
  })

  it('renders a valid SVG path for spring', () => {
    const { container } = render(
      <CurvePreview
        value={{ type: 'spring', stiffness: 300, damping: 28, mass: 1 }}
        width={200}
        height={100}
      />
    )
    const path = container.querySelector('path.curve-path')
    expect(path).toBeInTheDocument()
    expect(path?.getAttribute('d')).toContain('M')
  })
})
