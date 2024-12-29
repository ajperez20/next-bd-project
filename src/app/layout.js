import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'UcabAir - Sistema de Gestión',
    description: 'Sistema de gestión para la producción de aviones',
}

export default function RootLayout({ children }) {
    return (
        <html lang="es">
        <body className={inter.className}>{children}</body>
        </html>
    )
}