// ZULA menu data. Prices in Kenyan Shillings (KES).
// Each drink belongs to a product line and is tagged with the moods it suits.

// Ordered along an emotional arc (left = low, right = high) so the
// curved node selector reads like a mood slider. Each entry fully
// themes the mood screen: `color` paints the background, `ink` is the
// readable foreground, `face`/`faceBg`/`faceInk` draw the SVG face.
export const MOODS = [
  {
    id: "low",
    emoji: "🫂",
    label: "A little low",
    feeling: "Sad",
    line: "I need comfort",
    color: "#E8724C",
    ink: "#FDECE4",
    face: "sad",
    faceBg: "#F2A889",
    faceInk: "#8A3B1E",
    blurb: "Something warm and kind. Sit with us a while.",
  },
  {
    id: "tired",
    emoji: "🥱",
    label: "Tired",
    feeling: "Meh",
    line: "I need a lift",
    color: "#A56A3C",
    ink: "#F6EEE6",
    face: "neutral",
    faceBg: "#C39A76",
    faceInk: "#5E3A1C",
    blurb: "Time for a proper wake-up. We've got you.",
  },
  {
    id: "normal",
    emoji: "🙂",
    label: "Normal",
    feeling: "Normal",
    line: "Just vibing",
    color: "#7C5CC4",
    ink: "#F7F0E6",
    face: "calm",
    faceBg: "#B6A6D8",
    faceInk: "#3A1257",
    blurb: "A steady, everyday pour — something reliably good.",
  },
  {
    id: "happy",
    emoji: "😊",
    label: "Happy",
    feeling: "Happy",
    line: "I'm feeling bright",
    color: "#F5C542",
    ink: "#4A2E0B",
    face: "happy",
    faceBg: "#FBE9AE",
    faceInk: "#6B4A12",
    blurb: "Let's keep that glow going with something vibrant.",
  },
  {
    id: "cute",
    emoji: "💜",
    label: "Feeling cute",
    feeling: "Cute",
    line: "I'm feeling myself",
    color: "#C173D6",
    ink: "#FBEFFA",
    face: "love",
    faceBg: "#DBA6E7",
    faceInk: "#6E2E82",
    blurb: "A purple moment worth a photo. Our signature zone.",
  },
];

export const DRINKS = [
  // ---- Signature purple / ube line ----
  {
    id: "ube-velvet",
    name: "Ube Velvet Latte",
    line: "Purple Signature",
    price: 480,
    emoji: "🟣",
    desc: "Silky purple yam, espresso, steamed milk. The ZULA classic.",
    moods: ["cute", "happy", "low"],
    signature: true,
  },
  {
    id: "purple-cloud",
    name: "Purple Yam Cloud",
    line: "Purple Signature",
    price: 450,
    emoji: "☁️",
    desc: "Iced ube milk topped with a salted cream cloud.",
    moods: ["cute", "happy"],
    signature: true,
  },
  {
    id: "taro-milk-tea",
    name: "Taro Milk Tea",
    line: "Purple Signature",
    price: 420,
    emoji: "🧋",
    desc: "Creamy taro with chewy pearls. Pure comfort.",
    moods: ["cute", "low", "calm"],
  },

  // ---- Thai-inspired comfort ----
  {
    id: "thai-iced-tea",
    name: "Thai Iced Tea",
    line: "Thai-Inspired",
    price: 400,
    emoji: "🧡",
    desc: "Bold spiced black tea, sweet cream swirl over ice.",
    moods: ["happy", "low"],
  },
  {
    id: "thai-coconut-coffee",
    name: "Thai Coconut Coffee",
    line: "Thai-Inspired",
    price: 460,
    emoji: "🥥",
    desc: "Cold brew, coconut cream, a whisper of palm sugar.",
    moods: ["tired", "calm"],
    signature: true,
  },
  {
    id: "cha-yen-cream",
    name: "Cha Yen Cream",
    line: "Thai-Inspired",
    price: 430,
    emoji: "🍮",
    desc: "Thai tea blended thick and creamy, like dessert.",
    moods: ["low", "cute"],
  },

  // ---- Matcha ----
  {
    id: "iced-matcha",
    name: "Iced Matcha Latte",
    line: "Matcha",
    price: 450,
    emoji: "🍵",
    desc: "Ceremonial matcha, cold milk, clean and grassy.",
    moods: ["calm", "cute"],
  },
  {
    id: "matcha-ube-swirl",
    name: "Matcha Ube Swirl",
    line: "Matcha",
    price: 500,
    emoji: "🌀",
    desc: "Green matcha meets purple ube. The photo everyone takes.",
    moods: ["cute", "happy", "calm"],
    signature: true,
  },
  {
    id: "strawberry-matcha",
    name: "Strawberry Matcha",
    line: "Matcha",
    price: 470,
    emoji: "🍓",
    desc: "Fresh strawberry layered under smooth matcha.",
    moods: ["happy", "cute"],
  },

  // ---- Specialty coffee ----
  {
    id: "signature-espresso",
    name: "ZULA Signature Espresso",
    line: "Specialty Coffee",
    price: 300,
    emoji: "☕",
    desc: "A bright, balanced single-origin shot. Source stories on the card.",
    moods: ["tired"],
  },
  {
    id: "brown-sugar-oat",
    name: "Brown Sugar Oat Latte",
    line: "Specialty Coffee",
    price: 420,
    emoji: "🤎",
    desc: "Caramelised brown sugar, oat milk, double shot.",
    moods: ["tired", "low", "happy"],
    signature: true,
  },
  {
    id: "cold-brew-tonic",
    name: "Cold Brew Tonic",
    line: "Specialty Coffee",
    price: 400,
    emoji: "🫧",
    desc: "Cold brew over tonic and citrus. Sharp and awake.",
    moods: ["tired", "calm"],
  },
];

// Drinks that fit a given mood, signatures first.
export function drinksForMood(moodId) {
  return DRINKS.filter((d) => d.moods.includes(moodId)).sort(
    (a, b) => (b.signature ? 1 : 0) - (a.signature ? 1 : 0)
  );
}

// The single "special" we recommend for a mood — first signature match.
export function specialForMood(moodId) {
  const matches = drinksForMood(moodId);
  return matches.find((d) => d.signature) || matches[0];
}

export function moodById(moodId) {
  return MOODS.find((m) => m.id === moodId);
}

export const CURRENCY = "KES";
