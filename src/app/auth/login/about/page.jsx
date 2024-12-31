"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Panel izquierdo - Contenido */}
      <div className="md:w-1/2 bg-blue-600 p-8 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-bold text-white">Sobre Nosotros</h1>
              <Link
                href="/login"
                className="text-blue-100 hover:text-white hover:underline transition-colors text-sm"
              >
                ← Volver al login
              </Link>
            </div>

            <div className="space-y-6 text-blue-50">
              <p className="leading-relaxed">
                <strong className="text-white">UCABAIR</strong>, es una empresa
                aeronáutica y el mayor fabricante de aviones de Venezuela. Su
                sede central se encuentra en la ciudad de Catia la Mar, Estado
                La Guaira. Las fábricas más grandes están situadas en los
                alrededores de la ciudad de Valencia Estado Carabobo, Maracay
                Estado Aragua, Guatire Estado Miranda.
              </p>

              <p className="leading-relaxed">
                UCABAIR introdujo en 1980 el primer avión comercial de reacción
                en Venezuela. Previamente ya habían aparecido dos aviones de
                este tipo en Europa: el de Havilland Comet fabricado en el Reino
                Unido, y el Caravelle, fabricado en Francia...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Imagen */}
      <div className="md:w-1/2 bg-gray-50 p-8 flex flex-col justify-center">
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Nuestra Fábrica
              </h2>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                alt="UcabAir Fábrica"
                src="/images/fabrica.png"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Datos Importantes
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                Fundada en 1980
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                Líder en fabricación de aviones
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                Presencia en más de 90 países
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
