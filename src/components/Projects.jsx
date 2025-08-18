import React from 'react'

const projects = [
  {
    name: "Better Tips Calculator",
    description: "React TypeScript Tailwind CSS HTML5",
    url: "https://react-better-tips-calculator.netlify.app"
  },
  {
    name: "Tenzies",
    description: "React JavaScript HTML5 CSS3",
    url: "https://unrivaled-pavlova-c983eb.netlify.app"
  },
  {
    name: "Favorite Movies",
    description: "React JavaScript HTML5 CSS3",
    url: "https://react-my-favorite-movies.netlify.app/"
  },
  {
    name: "Personal Portfolio",
    description: "React JavaScript Tailwind CSS HTML5",
    url: "https://wing-lui.netlify.app"
  },
  {
    name: "Fusion Security Testing",
    description: "Angular DART HTML5 CSS3",
    url: "https://www.trustwave.com/en-us/services/penetration-testing/"
  }

]

const Projects = () => {

  return (
    <div id="projects" className='min-h-screen w-full flex flex-col items-center justify-center gap-20 p-10 md:p-16 xl:px-32'>
      <h1 className='text-center text-5xl font-light'>Projects</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>

        {projects.map((project) => (
          <a key={project.name} href={project.url} target="_blank"><div className='text-left space-y-2 border-2 hover:scale-105 transition-all duration-200 cursor-pointer px-8 py-10 border-blue-500 rounded-lg hover:bg-blue-50'>
            <h1 className='text-3xl font-semibold'>{project.name}</h1>
            <p className='text-xl text-gray-700'>Tech Stack</p>
            <p className='text-sm text-gray-600'>{project.description}</p>
          </div></a>
        ))}
      </div>


    </div>
  )
}

export default Projects