import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { sections, useActiveSection } from './sections'

// jsdom has no IntersectionObserver, so capture the instance and drive it by hand.
let observer

class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback
    this.options = options
    this.observed = []
    this.disconnect = vi.fn()
    observer = this
  }
  observe(el) {
    this.observed.push(el)
  }
}

function Harness() {
  const active = useActiveSection()
  return (
    <>
      {sections.map(({ id }) => <section key={id} id={id} />)}
      <output>{active}</output>
    </>
  )
}

const fire = (...entries) => act(() => {
  observer.callback(entries.map(([id, isIntersecting]) => ({ target: document.getElementById(id), isIntersecting })))
})

describe('useActiveSection', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts on the first section', () => {
    render(<Harness />)

    expect(screen.getByRole('status')).toHaveTextContent('about')
  })

  it('observes every section element', () => {
    render(<Harness />)

    expect(observer.observed.map((el) => el.id)).toEqual(['about', 'experience', 'projects', 'contact'])
  })

  it('switches to the section that enters the viewport', () => {
    render(<Harness />)

    fire(['projects', true])
    expect(screen.getByRole('status')).toHaveTextContent('projects')
  })

  it('ignores sections that are leaving the viewport', () => {
    render(<Harness />)

    fire(['experience', true])
    fire(['experience', false], ['contact', false])
    expect(screen.getByRole('status')).toHaveTextContent('experience')
  })

  it('stops observing on unmount', () => {
    const { unmount } = render(<Harness />)

    unmount()
    expect(observer.disconnect).toHaveBeenCalled()
  })
})
