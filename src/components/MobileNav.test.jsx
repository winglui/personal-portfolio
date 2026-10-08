import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MobileNav from './MobileNav'

describe('MobileNav', () => {
  it('links to every section in order', () => {
    render(<MobileNav active='about' />)

    const links = within(screen.getByRole('navigation', { name: 'Sections' })).getAllByRole('link')
    expect(links.map((a) => [a.textContent, a.getAttribute('href')])).toEqual([
      ['About', '#about'],
      ['Experience', '#experience'],
      ['Projects', '#projects'],
      ['Contact', '#contact'],
    ])
  })

  it('marks only the active section as current', () => {
    render(<MobileNav active='projects' />)

    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'true')
    for (const name of ['About', 'Experience', 'Contact']) {
      expect(screen.getByRole('link', { name })).not.toHaveAttribute('aria-current')
    }
  })
})
