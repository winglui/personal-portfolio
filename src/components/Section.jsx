const Section = ({ id, title, children }) => {
  return (
    <section id={id} className='border-t border-rule py-14 first:border-t-0 lg:py-22'>
      <h2 className='mb-6 text-[28px] leading-tight font-semibold'>{title}</h2>
      {children}
    </section>
  )
}

export default Section
