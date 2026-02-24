import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Palette, ShieldCheck, FileText } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const licenses = [
  { 
    title: 'СРО Строительство', 
    number: '№ 1502',
    desc: 'Регистрационный номер члена саморегулируемой организации. Размер обязательств по договорам подряда не превышает 90.0 млн ₽',
    icon: Building2,
  },
  { 
    title: 'СРО Проектирование',  
    number: '№ П-122-007715914809-0288',
    desc: 'Регистрационный номер члена саморегулируемой организации. Размер обязательств по договорам подряда не превышает 25.0 млн ₽',
    icon: FileText,
  },
  { 
    title: 'Лицензия на реставрацию', 
    number: '№ Л040-00103-00/00407092',
    desc: 'Осуществление деятельности по сохранению объектов культурного наследия',
    icon: Palette,
  },
  { 
    title: 'Лицензия МЧС', 
    number: '№ Л014-00101-77/00125386',
    desc: 'Деятельность по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности зданий и сооружений',
    icon: ShieldCheck,
  },
]

export default function Licenses() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children || []

      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="licenses"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-[#0a0a0a]"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">
            Документы
          </span>
          <h2 className="heading-lg text-white mt-4">
            Лицензии и допуски
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Все необходимые разрешительные документы для выполнения полного спектра работ
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {licenses.map((license) => {
            const Icon = license.icon
            return (
              <div
                key={license.title}
                className="group relative bg-dark-100 rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500"
              >
                <div className="p-8">
                  {/* Иконка */}
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Заголовок */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {license.title}
                  </h3>
                  
                  {/* Номер */}
                  <p className="text-primary/80 text-sm font-mono mb-4">
                    {license.number}
                  </p>
                  
                  {/* Описание */}
                  <p className="text-white/50 text-sm leading-relaxed">
                    {license.desc}
                  </p>
                </div>
                
                {/* Декоративная линия снизу */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
                
                {/* Декоративный элемент в углу */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}