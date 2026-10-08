import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import emailjs from '@emailjs/browser'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Contact from './Contact'

vi.mock('@emailjs/browser', () => ({ default: { sendForm: vi.fn() } }))

const fields = () => ({
  name: screen.getByLabelText('Name'),
  email: screen.getByLabelText('Email'),
  message: screen.getByLabelText('Message'),
})
const sendButton = () => screen.getByRole('button', { name: /send message|sending/i })

async function fillForm(user, { name = 'Test User', email = 'test@example.com', message = 'Hello!' } = {}) {
  const f = fields()
  if (name) await user.type(f.name, name)
  if (email) await user.type(f.email, email)
  if (message) await user.type(f.message, message)
}

describe('Contact', () => {
  beforeEach(() => {
    emailjs.sendForm.mockReset()
  })

  it('renders the section with its heading and anchor id', () => {
    const { container } = render(<Contact />)

    expect(screen.getByRole('heading', { level: 2, name: 'Contact' })).toBeInTheDocument()
    expect(container.querySelector('section#contact')).toBeInTheDocument()
  })

  it('has a labelled, required field for name, email and message', () => {
    render(<Contact />)

    const f = fields()
    for (const field of Object.values(f)) expect(field).toBeRequired()
    expect(f.email).toHaveAttribute('type', 'email')
    // EmailJS template reads these names
    expect(f.name).toHaveAttribute('name', 'from_name')
    expect(f.email).toHaveAttribute('name', 'from_email')
    expect(f.message).toHaveAttribute('name', 'message')
  })

  it('disables the send button until every field is filled in', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    expect(sendButton()).toBeDisabled()
    await user.type(fields().name, 'Test User')
    expect(sendButton()).toBeDisabled()
    await user.type(fields().email, 'test@example.com')
    expect(sendButton()).toBeDisabled()
    await user.type(fields().message, 'Hello!')
    expect(sendButton()).toBeEnabled()
  })

  it('keeps the button disabled when a field is only spaces', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    await fillForm(user, { message: '   ' })
    expect(sendButton()).toBeDisabled()
  })

  it('refuses to send if the form is submitted with blank fields', () => {
    render(<Contact />)

    fireEvent.submit(screen.getByRole('button').closest('form'))

    expect(emailjs.sendForm).not.toHaveBeenCalled()
    expect(screen.getByRole('status')).toHaveTextContent('Fill in your name, email and message before sending.')
  })

  it('shows a sending state while the message is in flight', async () => {
    const user = userEvent.setup()
    emailjs.sendForm.mockReturnValue(new Promise(() => {}))
    render(<Contact />)

    await fillForm(user)
    await user.click(sendButton())

    expect(sendButton()).toHaveTextContent('Sending…')
    expect(sendButton()).toBeDisabled()
  })

  it('sends the form through EmailJS, confirms, and clears the fields', async () => {
    const user = userEvent.setup()
    emailjs.sendForm.mockResolvedValue({ status: 200 })
    render(<Contact />)

    await fillForm(user)
    await user.click(sendButton())

    expect(emailjs.sendForm).toHaveBeenCalledTimes(1)
    const [, , formEl, options] = emailjs.sendForm.mock.calls[0]
    expect(formEl.tagName).toBe('FORM')
    expect(options).toHaveProperty('publicKey')

    expect(await screen.findByText("Message sent. I'll reply within a few days.")).toBeInTheDocument()
    const f = fields()
    expect(f.name).toHaveValue('')
    expect(f.email).toHaveValue('')
    expect(f.message).toHaveValue('')
    expect(sendButton()).toHaveTextContent('Send message')
    expect(sendButton()).toBeDisabled()
  })

  it('shows an error and keeps what was typed when sending fails', async () => {
    const user = userEvent.setup()
    emailjs.sendForm.mockRejectedValue(new Error('network'))
    render(<Contact />)

    await fillForm(user)
    await user.click(sendButton())

    expect(await screen.findByText("Your message didn't send. Check your connection and try again.")).toBeInTheDocument()
    const f = fields()
    expect(f.name).toHaveValue('Test User')
    expect(f.email).toHaveValue('test@example.com')
    expect(f.message).toHaveValue('Hello!')
    expect(sendButton()).toBeEnabled()
  })

  it('clears an old status message when sending again', async () => {
    const user = userEvent.setup()
    emailjs.sendForm.mockRejectedValueOnce(new Error('network')).mockReturnValueOnce(new Promise(() => {}))
    render(<Contact />)

    await fillForm(user)
    await user.click(sendButton())
    await screen.findByText(/didn't send/)

    await user.click(sendButton())
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })
})
