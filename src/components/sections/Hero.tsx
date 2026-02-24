import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const yearRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Параллакс фона
      gsap.to(bgRef.current, {
        yPercent: 30,
        scale: 1.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Анимация квадратов логотипа при загрузке
      gsap.fromTo(
        logoRef.current?.querySelectorAll('.logo-square') || [],
        { 
          y: 100, 
          opacity: 0,
          rotateX: -90,
          scale: 0.5
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
        }
      )

      // Анимация подзаголовка
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.9,
        }
      )

      // Анимация tagline
      gsap.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 1.1,
        }
      )

      // Анимация года
      gsap.fromTo(
        yearRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 1.3,
        }
      )

      // Создаем timeline для fade анимации при скролле
      const fadeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Добавляем анимации в timeline
      fadeTimeline
        .to([logoRef.current, subtitleRef.current, taglineRef.current, yearRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.1,
        })
        .to([logoRef.current, subtitleRef.current, taglineRef.current, yearRef.current], {
          opacity: 0,
          y: -100,
          duration: 1,
        }, '+=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Фоновое изображение с параллаксом */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Контент */}
      <div className="relative z-10 text-center px-6">
        
        {/* Логотип — 3 квадрата */}
        <div 
          ref={logoRef}
          className="flex items-center justify-center gap-3 md:gap-4 lg:gap-5 mb-8"
          style={{ perspective: '1000px' }}
        >
          {['В', 'К', 'С'].map((letter, index) => (
            <div
              key={letter}
              className="logo-square relative w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 bg-primary flex items-center justify-center shadow-2xl shadow-primary/30"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Буква */}
              <span className="text-white text-4xl md:text-6xl lg:text-7xl font-black">
                {letter}
              </span>
              
              {/* Блик */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Подпись */}
        <p
          ref={subtitleRef}
          className="text-primary text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-6"
        >
          Группа компаний
        </p>

        {/* Слоган */}
        <p
          ref={taglineRef}
          className="text-white text-lg md:text-xl lg:text-2xl font-light tracking-wide"
        >
          Строительство · Реставрация · Инжиниринг
        </p>

        {/* Год */}
        <p ref={yearRef} className="mt-8 text-white/60 text-sm md:text-base">
          с 2012 года
        </p>
      </div>

      {/* Индикатор прокрутки */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-white/60 text-xs uppercase tracking-[0.3em]">
          Листайте вниз
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent animate-pulse" />
      </div>
    </section>
  )
}