import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('@emailjs/browser', () => ({ default: { sendForm: vi.fn() } }))

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', class {
      observe() {}
      disconnect() {}
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders every section in order', () => {
    const { container } = render(<App />)

    const ids = [...container.querySelectorAll('main section')].map((s) => s.id)
    expect(ids).toEqual(['about', 'experience', 'projects', 'contact'])
  })

  it('renders both the mobile and desktop navigation with About active', () => {
    render(<App />)

    const navs = screen.getAllByRole('navigation', { name: 'Sections' })
    expect(navs).toHaveLength(2)
    for (const link of screen.getAllByRole('link', { name: 'About' })) {
      expect(link).toHaveAttribute('aria-current', 'true')
    }
  })

  it('shows the current year in the footer', () => {
    render(<App />)

    expect(screen.getByText(`© ${new Date().getFullYear()} Wing Lui`)).toBeInTheDocument()
  })
})
