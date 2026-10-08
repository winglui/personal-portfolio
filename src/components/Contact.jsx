import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { CgSpinner } from 'react-icons/cg';
import Section from './Section'

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const fieldClass = 'w-full rounded-lg border border-[#C3CBD9] bg-white px-3.5 py-2.5 text-ink focus:border-signal focus:outline-2 focus:outline-offset-0 focus:outline-signal';

const statusClass = {
  success: 'bg-[#E6F4EA] text-[#1E6B3A]',
  error: 'bg-[#FDECEC] text-[#9B1C1C]',
};

const Contact = () => {

  const form = useRef();

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: ""
  })
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const isComplete = Object.values(formData).every(value => value.trim())

  function handleSubmit(e) {
    e.preventDefault();

    if (!isComplete) {
      setStatus({ type: 'error', text: 'Fill in your name, email and message before sending.' });
      return;
    }

    setStatus(null)
    setIsSending(true)
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
      publicKey: PUBLIC_KEY
    }).then(() => {
      setStatus({ type: 'success', text: "Message sent. I'll reply within a few days." });
      setFormData({ from_name: '', message: '', from_email: '' })
    }).catch(() => {
      setStatus({ type: 'error', text: "Your message didn't send. Check your connection and try again." });
    }).finally(() => {
      setIsSending(false)
    })
  }

  return (
    <Section id='contact' title='Contact'>
      <p className='text-slate'>Hiring, or have a project in mind? Send me a note.</p>

      <form ref={form} id="contactForm" onSubmit={handleSubmit} className='mt-6 grid max-w-[560px] gap-4.5'>
        <div>
          <label htmlFor='from_name' className='mb-1.5 block text-[15px] font-medium'>Name</label>
          <input type="text"
            id='from_name'
            name="from_name"
            autoComplete='name'
            required
            value={formData.from_name}
            onChange={handleChange}
            className={fieldClass} />
        </div>

        <div>
          <label htmlFor='from_email' className='mb-1.5 block text-[15px] font-medium'>Email</label>
          <input type="email"
            id='from_email'
            name="from_email"
            autoComplete='email'
            required
            value={formData.from_email}
            onChange={handleChange}
            className={fieldClass} />
        </div>

        <div>
          <label htmlFor='message' className='mb-1.5 block text-[15px] font-medium'>Message</label>
          <textarea
            id='message'
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className={`${fieldClass} min-h-36 resize-y`} />
        </div>

        <button disabled={isSending || !isComplete} type="submit" className='inline-flex cursor-pointer items-center justify-self-start rounded-lg bg-signal px-5.5 py-3 font-semibold text-white transition-colors hover:bg-signal-dark disabled:cursor-not-allowed disabled:bg-rule disabled:text-slate'>
          {isSending && <CgSpinner aria-hidden='true' className='mr-2 animate-spin text-xl' />}
          {isSending ? 'Sending…' : 'Send message'}
        </button>

        <p role='status' className={status ? `rounded-lg px-3.5 py-2.5 text-[15px] ${statusClass[status.type]}` : 'sr-only'}>
          {status?.text}
        </p>
      </form>
    </Section>
  )
}

export default Contact
