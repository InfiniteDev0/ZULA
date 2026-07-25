"use client";

// Re-mounts (via the key) whenever `children` changes so the flip animation
// replays — a lightweight take on the 3D text-flip effect.
export default function FlipText({ children, className = "" }) {
  return (
    <span
      key={String(children)}
      className={`inline-block animate-flip ${className}`}
    >
      {children}
    </span>
  );
}
