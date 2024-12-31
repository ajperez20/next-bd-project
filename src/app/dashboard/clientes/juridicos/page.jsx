"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";

const columns = [
  { key: "cjd_nombre", label: "Nombre" },
  { key: "cjd_rif", label: "RIF" },
  { key: "cjd_direccion", label: "Dirección" },
  { key: "cjd_url_pagina", label: "Página Web" },
  { key: "cjd_descripcion", label: "Descripción" },
  {
    key: "cjd_fecha_ini_operaciones",
    label: "Inicio Operaciones",
    format: (value) => new Date(value).toLocaleDateString(),
  },
  { key: "lugar_completo", label: "Ubicación" },
];

const defaultClienteJuridico = {
  cjd_nombre: "",
  cjd_rif: "",
  cjd_direccion: "",
  cjd_url_pagina: "",
  cjd_descripcion: "",
  cjd_fecha_ini_operaciones: new Date().toISOString().split("T")[0],
  fk_lug_id: "",
};

export default function ClientesJuridicosPage() {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [formFields, setFormFields] = useState([
    {
      name: "cjd_nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Nombre de la empresa",
    },
    {
      name: "cjd_rif",
      label: "RIF",
      type: "text",
      required: true,
      placeholder: "J123456789",
      description: "RIF de la empresa (formato: J123456789)",
    },
    {
      name: "cjd_direccion",
      label: "Dirección",
      type: "text",
      required: true,
      placeholder: "Dirección completa",
    },
    {
      name: "cjd_url_pagina",
      label: "Página Web",
      type: "url",
      required: true,
      placeholder: "https://ejemplo.com",
    },
    {
      name: "cjd_descripcion",
      label: "Descripción",
      type: "textarea",
      required: true,
      placeholder: "Descripción de la empresa",
    },
    {
      name: "cjd_fecha_ini_operaciones",
      label: "Inicio de Operaciones",
      type: "date",
      required: true,
    },
    {
      name: "fk_lug_id",
      label: "Ubicación",
      type: "select",
      required: true,
      options: [],
    },
  ]);

  useEffect(() => {
    fetchClientes();
    fetchLugares();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch("/api/clientes/juridicos");
      if (!response.ok) throw new Error("Error al cargar clientes");
      const data = await response.json();

      const formattedData = data.map((cliente) => ({
        id: cliente.cjd_id,
        ...cliente,
      }));

      setClientes(formattedData);
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
      const lugares = await response.json();

      setFormFields((currentFields) =>
        currentFields.map((field) => {
          if (field.name === "fk_lug_id") {
            return {
              ...field,
              options: lugares.map((lugar) => ({
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

  const handleEdit = (cliente) => {
    if (cliente) {
      const formattedCliente = {
        cjd_id: cliente.id,
        cjd_nombre: cliente.cjd_nombre,
        cjd_rif: cliente.cjd_rif,
        cjd_direccion: cliente.cjd_direccion,
        cjd_url_pagina: cliente.cjd_url_pagina,
        cjd_descripcion: cliente.cjd_descripcion,
        cjd_fecha_ini_operaciones: new Date(cliente.cjd_fecha_ini_operaciones)
          .toISOString()
          .split("T")[0],
        fk_lug_id: cliente.fk_lug_id,
      };
      setCurrentCliente(formattedCliente);
    } else {
      setCurrentCliente(defaultClienteJuridico);
    }
    setShowModal(true);
  };

  const handleDelete = async (cliente) => {
    if (!confirm("¿Está seguro de eliminar este cliente?")) return;

    try {
      const response = await fetch(`/api/clientes/juridicos/${cliente.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar cliente");
      }

      fetchClientes();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  // continuación de src/app/dashboard/clientes/juridicos/page.jsx

  const handleSave = async (formData) => {
    try {
      const url = formData.cjd_id
        ? `/api/clientes/juridicos/${formData.cjd_id}`
        : "/api/clientes/juridicos";

      const response = await fetch(url, {
        method: formData.cjd_id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al guardar cliente");
      }

      setShowModal(false);
      fetchClientes();
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
        data={clientes}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Clientes Jurídicos"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentCliente(null);
        }}
        onSave={handleSave}
        data={currentCliente}
        fields={formFields}
        title="Cliente Jurídico"
      />
    </div>
  );
}
