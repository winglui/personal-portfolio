import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Projects from './Projects'

const cardFor = (name) => screen.getByRole('heading', { level: 3, name }).closest('a')

describe('Projects', () => {
  it('renders the section with its heading and anchor id', () => {
    const { container } = render(<Projects />)

    expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument()
    expect(container.querySelector('section#projects')).toBeInTheDocument()
  })

  it('renders one card per project', () => {
    render(<Projects />)

    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(titles).toEqual([
      'Better Tips Calculator',
      'Tenzies',
      'Favorite Movies',
      'Fusion Security Testing',
    ])
  })

  it.each([
    ['Better Tips Calculator', 'https://react-better-tips-calculator.netlify.app'],
    ['Tenzies', 'https://unrivaled-pavlova-c983eb.netlify.app'],
    ['Favorite Movies', 'https://react-my-favorite-movies.netlify.app/'],
    ['Fusion Security Testing', 'https://www.trustwave.com/en-us/services/penetration-testing/'],
  ])('links the %s card to its URL in a new tab', (name, url) => {
    render(<Projects />)

    const card = cardFor(name)
    expect(card).toHaveAttribute('href', url)
    expect(card).toHaveAttribute('target', '_blank')
    expect(card).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it.each([
    ['Better Tips Calculator', 'React, TypeScript, Tailwind CSS'],
    ['Tenzies', 'React, JavaScript, CSS'],
    ['Favorite Movies', 'React, JavaScript, CSS'],
    ['Fusion Security Testing', 'AngularDart, HTML, CSS'],
  ])('shows the tech stack for %s', (name, stack) => {
    render(<Projects />)

    expect(within(cardFor(name)).getByText(stack)).toBeInTheDocument()
  })

  it('labels demo projects "Live demo" and the client project "Product page"', () => {
    render(<Projects />)

    for (const name of ['Better Tips Calculator', 'Tenzies', 'Favorite Movies']) {
      expect(within(cardFor(name)).getByText('Live demo')).toBeInTheDocument()
    }
    const fusion = cardFor('Fusion Security Testing')
    expect(within(fusion).getByText('Product page')).toBeInTheDocument()
    expect(within(fusion).queryByText('Live demo')).not.toBeInTheDocument()
  })

  it('shows a lazy-loaded, decorative thumbnail for projects with a screenshot', () => {
    render(<Projects />)

    const thumbnails = {
      'Better Tips Calculator': '/projects/tips.jpg',
      'Tenzies': '/projects/tenzies.jpg',
      'Favorite Movies': '/projects/movies.jpg',
    }
    for (const [name, src] of Object.entries(thumbnails)) {
      const img = cardFor(name).querySelector('img')
      expect(img).toHaveAttribute('src', src)
      expect(img).toHaveAttribute('loading', 'lazy')
      // the card title already names the project, so the image is decorative
      expect(img).toHaveAttribute('alt', '')
    }
  })

  it('shows a text note instead of a thumbnail for Fusion', () => {
    render(<Projects />)

    const fusion = cardFor('Fusion Security Testing')
    expect(fusion.querySelector('img')).toBeNull()
    expect(within(fusion).getByText('Built at Trustwave. Client work, no public demo.')).toBeInTheDocument()
  })
})
