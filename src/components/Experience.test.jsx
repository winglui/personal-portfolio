import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Experience from './Experience'

const jobFor = (company) => screen.getByRole('heading', { level: 3, name: company }).closest('li')

describe('Experience', () => {
  it('renders the section with its heading and anchor id', () => {
    const { container } = render(<Experience />)

    expect(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeInTheDocument()
    expect(container.querySelector('section#experience')).toBeInTheDocument()
  })

  it('lists jobs newest first', () => {
    render(<Experience />)

    const companies = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(companies).toEqual(['Trustwave', 'Application Security, Inc.'])
  })

  it.each([
    ['Trustwave', 'Senior Software Architect', '2017–2024', 'Angular 12, TypeScript, AngularDart, HTML, CSS'],
    ['Application Security, Inc.', 'Software Developer', '2005–2017', 'GWT, HTML, CSS'],
  ])('shows title, dates and stack for %s', (company, title, dates, stack) => {
    render(<Experience />)

    const job = within(jobFor(company))
    expect(job.getByText(title)).toBeInTheDocument()
    expect(job.getByText(dates)).toBeInTheDocument()
    expect(job.getByText(stack)).toBeInTheDocument()
  })

  it('shows three highlights for each job', () => {
    render(<Experience />)

    for (const company of ['Trustwave', 'Application Security, Inc.']) {
      const highlights = within(jobFor(company)).getAllByRole('listitem')
      expect(highlights).toHaveLength(3)
    }
    expect(screen.getByText(/saved about 100 development hours a month/)).toBeInTheDocument()
  })
})
