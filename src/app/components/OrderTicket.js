"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { money } from "../lib/format";
import { Button } from "./ui/button";

// Fake barcode — a row of bars of varying widths.
function Barcode() {
  const [bars] = useState(() =>
    Array.from({ length: 34 }, () => 1 + Math.floor(Math.random() * 3)),
  );
  return (
    <div className="flex items-end gap-[2px] h-12">
      {bars.map((w, i) => (
        <span
          key={i}
          className="bg-neutral-900 h-full"
          style={{ width: w, opacity: i % 4 === 0 ? 1 : 0.85 }}
        />
      ))}
    </div>
  );
}

// A printed order ticket that slides out of the "printer", styled after a
// boarding-pass receipt. The guest shows it to the barista.
export default function OrderTicket({ cart, total, name, mood }) {
  const router = useRouter();
  const [meta] = useState(() => {
    const code = `ZL-${Math.floor(1000 + Math.random() * 9000)}`;
    const time = new Date().toLocaleString("en-KE", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
    return { code, time };
  });

  return (
    <div className="w-full max-w-[360px] mx-auto flex flex-col items-center">
      {/* Printer slot */}
      <div className="w-[92%] h-5 rounded-lg border-4 border-white bg-black shadow-md shadow-black/30 z-10" />

      {/* Printing area */}
      <div className="w-full overflow-hidden -mt-1.5 pb-3">
        <div className="animate-print w-full flex flex-col items-center text-left text-neutral-900">
          {/* Main receipt */}
          <div className="w-[88%] bg-white rounded-t-xl rounded-b-sm px-6 pt-6 pb-5 shadow-[1px_3px_8px_3px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl leading-none">ZULA</span>
              <img src="/zula.png" className="w-10" alt="" />
            </div>

            <div className="flex items-center justify-between my-6">
              <h2 className="font-display text-3xl leading-none">Order</h2>
              {/* <Field label="Items" value={String(cart.length)} /> */}
              <span className="text-3xl">{cart.length}</span>
            </div>

            {/* <div className="flex flex-wrap justify-between gap-y-4">
              <Field label="Guest" value={name} />
              <Field label="Mood" value={mood} />
              <Field label="Time" value={meta.time} />
              <Field label="Items" value={String(cart.length)} />
            </div> */}

            {/* Items */}
            <div className="border-t border-dashed border-neutral-300 mt-5 h-45 overflow-y-scroll pt-4 flex flex-col gap-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span>{item.emoji}</span>
                    <span className="font-medium">{item.name}</span>
                  </span>
                  <span className="text-neutral-600">{money(item.price)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-300 mt-4 pt-3 flex flex-col items-center justify-between gap-1">
              <div className="flex items-center justify-between w-full">
                <span className="font-display text-xl">Total</span>
                <span className="font-display text-xl">{money(total)}</span>
              </div>
              <Button
                onClick={() => router.push("/full-menu")}
                className={"w-full display-lg text-lg h-10 tracking-wider"}
              >
                Change Order
              </Button>
            </div>
          </div>

          {/* Perforated stub */}
          <div className="relative w-[88%] bg-white rounded-b-xl rounded-t-sm px-6 py-5 flex items-center gap-4 shadow-[1px_3px_8px_3px_rgba(0,0,0,0.25)]">
            {/* tear line + side notches */}
            <span className="absolute -top-[3px] left-0 right-0 mx-auto w-[90%] h-[6px] bg-[repeating-linear-gradient(to_right,#cbb8e0_0_10px,transparent_10px_20px)]" />
            <div className="flex  gap-2 flex-col items-center justify-center w-full">
              <Button
                onClick={() => router.push("/community")}
                className={"w-full bg-purple-700 display-lg text-lg h-10 tracking-wider"}
              >
                Order Made
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex flex-col min-w-[45%]">
      <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
        {label}
      </span>
      <span className="mt-1 font-medium">{value}</span>
    </div>
  );
}
