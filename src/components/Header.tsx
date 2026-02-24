
import { useState, useEffect } from 'react'
import clsx from 'clsx'

const navItems = [
  { href: '#hero', label: 'Главная' },
  { href: '#about', label: 'О компании' },
  { href: '#directions', label: 'Направления' },
  { href: '#projects', label: 'Проекты' },
  { href: '#services', label: 'Услуги' },
  { href: '#licenses', label: 'Лицензии' },
  { href: '#contacts', label: 'Контакты' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Определяем активную секцию
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled 
            ? 'bg-black/90 backdrop-blur-lg py-4' 
            : 'bg-gradient-to-b from-black/50 to-transparent py-6'
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Логотип */}
          <button 
            onClick={() => scrollToSection('#hero')}
            className="flex items-center gap-2 group"
          >
            <div className="flex gap-1">
              {['В', 'К', 'С'].map((letter) => (
                <div
                  key={letter}
                  className="w-7 h-7 md:w-8 md:h-8 bg-primary flex items-center justify-center group-hover:bg-primary-light transition-colors"
                >
                  <span className="text-white text-sm md:text-base font-bold">
                    {letter}
                  </span>
                </div>
              ))}
            </div>
            <span className="hidden md:block text-white/60 text-xs uppercase tracking-wider ml-2">
              Группа компаний
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={clsx(
                  'px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full',
                  activeSection === item.href.slice(1)
                    ? 'text-white bg-primary/20'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Меню"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={clsx(
                  'w-6 h-0.5 bg-white transition-all duration-300 origin-center',
                  isMenuOpen && 'rotate-45 translate-y-2'
                )}
              />
              <span
                className={clsx(
                  'w-6 h-0.5 bg-white transition-all duration-300',
                  isMenuOpen && 'opacity-0 scale-0'
                )}
              />
              <span
                className={clsx(
                  'w-6 h-0.5 bg-white transition-all duration-300 origin-center',
                  isMenuOpen && '-rotate-45 -translate-y-2'
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Fullscreen */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-black/98 backdrop-blur-xl transition-all duration-500 lg:hidden',
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-6">
          {navItems.map((item, index) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={clsx(
                'text-3xl font-bold transition-all duration-300',
                activeSection === item.href.slice(1)
                  ? 'text-primary'
                  : 'text-white hover:text-primary'
              )}
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}