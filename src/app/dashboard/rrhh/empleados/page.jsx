"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";

// Definición de columnas para la tabla
const columns = [
  { key: "per_dni", label: "DNI" },
  { key: "per_nombre", label: "Nombre" },
  { key: "per_apellido", label: "Apellido" },
  { key: "per_profesion", label: "Profesión" },
  {
    key: "per_experiencia",
    label: "Experiencia",
    format: (value) => `${value} años`,
  },
  { key: "lugar", label: "Lugar" },
  {
    key: "per_fecha_contratacion",
    label: "Fecha Contratación",
    format: (value) => new Date(value).toLocaleDateString(),
  },
];

// Definición de campos para el formulario
const formFields = [
  { name: "per_dni", label: "DNI", type: "number", required: true },
  { name: "per_nombre", label: "Nombre", type: "text", required: true },
  { name: "per_apellido", label: "Apellido", type: "text", required: true },
  { name: "per_direccion", label: "Dirección", type: "text", required: true },
  {
    name: "per_experiencia",
    label: "Experiencia (años)",
    type: "number",
    required: true,
  },
  { name: "per_profesion", label: "Profesión", type: "text", required: true },
  {
    name: "fk_lug_id",
    label: "Lugar",
    type: "select",
    required: true,
    options: [],
  },
];

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await fetch("/api/empleados");
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (empleado) => {
    setSelectedEmpleado(empleado);
    setShowModal(true);
  };

  const handleDelete = async (empleado) => {
    if (!confirm("¿Está seguro de eliminar este empleado?")) return;

    try {
      const response = await fetch(`/api/empleados/${empleado.per_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchEmpleados();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSave = async (formData) => {
    try {
      const url = formData.per_id
        ? `/api/empleados/${formData.per_id}`
        : "/api/empleados";

      const method = formData.per_id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        fetchEmpleados();
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
        data={empleados}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Gestión de Empleados"
        idField="per_id"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedEmpleado(null);
        }}
        onSave={handleSave}
        data={selectedEmpleado}
        fields={formFields}
      />
    </div>
  );
}
