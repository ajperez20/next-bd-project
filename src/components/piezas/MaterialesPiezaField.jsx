import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function MaterialesPiezaField({
  value = [],
  onChange,
  materialesOptions,
  procesosOptions,
  error,
}) {
  const [materiales, setMateriales] = useState(value);

  const handleAdd = () => {
    const newMateriales = [
      ...materiales,
      {
        material_id: "",
        proceso_id: "",
        cantidad: "",
        unidad_medida: "",
      },
    ];
    setMateriales(newMateriales);
    onChange(newMateriales);
  };

  const handleRemove = (index) => {
    const newMateriales = materiales.filter((_, i) => i !== index);
    setMateriales(newMateriales);
    onChange(newMateriales);
  };

  const handleChange = (index, field, value) => {
    const newMateriales = [...materiales];
    newMateriales[index][field] = value;
    setMateriales(newMateriales);
    onChange(newMateriales);
  };

  return (
    <div className="space-y-4">
      {materiales.map((material, index) => (
        <div key={index} className="p-4 border rounded-lg bg-gray-50 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`material-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Material
              </label>
              <select
                id={`material-${index}`}
                value={material.material_id}
                onChange={(e) =>
                  handleChange(index, "material_id", e.target.value)
                }
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Seleccione un material</option>
                {materialesOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor={`proceso-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Proceso
              </label>
              <select
                id={`proceso-${index}`}
                value={material.proceso_id}
                onChange={(e) =>
                  handleChange(index, "proceso_id", e.target.value)
                }
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Seleccione un proceso</option>
                {procesosOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`cantidad-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Cantidad
              </label>
              <input
                id={`cantidad-${index}`}
                type="number"
                value={material.cantidad}
                onChange={(e) =>
                  handleChange(index, "cantidad", e.target.value)
                }
                placeholder="Cantidad"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor={`unidad-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Unidad de Medida
              </label>
              <input
                id={`unidad-${index}`}
                type="text"
                value={material.unidad_medida}
                onChange={(e) =>
                  handleChange(index, "unidad_medida", e.target.value)
                }
                placeholder="Unidad de medida"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Eliminar
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        Agregar Material
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
