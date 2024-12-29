'use client'

import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {
    BellIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline'
import {useRouter} from 'next/navigation'

export default function NavBar({user}) {
    const router = useRouter()

    return (
        <div className="fixed top-0 right-0 left-64 h-16 bg-white border-b z-10">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Título de la página */}
                <h1 className="text-xl font-semibold text-gray-800">
                    Sistema de Gestión UcabAir
                </h1>

                {/* Acciones del usuario */}
                <div className="flex items-center space-x-4">
                    {/* Notificaciones */}
                    <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                        <BellIcon className="h-6 w-6"/>
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Perfil del usuario */}
                    <Menu as="div" className="relative">
                        <Menu.Button className="flex items-center space-x-3 focus:outline-none">
                            <span className="text-sm text-gray-700">{user?.email || 'Usuario'}</span>
                            <UserCircleIcon className="h-8 w-8 text-gray-400"/>
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({active}) => (
                                        <button
                                            onClick={() => router.push('/profile')}
                                            className={`${
                                                active ? 'bg-gray-100' : ''
                                            } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                        >
                                            Mi Perfil
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <button
                                            onClick={() => router.push('/')}
                                            className={`${
                                                active ? 'bg-gray-100' : ''
                                            } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                        >
                                            Cerrar Sesión
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    )
}