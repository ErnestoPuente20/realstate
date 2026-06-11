import { NAV_LINKS } from '@/constants'
import Link from 'next/link'
import React from 'react'
import { X } from 'lucide-react'

interface MobileMenuProps {
    isOpen: boolean,
    closeMenu: () => void
}

export default function MobileMenu({isOpen, closeMenu}: MobileMenuProps) {
  return (
    <>
        {isOpen && (
            <div className='fixed inset-0 z-50 bg-white'>
                {/* Botón para cerrar */}
                <button 
                    onClick={closeMenu}
                    className='absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                >
                    <X size={24} />
                </button>

                {/* Menú */}
                <ul className='flex flex-col justify-center items-start gap-8 h-full max-w-md mx-auto px-6'>
                    {NAV_LINKS.map((link, i) => (
                        <li
                            key={i}
                            className='w-full border-b pb-4 border-gray-200 dark:border-gray-800'
                        >
                            <Link
                                href={link.href}
                                onClick={closeMenu}
                                className='text-2xl font-medium hover:pl-4 transition-all duration-300 block'
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </>
  )
}