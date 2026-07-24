// Small square "go back" button used at the bottom of multi-step screens.
export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl px-5 py-4 bg-white/8 text-cream/80 hover:bg-white/12 transition"
      aria-label="Go back"
    >
      ←
    </button>
  );
}
