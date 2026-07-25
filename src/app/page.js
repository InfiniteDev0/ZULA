"use client";

import { useRouter } from "next/navigation";
import Welcome from "./components/steps/Welcome";

export default function WelcomePage() {
  const router = useRouter();
  return <Welcome onNext={() => router.push("/mood")} />;
}
