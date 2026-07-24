import Image from "next/image";

// The floating ZULA logo shown at the top of every step.
export default function Header() {
  return (
    <div className="flex flex-col items-center mb-6 shrink-0">
      <Image
        src="/zula.png"
        alt="ZULA"
        width={72}
        height={72}
        className="rounded-full shadow-lg shadow-black/30"
        priority
      />
    </div>
  );
}
