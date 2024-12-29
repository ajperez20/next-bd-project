'use client'

export default function RRHHPage() {
    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Recursos Humanos
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    Gestión de personal y recursos humanos
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card de Empleados */}
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Empleados</h3>
                            <p className="text-gray-500">Gestión de personal</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            150 activos
                        </span>
                    </div>
                </div>

                {/* Card de Departamentos */}
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Departamentos</h3>
                            <p className="text-gray-500">Organización estructural</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            8 departamentos
                        </span>
                    </div>
                </div>

                {/* Card de Nómina */}
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Nómina</h3>
                            <p className="text-gray-500">Gestión de pagos</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            En proceso
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}