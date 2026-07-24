const TONES = {
  pink: "bg-pink text-purple-deep hover:brightness-105",
  cream: "bg-cream text-purple-deep hover:brightness-105",
};

export default function PrimaryButton({
  children,
  disabled,
  onClick,
  tone = "pink",
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-2xl py-4 font-semibold text-lg transition
        ${TONES[tone]}
        disabled:opacity-40 disabled:cursor-not-allowed
        active:scale-[0.98] shadow-lg shadow-black/20`}
    >
      {children}
    </button>
  );
}
