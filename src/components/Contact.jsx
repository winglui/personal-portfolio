import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { CgSpinner } from 'react-icons/cg';

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {

  const form = useRef();

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: ""
  })
  const [isSending, setIsSending] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsSending(true)
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
      publicKey: PUBLIC_KEY
    }).then(() => {
      alert('Messge sent');
      setFormData({ from_name: '', message: '', from_email: '' })
    }).catch(() => {
      alert('Something was wrong.  Please try again later.')
    }).finally(() => {
      setIsSending(false)
    })
  }

  return (
    <div id="contact" className='flex min-h-screen w-full flex-col items-center justify-center gap-16 p-8'>
      <h1 className='text-center text-6xl font-light text-blue-600'>Get In Touch</h1>

      <form ref={form} id="contactForm" onSubmit={handleSubmit} className='flex w-full max-w-md flex-col gap-8 rounded-lg p-6 md:max-w-lg lg:max-w-xl'>
        <div className='flex flex-col gap-4'>
          <input type="text"
            placeholder='Your Name'
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            className='rounded-lg border-2 border-blue-400 px-4 py-3 text-lg outline-none transition-all duration-200 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500'></input>

          <input type="email"
            placeholder='Email'
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
            className='rounded-lg border-2 border-blue-400 px-4 py-3 text-lg outline-none transition-all duration-200 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500'></input>

        </div>

        <textarea
          name="message"
          value={formData.message}
          placeholder='Your Message'
          onChange={handleChange}
          className='h-32 w-full resize-none rounded-lg border-2 border-blue-400 px-4 py-3 text-lg outline-none transition-all duration-200 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500'></textarea>
        <button disabled={isSending} type="submit" className='flex justify-center items-center rounded-lg border-2 border-blue-400 bg-blue-500 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-600 cursor-pointer disabled:bg-gray-300'>
        {isSending && <CgSpinner className='text-xl mr-2 loaderIcon' />} Send Message
        </button>

      </form>
    </div>
  )
}

export default Contact