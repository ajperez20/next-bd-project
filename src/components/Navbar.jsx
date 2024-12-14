"use client";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavbarComponent() {
  const router = useRouter();
  return (
    <Navbar className="bg-slate-900">
      <NavbarBrand>
        <Link color="foreground" href="/">
          <AcmeLogo />
          <p className="font-bold text-inherit">UCABAIR</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/home/avion/models">
            Aviones
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/home/contact">
            Contactos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/home/about">
            Sobre Nosotros
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/home/login">Iniciar Sesión</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              router.push("/home/signUp");
            }}
          >
            Registrarse
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
