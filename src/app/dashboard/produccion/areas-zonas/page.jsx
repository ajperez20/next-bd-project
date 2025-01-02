"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";
import { Tab } from "@headlessui/react";

// Columnas para Áreas
const columnasAreas = [
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { key: "sede", label: "Sede" },
  {
    key: "zonas",
    label: "Zonas",
    format: (value) => value || 0,
  },
];

// Columnas para Zonas
const columnasZonas = [
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { key: "area", label: "Área" },
  { key: "sede", label: "Sede" },
];

const defaultArea = {
  are_nombre: "",
  are_descripcion: "",
  fk_sed_id: "",
};

const defaultZona = {
  zon_nombre: "",
  zon_descripcion: "",
  fk_are_id: "",
};

export default function AreasZonasPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [areas, setAreas] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formFields, setFormFields] = useState({
    areas: [
      {
        name: "are_nombre",
        label: "Nombre",
        type: "text",
        required: true,
        placeholder: "Nombre del área",
      },
      {
        name: "are_descripcion",
        label: "Descripción",
        type: "textarea",
        required: true,
        placeholder: "Descripción del área",
      },
      {
        name: "fk_sed_id",
        label: "Sede",
        type: "select",
        required: true,
        options: [],
      },
    ],
    zonas: [
      {
        name: "zon_nombre",
        label: "Nombre",
        type: "text",
        required: true,
        placeholder: "Nombre de la zona",
      },
      {
        name: "zon_descripcion",
        label: "Descripción",
        type: "textarea",
        required: true,
        placeholder: "Descripción de la zona",
      },
      {
        name: "fk_are_id",
        label: "Área",
        type: "select",
        required: true,
        options: [],
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchAreas(), fetchZonas(), fetchSedes()]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await fetch("/api/areas");
      if (!response.ok) throw new Error("Error al cargar áreas");
      const data = await response.json();

      const areasFormateadas = data.map((area) => ({
        id: area.are_id,
        nombre: area.are_nombre,
        descripcion: area.are_descripcion,
        sede: area.sede_nombre,
        zonas: area.cantidad_zonas,
        // Datos originales para el formulario
        are_id: area.are_id,
        are_nombre: area.are_nombre,
        are_descripcion: area.are_descripcion,
        fk_sed_id: area.fk_sed_id,
      }));

      setAreas(areasFormateadas);

      // Actualizar opciones para el formulario de zonas
      setFormFields((prev) => ({
        ...prev,
        zonas: prev.zonas.map((field) => {
          if (field.name === "fk_are_id") {
            return {
              ...field,
              options: areasFormateadas.map((area) => ({
                value: area.are_id,
                label: `${area.nombre} (${area.sede})`,
              })),
            };
          }
          return field;
        }),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchZonas = async () => {
    try {
      const response = await fetch("/api/zonas");
      if (!response.ok) throw new Error("Error al cargar zonas");
      const data = await response.json();

      const zonasFormateadas = data.map((zona) => ({
        id: zona.zon_id,
        nombre: zona.zon_nombre,
        descripcion: zona.zon_descripcion,
        area: zona.area_nombre,
        sede: zona.sede_nombre,
        // Datos originales
        zon_id: zona.zon_id,
        zon_nombre: zona.zon_nombre,
        zon_descripcion: zona.zon_descripcion,
        fk_are_id: zona.fk_are_id,
      }));

      setZonas(zonasFormateadas);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSedes = async () => {
    try {
      const response = await fetch("/api/sedes");
      if (!response.ok) throw new Error("Error al cargar sedes");
      const sedes = await response.json();

      setFormFields((prev) => ({
        ...prev,
        areas: prev.areas.map((field) => {
          if (field.name === "fk_sed_id") {
            return {
              ...field,
              options: sedes.map((sede) => ({
                value: sede.sed_id,
                label: sede.sed_nombre,
              })),
            };
          }
          return field;
        }),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item || (selectedTab === 0 ? defaultArea : defaultZona));
    setShowModal(true);
  };

  const handleDelete = async (item) => {
    const isArea = selectedTab === 0;

    if (isArea && item.zonas > 0) {
      alert("No se puede eliminar un área con zonas asociadas");
      return;
    }

    if (
      !confirm(
        `¿Está seguro de eliminar ${isArea ? "esta área" : "esta zona"}?`,
      )
    )
      return;

    try {
      const response = await fetch(
        `/api/${isArea ? "areas" : "zonas"}/${isArea ? item.are_id : item.zon_id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar");
      }

      fetchData();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleSave = async (formData) => {
    const isArea = selectedTab === 0;
    try {
      const url = formData[isArea ? "are_id" : "zon_id"]
        ? `/api/${isArea ? "areas" : "zonas"}/${formData[isArea ? "are_id" : "zon_id"]}`
        : `/api/${isArea ? "areas" : "zonas"}`;

      const response = await fetch(url, {
        method: formData[isArea ? "are_id" : "zon_id"] ? "PUT" : "POST",
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
      fetchData();
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
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
              ${
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              }`
            }
          >
            Áreas
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
              ${
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              }`
            }
          >
            Zonas
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <DataList
              data={areas}
              columns={columnasAreas}
              onEdit={handleEdit}
              onDelete={handleDelete}
              title="Gestión de Áreas"
            />
          </Tab.Panel>
          <Tab.Panel>
            <DataList
              data={zonas}
              columns={columnasZonas}
              onEdit={handleEdit}
              onDelete={handleDelete}
              title="Gestión de Zonas"
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentItem(null);
        }}
        onSave={handleSave}
        data={currentItem}
        fields={selectedTab === 0 ? formFields.areas : formFields.zonas}
        title={selectedTab === 0 ? "Área" : "Zona"}
      />
    </div>
  );
}
