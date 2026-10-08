import Section from './Section'

const skills = [
  { group: 'Languages', items: 'JavaScript, TypeScript, HTML, CSS' },
  { group: 'Frameworks', items: 'React, Angular, AngularDart, GWT' },
  { group: 'Styling', items: 'Tailwind CSS, responsive layouts' },
  { group: 'Testing and tools', items: 'Jasmine, Karma, Chrome DevTools, Vite' },
]

const About = () => {
  return (
    <Section id='about' title='About'>
      <div className='max-w-[65ch] space-y-4'>
        <p className='text-xl leading-normal'>I'm a frontend developer with nearly 20 years of experience building web applications, from GWT and Angular to React and TypeScript today.</p>
        <p>Most of that time was spent on large enterprise products, working closely with designers and back-end engineers to turn complex workflows into interfaces people can use quickly. I care about reusable components, careful debugging, and code that's tested before it ships.</p>
      </div>

      <dl className='mt-8 grid max-w-[65ch] gap-x-8 gap-y-4 sm:grid-cols-2'>
        {skills.map(({ group, items }) => (
          <div key={group} className='border-t border-rule pt-3'>
            <dt className='text-[15px] font-medium text-slate'>{group}</dt>
            <dd>{items}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export default About
