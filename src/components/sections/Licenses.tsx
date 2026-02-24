
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const licenses = [
  { 
    title: 'СРО Строительство', 
    number: '№ 1502',
    desc: 'Регистрационный номер члена саморегулируемой организации. Размер обязательств по договорам подряда не превышает 90.0 млн ₽',
    // Заглушка — замените на реальный путь к изображению
    image: '/images/licenses/sro-construction.jpg',
  },
  { 
    title: 'СРО Проектирование',  
    number: '№ П-122-007715914809-0288',
    desc: 'Регистрационный номер члена саморегулируемой организации. Размер обязательств по договорам подряда не превышает 25.0 млн ₽',
    image: '/images/licenses/sro-design.jpg',
  },
  { 
    title: 'Лицензия на реставрацию', 
    number: '№ Л040-00103-00/00407092',
    desc: 'Осуществление деятельности по сохранению объектов культурного наследия',
    image: '/images/licenses/restoration.jpg',
  },
  { 
    title: 'Лицензия МЧС', 
    number: '№ Л014-00101-77/00125386',
    desc: 'Деятельность по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности зданий и сооружений',
    image: '/images/licenses/mchs.jpg',
  },
]

export default function Licenses() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeModal, setActiveModal] = useState<number | null>(null)

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

  // Анимация модального окна
  useEffect(() => {
    if (activeModal !== null) {
      gsap.fromTo(
        '.license-modal',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(
        '.license-modal-image',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.15, ease: 'power2.out' }
      )
      // Блокируем скролл
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [activeModal])

  const closeModal = () => {
    gsap.to('.license-modal', {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => setActiveModal(null)
    })
  }

  return (
    <>
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
            {licenses.map((license, index) => (
              <div
                key={license.title}
                onClick={() => setActiveModal(index)}
                className="group relative bg-dark-100 rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Превью изображения лицензии */}
                  <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 bg-white/5 overflow-hidden">
                    {/* Заглушка — серый фон с иконкой документа */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                      <svg 
                        className="w-16 h-16 text-white/20 group-hover:text-primary/40 transition-colors"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                        />
                      </svg>
                    </div>
                    
                    {/* Когда добавите реальные изображения, раскомментируйте: */}
                    {/* <img 
                      src={license.image} 
                      alt={license.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    /> */}
                    
                    {/* Оверлей */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-transparent to-transparent md:bg-gradient-to-r" />
                    
                    {/* Иконка просмотра */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Информация */}
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {license.title}
                    </h3>
                    
                    <p className="text-primary/80 text-sm font-mono mb-3">
                      {license.number}
                    </p>
                    
                    <p className="text-white/50 text-sm leading-relaxed">
                      {license.desc}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-2 text-white/40 text-sm group-hover:text-primary/60 transition-colors">
                      <span>Посмотреть документ</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Линия снизу при ховере */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно для просмотра лицензии */}
      {activeModal !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Фон */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          
          {/* Контент */}
          <div 
            className="license-modal relative max-w-4xl w-full max-h-[90vh] bg-dark-100 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Шапка */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {licenses[activeModal].title}
                </h3>
                <p className="text-primary/80 text-sm font-mono mt-1">
                  {licenses[activeModal].number}
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Изображение лицензии */}
            <div className="license-modal-image p-6 overflow-auto max-h-[calc(90vh-100px)]">
              {/* Заглушка */}
              <div className="w-full aspect-[3/4] bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg 
                    className="w-24 h-24 text-white/20 mx-auto mb-4"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                  <p className="text-white/30 text-sm">
                    Изображение лицензии<br />
                    <span className="text-white/20 text-xs">(добавьте файл в /public/images/licenses/)</span>
                  </p>
                </div>
              </div>
              
              {/* Когда добавите реальные изображения: */}
              {/* <img 
                src={licenses[activeModal].image} 
                alt={licenses[activeModal].title}
                className="w-full h-auto rounded-lg"
              /> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}