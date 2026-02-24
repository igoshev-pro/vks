
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const directions = [
  {
    num: '01',
    title: 'Строительно-монтажные работы',
    desc: 'Полный цикл СМР от проектирования до сдачи объекта. Общестроительные работы всех видов, от монолитных до отделочных и кровельных.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
  },
  {
    num: '02',
    title: 'Реставрация объектов культурного наследия',
    desc: 'Комплекс ремонтно-реставрационных работ по сохранению с приспособлением для современного использования объектов культурного наследия.',
    image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=1920&q=80',
  },
  {
    num: '03',
    title: 'Эксклюзивные проекты',
    desc: 'Демо-центры, мультимедиа экраны, видеостены, оборудование конференц-залов, системы трансляций, уличные павильоны.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
  },
  {
    num: '04',
    title: 'Комплексные поставки',
    desc: 'Комплексный поставщик строительных материалов и оборудования для государственных и коммерческих заказчиков. Сотрудничаем с ведущими производителями.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80',
  },
]

export default function Directions() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('.direction-item') || []

      gsap.to(items, {
        xPercent: -100 * (directions.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${window.innerWidth * directions.length}`,
          pin: true,
          scrub: 1,
          snap: 1 / (directions.length - 1),
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="directions"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Заголовок с отступом для хедера */}
      <div className="absolute top-0 left-0 right-0 pt-24 md:pt-20 px-6 md:px-12 z-20">
        <span className="text-primary text-sm font-bold uppercase tracking-widest">
          Направления деятельности
        </span>
      </div>

      <div
        ref={containerRef}
        className="flex h-full"
        style={{ width: `${directions.length * 100}vw` }}
      >
        {directions.map((dir, index) => (
          <div
            key={dir.num}
            className="direction-item relative w-screen h-full flex-shrink-0 flex items-center justify-center overflow-hidden"
          >
            <div
              className="absolute inset-0 w-[120%] h-full -left-[10%]"
              style={{
                backgroundImage: `url(${dir.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mt-8">
              <span className="text-primary text-8xl md:text-9xl font-black opacity-30 absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2">
                {dir.num}
              </span>
              
              <h3 className="heading-md md:heading-lg text-white text-shadow relative">
                {dir.title}
              </h3>
              
              <p className="text-white/60 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
                {dir.desc}
              </p>
            </div>

            <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-4">
              <span className="text-white font-bold">{dir.num}</span>
              <div className="w-32 h-px bg-white/20">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${((index + 1) / directions.length) * 100}%` }}
                />
              </div>
              <span className="text-white/40">0{directions.length}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}