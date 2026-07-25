"use client";

import Image from "next/image";
import { Button } from "../ui/button";

// Step 0 — Welcome splash: hero image + title + "View Our Menu" CTA.
// A playful nickname for each weekday (index = Date.getDay(), Sun = 0).
const DAY_SPECIALS = [
  "Slow Sunday",
  "Monday Special",
  "Taro Tuesday",
  "Wellness Wednesday",
  "Thirsty Thursday",
  "Feel-Good Friday",
  "Sweet Saturday",
];

export default function Welcome({ onNext }) {
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const special = DAY_SPECIALS[now.getDay()];

  return (
    <section
      className="h-full flex flex-col px-1 items-start py-2 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bgwelcome.png')" }}
    >
      <img src="/zula.png" className="w-20" alt="" />
      <div className="flex flex-col w-full display-xl -rotate-20  items-center justify-center mt-5 px-3">
        <p>
          Happy {dayName} — it&apos;s {special}!
        </p>

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
