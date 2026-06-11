'use client'

import Link from 'next/link'
import React, { useRef, useState } from 'react'
import DesktopMenu from './DesktopMenu'
import { Menu, X } from 'lucide-react'
import MobileMenu from './MobileMenu'

export default function Navbar() {

  const headerRef = useRef<HTMLElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header 
      ref={headerRef}
      className='w-full fixed top-0 left-0 z-50'
    >
      <nav className='container mx-auto p-5 flex items-center justify-between border-b'>
        <Link href='/' className='font-serif font-bold text-xl'>
          Urbania
        </Link>

        <div className='hidden md:block'>
          <DesktopMenu/>
        </div>

        <div className='hidden md:block'>
          <button className='group relative overflow-hidden border-2 border-foreground rounded-sm py-2 px-4 font-semibold text-foreground transition-colors duration-300 hover:text-background'>
            
            <span className='absolute inset-0 -translate-x-full bg-foreground transition-transform duration-300 ease-out group-hover:translate-x-0' />
            
            <span className='relative z-10'>
              Encontrar una casa
            </span>

          </button>
        </div>

        {/* Menu movil */}
        <button 
          className='block md:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28}/> : <Menu size={28} className='text-foreground'/>}
        </button>
      </nav>

      <MobileMenu isOpen={isOpen} closeMenu={() => setIsOpen(false)}/>

    </header>
  )
}
