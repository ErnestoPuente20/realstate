import React from 'react'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#f4f7f6]">
      
      {/* 1. Imagen con composición a la derecha y cielo limpio arriba/izquierda */}
      <img 
        src="/hero-house.webp" 
        alt="Arquitectura moderna minimalista Urbania" 
        className="absolute inset-0 h-full w-full object-cover object-right md:object-center" 
      />

      {/* 2. Filtro sutil blanco para suavizar el fondo del lado izquierdo */}
      {/* Esto asegura que el texto negro destaque de forma impecable sobre el cielo */}
      <div className="absolute inset-0 bg-linear-to-r from-[#f4f7f6]/90 via-[#f4f7f6]/40 to-transparent md:bg-linear-to-r md:from-[#f4f7f6]/70 md:via-transparent" />

      {/* 3. Contenido en texto oscuro */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center md:items-start px-5 pt-20">
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

        <button className='group mt-6 relative overflow-hidden px-5 py-3 bg-foreground text-background rounded-sm border-2 border-foreground transition-colors duration-300 hover:text-foreground'>
          <span className='absolute inset-0 bg-background -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0'/>
          <span className='relative font-semibold text-md tracking-wider'>
            Ver propiedades
          </span>
        </button>
      </div>

    </section>
  )
}