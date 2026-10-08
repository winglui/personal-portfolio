import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import About from './About'

describe('About', () => {
  it('renders the section with its heading and anchor id', () => {
    const { container } = render(<About />)

    expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument()
    expect(container.querySelector('section#about')).toBeInTheDocument()
  })

  it('opens with years of experience and current stack', () => {
    render(<About />)

    expect(screen.getByText(/nearly 20 years of experience/)).toBeInTheDocument()
    expect(screen.getByText(/React and TypeScript today/)).toBeInTheDocument()
  })

  it('lists each skill group with its skills', () => {
    render(<About />)

    const groups = screen.getAllByRole('term').map((dt) => dt.textContent)
    const skills = screen.getAllByRole('definition').map((dd) => dd.textContent)

    expect(groups).toEqual(['Languages', 'Frameworks', 'Styling', 'Testing and tools'])
    expect(skills).toEqual([
      'JavaScript, TypeScript, HTML, CSS',
      'React, Angular, AngularDart, GWT',
      'Tailwind CSS, responsive layouts',
      'Jasmine, Karma, Chrome DevTools, Vite',
    ])
  })
})
