"use client";

import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EmpleadoDetalles({ isOpen, onClose, empleado }) {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [experiencia, setExperiencia] = useState([]);
  const [titulos, setTitulos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (empleado?.per_id) {
      fetchDetalles();
    }
  }, [empleado]);

  const fetchDetalles = async () => {
    try {
      const [beneficiariosRes, experienciaRes, titulosRes] = await Promise.all([
        fetch(`/api/empleados/${empleado.per_id}/beneficiarios`),
        fetch(`/api/empleados/${empleado.per_id}/experiencia`),
        fetch(`/api/empleados/${empleado.per_id}/titulos`),
      ]);

      const [beneficiariosData, experienciaData, titulosData] =
        await Promise.all([
          beneficiariosRes.json(),
          experienciaRes.json(),
          titulosRes.json(),
        ]);

      setBeneficiarios(beneficiariosData);
      setExperiencia(experienciaData);
      setTitulos(titulosData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Detalles del Empleado: {empleado.per_nombre} {empleado.per_apellido}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow text-blue-700"
                        : "text-gray-700 hover:bg-white/[0.12] hover:text-blue-600",
                    )
                  }
                >
                  Beneficiarios ({beneficiarios.length})
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow text-blue-700"
                        : "text-gray-700 hover:bg-white/[0.12] hover:text-blue-600",
                    )
                  }
                >
                  Experiencia ({experiencia.length})
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow text-blue-700"
                        : "text-gray-700 hover:bg-white/[0.12] hover:text-blue-600",
                    )
                  }
                >
                  Títulos ({titulos.length})
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-4">
                <Tab.Panel>
                  {beneficiarios.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            DNI
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Nombre
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Parentesco
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {beneficiarios.map((beneficiario) => (
                          <tr key={beneficiario.ben_id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {beneficiario.ben_dni}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {beneficiario.ben_nombre}{" "}
                              {beneficiario.ben_apellido}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {beneficiario.parentesco}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No hay beneficiarios registrados
                    </p>
                  )}
                </Tab.Panel>
                <Tab.Panel>
                  {experiencia.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Empresa
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Fecha Inicio
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Fecha Fin
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {experiencia.map((exp) => (
                          <tr key={exp.exp_id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {exp.exp_nombre_empresa}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(
                                exp.exp_fecha_inicio,
                              ).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(exp.exp_fecha_fin).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No hay experiencia registrada
                    </p>
                  )}
                </Tab.Panel>
                <Tab.Panel>
                  {titulos.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Título
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Universidad
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Fecha
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {titulos.map((titulo) => (
                          <tr key={titulo.tit_id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {titulo.tit_nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {titulo.edt_nombre_universidad}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(
                                titulo.edt_fecha_obtencion,
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No hay títulos registrados
                    </p>
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          )}
        </div>
      </div>
    </div>
  );
}
