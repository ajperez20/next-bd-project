"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";

const columns = [
  { key: "ctn_dni", label: "DNI" },
  { key: "ctn_nombre", label: "Nombre" },
  { key: "ctn_apellido", label: "Apellido" },
  { key: "ctn_direccion", label: "Dirección" },
  { key: "ctn_url_pagina", label: "Página Web" },
  {
    key: "ctn_fecha_ini_operaciones",
    label: "Inicio Operaciones",
    format: (value) => new Date(value).toLocaleDateString(),
  },
  { key: "lugar_completo", label: "Ubicación" },
];

const defaultClienteNatural = {
  ctn_nombre: "",
  ctn_apellido: "",
  ctn_dni: "",
  ctn_direccion: "",
  ctn_url_pagina: "",
  ctn_fecha_ini_operaciones: new Date().toISOString().split("T")[0],
  fk_lug_id: "",
};

export default function ClientesNaturalesPage() {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [formFields, setFormFields] = useState([
    {
      name: "ctn_dni",
      label: "DNI",
      type: "text",
      required: true,
      placeholder: "V12345678",
      description: "DNI del cliente (formato: V12345678)",
    },
    {
      name: "ctn_nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Nombre del cliente",
    },
    {
      name: "ctn_apellido",
      label: "Apellido",
      type: "text",
      required: true,
      placeholder: "Apellido del cliente",
    },
    {
      name: "ctn_direccion",
      label: "Dirección",
      type: "text",
      required: true,
      placeholder: "Dirección completa",
    },
    {
      name: "ctn_url_pagina",
      label: "Página Web",
      type: "url",
      required: true,
      placeholder: "https://ejemplo.com",
    },
    {
      name: "ctn_fecha_ini_operaciones",
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
      const response = await fetch("/api/clientes/naturales");
      if (!response.ok) throw new Error("Error al cargar clientes");
      const data = await response.json();

      const formattedData = data.map((cliente) => ({
        id: cliente.ctn_id,
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
        ctn_id: cliente.id,
        ctn_nombre: cliente.ctn_nombre,
        ctn_apellido: cliente.ctn_apellido,
        ctn_dni: cliente.ctn_dni,
        ctn_direccion: cliente.ctn_direccion,
        ctn_url_pagina: cliente.ctn_url_pagina,
        ctn_fecha_ini_operaciones: new Date(cliente.ctn_fecha_ini_operaciones)
          .toISOString()
          .split("T")[0],
        fk_lug_id: cliente.fk_lug_id,
      };
      setCurrentCliente(formattedCliente);
    } else {
      setCurrentCliente(defaultClienteNatural);
    }
    setShowModal(true);
  };

  const handleDelete = async (cliente) => {
    if (!confirm("¿Está seguro de eliminar este cliente?")) return;

    try {
      const response = await fetch(`/api/clientes/naturales/${cliente.id}`, {
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

  const handleSave = async (formData) => {
    try {
      const url = formData.ctn_id
        ? `/api/clientes/naturales/${formData.ctn_id}`
        : "/api/clientes/naturales";

      const response = await fetch(url, {
        method: formData.ctn_id ? "PUT" : "POST",
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
        title="Clientes Naturales"
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
        title="Cliente Natural"
      />
    </div>
  );
}
