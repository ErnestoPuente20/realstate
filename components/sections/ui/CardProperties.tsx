import React from 'react'
import Image from 'next/image';
import { Bath, BedDouble, MapPin, Maximize2 } from 'lucide-react';

interface cardPropertiesProps {
    property: {
        id: number,
        title: string;
        location: string;
        price: string;
        meters: number;
        beds: number;
        baths: number;
        image: string;
    }
}

export default function CardProperties({property} : cardPropertiesProps) {
  return (
    <div className='group bg-background border border-foreground/5 overflow-hidden rounded-sm transition-all duration-300 hover:shadow-md'>
        {/* head card */}
        <div className='relative h-64 w-full overflow-hidden bg-zinc-100'>
            <Image 
                src={property.image} 
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                priority={property.id <= 3} 
                className='object-cover transition-transform duration-500 ease-out group-hover:scale-105'
            />
        </div>

        {/* Cuerpo de la tarjeta */}
        <div className='p-5 flex flex-col gap-4'>
            {/* Titulo y locacion */}
            <div>
                <div className='flex items-center gap-1.5 text-foreground/50 mb-1'>
                    <MapPin size={14}/>
                    <span className='text-xs font-semibold tracking-wide uppercase'>
                        {property.location}
                    </span>
                </div>
                <h3 className='font-serif text-xl font-bold text-foreground tracking-tight'>
                    {property.title}
                </h3>
            </div>

            {/* Caracteristicas tecnicas */}
            <div className='grid grid-cols-3 gap-2 py-3 border-y border-foreground/20 text-foreground/70'>
                <div className='flex items-center gap-2 justify-center border-r border-foreground/20'>
                    <Maximize2 size={15} className='text-foreground'/>
                    <span className='text-sm font-semibold'>{property.meters} m²</span>
                </div>
                <div className='flex items-center gap-2 justify-center border-r border-foreground/20'>
                    <BedDouble size={15} className='text-foreground'/>
                    <span className='text-sm font-semibold'>{property.beds} {property.beds > 1 ? 'Dorms' : 'Dorm'}</span>
                </div>
                <div className='flex items-center gap-2 justify-center'>
                    <Bath size={15} className='text-foreground'/>
                    <span className='text-sm font-semibold'>{property.baths} {property.baths > 1 ? 'Baños' : 'Baño'}</span>
                </div>
            </div>

            {/* Precio y Boton */}
            <div className='flex items-center justify-between pt-1'>
                <span className='text-lg font-bold text-foreground'>
                    {property.price}
                </span>

                <button className='text-sm uppercase font-bold tracking-wider text-foreground/80 hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-foreground after:transition-all after:duration-300 hover:after:w-full transition-colors duration-30 cursor-pointer'>
                    Detalles
                </button>
            </div>
        </div>
    </div>
  )
}
