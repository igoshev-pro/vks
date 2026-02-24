
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const internalServices = [
  { title: 'ОВиК и теплоснабжение', desc: 'Отопление, вентиляция, кондиционирование, дымоудаление, подпор воздуха' },
  { title: 'Холодоснабжение', desc: 'Монтаж чиллеров и фанкойлов, обвязка, ПНР' },
  { title: 'Водоснабжение и канализация', desc: 'Узлы регулирования, насосные группы' },
  { title: 'Системы очистки и водоподготовки', desc: 'Фильтрация, подготовка воды, дозирование' },
  { title: 'Насосные станции', desc: 'Хозяйственно-бытовые и технологические, монтаж/обвязка/испытания' },
  { title: 'Пожаротушение и пожарная безопасность', desc: 'Насосные станции ПТ, спринклерное пожаротушение, ВПВ, АПС/СОУЭ' },
  { title: 'Компрессорные станции', desc: 'Система сжатого воздуха, магистрали, подключение, испытания' },
  { title: 'ИТП/ЦТП', desc: 'Узлы учета, автоматика, диспетчеризация' },
  { title: 'Слаботочные системы', desc: 'СКС, СОУЭ, ОС, СКУД с комплексными испытаниями' },
]

const externalServices = [
  'Земляные работы',
  'Реконструкция инженерных сетей',
  'Благоустройство территории',
  'Линии наружного электроосвещения',
  'Электроснабжение',
  'Сети связи',
  'Дождевая канализация',
  'Хозяйственно-бытовая канализация',
  'Водопровод',
  'Напорная и самотечная канализация',
  'Подземные емкостные сооружения',
  'Фасадные и монолитные работы',
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const internalRef = useRef<HTMLDivElement>(null)
  const externalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        internalRef.current?.querySelectorAll('.service-item') || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          scrollTrigger: {
            trigger: internalRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        externalRef.current?.querySelectorAll('li') || [],
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: externalRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-[#111]"
    >
      <div className="container mx-auto">
        <span className="text-primary text-sm font-bold uppercase tracking-widest">
          Услуги
        </span>
        
        <h2 className="heading-lg text-white mt-4 mb-6">
          Полный спектр<br />работ
        </h2>

        <p className="text-white/50 text-xl max-w-2xl mb-16">
          Включая анализ проектной документации на предмет соответствий 
          и корректировка в случае необходимости
        </p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Внутренние работы */}
          <div ref={internalRef}>
            <h3 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-white/10 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              Внутренние работы
            </h3>
            <div className="space-y-6">
              {internalServices.map((service, i) => (
                <div
                  key={i}
                  className="service-item group cursor-default"
                >
                  <h4 className="text-white text-lg font-medium group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-white/40 text-sm mt-1">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Наружные работы */}
          <div ref={externalRef}>
            <h3 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-white/10 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              Наружные работы
            </h3>
            <p className="text-white/50 text-sm mb-6">
              Полный комплекс работ от СМР до сдачи в эксплуатацию 
              ресурсоснабжающим организациям с выполнением необходимых согласований
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {externalServices.map((service, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-white/70 hover:text-white transition-colors cursor-default"
                >
                  <span className="text-primary mt-1">→</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}