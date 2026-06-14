'use client'

import React, { useEffect, useRef } from 'react'
import { TESTIMONIALS } from '@/data/testimonials'
import CardTestimonial from './ui/CardTestimonial'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registramos el plugin por seguridad en este componente
gsap.registerPlugin(ScrollTrigger)

export default function TestimonialsSection() {
  const primerosTestimonios = TESTIMONIALS.slice(0, 3);

  // Referencias para capturar los contenedores del DOM
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current || !gridRef.current) return;

    const headerElements = headerRef.current.children;
    const testimonialCards = gridRef.current.children;

    // Forzamos el estado inicial de las tarjetas para que no parpadeen
    gsap.set(testimonialCards, { scale: 0.92, opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#testimonios',
        start: 'top 70%', // Inicia cuando la sección entra un 30% en la pantalla
        toggleActions: 'play none none none'
      }
    });

    tl.fromTo(headerElements,
      { x: -40, opacity: 0 }, // El título viene sutilmente desde la izquierda (-40px)
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.7, 
        stagger: 0.12, 
        ease: 'power2.out' 
      }
    )
    .fromTo(testimonialCards,
      { scale: 0.92, opacity: 0, y: 20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15, // Efecto cascada premium entre las 3 columnas
        ease: 'power3.out'
      },
      '-=0.3' // Inicia un momento antes de que termine de aparecer el encabezado
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id='testimonios' className='py-24 bg-foreground overflow-hidden px-5'>
      <div className='container mx-auto flex flex-col'>
        
        {/* Encabezado con referencia */}
        <div ref={headerRef} className='flex flex-col justify-start'>
          <div className='flex gap-6 items-center mb-3'>
            <div className='w-10 h-0.5 bg-background'/>
            <span className='font-semibold text-sm text-background uppercase tracking-widest'>
              Testimonios
            </span>
          </div>
          <h2 className='font-serif text-background text-4xl md:text-5xl font-bold uppercase tracking-tighter'>
            Inversiones que inspiran
          </h2>
        </div>

        {/* Grilla con referencia */}
        <div 
          ref={gridRef} 
          className='grid grid-cols-1 lg:grid-cols-3 gap-y-16 gap-x-8 pt-12'
        >
          {primerosTestimonios.map((item) => (
            <CardTestimonial key={item.id} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  )
}