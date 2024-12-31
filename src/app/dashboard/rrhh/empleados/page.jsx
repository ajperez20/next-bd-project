"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";
import EmpleadoDetalles from "@/components/empleados/EmpleadoDetalles";

const columns = [
  { key: "per_dni", label: "DNI" },
  { key: "per_nombre", label: "Nombre" },
  { key: "per_apellido", label: "Apellido" },
  { key: "per_direccion", label: "Dirección" },
  { key: "per_profesion", label: "Profesión" },
  {
    key: "per_experiencia",
    label: "Experiencia",
    format: (value) => `${value} años`,
  },
  {
    key: "per_fecha_contratacion",
    label: "Fecha Contratación",
    format: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: "lugar_completo",
    label: "Lugar",
  },
];

const initialFormFields = [
  {
    name: "per_dni",
    label: "DNI",
    type: "text",
    required: true,
    placeholder: "Ingrese el DNI",
    description: "Número de identificación del empleado (V123456789)",
  },
  {
    name: "per_nombre",
    label: "Nombre",
    type: "text",
    required: true,
    placeholder: "Ingrese el nombre",
  },
  {
    name: "per_apellido",
    label: "Apellido",
    type: "text",
    required: true,
    placeholder: "Ingrese el apellido",
  },
  {
    name: "per_direccion",
    label: "Dirección",
    type: "text",
    required: true,
    placeholder: "Ingrese la dirección completa",
  },
  {
    name: "per_experiencia",
    label: "Experiencia",
    type: "number",
    required: true,
    placeholder: "Años de experiencia",
    min: 0,
    description: "Años de experiencia en el campo",
  },
  {
    name: "per_profesion",
    label: "Profesión",
    type: "text",
    required: true,
    placeholder: "Ingrese la profesión",
  },
  {
    name: "fk_lug_id",
    label: "Lugar",
    type: "select",
    required: true,
    description: "Seleccione la ubicación del empleado",
    options: [],
  },
];

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [formFields, setFormFields] = useState(initialFormFields);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEmpleadoDetails, setSelectedEmpleadoDetails] = useState(null);

  useEffect(() => {
    fetchEmpleados();
    fetchLugares();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await fetch("/api/empleados");
      if (!response.ok) throw new Error("Error al cargar empleados");
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLugares = async () => {
    try {
      const response = await fetch("/api/lugares");
      if (!response.ok) throw new Error("Error al cargar lugares");
      const data = await response.json();

      setFormFields((currentFields) =>
        currentFields.map((field) => {
          if (field.name === "fk_lug_id") {
            return {
              ...field,
              options: data.map((lugar) => ({
                value: lugar.lug_id,
                label: lugar.lugar_completo,
                level: lugar.level,
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

  const handleEdit = (empleado) => {
    if (empleado) {
      // Mapear los datos del empleado al formato del formulario
      const formattedEmpleado = {
        per_id: empleado.per_id,
        per_dni: empleado.per_dni,
        per_nombre: empleado.per_nombre,
        per_apellido: empleado.per_apellido,
        per_direccion: empleado.per_direccion,
        per_experiencia: empleado.per_experiencia,
        per_profesion: empleado.per_profesion,
        fk_lug_id: empleado.fk_lug_id,
      };
      setSelectedEmpleado(formattedEmpleado);
    } else {
      setSelectedEmpleado(null);
    }
    setShowModal(true);
  };

  const handleView = (empleado) => {
    setSelectedEmpleadoDetails(empleado);
    setShowDetails(true);
  };

  const handleDelete = async (empleado) => {
    if (!confirm("¿Está seguro de eliminar este empleado?")) return;

    try {
      const response = await fetch(`/api/empleados/${empleado.per_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar empleado");
      }

      fetchEmpleados();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al guardar empleado");
      }

      setShowModal(false);
      fetchEmpleados();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
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
        onView={handleView} // Agregar esta prop
        title="Gestión de Empleados"
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
        title="Empleado"
      />

      {showDetails && (
        <EmpleadoDetalles
          isOpen={showDetails}
          onClose={() => {
            setShowDetails(false);
            setSelectedEmpleadoDetails(null);
          }}
          empleado={selectedEmpleadoDetails}
        />
      )}
    </div>
  );
}
