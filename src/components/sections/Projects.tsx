import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Электродепо «Сокол»',
    subtitle: 'Метрополитен (реконструкция)',
    category: 'СМР',
    client: 'ООО «Моспромстрой-М»',
    description: 'СМР включая общестроительные работы и монтаж инженерных систем в сблокированном здании АБК поста ЭЦ, здание компрессорной станции, здание отстойно-ремонтного корпуса.',
    image: '/images/metro.JPEG',
  },
  {
    title: 'ЖК «ПОЛЯНКА/44»',
    subtitle: 'Жилой комплекс премиум-класса',
    category: 'Инженерные системы',
    client: 'Codest International S.r.l.',
    description: 'Монтаж и пуско-наладка инженерных систем: насосные станции, пожаротушение, вентиляция, дымоудаление, кондиционирование, ИТП, смесительные узлы.',
    image: '/images/polanka-2.jpg',
  },
  {
    title: 'МГУ им. Ломоносова',
    subtitle: 'Объект культурного наследия',
    category: 'Реставрация',
    client: 'МГУ',
    description: 'Отделочные работы 180 м², ОВиК, водоснабжение, системы электроснабжения, реставрационные работы, реставрация мебели.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80',
  },
  {
    title: 'РГУ нефти и газа им. Губкина',
    subtitle: 'Университет',
    category: 'СМР',
    client: 'НИУ им. И.М. Губкина',
    description: 'Брендирование, отделочные работы 750 м², внутренние сети связи (СКС, СОУЭ, ОС, СКУД), системы электроснабжения, меблирование.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
  },
  {
    title: 'Демо-центр ОСК',
    subtitle: 'Форум «АРМИЯ 2020»',
    category: 'Эксклюзивный проект',
    client: 'Объединённая судостроительная корпорация',
    description: 'Создание единого пространства для презентации с использованием мультимедийных технологий: LED-экраны, LEAP MOTION, зоны виртуальной реальности.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80',
  },
  {
    title: 'Городская усадьба XVIII–XIX вв.',
    subtitle: 'ул. Пятницкая, д.30, стр.2',
    category: 'Реставрация',
    client: 'Частный заказчик',
    description: 'Комплекс ремонтно-реставрационных работ по сохранению с приспособлением для современного использования объекта культурного наследия.',
    image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=1920&q=80',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = projectsRef.current?.querySelectorAll('.project-item') || []
      
      items.forEach((item) => {
        const img = item.querySelector('.project-image')
        const content = item.querySelector('.project-content')

        // Появление всего блока
        gsap.fromTo(
          item,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              end: 'top 50%',
              scrub: true,
            },
          }
        )

        // Параллакс изображения
        gsap.fromTo(
          img,
          { yPercent: -10 },
          {
            yPercent: 10,
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )

        // Появление контента
        gsap.fromTo(
          content,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 70%',
              end: 'top 30%',
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#0a0a0a]">
      {/* Заголовок секции */}
      <div className="container mx-auto px-6 md:px-12 py-32">
        <span className="text-primary text-sm font-bold uppercase tracking-widest">
          Портфолио
        </span>
        <h2 className="heading-xl text-white mt-4">
          Проекты
        </h2>
        <p className="text-white/50 text-xl mt-6 max-w-xl">
          Реализованные объекты в Москве и регионах России
        </p>
      </div>

      {/* Список проектов */}
      <div ref={projectsRef} className="relative">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="project-item relative min-h-screen flex items-center"
          >
            {/* Фоновое изображение */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="project-image absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${project.image})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            </div>

            {/* Контент */}
            <div className="project-content relative z-10 container mx-auto px-6 md:px-12 py-20">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded">
                    {project.category}
                  </span>
                  <span className="text-white/60 text-sm">
                    Заказчик: {project.client}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {project.title}
                </h3>
                
                <p className="text-primary text-xl mt-3">
                  {project.subtitle}
                </p>

                <p className="text-white/70 text-lg mt-6 max-w-xl leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Номер проекта */}
            <div className="absolute bottom-10 right-6 md:right-12 text-white/10 text-[12rem] md:text-[16rem] font-black leading-none pointer-events-none">
              0{index + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}