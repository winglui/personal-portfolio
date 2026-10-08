import { sections } from '../sections'

const MobileNav = ({ active }) => {
  return (
    <header className='sticky top-0 z-10 border-b border-rule bg-paper/90 backdrop-blur lg:hidden'>
      <nav aria-label='Sections' className='mx-auto flex max-w-[520px] justify-between px-5'>
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? 'true' : undefined}
            className={`border-b-2 px-0.5 pt-4 pb-3.5 text-[15px] font-medium transition-colors ${
              active === id ? 'border-signal text-ink' : 'border-transparent text-slate hover:text-ink'
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default MobileNav
