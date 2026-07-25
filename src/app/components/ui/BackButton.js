import { ChevronLeft } from "lucide-react";
import { Button } from "./button";

// Small square "go back" button used at the bottom of multi-step screens.
export default function BackButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="rounded-2xl px-5 py-4 h-full  text-cream/80 hover:bg-white/12 transition"
      aria-label="Go back"
    >
      <ChevronLeft className=""/>
    </Button>
  );
}
