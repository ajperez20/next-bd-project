"use client";

import { useState, useEffect, useCallback } from "react";
import DataList from "@/components/DataList";
import EditModal from "@/components/EditModal";

const columns = [
  { key: "usu_nombre_usuario", label: "Usuario" },
  { key: "usu_email", label: "Email" },
  { key: "rol_nombre", label: "Rol" },
  { key: "entidad_nombre", label: "Nombre" },
  { key: "tipo_usuario", label: "Tipo" },
];

const defaultUsuario = {
  usu_nombre_usuario: "",
  usu_email: "",
  usu_contrasena: "",
  fk_rol_id: "",
  fk_per_id: "",
  fk_cjd_id: "",
  fk_ctn_id: "",
  fk_com_id: "",
};

const initialFormFields = [
  {
    name: "usu_nombre_usuario",
    label: "Usuario",
    type: "text",
    required: true,
    placeholder: "Nombre de usuario",
    maxLength: 30,
  },
  {
    name: "usu_contrasena",
    label: "Contraseña",
    type: "password",
    required: true,
    placeholder: "Contraseña",
    maxLength: 30,
  },
  {
    name: "usu_email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "correo@ejemplo.com",
    maxLength: 60,
  },
  {
    name: "fk_rol_id",
    label: "Rol",
    type: "select",
    required: true,
    options: [],
  },
  {
    name: "tipo_entidad",
    label: "Tipo de Usuario",
    type: "select",
    required: true,
    options: [
      { value: "empleado", label: "Empleado" },
      { value: "clienteJuridico", label: "Cliente Jurídico" },
      { value: "clienteNatural", label: "Cliente Natural" },
      { value: "proveedor", label: "Proveedor" },
    ],
  },
  {
    name: "entidad_id",
    label: "Seleccionar Usuario",
    type: "select",
    required: true,
    options: [],
    depends_on: "tipo_entidad",
  },
];

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentUsuario, setCurrentUsuario] = useState(null);
  const [formFields, setFormFields] = useState(initialFormFields);

  const fetchUsuarios = useCallback(async () => {
    try {
      const response = await fetch("/api/usuarios");
      if (!response.ok) throw new Error("Error al cargar usuarios");
      const data = await response.json();
      setUsuarios(
        data.map((usuario) => ({
          id: usuario.usu_id,
          ...usuario,
        })),
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchDependencies = useCallback(async () => {
    try {
      const [rolesRes, empleadosRes, cjRes, cnRes, provRes] = await Promise.all(
        [
          fetch("/api/roles"),
          fetch("/api/empleados"),
          fetch("/api/clientes/juridicos"),
          fetch("/api/clientes/naturales"),
          fetch("/api/proveedores"),
        ],
      );

      const [roles, empleados, clientesJ, clientesN, proveedores] =
        await Promise.all([
          rolesRes.json(),
          empleadosRes.json(),
          cjRes.json(),
          cnRes.json(),
          provRes.json(),
        ]);

      setFormFields((prevFields) =>
        prevFields.map((field) => {
          if (field.name === "fk_rol_id") {
            return {
              ...field,
              options: roles.map((rol) => ({
                value: rol.rol_id,
                label: rol.rol_nombre,
              })),
            };
          }
          if (field.name === "entidad_id") {
            return {
              ...field,
              optionsMap: {
                empleado: empleados.map((emp) => ({
                  value: emp.id,
                  label: `${emp.per_nombre} ${emp.per_apellido}`,
                })),
                clienteJuridico: clientesJ.map((cj) => ({
                  value: cj.id,
                  label: cj.cjd_nombre,
                })),
                clienteNatural: clientesN.map((cn) => ({
                  value: cn.id,
                  label: `${cn.ctn_nombre} ${cn.ctn_apellido}`,
                })),
                proveedor: proveedores.map((prov) => ({
                  value: prov.id,
                  label: prov.com_nombre,
                })),
              },
            };
          }
          return field;
        }),
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
    fetchDependencies();
  }, [fetchUsuarios, fetchDependencies]);

  const handleTipoEntidadChange = (tipo) => {
    setFormFields((prevFields) =>
      prevFields.map((field) => {
        if (field.name === "entidad_id") {
          return {
            ...field,
            options: field.optionsMap?.[tipo] || [],
          };
        }
        return field;
      }),
    );
  };

  const handleEdit = async (usuario) => {
    if (usuario) {
      try {
        const response = await fetch(`/api/usuarios/${usuario.id}`);
        if (!response.ok)
          throw new Error("Error al cargar detalles del usuario");
        const usuarioDetallado = await response.json();

        setCurrentUsuario({
          id: usuarioDetallado.usu_id,
          usu_nombre_usuario: usuarioDetallado.usu_nombre_usuario,
          usu_email: usuarioDetallado.usu_email,
          fk_rol_id: usuarioDetallado.fk_rol_id,
          tipo_entidad: usuarioDetallado.tipo_entidad,
          entidad_id: usuarioDetallado.entidad_id,
        });

        handleTipoEntidadChange(usuarioDetallado.tipo_entidad);
      } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar los detalles del usuario");
        return;
      }
    } else {
      setCurrentUsuario(defaultUsuario);
    }
    setShowModal(true);
  };

  const handleDelete = async (usuario) => {
    if (!confirm("¿Está seguro de eliminar este usuario?")) return;

    try {
      const response = await fetch(`/api/usuarios/${usuario.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al eliminar");
      }

      fetchUsuarios();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      const url = formData.id
        ? `/api/usuarios/${formData.id}`
        : "/api/usuarios";

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
      fetchUsuarios();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleFieldChange = (name, value) => {
    if (name === "tipo_entidad") {
      handleTipoEntidadChange(value);
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
        data={usuarios}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Gestión de Usuarios"
      />

      <EditModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentUsuario(null);
        }}
        onSave={handleSave}
        data={currentUsuario}
        fields={formFields}
        title="Usuario"
        onFieldChange={handleFieldChange}
      />
    </div>
  );
}
