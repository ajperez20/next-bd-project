"use client";

import { useState, useEffect } from "react";
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
  usu_contrasena: "",
  usu_email: "",
  fk_rol_id: "",
  fk_per_id: "",
  fk_cjd_id: "",
  fk_ctn_id: "",
  fk_com_id: "",
};

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentUsuario, setCurrentUsuario] = useState(null);
  const [roles, setRoles] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [clientesJuridicos, setClientesJuridicos] = useState([]);
  const [clientesNaturales, setClientesNaturales] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [formFields, setFormFields] = useState([
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
  ]);

  useEffect(() => {
    fetchUsuarios();
    fetchDependencies();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("/api/usuarios");
      if (!response.ok) throw new Error("Error al cargar usuarios");
      const data = await response.json();

      const formattedData = data.map((usuario) => ({
        id: usuario.usu_id,
        ...usuario,
      }));

      setUsuarios(formattedData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDependencies = async () => {
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

      setRoles(roles);
      setEmpleados(empleados);
      setClientesJuridicos(clientesJ);
      setClientesNaturales(clientesN);
      setProveedores(proveedores);

      setFormFields((fields) =>
        fields.map((field) => {
          if (field.name === "fk_rol_id") {
            return {
              ...field,
              options: roles.map((rol) => ({
                value: rol.rol_id,
                label: rol.rol_nombre,
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

  const updateEntidadOptions = (tipoEntidad) => {
    setFormFields((fields) =>
      fields.map((field) => {
        if (field.name === "entidad_id") {
          let options = [];
          switch (tipoEntidad) {
            case "empleado":
              options = empleados.map((emp) => ({
                value: emp.per_id,
                label: `${emp.per_nombre} ${emp.per_apellido}`,
              }));
              break;
            case "clienteJuridico":
              options = clientesJuridicos.map((cj) => ({
                value: cj.cjd_id,
                label: cj.cjd_nombre,
              }));
              break;
            case "clienteNatural":
              options = clientesNaturales.map((cn) => ({
                value: cn.ctn_id,
                label: `${cn.ctn_nombre} ${cn.ctn_apellido}`,
              }));
              break;
            case "proveedor":
              options = proveedores.map((prov) => ({
                value: prov.com_id,
                label: prov.com_nombre,
              }));
              break;
          }
          return { ...field, options };
        }
        return field;
      }),
    );
  };

  const handleEdit = (usuario) => {
    if (usuario) {
      const formattedUsuario = {
        usu_id: usuario.id,
        usu_nombre_usuario: usuario.usu_nombre_usuario,
        usu_email: usuario.usu_email,
        fk_rol_id: usuario.fk_rol_id,
        tipo_entidad: usuario.tipo_usuario?.toLowerCase().replace(" ", ""),
        entidad_id:
          usuario.fk_per_id ||
          usuario.fk_cjd_id ||
          usuario.fk_ctn_id ||
          usuario.fk_com_id,
      };
      setCurrentUsuario(formattedUsuario);
      updateEntidadOptions(formattedUsuario.tipo_entidad);
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
        throw new Error(error.error?.message || "Error al eliminar usuario");
      }

      fetchUsuarios();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      // Validar el email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.usu_email)) {
        throw new Error("Email inválido");
      }

      // Preparar los datos según el tipo de entidad
      const usuarioData = {
        usu_nombre_usuario: formData.usu_nombre_usuario,
        usu_email: formData.usu_email,
        fk_rol_id: parseInt(formData.fk_rol_id),
        // Solo incluir contraseña si es nuevo usuario o si se modificó
        ...(formData.usu_contrasena && {
          usu_contrasena: formData.usu_contrasena,
        }),
      };

      // Asignar el ID de la entidad al campo correspondiente
      switch (formData.tipo_entidad) {
        case "empleado":
          usuarioData.fk_per_id = parseInt(formData.entidad_id);
          break;
        case "clienteJuridico":
          usuarioData.fk_cjd_id = parseInt(formData.entidad_id);
          break;
        case "clienteNatural":
          usuarioData.fk_ctn_id = parseInt(formData.entidad_id);
          break;
        case "proveedor":
          usuarioData.fk_com_id = parseInt(formData.entidad_id);
          break;
      }

      const url = formData.usu_id
        ? `/api/usuarios/${formData.usu_id}`
        : "/api/usuarios";

      const response = await fetch(url, {
        method: formData.usu_id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Error al guardar usuario");
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
      updateEntidadOptions(value);
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
