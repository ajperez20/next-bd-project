"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

const columns = [
  { key: "sed_nombre", label: "Sede" },
  { key: "rpm_nombre", label: "Materia Prima" },
  { key: "mps_unidad_medida", label: "Unidad de Medida" },
  {
    key: "mps_cantidad_disponible",
    label: "Cantidad Disponible",
    format: (value) => value || 0,
  },
  {
    key: "estado",
    label: "Estado",
    format: (value) => {
      const style =
        value === "CRÍTICO"
          ? "text-red-600"
          : value === "BAJO"
            ? "text-yellow-600"
            : "text-green-600";
      return <span className={`font-medium ${style}`}>{value}</span>;
    },
  },
];

const unidadesMedida = [
  { value: "KG", label: "Kilogramos" },
  { value: "L", label: "Litros" },
  { value: "M", label: "Metros" },
  { value: "UN", label: "Unidades" },
];

export default function StockPage() {
  const [stock, setStock] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSede, setSelectedSede] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);

  const [formFields, setFormFields] = useState([
    {
      name: "fk_rpm_id",
      label: "Materia Prima",
      type: "select",
      required: true,
      options: [],
      description: "Seleccione la materia prima",
    },
    {
      name: "fk_sed_id",
      label: "Sede",
      type: "select",
      required: true,
      options: [],
      description: "Seleccione la sede",
    },
    {
      name: "mps_unidad_medida",
      label: "Unidad de Medida",
      type: "select",
      required: true,
      options: unidadesMedida,
      description: "Seleccione la unidad de medida",
    },
    {
      name: "mps_cantidad_disponible",
      label: "Cantidad Disponible",
      type: "number",
      required: true,
      min: 0,
      step: "0.01",
      description: "Ingrese la cantidad disponible",
    },
  ]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [stockRes, sedesRes] = await Promise.all([
        fetch("/api/materia-prima/stock"),
        fetch("/api/sedes"),
      ]);

      if (!stockRes.ok || !sedesRes.ok)
        throw new Error("Error al cargar datos");

      const [stockData, sedesData] = await Promise.all([
        stockRes.json(),
        sedesRes.json(),
      ]);

      // Formatear datos del stock con IDs únicos y estado
      const formattedStock = stockData.map((item) => ({
        id: item.id, // Asegurarse de que este campo exista en la respuesta del API
        sed_nombre: item.sed_nombre,
        rpm_nombre: item.rpm_nombre,
        mps_unidad_medida: item.mps_unidad_medida,
        mps_cantidad_disponible: item.mps_cantidad_disponible,
        estado: determinarEstado(item.mps_cantidad_disponible),
        // Mantener campos originales para el formulario
        fk_sed_id: item.fk_sed_id,
        fk_rpm_id: item.fk_rpm_id,
      }));

      setStock(formattedStock);
      setSedes(sedesData);

      // Actualizar opciones de los selects
      setFormFields((fields) =>
        fields.map((field) => {
          if (field.name === "fk_sed_id") {
            return {
              ...field,
              options: sedesData.map((sede) => ({
                value: sede.sed_id,
                label: sede.sed_nombre,
              })),
            };
          }
          if (field.name === "fk_rpm_id") {
            // Obtener opciones únicas de materia prima del stock
            const materiaPrimaOptions = Array.from(
              new Set(stockData.map((item) => item.fk_rpm_id)),
            ).map((rpm_id) => {
              const item = stockData.find((s) => s.fk_rpm_id === rpm_id);
              return {
                value: rpm_id,
                label: item.rpm_nombre,
              };
            });
            return {
              ...field,
              options: materiaPrimaOptions,
            };
          }
          return field;
        }),
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const determinarEstado = (cantidad) => {
    if (cantidad <= 5) return "CRÍTICO";
    if (cantidad <= 10) return "BAJO";
    return "NORMAL";
  };

  const getFilteredData = () => {
    if (!selectedSede) return stock;
    return stock.filter((item) => item.fk_sed_id === parseInt(selectedSede));
  };

  const handleEdit = (stockItem) => {
    if (stockItem) {
      setCurrentStock({
        id: stockItem.id,
        fk_rpm_id: stockItem.fk_rpm_id,
        fk_sed_id: stockItem.fk_sed_id,
        mps_unidad_medida: stockItem.mps_unidad_medida,
        mps_cantidad_disponible: stockItem.mps_cantidad_disponible?.toString(),
      });
    } else {
      setCurrentStock({
        fk_rpm_id: "",
        fk_sed_id: selectedSede || "",
        mps_unidad_medida: "",
        mps_cantidad_disponible: "",
      });
    }
    setShowModal(true);
  };

  const handleDelete = async (stockItem) => {
    if (!confirm("¿Está seguro de eliminar este registro de stock?")) return;

    try {
      const response = await fetch(`/api/materia-prima/stock/${stockItem.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar");
      }

      fetchInitialData();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      const url = formData.id
        ? `/api/materia-prima/stock/${formData.id}`
        : "/api/materia-prima/stock";

      const response = await fetch(url, {
        method: formData.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al guardar");
      }

      setShowModal(false);
      fetchInitialData();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Stock Total</h3>
            <span className="text-2xl font-bold text-gray-900">
              {stock.reduce(
                (acc, item) => acc + (item.mps_cantidad_disponible || 0),
                0,
              )}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Stock Crítico</h3>
            <div className="flex items-center">
              <ArrowTrendingDownIcon className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-2xl font-bold text-red-500">
                {stock.filter((item) => item.estado === "CRÍTICO").length}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Stock Normal</h3>
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold text-green-500">
                {stock.filter((item) => item.estado === "NORMAL").length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <select
          value={selectedSede}
          onChange={(e) => setSelectedSede(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las sedes</option>
          {sedes.map((sede) => (
            <option key={sede.sed_id} value={sede.sed_id}>
              {sede.sed_nombre}
            </option>
          ))}
        </select>
      </div>

      <DataList
        data={getFilteredData()}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Control de Stock"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentStock(null);
        }}
        onSave={handleSave}
        data={currentStock}
        fields={formFields}
        title="Stock"
      />
    </div>
  );
}
