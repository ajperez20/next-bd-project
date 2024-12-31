"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";

const columns = [
  { key: "rol_nombre", label: "Nombre" },
  { key: "rol_descripcion", label: "Descripción" },
  {
    key: "cantidad_usuarios",
    label: "Usuarios",
    format: (value) => value || 0,
  },
];

const defaultRol = {
  rol_nombre: "",
  rol_descripcion: "",
};

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentRol, setCurrentRol] = useState(null);

  const formFields = [
    {
      name: "rol_nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Nombre del rol",
      description:
        "El nombre del rol será convertido a mayúsculas automáticamente",
      pattern: "^[A-Za-z ]+$",
      maxLength: 30,
    },
    {
      name: "rol_descripcion",
      label: "Descripción",
      type: "textarea",
      required: true,
      placeholder: "Descripción del rol",
      maxLength: 255,
    },
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/roles");
      if (!response.ok) throw new Error("Error al cargar roles");
      const data = await response.json();

      const formattedData = data.map((rol) => ({
        id: rol.rol_id,
        ...rol,
      }));

      setRoles(formattedData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (rol) => {
    if (rol) {
      const formattedRol = {
        rol_id: rol.id,
        rol_nombre: rol.rol_nombre,
        rol_descripcion: rol.rol_descripcion,
      };
      setCurrentRol(formattedRol);
    } else {
      setCurrentRol(defaultRol);
    }
    setShowModal(true);
  };

  const handleDelete = async (rol) => {
    // No permitir eliminar roles con usuarios asignados
    if (rol.cantidad_usuarios > 0) {
      alert("No se puede eliminar un rol que tiene usuarios asignados");
      return;
    }

    if (!confirm("¿Está seguro de eliminar este rol?")) return;

    try {
      const response = await fetch(`/api/roles/${rol.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar rol");
      }

      fetchRoles();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      // Validar que el nombre solo contenga letras y espacios
      if (!formData.rol_nombre.match(/^[A-Za-z ]+$/)) {
        throw new Error(
          "El nombre del rol solo puede contener letras y espacios",
        );
      }

      const url = formData.rol_id
        ? `/api/roles/${formData.rol_id}`
        : "/api/roles";

      const response = await fetch(url, {
        method: formData.rol_id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al guardar rol");
      }

      setShowModal(false);
      fetchRoles();
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
        data={roles}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Roles del Sistema"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentRol(null);
        }}
        onSave={handleSave}
        data={currentRol}
        fields={formFields}
        title="Rol"
      />
    </div>
  );
}
