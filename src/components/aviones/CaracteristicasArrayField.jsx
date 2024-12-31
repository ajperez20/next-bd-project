import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function CaracteristicasArrayField({
  value = [],
  onChange,
  options,
  error,
}) {
  const [caracteristicas, setCaracteristicas] = useState(value);

  const handleAdd = () => {
    const newCaracteristicas = [
      ...caracteristicas,
      { caracteristica_id: "", unidad_medida: "", valor: "" },
    ];
    setCaracteristicas(newCaracteristicas);
    onChange(newCaracteristicas);
  };

  const handleRemove = (index) => {
    const newCaracteristicas = caracteristicas.filter((_, i) => i !== index);
    setCaracteristicas(newCaracteristicas);
    onChange(newCaracteristicas);
  };

  const handleChange = (index, field, value) => {
    const newCaracteristicas = [...caracteristicas];
    newCaracteristicas[index][field] = value;
    setCaracteristicas(newCaracteristicas);
    onChange(newCaracteristicas);
  };

  return (
    <div className="space-y-4">
      {caracteristicas.map((caract, index) => (
        <div key={index} className="flex gap-4 items-start">
          <div className="flex-1 space-y-4">
            <select
              value={caract.caracteristica_id}
              onChange={(e) =>
                handleChange(index, "caracteristica_id", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Seleccione una característica</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="flex gap-4">
              <input
                type="text"
                value={caract.unidad_medida}
                onChange={(e) =>
                  handleChange(index, "unidad_medida", e.target.value)
                }
                placeholder="Unidad de medida"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
              <input
                type="number"
                value={caract.valor}
                onChange={(e) => handleChange(index, "valor", e.target.value)}
                placeholder="Valor"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="mt-1 p-2 text-red-600 hover:text-red-800"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        Agregar Característica
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
