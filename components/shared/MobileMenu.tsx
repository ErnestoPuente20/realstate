'use client'

import { NAV_LINKS } from '@/constants'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface MobileMenuProps {
  isOpen: boolean
  closeMenu: () => void
}

export default function MobileMenu({ isOpen, closeMenu }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLLIElement[]>([])
  const buttonRef = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  // 1. BLOQUEO DE SCROLL
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // 2. CREACIÓN DEL TIMELINE DE GSAP
  useEffect(() => {
    if (!menuRef.current) return

    // Usamos 'x: "100%"' para sincronizarnos perfectamente con 'translate-x-full' de Tailwind
    gsap.set(menuRef.current, { x: "100%", opacity: 0 })

    tl.current = gsap.timeline({ paused: true })

    tl.current
      // Modificamos a x: "0%" para que pise el translate de Tailwind con éxito
      .to(menuRef.current, {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
      })
      .from(linksRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out'
      }, '-=0.2')
      .from(buttonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.1')
  }, [])

  // 3. DETECTOR DE CAMBIOS
  useEffect(() => {
    if (!tl.current) return

    if (isOpen) {
      tl.current.play()
    } else {
      tl.current.reverse()
    }
  }, [isOpen])

  return (
    <div 
      ref={menuRef}
      // Mantenemos estas clases para que la página cargue limpia y sin parpadeo blanco
      className={`fixed inset-0 z-99 h-screen w-screen bg-white text-zinc-900 flex flex-col justify-between p-6 translate-x-full opacity-0 transition-none ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className='flex flex-col justify-center items-start gap-10 flex-1 max-w-md mx-auto w-full px-4 mb-20'>
        <ul className='flex flex-col gap-6 w-full'>
          {NAV_LINKS.map((link, i) => (
            <li
              ref={(el) => { if (el) linksRef.current[i] = el }}
              key={i}
              className='w-full border-b pb-4 border-zinc-200'
            >
              <Link
                href={link.href}
                onClick={closeMenu}
                className='text-3xl font-serif font-medium hover:pl-4 transition-all duration-300 block text-zinc-900'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div ref={buttonRef} className='w-full pt-4'>
          <button 
            onClick={closeMenu}
            className='w-full border-2 border-zinc-900 rounded-sm py-4 px-6 font-semibold text-zinc-900 bg-transparent transition-all duration-300 active:bg-zinc-900 active:text-white text-center text-lg'
          >
            Encontrar una casa
          </button>
        </div>
      </div>
    </div>
  )
}