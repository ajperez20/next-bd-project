"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserGroupIcon,
  CubeIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "RRHH",
    href: "/dashboard/rrhh",
    icon: UserGroupIcon,
    submenu: [
      {
        name: "Empleados",
        href: "/dashboard/rrhh/empleados",
      },
      {
        name: "Departamentos",
        href: "/dashboard/rrhh/departamentos",
      },
      {
        name: "Nómina",
        href: "/dashboard/rrhh/nomina",
      },
    ],
  },
  {
    name: "Producción",
    href: "/produccion",
    icon: CubeIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState("");

  const toggleSubmenu = (name) => {
    setOpenSubmenu(openSubmenu === name ? "" : name);
  };

  const handleKeyDown = (event, name) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSubmenu(name);
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 bg-blue-600">
          <span className="text-white text-xl font-bold">UcabAir</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const isOpen = openSubmenu === item.name;

            return (
              <div key={item.name}>
                {item.submenu ? (
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    onKeyDown={(e) => handleKeyDown(e, item.name)}
                    className={`
                                            w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer
                                            ${isActive ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : ""}
                                        `}
                  >
                    <item.icon
                      className={`h-5 w-5 mr-3 ${
                        isActive ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <span className="text-sm font-medium flex-1">
                      {item.name}
                    </span>
                    <ChevronDownIcon
                      className={`h-4 w-4 transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                                            flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100
                                            ${isActive ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : ""}
                                        `}
                  >
                    <item.icon
                      className={`h-5 w-5 mr-3 ${
                        isActive ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                )}

                {/* Submenu */}
                {item.submenu && isOpen && (
                  <div className="bg-gray-50 pl-12">
                    {item.submenu.map((subitem) => {
                      const isSubActive = pathname === subitem.href;
                      return (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className={`
                                                        flex items-center py-2 px-4 text-sm
                                                        ${
                                                          isSubActive
                                                            ? "text-blue-600 font-medium"
                                                            : "text-gray-600 hover:text-gray-900"
                                                        }
                                                    `}
                        >
                          <span>{subitem.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
