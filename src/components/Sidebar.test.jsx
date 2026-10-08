import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Sidebar from './Sidebar'

describe('Sidebar', () => {
  it('shows the photo, name and role', () => {
    render(<Sidebar active='about' />)

    expect(screen.getByRole('img', { name: 'Wing Lui' })).toHaveAttribute('src', '/profile.jpg')
    expect(screen.getByRole('heading', { level: 1, name: 'Wing Lui' })).toBeInTheDocument()
    expect(screen.getByText('Frontend developer')).toBeInTheDocument()
  })

  it('links to every section and marks only the active one as current', () => {
    render(<Sidebar active='experience' />)

    const nav = within(screen.getByRole('navigation', { name: 'Sections' }))
    expect(nav.getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual([
      '#about',
      '#experience',
      '#projects',
      '#contact',
    ])
    expect(nav.getByRole('link', { name: 'Experience' })).toHaveAttribute('aria-current', 'true')
    for (const name of ['About', 'Projects', 'Contact']) {
      expect(nav.getByRole('link', { name })).not.toHaveAttribute('aria-current')
    }
  })

  it.each([
    ['GitHub', 'https://github.com/winglui'],
    ['LinkedIn', 'https://www.linkedin.com/in/wing-lui/'],
  ])('links %s to the right profile in a new tab', (name, url) => {
    render(<Sidebar active='about' />)

    const link = screen.getByRole('link', { name })
    expect(link).toHaveAttribute('href', url)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
