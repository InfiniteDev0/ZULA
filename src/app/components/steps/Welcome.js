"use client";

import Image from "next/image";
import { Button } from "../ui/button";

// Step 0 — Welcome splash: hero image + title + "View Our Menu" CTA.
export default function Welcome({ onNext }) {
  return (
    <section
      className="h-full flex flex-col px-1 items-start py-2 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bgwelcome.png')" }}
    >
      <img src="/zula.png" className="w-20" alt="" />
      <div className="flex flex-col w-full items-center justify-center mt-5">
        <p className="text-lg text-white">Welcome to zula </p>

        <h1 className="display-2xl text-black text-center">MENU</h1>
      </div>

      <Button
        onClick={onNext}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 h-15 bg-white text-black display-2xl text-3xl hover:bg-white rounded-full w-70 trans"
      >
        View Our Menu
      </Button>
    </section>
  );
}
