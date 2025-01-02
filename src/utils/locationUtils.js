const fetchLugares = async () => {
  try {
    const response = await fetch("/api/lugares");
    if (!response.ok) throw new Error("Error al cargar lugares");
    const lugares = await response.json();

    // Formatear los lugares para uso en selects
    return lugares.map((lugar) => ({
      value: lugar.lug_id,
      label: lugar.ubicacion_completa || lugar.lug_nombre,
      level: lugar.nivel || 1,
      // Mantener datos originales por si se necesitan
      ...lugar,
    }));
  } catch (error) {
    console.error("Error al cargar lugares:", error);
    throw error;
  }
};

// Función para actualizar campos de formulario con lugares
const updateFormFieldsWithLocations = (fields, lugares) => {
  return fields.map((field) => {
    if (field.name === "fk_lug_id") {
      return {
        ...field,
        options: lugares.map((lugar) => ({
          value: lugar.value,
          label: lugar.label,
          level: lugar.level,
        })),
      };
    }
    return field;
  });
};

export const locationUtils = {
  fetchLugares,
  updateFormFieldsWithLocations,
};
