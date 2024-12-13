"use client"
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <div className="container h-screen mx-auto">
      <Button
        className="mt-10"
        onPress={(e) => {
          alert("hola mundo");
        }}
      >
        Click me
      </Button>
    </div>
  );
}
