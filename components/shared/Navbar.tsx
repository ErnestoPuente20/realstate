import Link from 'next/link'
import React from 'react'
import DesktopMenu from './DesktopMenu'

export default function Navbar() {
  return (
    <header className='w-full z-50 bg-transparent'>
      <nav className='container mx-auto p-5 flex items-center justify-between'>
        <Link href='/' className='font-bold text-xl'>
          Urbania
        </Link>

        <div className='hidden md:block'>
          <DesktopMenu/>
        </div>

        <div className='hidden md:block'>
          <button className='bg-gray-500 py-2 px-3 text-white'>
            Encontrar una casa
          </button>
        </div>
      </nav>
    </header>
  )
}
