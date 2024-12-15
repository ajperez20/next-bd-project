import Navbar from "@/components/Navbar";

export default function LoginLayout({ children }) {
  return (
    <div>
      <Navbar navbar="login" />
      {children}
    </div>
  );
}
