import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { DarkmodeProvider } from "./contexts/DarkmodeProvider";
import { Analytics } from "@vercel/analytics/react";
import { StateProvider } from "./components/survey/state";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {

  return (
    <>
      <Toaster />
      <Analytics />
      <DarkmodeProvider>
        <StateProvider>
          {children}
        </StateProvider>
      </DarkmodeProvider>
    </>
  );
}
