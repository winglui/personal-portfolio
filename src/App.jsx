import About from "./components/About"
import Contact from "./components/Contact"
import Experience from "./components/Experience"
import MobileNav from "./components/MobileNav"
import Projects from "./components/Projects"
import Sidebar from "./components/Sidebar"
import { useActiveSection } from "./sections"

function App() {
  const active = useActiveSection()

  return (
    <>
      <MobileNav active={active} />

      <div className="mx-auto max-w-[1160px] px-5 antialiased lg:grid lg:grid-cols-[340px_1fr] lg:gap-20 lg:px-12">
        <Sidebar active={active} />

        <main>
          <About />
          <Experience />
          <Projects />
          <Contact />

          <footer className="border-t border-rule pt-10 pb-14 text-[15px] text-slate">
            © {new Date().getFullYear()} Wing Lui
          </footer>
        </main>
      </div>
    </>
  )
}

export default App
