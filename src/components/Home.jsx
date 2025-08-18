import React from 'react'
import image from '/profile-image.jpg'
import { BiLogoGithub, BiLogoLinkedin } from 'react-icons/bi'

const Home = () => {
  return (
    <div id="home" className='min-h-screen w-full items-center justify-center'>
      <div className='min-h-screen flex flex-col items-center justify-center gap-8 p-5 text-center'>
        <img src={image} alt="Picture of Wing" className='w-[250px] h-[250px] sm:h-[300px] sm:w-[300px] object-cover rounded-full' />

        <div className='space-y-1 sm:space-y-3'>
          <h1 className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-4xl/12 font-semibold text-transparent md:text-5xl/15 lg:text-6xl/20'>Wing Lui</h1>
          <h3 className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-2xl font-semibold text-transparent md:text-3xl lg:text-4xl'>Frontend Developer</h3>
          <p className='max-w-[500px] text-sm text-gray-500'>Front End Developer with strong focus on creating intuitive and visually appealing user interfaces. Expertise in HTML, CSS, JavaScript, and modern frameworks such as React and Angular. Skilled in debugging and optimizing code to ensure smooth performance and minimal errors. Dependable Front End Developer with solid knowledge and methodical approach to building and maintaining web applications.</p>
        </div>

        <div className='flex gap-3'>
          <a href="https://www.linkedin.com/in/wing-lui/" target="_blank"><BiLogoGithub className='h-10 w-10 rounded-full cursor-pointer border-2 border-transparent bg-blue-600 p-2 text-white transition-all duration-200 hover:scale-110 hover:border-blue-600 hover:bg-white hover:text-blue-600 md:h-12 md:w-12'/></a>
          <a href="https://github.com/winglui" target="_blank"><BiLogoLinkedin className='h-10 w-10 rounded-full cursor-pointer border-2 border-transparent bg-blue-600 p-2 text-white transition-all duration-200 hover:scale-110 hover:border-blue-600 hover:bg-white hover:text-blue-600 md:h-12 md:w-12'/></a>
       
        </div>

      </div>
    </div>
  )
}

export default Home