"use client";

import dynamic from "next/dynamic";

// The whole flow is client-only (it's a QR-scanned interactive menu, no SEO
// need). Rendering it with ssr:false means there is no server HTML to
// reconcile, so a refresh can never hit a hydration mismatch.
const FlowProvider = dynamic(() => import("./FlowProvider"), { ssr: false });

export default function ClientRoot({ children }) {
  return <FlowProvider>{children}</FlowProvider>;
}
