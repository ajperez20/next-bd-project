"use client";

import { NextUIProvider } from "@nextui-org/react";

export default function AppProvider({ children }) {
  return (
    <div>
      <NextUIProvider>{children}</NextUIProvider>
    </div>
  );
}
