"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  {
    key: "cantidad_modelos",
    label: "Modelos",
    format: (value) => value || 0,
  },
];

const defaultTipoAvion = {
  nombre: "",
  descripcion: "",
};

export default function TiposAvionPage() {
  const [tiposAvion, setTiposAvion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentTipoAvion, setCurrentTipoAvion] = useState(null);

  const formFields = [
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Nombre del tipo de avión",
      maxLength: 50,
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      required: true,
      placeholder: "Descripción detallada del tipo de avión",
      maxLength: 255,
    },
  ];

  useEffect(() => {
    fetchTiposAvion();
  }, []);

  const fetchTiposAvion = async () => {
    try {
      const response = await fetch("/api/aviones");
      if (!response.ok) throw new Error("Error al cargar tipos de avión");
      const data = await response.json();
      setTiposAvion(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (tipoAvion) => {
    setCurrentTipoAvion(tipoAvion || defaultTipoAvion);
    setShowModal(true);
  };

  const handleDelete = async (tipoAvion) => {
    if (tipoAvion.cantidad_modelos > 0) {
      alert(
        "No se puede eliminar un tipo de avión que tiene modelos asociados",
      );
      return;
    }

    if (!confirm("¿Está seguro de eliminar este tipo de avión?")) return;

    try {
      const response = await fetch(`/api/aviones/${tipoAvion.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar");
      }

      fetchTiposAvion();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      const url = formData.id ? `/api/aviones/${formData.id}` : "/api/aviones";

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
      fetchTiposAvion();
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
        data={tiposAvion}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Tipos de Avión"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentTipoAvion(null);
        }}
        onSave={handleSave}
        data={currentTipoAvion}
        fields={formFields}
        title="Tipo de Avión"
      />
    </div>
  );
}
