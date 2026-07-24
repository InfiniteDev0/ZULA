// A single round face whose eyes/mouth change with `variant`.
// Colours are passed in so it can theme to the active mood.
export default function MoodFace({ variant, bg, ink, className }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`${variant} face`}
    >
      <circle cx="50" cy="50" r="40" fill={bg} />
      {variant === "love" && (
        <g fill="#FF7AB0" opacity="0.4">
          <circle cx="30" cy="57" r="6" />
          <circle cx="70" cy="57" r="6" />
        </g>
      )}
      <Eyes variant={variant} ink={ink} />
      <Mouth variant={variant} ink={ink} />
    </svg>
  );
}

function Eyes({ variant, ink }) {
  if (variant === "love") {
    // Happy closed eyes ("^ ^")
    return (
      <g stroke={ink} strokeWidth="3.5" fill="none" strokeLinecap="round">
        <path d="M31 47 Q38 41 45 47" />
        <path d="M55 47 Q62 41 69 47" />
      </g>
    );
  }
  return (
    <g fill={ink}>
      {variant === "sad" && (
        <g stroke={ink} strokeWidth="3" strokeLinecap="round">
          <path d="M31 37 L44 41" />
          <path d="M69 37 L56 41" />
        </g>
      )}
      <circle cx="38" cy="45" r="3.8" />
      <circle cx="62" cy="45" r="3.8" />
    </g>
  );
}

function Mouth({ variant, ink }) {
  const stroke = {
    fill: "none",
    stroke: ink,
    strokeWidth: 4.5,
    strokeLinecap: "round",
  };
  switch (variant) {
    case "sad":
      return <path d="M36 68 Q50 58 64 68" {...stroke} />;
    case "neutral":
      return <line x1="37" y1="65" x2="63" y2="65" {...stroke} />;
    case "happy":
      return (
        <path
          d="M34 60 Q50 80 66 60 Z"
          fill={ink}
          stroke={ink}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      );
    case "love":
      return <path d="M35 61 Q50 76 65 61" {...stroke} />;
    case "calm":
    default:
      return <path d="M37 62 Q50 70 63 62" {...stroke} />;
  }
}
