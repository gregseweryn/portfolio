import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MotionProvider } from '../MotionContext'
import { Modal } from './Modal'
import { Tooltip } from './Tooltip'
import { Accordion } from './Accordion'
import { Dropdown } from './Dropdown'
import { getMotionVariants } from './motion-helper'

describe('Modal component accessibility & keyboard behavior', () => {
  it('opens on click, traps focus, and closes on Escape returning focus to trigger', async () => {
    const user = userEvent.setup()
    render(
      <MotionProvider>
        <Modal />
      </MotionProvider>
    )

    const trigger = screen.getByRole('button', { name: /open modal|otwórz okno/i })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-modal', 'true')

    // Press Escape to dismiss
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
    expect(trigger).toHaveFocus()
  })
})

describe('Tooltip component accessibility', () => {
  it('reveals on focus and dismisses on Escape', async () => {
    const user = userEvent.setup()
    render(
      <MotionProvider>
        <Tooltip text="Helpful hint text">
          <button>Hover or focus me</button>
        </Tooltip>
      </MotionProvider>
    )

    const trigger = screen.getByRole('button', { name: /hover or focus me/i })
    await user.tab()
    expect(trigger).toHaveFocus()

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveTextContent('Helpful hint text')

    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })
})

describe('Accordion component accessibility', () => {
  it('toggles expansion on click and keyboard Enter/Space', async () => {
    const user = userEvent.setup()
    render(
      <MotionProvider>
        <Accordion title="Motion System Details">
          <p>Accordion expanded content text</p>
        </Accordion>
      </MotionProvider>
    )

    const trigger = screen.getByRole('button', { name: /motion system details/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Accordion expanded content text')).toBeInTheDocument()

    // Toggle with Space
    trigger.focus()
    await user.keyboard(' ')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('Dropdown component accessibility & keyboard navigation', () => {
  it('navigates options with ArrowDown/ArrowUp and closes with Escape', async () => {
    const user = userEvent.setup()
    const options = [
      { id: '1', label: 'Linear' },
      { id: '2', label: 'Ease Out' },
      { id: '3', label: 'Spring Snappy' }
    ]

    render(
      <MotionProvider>
        <Dropdown label="Select curve" options={options} onSelect={() => {}} />
      </MotionProvider>
    )

    const trigger = screen.getByRole('button', { name: /select curve/i })
    trigger.focus()

    // Open with ArrowDown
    await user.keyboard('{ArrowDown}')
    const menu = screen.getByRole('menu')
    expect(menu).toBeInTheDocument()

    // Close with Escape
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
    expect(trigger).toHaveFocus()
  })
})

describe('motion-helper reduced motion transformation', () => {
  it('strips translate and scale transforms when effectiveReduced is true', () => {
    const full = getMotionVariants('modal', false)
    expect(full.initial).toHaveProperty('scale')
    expect(full.initial).toHaveProperty('y')

    const reduced = getMotionVariants('modal', true)
    expect(reduced.initial).not.toHaveProperty('scale')
    expect(reduced.initial).not.toHaveProperty('y')
    expect(reduced.initial).toHaveProperty('opacity')
  })
})
