'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function BrandsSection() {
    const carruselRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(!carruselRef.current) return

        const riel = carruselRef.current.querySelector('.brands-track')
        if(!riel) return

        // GSAP limpio: Usamos la matemática exacta para 3 hileras idénticas
        const animacion = gsap.to(riel, {
            xPercent: -33.333, // Se desplaza exactamente 1 de las 3 hileras
            ease: "none",
            duration: 25,
            repeat: -1,
        });

        return () => {
            animacion.kill()
        }
    }, []);

    // Encapsulamos la lista de logos en una función interna para no repetir código visual
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
                <span className='text-xs font-semibold uppercase tracking-widest text-background'>
                    Nuestros proyectos están respaldados por los mejores
                </span>
            </div>

            <div ref={carruselRef} className='w-full overflow-hidden relative'>
                <div className='brands-track flex w-max items-center'>
                    
                    {/* Renderizamos las 3 hileras de forma controlada por React */}
                    <RenderLogosRow />
                    <RenderLogosRow />
                    <RenderLogosRow />
                </div>
            </div>
        </section>
    )
}