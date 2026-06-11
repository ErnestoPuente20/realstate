'use client'

import React, { useState } from 'react'
import { PROPERTIES_DATA } from '@/data/properties';
import CardProperties from './ui/CardProperties';

export default function PropertiesSection() {
    const [filter, setFilter] = useState('Todos');

    const filteredProperties = filter === 'Todos'
        ? PROPERTIES_DATA
        : PROPERTIES_DATA.filter(p => p.location === filter)

    return (
        <section className='py-24 bg-background px-5'>
            <div className='container mx-auto'>
                {/* Encabezado */}
                <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
                    <div>
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
                    <div className='flex flex-wrap gap-2'>
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
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {filteredProperties.map((property) => (
                        <CardProperties key={property.id} property={property}/>
                    ))}
                </div>
            </div>
        </section>
    )
}
