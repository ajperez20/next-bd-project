"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";

const columns = [
  { key: "com_nombre", label: "Nombre" },
  { key: "com_direccion", label: "Dirección" },
  { key: "com_url_pagina", label: "Página Web" },
  {
    key: "com_fechai_operaciones",
    label: "Inicio Operaciones",
    format: (value) => new Date(value).toLocaleDateString(),
  },
  { key: "materia_prima", label: "Materia Prima" },
  { key: "lugar_completo", label: "Ubicación" },
];

const defaultProveedor = {
  com_nombre: "",
  com_direccion: "",
  com_url_pagina: "",
  com_fechai_operaciones: new Date().toISOString().split("T")[0],
  fk_mtp_id: "",
  fk_lug_id: "",
};

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProveedor, setCurrentProveedor] = useState(null);
  const [formFields, setFormFields] = useState([
    {
      name: "com_nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Nombre del proveedor",
      description: "Nombre comercial del proveedor",
    },
    {
      name: "com_direccion",
      label: "Dirección",
      type: "text",
      required: true,
      placeholder: "Dirección completa",
      description: "Dirección física del proveedor",
    },
    {
      name: "com_url_pagina",
      label: "Página Web",
      type: "url",
      required: true,
      placeholder: "https://ejemplo.com",
      description: "URL del sitio web del proveedor",
    },
    {
      name: "com_fechai_operaciones",
      label: "Inicio de Operaciones",
      type: "date",
      required: true,
      description: "Fecha en que el proveedor comenzó operaciones",
    },
    {
      name: "fk_mtp_id",
      label: "Materia Prima",
      type: "select",
      required: true,
      options: [],
      description: "Tipo de materia prima que provee",
    },
    {
      name: "fk_lug_id",
      label: "Ubicación",
      type: "select",
      required: true,
      options: [],
      description: "Ubicación del proveedor",
    },
  ]);

  useEffect(() => {
    fetchProveedores();
    fetchDependencies();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await fetch("/api/proveedores");
      if (!response.ok) throw new Error("Error al cargar proveedores");
      const data = await response.json();

      const formattedData = data.map((proveedor) => ({
        id: proveedor.com_id,
        ...proveedor,
      }));

      setProveedores(formattedData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDependencies = async () => {
    try {
      const [materiaPrimaRes, lugaresRes] = await Promise.all([
        fetch("/api/materia-prima"),
        fetch("/api/lugares"),
      ]);

      if (!materiaPrimaRes.ok || !lugaresRes.ok) {
        throw new Error("Error al cargar datos dependientes");
      }

      const [materiaPrima, lugares] = await Promise.all([
        materiaPrimaRes.json(),
        lugaresRes.json(),
      ]);

      setFormFields((currentFields) =>
        currentFields.map((field) => {
          if (field.name === "fk_mtp_id") {
            return {
              ...field,
              options: materiaPrima.map((mp) => ({
                value: parseInt(mp.id), // Asegurar que es número
                label: mp.rpm_nombre,
                description: mp.rpm_descripcion,
              })),
            };
          }
          if (field.name === "fk_lug_id") {
            return {
              ...field,
              options: lugares.map((lugar) => ({
                value: parseInt(lugar.lug_id), // Asegurar que es número
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

  const handleEdit = (proveedor) => {
    if (proveedor) {
      const formattedProveedor = {
        com_id: proveedor.id,
        com_nombre: proveedor.com_nombre,
        com_direccion: proveedor.com_direccion,
        com_url_pagina: proveedor.com_url_pagina,
        com_fechai_operaciones: new Date(proveedor.com_fechai_operaciones)
          .toISOString()
          .split("T")[0],
        fk_mtp_id: proveedor.fk_mtp_id,
        fk_lug_id: proveedor.fk_lug_id,
      };
      setCurrentProveedor(formattedProveedor);
    } else {
      setCurrentProveedor(defaultProveedor);
    }
    setShowModal(true);
  };

  const handleDelete = async (proveedor) => {
    if (!confirm("¿Está seguro de eliminar este proveedor?")) return;

    try {
      const response = await fetch(`/api/proveedores/${proveedor.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar proveedor");
      }

      fetchProveedores();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      const url = formData.com_id
        ? `/api/proveedores/${formData.com_id}`
        : "/api/proveedores";

      const response = await fetch(url, {
        method: formData.com_id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al guardar proveedor");
      }

      setShowModal(false);
      fetchProveedores();
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
        data={proveedores}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Gestión de Proveedores"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentProveedor(null);
        }}
        onSave={handleSave}
        data={currentProveedor}
        fields={formFields}
        title="Proveedor"
      />
    </div>
  );
}
