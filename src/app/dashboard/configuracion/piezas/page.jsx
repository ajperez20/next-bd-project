"use client";

import { useState, useEffect } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";
import CaracteristicasPiezaField from "@/components/piezas/CaracteristicasPiezaField";
import MaterialesPiezaField from "@/components/piezas/MaterialesPiezaField";

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { key: "tipo_nombre", label: "Tipo de Pieza" },
  {
    key: "cantidad_caracteristicas",
    label: "Características",
    format: (value) => value || 0,
  },
  {
    key: "cantidad_materiales",
    label: "Materiales",
    format: (value) => value || 0,
  },
  {
    key: "cantidad_procesos",
    label: "Procesos",
    format: (value) => value || 0,
  },
];

const defaultPieza = {
  nombre: "",
  descripcion: "",
  tipo_id: "",
  caracteristicas: [],
  materiales: [],
};

const initialFormFields = [
  {
    name: "nombre",
    label: "Nombre",
    type: "text",
    required: true,
    placeholder: "Nombre de la pieza",
    maxLength: 50,
  },
  {
    name: "descripcion",
    label: "Descripción",
    type: "textarea",
    required: true,
    placeholder: "Descripción detallada de la pieza",
    maxLength: 255,
  },
  {
    name: "tipo_id",
    label: "Tipo de Pieza",
    type: "select",
    required: true,
    options: [],
  },
  {
    name: "caracteristicas",
    label: "Características",
    type: "caracteristicasPieza",
    description: "Agregue las características de la pieza",
  },
  {
    name: "materiales",
    label: "Materiales y Procesos",
    type: "materialesPieza",
    description: "Agregue los materiales y procesos necesarios",
  },
];

export default function PiezasPage() {
  const [piezas, setPiezas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPieza, setCurrentPieza] = useState(null);
  const [formFields, setFormFields] = useState(initialFormFields);

  // continuación de src/app/dashboard/configuracion/piezas/page.jsx

  useEffect(() => {
    fetchPiezas();
    fetchDependencies();
  }, []);

  const fetchPiezas = async () => {
    try {
      const response = await fetch("/api/piezas");
      if (!response.ok) throw new Error("Error al cargar piezas");
      const data = await response.json();
      setPiezas(
        data.map((pieza) => ({
          id: pieza.id,
          ...pieza,
        })),
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDependencies = async () => {
    try {
      const [tiposRes, caracteristicasRes, materialesRes, procesosRes] =
        await Promise.all([
          fetch("/api/piezas/tipos"),
          fetch("/api/piezas/caracteristicas"),
          fetch("/api/piezas/materiales"),
          fetch("/api/piezas/procesos"),
        ]);

      const [tipos, caracteristicas, materiales, procesos] = await Promise.all([
        tiposRes.json(),
        caracteristicasRes.json(),
        materialesRes.json(),
        procesosRes.json(),
      ]);

      setFormFields((prevFields) =>
        prevFields.map((field) => {
          switch (field.name) {
            case "tipo_id":
              return {
                ...field,
                options: tipos.map((tipo) => ({
                  value: tipo.id,
                  label: tipo.nombre,
                })),
              };
            case "caracteristicas":
              return {
                ...field,
                options: caracteristicas.map((c) => ({
                  value: c.id,
                  label: c.nombre,
                })),
              };
            case "materiales":
              return {
                ...field,
                materialesOptions: materiales.map((m) => ({
                  value: m.id,
                  label: m.nombre,
                })),
                procesosOptions: procesos.map((p) => ({
                  value: p.id,
                  label: p.nombre,
                })),
              };
            default:
              return field;
          }
        }),
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async (pieza) => {
    if (pieza) {
      try {
        const response = await fetch(`/api/piezas/${pieza.id}`);
        if (!response.ok)
          throw new Error("Error al cargar detalles de la pieza");
        const piezaDetallada = await response.json();

        setCurrentPieza({
          id: piezaDetallada.id,
          nombre: piezaDetallada.nombre,
          descripcion: piezaDetallada.descripcion,
          tipo_id: piezaDetallada.tipo_id,
          caracteristicas: piezaDetallada.caracteristicas.map((c) => ({
            caracteristica_id: c.id,
            unidad_medida: c.unidad_medida,
            valor: c.valor,
          })),
          materiales: piezaDetallada.materiales.map((m) => ({
            material_id: m.id,
            proceso_id: m.proceso_id,
            cantidad: m.cantidad,
            unidad_medida: m.unidad_medida,
          })),
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar los detalles de la pieza");
        return;
      }
    } else {
      setCurrentPieza(defaultPieza);
    }
    setShowModal(true);
  };

  const handleDelete = async (pieza) => {
    if (pieza.cantidad_procesos > 0) {
      alert("No se puede eliminar una pieza que tiene procesos asociados");
      return;
    }

    if (!confirm("¿Está seguro de eliminar esta pieza?")) return;

    try {
      const response = await fetch(`/api/piezas/${pieza.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar");
      }

      fetchPiezas();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      // Validar datos
      if (formData.caracteristicas.length === 0) {
        throw new Error("Debe agregar al menos una característica");
      }
      if (formData.materiales.length === 0) {
        throw new Error("Debe agregar al menos un material");
      }

      const url = formData.id ? `/api/piezas/${formData.id}` : "/api/piezas";

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
      fetchPiezas();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  // Función para renderizar campos personalizados en el EditModal
  const renderCustomField = (field, value, onChange) => {
    switch (field.type) {
      case "caracteristicasPieza":
        return (
          <CaracteristicasPiezaField
            value={value}
            onChange={onChange}
            options={field.options}
            error={field.error}
          />
        );
      case "materialesPieza":
        return (
          <MaterialesPiezaField
            value={value}
            onChange={onChange}
            materialesOptions={field.materialesOptions}
            procesosOptions={field.procesosOptions}
            error={field.error}
          />
        );
      default:
        return null;
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
        data={piezas}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Piezas y Componentes"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentPieza(null);
        }}
        onSave={handleSave}
        data={currentPieza}
        fields={formFields}
        title="Pieza"
        renderCustomField={renderCustomField}
      />
    </div>
  );
}
