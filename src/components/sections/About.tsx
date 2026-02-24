import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '2012', label: 'Год основания' },
  { value: '18+', label: 'Лет опыта команды' },
  { value: '45', label: 'ИТР специалистов' },
  { value: '350+', label: 'Рабочих по инженерным системам' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-32"
    >
      {/* Фон на всю секцию */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      </div>

      <div ref={contentRef} className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">
            О компании
          </span>

          <h2 className="heading-lg text-white mt-6 mb-8">
            Надежный партнер<br />
            в строительстве
          </h2>

          <div className="space-y-6 text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl">
            <p>
              ООО «ГК «ВКС» с 2012 года работает на рынке строительных услуг. 
              Мы — динамично развивающаяся компания, зарекомендовавшая себя 
              надежным и ответственным партнером при работе с коммерческими 
              организациями и государственными заказчиками в сфере закупок 
              по 44-ФЗ и 223-ФЗ.
            </p>
            <p>
              На протяжении 18 лет инженерная команда группы выполняет комплекс 
              строительно-монтажных работ и инженерное оснащение объектов в Москве 
              и по всей России, включая жилые комплексы, общественные здания, 
              коммерческую недвижимость, объекты здравоохранения, а также 
              инфраструктурные и технически сложные проекты.
            </p>
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm mt-2 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}