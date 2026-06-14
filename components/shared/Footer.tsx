import Link from 'next/link';
import React from 'react'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";

export default function Footer() {
    const añoActual = new Date().getFullYear()

    return (
        <footer className='w-full bg-foreground py-12 px-5 text-background'>
            <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
                {/* Logo */}
                <Link 
                    href='/' 
                    className='font-serif font-bold text-2xl tracking-tighter hover:opacity-80 transition-opacity'
                    >
                    Urbania
                </Link>

                {/* Centro */}
                <p className='text-zinc-500 font-sans text-xs sm:order-0 order-last mt-2 sm:mt-0 '>
                    © {añoActual} Urbania. todos lso derechos reservados
                </p>

                {/* Redes sociales */}
                <div className='flex items-center gap-6'>
                    <a 
                        href='https://linkedin.com' 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className='p-2 rounded-full border border-white/5 bg-zinc-900 text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300'
                        aria-label='LinkedIn'
                    >
                        <FaLinkedin size={20}/>
                    </a>
                    <a 
                        href='https://facebook.com' 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className='p-2 rounded-full border border-white/5 bg-zinc-900 text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300'
                        aria-label='LinkedIn'
                    >
                        <FaFacebookSquare size={20}/>
                    </a>
                    <a 
                        href='https://instagram.com' 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className='p-2 rounded-full border border-white/5 bg-zinc-900 text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300'
                        aria-label='LinkedIn'
                    >
                        <FaInstagramSquare size={20}/>
                    </a>
                    <a 
                        href='https://whatsapp.com' 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className='p-2 rounded-full border border-white/5 bg-zinc-900 text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300'
                        aria-label='LinkedIn'
                    >
                        <FaWhatsappSquare size={20}/>
                    </a>
                </div>
            </div>
        </footer>
    )
}
