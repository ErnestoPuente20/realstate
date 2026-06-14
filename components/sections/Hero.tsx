'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLDivElement>(null)
  const textElementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Aseguramos que los elementos existan en el DOM
    if (!sectionRef.current || !bgImageRef.current || !textElementsRef.current) return
    // Seleccionamos los hijos directos del contenedor de texto para el efecto de cascada (stagger)
    const elements = textElementsRef.current.children

    //Creamos el timeline principal de entrada
    const tl =  gsap.timeline()

    tl.to(sectionRef.current, {
      opacity: 1,
      duration: 0.2,
    })

    // 1. Animación de la imagen de fondo: Viene de una escala mayor a su tamaño real
    .fromTo(bgImageRef.current,
      {scale: 1.15, filter: 'blur(4px)'},
      {scale: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out'}
    )
    // 2. Animación escalonada de los textos (Inicia un poco antes de que termine el fondo gracias al '-=1')
    .fromTo(elements,
      {y: 50, opacity: 0},
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      },
      '-=0.8'
    )

  }, [])

  return (
    <section
      ref={sectionRef} 
      className="relative h-screen w-full overflow-hidden bg-background opacity-0"
    >
      
      {/* 1. Componente de Imagen optimizado de Next.js */}
      {/* Envolvemos el Image en un div con referencia para poder escalarlo sin romper el layout */}
      <div ref={bgImageRef} className="absolute inset-0 h-full w-full origin-center">
        <Image 
          src="/hero-house.webp" 
          alt="Arquitectura moderna minimalista Urbania" 
          fill
          priority // Le dice a Next.js que cargue esta imagen de inmediato (esencial para el Hero)
          className="object-cover object-right md:object-center" 
        />
      </div>

      {/* 2. Filtro sutil blanco para suavizar el fondo del lado izquierdo */}
      <div className="absolute inset-0 bg-linear-to-r from-[#f4f7f6]/95 via-[#f4f7f6]/50 to-transparent md:bg-linear-to-r md:from-[#f4f7f6]/75 md:via-transparent z-10" />

      {/* 3. Contenido en texto oscuro */}
      {/* Pasamos la referencia textElementsRef aquí para capturar de golpe al span, h1, p y button */}
      <div
        ref={textElementsRef} 
        className="relative z-10 container mx-auto h-full flex flex-col justify-center md:items-start px-5 pt-20"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-foreground/60 mb-3 block">
          Inmobiliaria Boutique
        </span>
        
        {/* Tu tipografía Syne en color oscuro premium */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground uppercase tracking-tighter max-w-3xl leading-none">
          Espacios que <br />
          <span className="text-foreground/70">definen tu historia</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-xl font-semibold">
          Diseño vanguardista y ubicaciones exclusivas en los entornos más cotizados. Descubre una nueva forma de habitar.
        </p>

        <div className="mt-6"> {/* Envolvemos el botón en un div para evitar conflictos de animación con sus pseudo-elementos */}
          <button className='group relative overflow-hidden px-5 py-3 bg-foreground text-background rounded-sm border-2 border-foreground transition-colors duration-300 hover:text-foreground'>
            <span className='absolute inset-0 bg-background -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0'/>
            <span className='relative font-semibold text-md tracking-wider'>
              Ver propiedades
            </span>
          </button>
        </div>
      </div>

    </section>
  )
}