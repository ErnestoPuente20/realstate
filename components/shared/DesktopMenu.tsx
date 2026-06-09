import React from 'react'
import { NAV_LINKS } from '@/constants'
import Link from 'next/link'

export default function DesktopMenu() {
  return (
    <ul className='flex gap-8'>
        {NAV_LINKS.map((link, i) => (
            <li
                key={i}
            >
                <Link href={link.href}>
                    {link.label}
                </Link>
            </li>
        ))}
    </ul>
  )
}
