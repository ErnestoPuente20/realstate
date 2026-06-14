'use client'

import { useState, useEffect, useRef } from 'react'
import { FAQS } from '@/data/faqs'
import { Plus, Minus } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Animación de entrada inicial por Scroll
  useEffect(() => {
    if (!headerRef.current || !listRef.current) return

    const headerElements = headerRef.current.children
    const faqRows = listRef.current.children

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#faqs',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    })

    tl.fromTo(headerElements,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    )
    .fromTo(faqRows,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
      '-=0.3'
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id='faqs' className='py-24 bg-background px-5 text-foreground overflow-hidden'>
      <div className='container mx-auto max-w-4xl flex flex-col'>
        
        {/* Encabezado */}
        <div ref={headerRef} className='flex flex-col justify-start mb-16'>
          <div className='flex gap-6 items-center mb-3'>
            <div className='w-10 h-0.5 bg-foreground'/>
            <span className='font-semibold text-sm text-foreground uppercase tracking-widest'>
              FAQ
            </span>
          </div>
          <h2 className='font-serif text-foreground text-4xl md:text-5xl font-bold uppercase tracking-tighter'>
            Preguntas Frecuentes
          </h2>
        </div>

        {/* Lista del Acordeón con referencia para la entrada */}
        <div ref={listRef} className='flex flex-col border-t border-foreground/20'>
          {FAQS.map((faq, index) => (
            <FaqRow 
              key={index}
              faq={faq}
              isOpen={activeIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

// --- SUBCOMPONENTE INTERNO PARA MANEJAR LA ANIMACIÓN INDEPENDIENTE DEL CONTENIDO ---
interface FaqRowProps {
  faq: { question: string; answer: string }
  isOpen: boolean
  onToggle: () => void
}

function FaqRow({ faq, isOpen, onToggle }: FaqRowProps) {
  const contentWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentWrapperRef.current) return

    if (isOpen) {
      // Si está abierto, calculamos la altura automática exacta y animamos fluidamente
      gsap.to(contentWrapperRef.current, {
        height: 'auto',
        opacity: 1,
        paddingTop: 16, // Controlamos el pt-4 nativo desde JavaScript para evitar saltos bruscos
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      // Si está cerrado, colapsamos todo a 0
      gsap.to(contentWrapperRef.current, {
        height: 0,
        opacity: 0,
        paddingTop: 0,
        duration: 0.35,
        ease: 'power2.inOut'
      })
    }
  }, [isOpen])

  return (
    <div className='border-b border-foreground/20 py-6 flex flex-col w-full'>
      <button
        onClick={onToggle}
        className='flex justify-between items-center w-full text-left group'
      >
        <span className='text-lg md:text-xl font-medium tracking-tight pr-4 transition-colors duration-300 group-hover:text-foreground/80'>
          {faq.question}
        </span>
        
        <div className='shrink-0 p-2 rounded-full border border-foreground/10 group-hover:border-foreground/30 transition-colors duration-300'>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      {/* CONTENEDOR ANIMADO: Iniciamos en h-0 y overflow-hidden para ocultarlo por completo de entrada */}
      <div 
        ref={contentWrapperRef} 
        className='overflow-hidden h-0 opacity-0 text-zinc-500 font-sans text-sm md:text-base leading-relaxed max-w-3xl'
      >
        <p>{faq.answer}</p>
      </div>
    </div>
  )
}