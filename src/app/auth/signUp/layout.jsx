import Navbar from "@/components/Navbar";

export default function SignUpLayout({ children }) {
  return (
    <div>
      <Navbar navbar="signUp" />
      {children}
    </div>
  );
}
