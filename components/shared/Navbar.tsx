'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import DesktopMenu from './DesktopMenu'
import { Menu, X } from 'lucide-react'
import MobileMenu from './MobileMenu'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {

  const headerRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  // Estado para saber si el usuario bajó más de 20 píxeles
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // 1. Detector de scroll para cambiar de fondo
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      }else{
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // 2. ANIMACIÓN DE GSAP PARA ESCONDER/MOSTRAR AL SCROLEAR
    if (!headerRef.current) return

    const showAnim = gsap.from(headerRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: "power2.out"
    }).progress(1) //Empezamos con el menu visible progreso al 100%

    //Configuramos eldisparador del scroll de GSAP
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1) {
          // self.direction es 1 cuando bajas y -1 cuando subes
          showAnim.reverse() // Esconde el Navbar (-100% hacia arriba)
        }else{
          showAnim.play() // Muestra el Navbar (regresa a su posición original)
        }
      }
    })

    //Limpieza
    return () => {
      window.removeEventListener('scroll', handleScroll)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <header 
      ref={headerRef}
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
        ? 'bg-background border-b border-foreground text-foreground shadow-md'
        : 'bg-transparent'
      }`}
    >
      <nav className='container mx-auto p-5 flex items-center justify-between'>
        <Link href='/' className='font-serif font-bold text-xl'>
          Urbania
        </Link>

        <div className='hidden md:block'>
          <DesktopMenu/>
        </div>

        <div className='hidden md:block'>
          <a href="#propiedades">
            <button
              className='group relative overflow-hidden border-2 border-foreground rounded-sm py-2 px-4 font-semibold text-foreground transition-colors duration-300 hover:text-background'
            >
              <span className='absolute inset-0 -translate-x-full bg-foreground transition-transform duration-300 ease-out group-hover:translate-x-0' />
              
              <span className='relative z-10'>
                Encontrar una casa
              </span>
            </button>
          </a>
        </div>

        {/* Menú móvil (Hamburguesa) */}
        {/* Añadimos clases condicionales directas para que la hamburguesa sea blanca arriba y negra abajo */}
        <button 
          className="block md:hidden z-100 transition-all duration-300 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28}/> : <Menu size={28} />}
        </button>
      </nav>

      <MobileMenu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>

    </header>
  )
}
