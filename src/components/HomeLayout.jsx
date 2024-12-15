"use client";
import { usePathname, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function HomeLayout() {
  const pathName = usePathname();
  const { id } = useParams();

  const routesWithNavbar = [
    "/",
    "/home/about",
    "/home/avion/models",
    `/home/avion/models/${id}`,
    "/home/contact",
  ];
  return (
    <>{routesWithNavbar.includes(pathName) ? <Navbar navbar="home" /> : null}</>
  );
}
