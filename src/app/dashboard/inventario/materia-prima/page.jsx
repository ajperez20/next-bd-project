"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";

const columns = [
  { key: "rpm_nombre", label: "Nombre" },
  { key: "rpm_descripcion", label: "Descripción" },
  { key: "mps_unidad_medida", label: "Unidad de Medida" },
  {
    key: "mps_cantidad_disponible",
    label: "Cantidad Disponible",
    format: (value) => value || 0,
  },
  { key: "sed_nombre", label: "Sede" },
];

const unidadesMedida = [
  { value: "KG", label: "Kilogramos" },
  { value: "L", label: "Litros" },
  { value: "M", label: "Metros" },
  { value: "UN", label: "Unidades" },
];

export default function MateriaPrimaPage() {
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentMateriaPrima, setCurrentMateriaPrima] = useState(null);
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [stockResponse, sedesResponse] = await Promise.all([
        fetch("/api/materia-prima/stock"),
        fetch("/api/sedes"),
      ]);

      if (!stockResponse.ok || !sedesResponse.ok)
        throw new Error("Error al cargar datos");

      const [stockData, sedesData] = await Promise.all([
        stockResponse.json(),
        sedesResponse.json(),
      ]);

      // Formatear datos para la tabla
      const formattedData = stockData.map((item) => ({
        id: item.id,
        rpm_nombre: item.rpm_nombre,
        rpm_descripcion: item.rpm_descripcion,
        mps_unidad_medida: item.mps_unidad_medida,
        mps_cantidad_disponible: item.mps_cantidad_disponible,
        sed_nombre: item.sed_nombre,
        // Campos para el formulario
        fk_rpm_id: item.fk_rpm_id,
        fk_sed_id: item.fk_sed_id,
      }));

      setMateriasPrimas(formattedData);

      // Actualizar las opciones de los selects
      setFormFields((fields) =>
        fields.map((field) => {
          if (field.name === "fk_rpm_id") {
            // Opciones únicas de materia prima
            const materiaPrimaOptions = Array.from(
              new Set(stockData.map((item) => item.fk_rpm_id)),
            ).map((rpm_id) => {
              const item = stockData.find((d) => d.fk_rpm_id === rpm_id);
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
          if (field.name === "fk_sed_id") {
            // Opciones de sedes
            return {
              ...field,
              options: sedesData.map((sede) => ({
                value: sede.sed_id,
                label: sede.sed_nombre,
              })),
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

  const handleEdit = (materiaPrima) => {
    if (materiaPrima) {
      setCurrentMateriaPrima({
        id: materiaPrima.id,
        fk_rpm_id: materiaPrima.fk_rpm_id,
        fk_sed_id: materiaPrima.fk_sed_id,
        mps_unidad_medida: materiaPrima.mps_unidad_medida,
        mps_cantidad_disponible:
          materiaPrima.mps_cantidad_disponible?.toString(),
      });
    } else {
      setCurrentMateriaPrima({
        fk_rpm_id: "",
        fk_sed_id: "",
        mps_unidad_medida: "",
        mps_cantidad_disponible: "",
      });
    }
    setShowModal(true);
  };

  const handleDelete = async (materiaPrima) => {
    if (!confirm("¿Está seguro de eliminar este registro?")) return;

    try {
      const response = await fetch(
        `/api/materia-prima/stock/${materiaPrima.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar");
      }

      fetchData();
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
        body: JSON.stringify({
          fk_rpm_id: formData.fk_rpm_id,
          fk_sed_id: formData.fk_sed_id,
          mps_unidad_medida: formData.mps_unidad_medida,
          mps_cantidad_disponible: parseFloat(formData.mps_cantidad_disponible),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al guardar");
      }

      await fetchData();
      setShowModal(false);
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
      <DataList
        data={materiasPrimas}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Gestión de Stock de Materia Prima"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentMateriaPrima(null);
        }}
        onSave={handleSave}
        data={currentMateriaPrima}
        fields={formFields}
        title="Stock de Materia Prima"
      />
    </div>
  );
}
