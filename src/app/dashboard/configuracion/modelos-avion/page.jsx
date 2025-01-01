"use client";

import CaracteristicasArrayField from "@/components/aviones/CaracteristicasArrayField";
import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { key: "tipo_nombre", label: "Tipo de Avión" },
  {
    key: "cantidad_caracteristicas",
    label: "Características",
    format: (value) => value || 0,
  },
  {
    key: "cantidad_procesos",
    label: "Procesos",
    format: (value) => value || 0,
  },
  {
    key: "cantidad_pruebas",
    label: "Pruebas",
    format: (value) => value || 0,
  },
];

const defaultModelo = {
  nombre: "",
  descripcion: "",
  tipo_id: "",
  caracteristicas: [],
};

const initialFormFields = [
  {
    name: "nombre",
    label: "Nombre",
    type: "text",
    required: true,
    placeholder: "Nombre del modelo",
    maxLength: 50,
  },
  {
    name: "descripcion",
    label: "Descripción",
    type: "textarea",
    required: true,
    placeholder: "Descripción detallada del modelo",
    maxLength: 255,
  },
  {
    name: "tipo_id",
    label: "Tipo de Avión",
    type: "select",
    required: true,
    options: [],
  },
  {
    name: "caracteristicas",
    label: "Características",
    type: "caracteristicasArray",
    options: [],
    description: "Agregue las características del modelo",
  },
];

export default function ModelosAvionPage() {
  const [modelos, setModelos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentModelo, setCurrentModelo] = useState(null);
  const [formFields, setFormFields] = useState(initialFormFields);

  useEffect(() => {
    fetchModelos();
    fetchDependencies();
  }, []);

  const fetchModelos = async () => {
    try {
      const response = await fetch("/api/aviones/modelos");
      if (!response.ok) throw new Error("Error al cargar modelos");
      const data = await response.json();
      setModelos(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDependencies = async () => {
    try {
      const [tiposRes, caracteristicasRes] = await Promise.all([
        fetch("/api/aviones"),
        fetch("/api/aviones/caracteristicas"),
      ]);

      const [tipos, caracteristicas] = await Promise.all([
        tiposRes.json(),
        caracteristicasRes.json(),
      ]);

      // Actualizar las opciones en los formFields
      setFormFields((prevFields) =>
        prevFields.map((field) => {
          if (field.name === "tipo_id") {
            return {
              ...field,
              options: tipos.map((tipo) => ({
                value: tipo.id,
                label: tipo.nombre,
              })),
            };
          }
          if (field.name === "caracteristicas") {
            return {
              ...field,
              options: caracteristicas.map((caract) => ({
                value: caract.id,
                label: caract.nombre,
              })),
            };
          }
          return field;
        }),
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async (modelo) => {
    if (modelo) {
      try {
        const response = await fetch(`/api/aviones/modelos/${modelo.id}`);
        if (!response.ok)
          throw new Error("Error al cargar detalles del modelo");
        const modeloDetallado = await response.json();

        setCurrentModelo({
          id: modeloDetallado.id,
          nombre: modeloDetallado.nombre,
          descripcion: modeloDetallado.descripcion,
          tipo_id: modeloDetallado.tipo_id,
          caracteristicas: modeloDetallado.caracteristicas.map((c) => ({
            caracteristica_id: c.id,
            unidad_medida: c.unidad_medida,
            valor: c.valor,
          })),
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar los detalles del modelo");
        return;
      }
    } else {
      setCurrentModelo(defaultModelo);
    }
    setShowModal(true);
  };

  const handleDelete = async (modelo) => {
    if (modelo.cantidad_procesos > 0 || modelo.cantidad_pruebas > 0) {
      alert(
        "No se puede eliminar un modelo que tiene procesos o pruebas asociadas",
      );
      return;
    }

    if (!confirm("¿Está seguro de eliminar este modelo?")) return;

    try {
      const response = await fetch(`/api/aviones/modelos/${modelo.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar");
      }

      fetchModelos();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      const url = formData.id
        ? `/api/aviones/modelos/${formData.id}`
        : "/api/aviones/modelos";

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
      fetchModelos();
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

  const renderCustomField = (field, value, onChange) => {
    if (field.type === "caracteristicasArray") {
      return (
        <CaracteristicasArrayField
          value={value}
          onChange={onChange}
          options={field.options}
        />
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <DataList
        data={modelos}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Modelos de Avión"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentModelo(null);
        }}
        onSave={handleSave}
        data={currentModelo}
        fields={formFields}
        title="Modelo de Avión"
        renderCustomField={renderCustomField}
      />
    </div>
  );
}
