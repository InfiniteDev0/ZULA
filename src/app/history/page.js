"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useFlow } from "../providers/FlowProvider";
import { money } from "../lib/format";

function formatDate(ts) {
  return new Date(ts).toLocaleString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const router = useRouter();
  const { state } = useFlow();
  const history = state.history || [];

  return (
    <section className="animate-slide-in-right h-full flex flex-col bg-white text-neutral-900">
      {/* Header */}
      <header className="shrink-0 flex items-center gap-2 px-4 py-4 border-b border-neutral-100">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="p-1 -ml-1 text-neutral-700"
        >
          <ChevronLeft />
        </button>
        <h1 className="flex-1 text-center font-semibold text-lg pr-6">History</h1>
      </header>

      {/* List */}
      <div className="flex-1 min-h-0 overflow-y-auto zula-scroll">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-8 gap-2">
            <span className="text-4xl">🧾</span>
            <p className="text-neutral-500">No orders yet.</p>
            <p className="text-neutral-400 text-sm">
              Your past orders will live here — forever.
            </p>
          </div>
        ) : (
          <ul>
            {history.map((order, i) => {
              const first = order.items?.[0];
              return (
                <li
                  key={`${order.code}-${i}`}
                  className="flex items-center gap-3 px-5 py-4 border-b border-neutral-100"
                >
                  <span className="h-12 w-12 shrink-0 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
                    {first?.emoji ?? "☕"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold leading-tight">{order.code}</p>
                    <p className="text-sm text-neutral-500 truncate">
                      {order.items?.length ?? 0}{" "}
                      {order.items?.length === 1 ? "item" : "items"} ·{" "}
                      {money(order.total)}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {formatDate(order.at)}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-green-600 bg-green-50 rounded-full px-3 py-1">
                    Made
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
