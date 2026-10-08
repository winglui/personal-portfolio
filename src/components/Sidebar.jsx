import { BiLogoGithub, BiLogoLinkedin } from 'react-icons/bi'
import { sections } from '../sections'

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/winglui', icon: <BiLogoGithub aria-hidden='true' className='h-5 w-5' /> },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/wing-lui/', icon: <BiLogoLinkedin aria-hidden='true' className='h-5 w-5' /> },
]

const Sidebar = ({ active }) => {
  return (
    <aside className='pt-10 pb-2 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:pt-22 lg:pb-12'>
      <img src='/profile.jpg' alt='Wing Lui' width='88' height='88' className='h-22 w-22 rounded-full object-cover' />

      <h1 className='mt-6 font-condensed text-[52px] leading-none font-semibold tracking-tight'>Wing Lui</h1>
      <p className='mt-2.5 text-xl font-medium text-slate'>Frontend developer</p>

      <nav aria-label='Sections' className='mt-12 hidden flex-col gap-1 lg:flex'>
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? 'true' : undefined}
            className={`border-l-2 py-1.5 pl-4.5 font-medium transition-colors ${
              active === id ? 'border-signal text-ink' : 'border-rule text-slate hover:text-ink'
            }`}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className='mt-7 flex gap-3 lg:mt-auto'>
        {socialLinks.map(({ label, url, icon }) => (
          <a
            key={label}
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 rounded-full border border-rule bg-white py-2 pr-3.5 pl-2.5 text-[15px] font-medium transition-colors hover:border-signal'
          >
            {icon}
            {label}
          </a>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
