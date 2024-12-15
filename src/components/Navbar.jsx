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

const LoginNavbar = ({ router }) => {
  return (
    <>
      <NavbarContent justify="end">
        <NavbarItem>
          <p className="text-md text-slate-500">No estás registrado?</p>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              router.push("/auth/signUp");
            }}
          >
            Registrarse
          </Button>
        </NavbarItem>
      </NavbarContent>
    </>
  );
};

export const SignUpNavbar = ({ router }) => {
  return (
    <>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <p className="text-md text-slate-500">Estás registrado?</p>
        </NavbarItem>
        <Button
          color="primary"
          variant="flat"
          onPress={() => {
            router.push("/auth/login");
          }}
        >
          Iniciar Sesión
        </Button>
      </NavbarContent>
    </>
  );
};

const HomeNavbar = ({ router }) => {
  return (
    <>
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
          <Link href="/auth/login">Iniciar Sesión</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              router.push("/auth/signUp");
            }}
          >
            Registrarse
          </Button>
        </NavbarItem>
      </NavbarContent>
    </>
  );
};

export default function NavbarComponent({ navbar }) {
  const router = useRouter();
  return (
    <Navbar className="bg-slate-900">
      <NavbarBrand>
        <Link color="foreground" href="/">
          <AcmeLogo />
          <p className="font-bold text-inherit">UCABAIR</p>
        </Link>
      </NavbarBrand>

      {navbar === "login" ? (
        <LoginNavbar router={router}></LoginNavbar>
      ) : navbar === "home" ? (
        <HomeNavbar router={router}></HomeNavbar>
      ) : navbar === "signUp" ? (
        <SignUpNavbar router={router}></SignUpNavbar>
      ) : (
        <div>Error</div>
      )}
    </Navbar>
  );
}
