// app/dashboard/produccion/sedes/page.jsx
"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";
import { locationUtils } from "@/utils/locationUtils";

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "direccion", label: "Dirección" },
  { key: "descripcion", label: "Descripción" },
  { key: "ubicacion", label: "Ubicación" },
  {
    key: "areas",
    label: "Áreas",
    format: (value) => value || 0,
  },
];

const defaultSede = {
  sed_nombre: "",
  sed_direccion: "",
  sed_descripcion: "",
  fk_lug_id: "",
};

export default function SedesPage() {
  const [sedes, setSedes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentSede, setCurrentSede] = useState(null);
  const [formFields, setFormFields] = useState([
    {
      name: "sed_nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Nombre de la sede",
    },
    {
      name: "sed_direccion",
      label: "Dirección",
      type: "text",
      required: true,
      placeholder: "Dirección de la sede",
    },
    {
      name: "sed_descripcion",
      label: "Descripción",
      type: "textarea",
      required: true,
      placeholder: "Descripción de la sede",
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
    fetchSedes();
    fetchLugares();
  }, []);

  const fetchSedes = async () => {
    try {
      const response = await fetch("/api/sedes");
      if (!response.ok) throw new Error("Error al cargar sedes");
      const data = await response.json();

      // Formatear los datos para el DataList
      const sedesFormateadas = data.map((sede) => ({
        id: sede.sed_id,
        nombre: sede.sed_nombre,
        direccion: sede.sed_direccion,
        descripcion: sede.sed_descripcion,
        ubicacion: sede.ubicacion_completa,
        areas: sede.cantidad_areas,
        // Mantener los datos originales para el formulario
        sed_id: sede.sed_id,
        sed_nombre: sede.sed_nombre,
        sed_direccion: sede.sed_direccion,
        sed_descripcion: sede.sed_descripcion,
        fk_lug_id: sede.fk_lug_id,
      }));

      setSedes(sedesFormateadas);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLugares = async () => {
    try {
      const lugares = await locationUtils.fetchLugares();
      setFormFields((fields) =>
        locationUtils.updateFormFieldsWithLocations(fields, lugares),
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (sede) => {
    if (sede) {
      setCurrentSede({
        sed_id: sede.sed_id,
        sed_nombre: sede.sed_nombre,
        sed_direccion: sede.sed_direccion,
        sed_descripcion: sede.sed_descripcion,
        fk_lug_id: sede.fk_lug_id,
      });
    } else {
      setCurrentSede(defaultSede);
    }
    setShowModal(true);
  };

  const handleDelete = async (sede) => {
    if (sede.areas > 0) {
      alert("No se puede eliminar una sede que tiene áreas asociadas");
      return;
    }

    if (!confirm("¿Está seguro de eliminar esta sede?")) return;

    try {
      const response = await fetch(`/api/sedes/${sede.sed_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar");
      }

      fetchSedes();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      const url = formData.sed_id
        ? `/api/sedes/${formData.sed_id}`
        : "/api/sedes";

      const response = await fetch(url, {
        method: formData.sed_id ? "PUT" : "POST",
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
      fetchSedes();
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
        data={sedes}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Gestión de Sedes"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentSede(null);
        }}
        onSave={handleSave}
        data={currentSede}
        fields={formFields}
        title="Sede"
      />
    </div>
  );
}
