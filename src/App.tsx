import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Directions from './components/sections/Directions'
import Projects from './components/sections/Projects'
import Services from './components/sections/Services'
import Licenses from './components/sections/Licenses'
import Contacts from './components/sections/Contacts'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function App() {
  useEffect(() => {
    document.title = 'ГК ВКС — Строительство · Реставрация · Инжиниринг'

    // Небольшая задержка для корректной инициализации ScrollTrigger
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      window.clearTimeout(timer)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Directions />
        <Projects />
        <Services />
        <Licenses />
        <Contacts />
      </main>
    </>
  )
}
