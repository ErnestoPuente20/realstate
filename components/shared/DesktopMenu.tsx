import { NAV_LINKS } from '@/constants'

export default function DesktopMenu() {
  return (
    <ul className='flex gap-8'>
        {NAV_LINKS.map((link, i) => (
            <li
                key={i}
                className='text-lg font-medium text-foreground/60 hover:text-foreground transition-colors duration-300'
            >
                <a href={link.href}>
                    {link.label}
                </a>
            </li>
        ))}
    </ul>
  )
}
