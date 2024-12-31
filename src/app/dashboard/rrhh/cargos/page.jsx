"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";

const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  {
    key: "cantidad_empleados",
    label: "Empleados",
    format: (value) => value || 0,
  },
];

const formFields = [
  { name: "nombre", label: "Nombre", type: "text", required: true },
  { name: "descripcion", label: "Descripción", type: "text", required: true },
];

export default function CargosPage() {
  const [cargos, setCargos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCargo, setSelectedCargo] = useState(null);

  useEffect(() => {
    fetchCargos();
  }, []);

  const fetchCargos = async () => {
    try {
      const response = await fetch("/api/cargos");
      const data = await response.json();
      setCargos(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (cargo) => {
    setSelectedCargo(cargo);
    setShowModal(true);
  };

  const handleDelete = async (cargo) => {
    if (!confirm("¿Está seguro de eliminar este cargo?")) return;

    try {
      const response = await fetch(`/api/cargos/${cargo.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCargos();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSave = async (formData) => {
    try {
      const url = formData.id ? `/api/cargos/${formData.id}` : "/api/cargos";

      const method = formData.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        fetchCargos();
      }
    } catch (error) {
      console.error("Error:", error);
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
        data={cargos}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Gestión de Cargos"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCargo(null);
        }}
        onSave={handleSave}
        data={selectedCargo}
        fields={formFields}
      />
    </div>
  );
}
