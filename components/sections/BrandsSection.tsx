'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function BrandsSection() {
    const carruselRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(!carruselRef.current) return

        const riel = carruselRef.current.querySelector('.brands-track')
        if(!riel) return

        const animacion = gsap.to(riel, {
            xPercent: -33.333, 
            ease: "none",
            duration: 25,
            repeat: -1,
        });

        return () => {
            animacion.kill()
        }
    }, []);

    const RenderLogosRow = () => (
        <div className='flex gap-16 items-center justify-around pr-16 shrink-0'>
            <div className='relative h-10 w-40 opacity-40 hover:opacity-100 transition-opacity duration-300'>
                <Image src="/marcas/bisa-logo.svg" alt='Banco Bisa' fill className='object-contain'/>
            </div>
            <div className='relative h-10 w-40 opacity-40 hover:opacity-100 transition-opacity duration-300'>
                <Image src="/marcas/foster-logo.svg" alt='Foster Partners' fill className='object-contain'/>
            </div>
            <div className='relative h-10 w-40 opacity-40 hover:opacity-100 transition-opacity duration-300'>
                <Image src="/marcas/gaggenau-logo.svg" alt='Gaggenau' fill className='object-contain'/>
            </div>
            <div className='relative h-10 w-40 opacity-40 hover:opacity-100 transition-opacity duration-300'>
                <Image src="/marcas/knoll-logo.svg" alt='Knoll' fill className='object-contain'/>
            </div>
            <div className='relative h-10 w-40 opacity-40 hover:opacity-100 transition-opacity duration-300'>
                <Image src="/marcas/porcelanosa-logo.svg" alt='Porcelanosa' fill className='object-contain'/>
            </div>
            <div className='relative h-10 w-40 opacity-40 hover:opacity-100 transition-opacity duration-300'>
                <Image src="/marcas/zaha-logo.svg" alt='Zaha Hadid' fill className='object-contain'/>
            </div>
        </div>
    );

    return (
        <section className='bg-foreground py-16 overflow-hidden border-y border-white/15'>
            <div className='container mx-auto px-5 mb-10 text-center'>
                <span className='text-xs font-semibold uppercase tracking-widest text-background/60'>
                    Nuestros proyectos están respaldados por los mejores
                </span>
            </div>

            {/* CONTENEDOR DEL CARRUSEL: Añadimos pseudo-elementos para el difuminado */}
            <div ref={carruselRef} className='w-full overflow-hidden relative'>
                
                {/* Máscara izquierda (difumina hacia el fondo oscuro) */}
                <div className='absolute left-0 top-0 bottom-0 w-25 bg-linear-to-r from-foreground to-transparent z-10 pointer-events-none' />
                
                {/* Máscara derecha (difumina hacia el fondo oscuro) */}
                <div className='absolute right-0 top-0 bottom-0 w-25 bg-linear-to-l from-foreground to-transparent z-10 pointer-events-none' />

                <div className='brands-track flex w-max items-center'>
                    <RenderLogosRow />
                    <RenderLogosRow />
                    <RenderLogosRow />
                </div>
            </div>
        </section>
    )
}