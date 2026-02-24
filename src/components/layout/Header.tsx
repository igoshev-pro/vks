
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import clsx from 'clsx'

gsap.registerPlugin(ScrollTrigger)

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
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)
  const topLineRef = useRef<HTMLSpanElement>(null)
  const middleLineRef = useRef<HTMLSpanElement>(null)
  const bottomLineRef = useRef<HTMLSpanElement>(null)
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // Инициализация анимаций
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Появление хедера при загрузке
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      )

      // Появление логотипа
      gsap.fromTo(
        logoRef.current?.querySelectorAll('.logo-letter') || [],
        { y: -20, opacity: 0, rotateX: -90 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          stagger: 0.08, 
          duration: 0.5, 
          ease: 'back.out(1.7)',
          delay: 0.5 
        }
      )

      // Появление навигации
      gsap.fromTo(
        navRef.current?.querySelectorAll('.nav-item') || [],
        { y: -15, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.04, 
          duration: 0.4, 
          ease: 'power2.out',
          delay: 0.7 
        }
      )

      // Компактный хедер при скролле (без скрытия)
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onEnter: () => {
          gsap.to(headerRef.current, {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            duration: 0.4,
            ease: 'power2.out'
          })
          // Уменьшаем логотип
          gsap.to(logoRef.current?.querySelectorAll('.logo-letter') || [], {
            width: 28,
            height: 28,
            duration: 0.4,
            ease: 'power2.out'
          })
        },
        onLeaveBack: () => {
          gsap.to(headerRef.current, {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(0px)',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            duration: 0.4,
            ease: 'power2.out'
          })
          // Возвращаем размер логотипа
          gsap.to(logoRef.current?.querySelectorAll('.logo-letter') || [], {
            width: 32,
            height: 32,
            duration: 0.4,
            ease: 'power2.out'
          })
        }
      })

      // Отслеживание активной секции
      navItems.forEach((item) => {
        const section = document.querySelector(item.href)
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveSection(item.href.slice(1)),
            onEnterBack: () => setActiveSection(item.href.slice(1)),
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  // Анимация бургера в крестик
  useEffect(() => {
    if (isMenuOpen) {
      // Бургер -> Крестик
      gsap.to(topLineRef.current, {
        rotation: 45,
        y: 7,
        duration: 0.3,
        ease: 'power2.inOut'
      })
      gsap.to(middleLineRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut'
      })
      gsap.to(bottomLineRef.current, {
        rotation: -45,
        y: -7,
        duration: 0.3,
        ease: 'power2.inOut'
      })
    } else {
      // Крестик -> Бургер
      gsap.to(topLineRef.current, {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      })
      gsap.to(middleLineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.3,
        delay: 0.1,
        ease: 'power2.inOut'
      })
      gsap.to(bottomLineRef.current, {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      })
    }
  }, [isMenuOpen])

  // Анимация мобильного меню
  useEffect(() => {
    if (!menuRef.current || !menuItemsRef.current) return

    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at calc(100% - 32px) 32px)',
        duration: 0.7,
        ease: 'power3.inOut'
      })
      gsap.fromTo(
        menuItemsRef.current.querySelectorAll('.menu-item'),
        { y: 60, opacity: 0, rotateX: -30 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          stagger: 0.08, 
          duration: 0.5, 
          ease: 'power3.out',
          delay: 0.3
        }
      )
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at calc(100% - 32px) 32px)',
        duration: 0.5,
        ease: 'power3.inOut'
      })
    }
  }, [isMenuOpen])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    
    const element = document.querySelector(href)
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: href, offsetY: 70 },
        ease: 'power3.inOut'
      })
    }
  }

  // Hover анимация для логотипа
  const handleLogoHover = (isEnter: boolean) => {
    gsap.to(logoRef.current?.querySelectorAll('.logo-letter') || [], {
      scale: isEnter ? 1.1 : 1,
      stagger: 0.03,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 py-4"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Логотип */}
          <div 
            ref={logoRef}
            onClick={() => scrollToSection('#hero')}
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
            className="flex items-center gap-2 cursor-pointer"
            style={{ perspective: '500px' }}
          >
            <div className="flex gap-0.5">
              {['В', 'К', 'С'].map((letter) => (
                <div
                  key={letter}
                  className="logo-letter w-8 h-8 bg-primary flex items-center justify-center transition-colors hover:bg-primary-light"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="text-white text-sm font-bold">
                    {letter}
                  </span>
                </div>
              ))}
            </div>
            <div className="hidden md:block ml-1">
              <span className="text-white/90 text-[10px] font-semibold tracking-widest uppercase">
                Группа компаний
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={clsx(
                  'nav-item relative px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-full',
                  activeSection === item.href.slice(1)
                    ? 'text-white bg-primary/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Burger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center z-50"
            aria-label="Меню"
          >
            <div className="relative w-6 h-4 flex flex-col justify-between items-center">
              <span 
                ref={topLineRef}
                className="absolute top-0 w-6 h-0.5 bg-white origin-center"
              />
              <span 
                ref={middleLineRef}
                className="absolute top-1/2 -translate-y-1/2 w-6 h-0.5 bg-white origin-center"
              />
              <span 
                ref={bottomLineRef}
                className="absolute bottom-0 w-6 h-0.5 bg-white origin-center"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-black lg:hidden"
        style={{ 
          clipPath: 'circle(0% at calc(100% - 32px) 32px)',
        }}
      >
        {/* Фоновый паттерн */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white whitespace-nowrap">
            ВКС
          </div>
        </div>

        <div 
          ref={menuItemsRef}
          className="h-full flex flex-col items-center justify-center gap-5"
          style={{ perspective: '1000px' }}
        >
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={clsx(
                'menu-item text-3xl md:text-4xl font-bold transition-colors duration-300',
                activeSection === item.href.slice(1)
                  ? 'text-primary'
                  : 'text-white hover:text-primary'
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {item.label}
            </button>
          ))}

          {/* Контакты в меню */}
          <div className="mt-10 text-center space-y-2">
            <a 
              href="tel:+74950888082" 
              className="block text-white/60 hover:text-primary transition-colors text-lg"
            >
              +7 (495) 088-80-82
            </a>
            <a 
              href="mailto:info@gk-vks.ru" 
              className="block text-white/60 hover:text-primary transition-colors"
            >
              info@gk-vks.ru
            </a>
          </div>
        </div>
      </div>
    </>
  )
}