"use client";

import { Image } from "@nextui-org/react";

export default function AboutPage() {
  return (
    <div className="container mx-auto">
      <section className="bg-slate-600 p-6 my-10 rounded ">
        <h1 className="text-4xl font-bold text-white mb-4">Sobre Nosotros</h1>
        <p className="text-medium text-slate-300 mb-2">
          <strong className="text-white">UcabAir</strong>, es una empresa
          aeronáutica y el mayor fabricante de aviones de Venezuela. Su sede
          central se encuentra en la ciudad de Catia la Mar, Estado La Guaira.
          Las fábricas más grandes están situadas en los alrededores de la
          ciudad de Valencia Estado Carabobo, Maracay Estado Aragua, Guatire
          Estado Miranda. UcabAir es la compañía líder nacional y principal
          proveedor de servicios de la nación en el diseño y fabricación de
          helicópteros, sistemas electrónicos y sistemas avanzados de
          comunicación e información. También proporciona numerosos servicios de
          soporte a la aviación comercial, tiene clientes en más de 90 países y
          es uno de los mayores exportadores de Venezuela en términos de ventas.
        </p>
        <p className="text-medium text-slate-300 mb-2">
          UcabAir introdujo en 1980 el primer avión comercial de reacción en
          Venezuela. Previamente ya habían aparecido dos aviones de este tipo en
          Europa: el de Havilland Comet fabricado en el Reino Unido, y el
          Caravelle, fabricado en Francia. Con el nuevo avión, el AU-80, UcabAir
          se convirtió en el líder de los fabricantes de reactores para
          pasajeros. Se trataba de un avión cuatrimotor con capacidad para 120
          pasajeros y 7 destinado a rutas de largo alcance. Poco después UcabAir
          desarrolló una segunda versión de este avión, el AU-801, para rutas
          menos largas, y unos años más tarde apareció el AU-802, un avión de
          capacidad similar, pero dotado de tres reactores, y concebido para
          rutas medias y cortas. Esta máquina tuvo de inmediato una acogida muy
          positiva por las compañías aéreas, por los pilotos, por los pasajeros
          debido a su comodidad y fiabilidad. Aunque en 1984 se dejó de
          fabricar, al comienzo del siglo XXI todavía se encontraban en servicio
          unos 1500 AU-802 en todo el mundo. En el año 1987 la compañía
          introdujo un nuevo modelo, el AU-87A, que se ha convertido en el avión
          de pasajeros más vendido en la historia de la aviación civil. Se trata
          de un avión birreactor diseñado para rutas cortas y medias, con
          capacidad para unos 110 a 220 pasajeros, según la versión y la
          configuración de asientos. El AU-87A sigue fabricándose y es objeto de
          continuas mejoras tecnológicas. También han ido apareciendo variantes
          adicionales, por lo general versiones más largas para una mayor
          capacidad de pasajeros, incluso existe un AU-87A de negocios para
          grandes empresas el UcabAir Business Plane. Al comenzar la década de
          los 90 UcabAir fabrica el primer ejemplar del nuevo avión AU-747Plus,
          fue puesto en servicio, un cuatrimotor de largo alcance con capacidad
          para 460 personas, y con ello el mayor avión comercial de la historia
          de la aviación en Venezuela. Este avión ha tenido un éxito
          extraordinario desde su aparición. En las distintas versiones que han
          ido desarrollando, sigue siendo el único de estas características
          existente en la actualidad. Sólo con la aparición del Airbus A380, un
          avión de dos pisos con capacidad de asientos superior al AU-747Plus se
          encuentra por primera vez con un competidor para este avión, después
          de su lanzamiento. En 1993 la situación económica de la empresa era
          muy estable, y con ello UcabAir entregó el ejemplar número 1.000 de su
          AU-747Plus. A medida que el tráfico de pasajeros iba en aumento en
          todo el mundo la competencia entre los fabricantes de aviones se
          endurecía. UcabAir tuvo que enfrentarse también a un recién llegado,
          esta vez de Europa, el consorcio 8 Airbus. Ello obligó a UcabAir a
          desarrollar a su vez nuevos aviones, que fueron el AU-747Platinium,
          avión de un pasillo central para recorridos medios, el AU-747Gold, de
          cabina ancha y dos pasillos, para rutas medias y largas, y con
          licencia para sobrevolar océanos a pesar de ser un bimotor. En 1994
          introdujo el AU-747Silver, un avión con capacidad para 390 pasajeros y
          diseñado para rutas largas, dotado también de sólo dos motores, pero
          con autonomía para sobrevolar océanos. Incorpora la más nueva
          tecnología. Así seguimos evolucionando en el diseño y fabricación de
          aeronaves.
        </p>
        <div className="flex justify-center mt-10 mb-5">
          <Image
            alt="NextUI hero Image"
            src="/images/fabrica.png"
            width={500}
            height={400}
          />
        </div>
      </section>
    </div>
  );
}
