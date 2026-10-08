import Section from './Section'

const projects = [
  {
    name: "Better Tips Calculator",
    description: "Enter a bill and pick a tip percentage to see the tip and total.",
    stack: "React, TypeScript, Tailwind CSS",
    url: "https://react-better-tips-calculator.netlify.app",
    image: "/projects/tips.jpg",
    linkLabel: "Live demo",
  },
  {
    name: "Tenzies",
    description: "A dice game: freeze dice between rolls until all ten match.",
    stack: "React, JavaScript, CSS",
    url: "https://unrivaled-pavlova-c983eb.netlify.app",
    image: "/projects/tenzies.jpg",
    linkLabel: "Live demo",
  },
  {
    name: "Favorite Movies",
    description: "Search for movies and save the ones you like to a favorites list.",
    stack: "React, JavaScript, CSS",
    url: "https://react-my-favorite-movies.netlify.app/",
    image: "/projects/movies.jpg",
    linkLabel: "Live demo",
  },
  {
    name: "Fusion Security Testing",
    description: "Trustwave's security testing portal for its clients.",
    stack: "AngularDart, HTML, CSS",
    url: "https://www.trustwave.com/en-us/services/penetration-testing/",
    note: "Built at Trustwave. Client work, no public demo.",
    linkLabel: "Product page",
  },
]

const Projects = () => {
  return (
    <Section id='projects' title='Projects'>
      <div className='grid gap-5 md:grid-cols-2'>
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex flex-col overflow-hidden rounded-[10px] border border-rule bg-white transition-colors hover:border-signal'
          >
            <div className='aspect-[16/10] border-b border-rule bg-ink'>
              {project.image ? (
                <img src={project.image} alt='' loading='lazy' className='h-full w-full object-cover object-top' />
              ) : (
                <p className='flex h-full items-end p-5 text-[15px] text-[#C9D3F5]'>{project.note}</p>
              )}
            </div>

            <div className='flex flex-1 flex-col gap-1.5 px-5 pt-4.5 pb-5'>
              <h3 className='text-xl font-semibold'>{project.name}</h3>
              <p className='text-slate'>{project.description}</p>
              <p className='mt-auto pt-2 text-[15px] text-slate'>{project.stack}</p>
              <span className='text-[15px] font-medium text-signal'>{project.linkLabel}</span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  )
}

export default Projects
