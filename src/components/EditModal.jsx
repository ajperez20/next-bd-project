// src/components/EditModal.jsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function EditModal({
  isOpen,
  onClose,
  onSave,
  data,
  fields,
  title,
  renderCustomField,
}) {
  const [formData, setFormData] = useState(data || {});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(data || {});
    setErrors({});
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(formData);
      setErrors({});
    } catch (error) {
      setErrors({
        ...errors,
        submit: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const renderField = (field) => {
    // Si hay una función de renderizado personalizado y el campo es de tipo personalizado
    if (
      renderCustomField &&
      (field.type === "caracteristicasPieza" ||
        field.type === "materialesPieza" ||
        field.type === "caracteristicasArray")
    ) {
      return renderCustomField(field, formData[field.name], (value) => {
        handleChange({ target: { name: field.name, value } });
      });
    }

    switch (field.type) {
      case "select":
        return (
          <select
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Seleccione...</option>
            {field.options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className={option.level ? `level-${option.level}` : ""}
              >
                {option.level > 1 ? "├─ ".repeat(option.level - 1) : ""}
                {option.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            rows={field.rows || 3}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            placeholder={field.placeholder}
          />
        );
      default:
        return (
          <input
            type={field.type || "text"}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            pattern={field.pattern}
          />
        );
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    {data ? "Editar" : "Crear Nuevo"} {title}
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      {renderField(field)}
                      {errors[field.name] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[field.name]}
                        </p>
                      )}
                      {field.description && (
                        <p className="mt-1 text-xs text-gray-500">
                          {field.description}
                        </p>
                      )}
                    </div>
                  ))}

                  {errors.submit && (
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-sm font-medium text-red-800">
                            {errors.submit}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Guardando...
                        </>
                      ) : (
                        "Guardar"
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
