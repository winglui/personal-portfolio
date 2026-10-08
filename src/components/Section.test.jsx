import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Section from './Section'

describe('Section', () => {
  it('renders a section with the given id, heading and content', () => {
    const { container } = render(
      <Section id='demo' title='Demo title'>
        <p>Demo content</p>
      </Section>
    )

    const section = container.querySelector('section')
    expect(section).toHaveAttribute('id', 'demo')
    expect(screen.getByRole('heading', { level: 2, name: 'Demo title' })).toBeInTheDocument()
    expect(screen.getByText('Demo content')).toBeInTheDocument()
  })
})
