'use client'

import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState, useEffect} from 'react'
import {XMarkIcon} from '@heroicons/react/24/outline'

export default function EditModal({
                                      isOpen, onClose, onSave, data, fields
                                  }) {
    const [formData, setFormData] = useState(data || {})

    useEffect(() => {
        setFormData(data || {})
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev, [name]: value
        }))
    }

    return (<Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                                >
                                    {data ? 'Editar' : 'Crear Nuevo'}
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <XMarkIcon className="h-6 w-6"/>
                                    </button>
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="mt-4">
                                    {fields.map((field) => (<div key={field.name} className="mb-4">
                                            <label
                                                htmlFor={field.name}
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type || 'text'}
                                                name={field.name}
                                                id={field.name}
                                                value={formData[field.name] || ''}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                required={field.required}
                                            />
                                        </div>))}
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>)
}
