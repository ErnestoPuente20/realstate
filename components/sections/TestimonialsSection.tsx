import React from 'react'
import { TESTIMONIALS } from '@/data/testimonials'
import CardTestimonial from './ui/CardTestimonial'

export default function TestimonialsSection() {
  const primerosTestimonios = TESTIMONIALS.slice(0, 3);

  return (
    <section className='py-24 bg-foreground overflow-hidden px-5'>
      <div className='container mx-auto flex flex-col'>
        {/* encabezado */}
        <div className='flex flex-col justify-start'>
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

        {/* Carrusel */}
        {/* CONTENEDOR GRID: Se adapta solo según la pantalla */}
        {/* En móvil: 1 columna, En escritorio (lg): 3 columnas */}
        {/* Agregamos pr-16 en pantallas grandes para darle espacio al "translate-x-16" de la foto de la tarjeta */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-16 gap-x-8 pt-12'>
          {primerosTestimonios.map((item) => (
            <CardTestimonial key={item.id} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
