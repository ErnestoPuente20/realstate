import {Syne, Urbanist} from 'next/font/google';

export const  syne = Syne({
    subsets: ["latin"],
    weight: ['700', '800'],
    variable: '--font-syne',
})

export const urbanist = Urbanist({
    subsets:["latin"],
    weight: ['300', '400', '500', '600'],
    variable: "--font-urbanist",
})