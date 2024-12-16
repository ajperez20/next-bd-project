"use client";
import { Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { carouselImages } from "@/utils/avionesJson";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container mx-auto mt-20 mb-10">
      <section className=" grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <h3 className={"text-4xl font-bold mb-2"}>
            Te damos la bienvenida
            <br />a UCABAIR
          </h3>
          <p className="text-medium text-slate-300 mb-4">
            UCABAIR, es una empresa aeronáutica y el mayor fabricante de aviones
            de Venezuela. También proporciona numerosos servicios de soporte a
            la aviación comercial, tiene clientes en más de 90 países y es uno
            de los mayores exportadores de Venezuela en términos de ventas.
          </p>
          <Button
            className="mt-4"
            color="default"
            variant="bordered"
            onPress={() => {
              router.push("/home/about");
            }}
          >
            Descubre más de UCABAIR
          </Button>
        </div>
        <div className="col-span-1">
          <Carousel
            className="crsl"
            showThumbs={false}
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            autoPlay={true}
            infiniteLoop={true}
            transitionTime={700}
            useKeyboardArrows={false}
          >
            {carouselImages.map((elm, index) => (
              <div key={index}>
                <Image
                  className="rounded-lg"
                  src={elm.url}
                  alt={"avion" + index}
                  height={270}
                  width={500}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}
