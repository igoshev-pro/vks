
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contacts() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
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
      id="contacts"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-[#0a0a0a]"
    >
      {/* Фоновый текст */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[15vw] font-black text-white/[0.02]">
          ВКС
        </span>
      </div>

      <div ref={contentRef} className="relative z-10 container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <span className="text-primary text-sm font-bold uppercase tracking-widest">
            Контакты
          </span>

          <h2 className="heading-lg text-white mt-6 mb-12">
            Давайте работать вместе
          </h2>

          {/* Контактная информация */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a
              href="tel:+74950888082"
              className="group p-6 bg-white/5 rounded-2xl hover:bg-primary/10 transition-all"
            >
              <div className="text-3xl mb-4">📞</div>
              <p className="text-white/50 text-sm mb-2">Телефон</p>
              <p className="text-white text-xl font-medium group-hover:text-primary transition-colors">
                +7 (495) 088-80-82
              </p>
            </a>

            <a
              href="mailto:info@gk-vks.ru"
              className="group p-6 bg-white/5 rounded-2xl hover:bg-primary/10 transition-all"
            >
              <div className="text-3xl mb-4">✉️</div>
              <p className="text-white/50 text-sm mb-2">Email</p>
              <p className="text-white text-xl font-medium group-hover:text-primary transition-colors">
                info@gk-vks.ru
              </p>
            </a>

            <a
              href="https://gk-vks.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white/5 rounded-2xl hover:bg-primary/10 transition-all"
            >
              <div className="text-3xl mb-4">🌐</div>
              <p className="text-white/50 text-sm mb-2">Сайт</p>
              <p className="text-white text-xl font-medium group-hover:text-primary transition-colors">
                gk-vks.ru
              </p>
            </a>
          </div>

          {/* Адрес */}
          <div className="p-8 bg-white/5 rounded-2xl mb-12">
            <div className="text-3xl mb-4">📍</div>
            <p className="text-white/50 text-sm mb-2">Адрес</p>
            <p className="text-white text-lg">
              117342, Москва, ул. Бутлерова, дом 17Б, эт. 2, пом. XI К 60Ж, оф. 25
            </p>
            <p className="text-white/40 text-sm mt-4">
              ИНН 7715914809
            </p>
          </div>

          <button className="group inline-flex items-center gap-4 px-8 py-4 bg-primary hover:bg-primary-light rounded-full transition-all">
            <span className="text-white font-medium text-lg">Оставить заявку</span>
            <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
              <span className="text-white">→</span>
            </span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-24 pt-8 border-t border-white/10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <span>© 2024 ООО «ГК «ВКС». Все права защищены.</span>
          <span>Строительство · Реставрация · Инжиниринг</span>
        </div>
      </div>
    </section>
  )
}