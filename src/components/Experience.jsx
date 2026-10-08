import Section from './Section'

const experiences = [
  {
    name: "Trustwave",
    title: "Senior Software Architect",
    dates: "2017–2024",
    highlights: [
      "Built and maintained Fusion Security Testing and DbProtect GRID.",
      "Shipped hundreds of features alongside UI/UX and back-end teams.",
      "Kept releases stable with Jasmine and Karma unit tests, and tracked down complex Angular bugs.",
    ],
    stack: "Angular 12, TypeScript, AngularDart, HTML, CSS",
  },
  {
    name: "Application Security, Inc.",
    title: "Software Developer",
    dates: "2005–2017",
    highlights: [
      "Improved the UI of DbProtect, used by more than 200 enterprise customers.",
      "Built reusable components that saved about 100 development hours a month.",
      "Turned designers' ideas into wireframes and MVPs to test with users.",
    ],
    stack: "GWT, HTML, CSS",
  },
]

const Experience = () => {
  return (
    <Section id='experience' title='Experience'>
      <ol className='ml-1.5 border-l-2 border-rule'>
        {experiences.map((experience) => (
          <li key={experience.name} className='relative pb-10 pl-7 last:pb-0'>
            <span aria-hidden='true' className='absolute top-[9px] -left-2 h-3.5 w-3.5 rounded-full border-3 border-signal bg-paper'></span>

            <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5'>
              <h3 className='text-xl font-semibold'>{experience.name}</h3>
              <span className='text-[15px] text-slate tabular-nums'>{experience.dates}</span>
            </div>
            <p className='font-medium text-slate'>{experience.title}</p>

            <ul className='mt-3 list-disc space-y-1.5 pl-4.5 marker:text-signal'>
              {experience.highlights.map((highlight) => (
                <li key={highlight} className='max-w-[62ch]'>{highlight}</li>
              ))}
            </ul>

            <p className='mt-3 text-[15px] text-slate'>{experience.stack}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export default Experience
