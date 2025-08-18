import React from 'react'

const experiences = [
  {
    name: "Trustwave",
    title: "Senior Software Architect",
    description: "I played a key role in developing and maintaining two major applications: Fusion Security Testing (Angular DART, HTML5, CSS) and DbProtect GRID (Angular 12, TypeScript, HTML5, CSS).  I collaborated with cross-functional teams, including UI/UX and back-end developers, to successfully design, develop, and implement hundreds of new features across projects. I was responsible for debugging complex issues within the Angular environment using Chrome DevTools and other tools. I also ensured application stability by implementing unit tests with Jasmine and Karma."
  },
  {
    name: "Application Security, Inc",
    title: "Software Developer", 
    description:"At Application Security, Inc., I played a crucial role in enhancing the user experience of DbProtect, a database security testing platform with over 200 enterprise customers using GWT, HTML, and CSS.  My work included creating reusable components that significantly improved development efficiency, saving an estimated 100 hours of development time per month.  I also collaborated directly with UI/UX designers to produce functional wireframes and minimum viable products (MVPs) for gathering user feedback, ensuring a user-centric design process."
  }
]

const Experience = () => {

  return (
    <div id="experience" className='flex min-h-screen w-full flex-col items-center justify-center gap-20 p-14 md:p-20 lg:p-36'>
      <h1 className='text-center text-5xl font-light'>Experience</h1>

      <div className='flex flex-wrap gap-0 md:flex-nowrap md:gap-10'>

        {
          experiences.map((experience) => (
            <div className='flex-1' key={experience.name}>
              <div className='relative space-y-1 border-l-2 border-gray-200 p-8 text-left min-w-[300px]'>
                <h3 className='text-xl font-semibold md:text-2xl'>{experience.name}</h3>
                <p className='font-light text-lg text-gray-600'>{experience.title}</p>
                <p className='text-sm text-gray-600'>{experience.description}</p>
                <span className='absolute -left-[11px] top-9 h-5 w-5 rounded-full bg-blue-500 '></span>
              </div>
            </div>
          ))
        }



      </div>
    </div>
  )
}

export default Experience