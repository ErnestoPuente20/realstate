'use client'

import React, { useState, useEffect, useRef } from 'react'
import { PROPERTIES_DATA } from '@/data/properties';
import CardProperties from './ui/CardProperties';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registramos el plugin esencial para detectar el scroll
gsap.registerPlugin(ScrollTrigger)

export default function PropertiesSection() {
    const [filter, setFilter] = useState('Todos');
    
    // Referencias para las animaciones
    const headerRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredProperties = filter === 'Todos'
        ? PROPERTIES_DATA
        : PROPERTIES_DATA.filter(p => p.location === filter)

    // 1. ANIMACIÓN DE ENTRADA INICIAL (Mejorada para que se note al bajar con Scroll)
useEffect(() => {
    if (!headerRef.current || !tabsRef.current || !gridRef.current) return;

    const headerElements = headerRef.current.children;
    const tabButtons = tabsRef.current.children;
    const initialCards = gridRef.current.children;

    // Forzamos un estado inicial invisible y abajo para asegurar que GSAP los capture en el momento justo
    gsap.set(initialCards, { y: 60, opacity: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#propiedades',
            start: 'top 70%',        // Bajamos un poquito el trigger (70%) para que la sección esté más adentro de la pantalla antes de iniciar
            toggleActions: 'play none none none'
        }
    });

    tl.fromTo(headerElements, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
    )
    .fromTo(tabButtons,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
        '-=0.4' // Aparecen sutilmente mientras el título termina
    )
    .fromTo(initialCards,
        { y: 60, opacity: 0 }, // Empezamos desde más abajo (60px) para que el recorrido sea más vistoso
        { 
            y: 0, 
            opacity: 1, 
            duration: 0.9,     // Antes: 0.6 -> Ahora es más lento y majestuoso
            stagger: 0.15,     // Antes: 0.1 -> Más separación entre tarjeta y tarjeta (efecto cascada real)
            ease: 'power3.out' 
        },
        '-=0.2' // Arranca justo al final para garantizar que el usuario ya esté mirando el Grid
    );

    return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
}, []);

// 2. ANIMACIÓN DINÁMICA AL FILTRAR LAS TARJETAS (Modificada para no interferir con el scroll inicial)
const isFirstRender = useRef(true); // Flag para saltarnos la primera carga automática de React

useEffect(() => {
    // Si es la primera vez que carga la página, dejamos que ScrollTrigger maneje la animación limpia
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }

    if (!gridRef.current) return;
    const currentCards = gridRef.current.children;
    if (currentCards.length === 0) return;

    // Animación exclusiva para cuando el usuario hace clic en los filtros
    gsap.fromTo(currentCards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', overwrite: 'auto' }
    );
}, [filter]);

    return (
        <section id='propiedades' className='py-24 bg-background px-5 overflow-hidden'>
            <div className='container mx-auto'>
                {/* Encabezado */}
                <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
                    <div ref={headerRef}>
                        <div className='flex gap-6 items-center mb-3'>
                          <div className='w-10 h-0.5 bg-foreground'/>
                          <span className='text-sm font-semibold uppercase tracking-widest text-foreground block'>
                              Portafolio exclusivo
                          </span>
                        </div>
                        <h2 className='font-serif text-4xl md:text-5xl font-bold uppercase tracking-tighter text-foreground'>
                            Propiedades destacadas
                        </h2>
                    </div>
                    
                    {/* Filtros por departamento */}
                    <div ref={tabsRef} className='flex flex-wrap gap-2'>
                        {['Todos', 'La Paz', 'Cochabamba', 'Santa Cruz'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm border transition-all duration-300 ${
                                    filter === tab
                                    ? 'bg-foreground text-background border-foreground'
                                    : 'bg-transparent text-foreground/60 border-foreground/10 hover:border-foreground/40 hover:text-foreground'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grilla de propiedades */}
                <div 
                    ref={gridRef} 
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                >
                    {filteredProperties.map((property) => (
                        <CardProperties key={property.id} property={property}/>
                    ))}
                </div>
            </div>
        </section>
    )
}