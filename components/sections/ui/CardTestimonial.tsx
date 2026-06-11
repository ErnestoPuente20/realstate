import React from 'react'
import Image from 'next/image'
import { Testimonial } from '@/types'


export default function CardTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    // Contenedor principal: Usamos relative y mt-12 para dar espacio a la foto que sobresale arriba
    <div className="relative w-full bg-zinc-900 border border-white/10 rounded-3xl pt-16 pb-8 px-6 md:px-8 flex flex-col items-center mt-12 select-none">
      
      {/* ================= FOTO CIRCULAR SUPERIOR (Rompe el borde superior) ================= */}
      {/* Con absolute, top-0 y -translate-y-1/2 la clavamos exactamente a la mitad del borde de arriba */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-zinc-900 bg-zinc-900 shadow-2xl overflow-hidden">
        <Image 
          src={testimonial.image} 
          alt={testimonial.name}
          fill
          className="rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* ================= CONTENIDO DE LA TARJETA ================= */}
      {/* Flex-1 empuja el bloque del autor y las comillas hacia el fondo si las tarjetas tienen textos de distintos tamaños */}
      <div className="flex-1 text-center flex flex-col justify-between w-full h-full">
        
        {/* El Texto del Testimonio */}
        <p className="text-background font-sans text-sm md:text-base leading-relaxed mb-8 italic">
          "{testimonial.quote}"
        </p>
        
        {/* Bloque Inferior: Autor y Comillas decorativas */}
        <div className="relative flex justify-between items-end pt-4 border-t border-white/5 w-full">
          
          {/* Datos del Cliente (Alineados a la izquierda para mantener el orden de lectura) */}
          <div className="flex flex-col text-left">
            <span className="text-background font-semibold text-base tracking-tight">
              {testimonial.name}
            </span>
            <span className="text-zinc-500 text-xs md:text-sm mt-0.5">
              {testimonial.role} <span className="text-zinc-600">@</span> {testimonial.company}
            </span>
          </div>

          {/* Comillas gigantes en la esquina inferior derecha (Estilo de la imagen de referencia) */}
          {/* Con -mb-4 y translate-y-2 hacemos que asomen ligeramente de forma muy editorial */}
          <span className="font-serif text-zinc-800 text-7xl leading-none select-none pointer-events-none translate-y-4">
            ”
          </span>

        </div>

      </div>
    </div>
  )
}
