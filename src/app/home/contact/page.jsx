"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function ContactPage() {
  return (
    <div className="container mx-auto mt-10 bg-zinc-900 rounded-lg">
      <section className=" p-6 ">
        <h1 className="text-4xl font-bold text-white mb-4">Contactanos</h1>
        <p className="text-medium text-slate-300 mb-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
          vero ducimus saepe voluptatibus culpa assumenda, similique minima
          obcaecati nobis. Ipsa molestiae aliquid nihil dignissimos unde debitis
          laborum porro iste doloremque molestias, illo enim eligendi omnis
          accusantium. Temporibus alias id modi voluptas iure esse eos dolore,
          vel eius quae pariatur asperiores voluptatum? Nobis optio eos dolore
          voluptate ratione maiores dolor aliquid qui accusamus, consequuntur
          corporis eveniet perferendis rem illo quo ut id totam tempora ullam
          soluta? Dicta amet consectetur expedita doloribus eos itaque
          repellendus tenetur accusamus minima, sint laborum reiciendis?
          Placeat, saepe laboriosam ipsum labore dolore unde voluptates
          consectetur quo voluptas.
        </p>
      </section>
      <section className="p-6 mb-10">
        <Tabs aria-label="Options" variant="light" color="primary">
          <Tab key="email" title="Email">
            <Card>
              <CardBody className="bg-zinc-950 text-medium text-slate-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="Telefonos" title="Teléfonos">
            <Card>
              <CardBody className="bg-zinc-950 text-medium text-slate-300">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="Otros" title="Otros">
            <Card>
              <CardBody className="bg-zinc-950 text-medium text-slate-300">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}
