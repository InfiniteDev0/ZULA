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
  // ---- Signature purple / ube line (specials) ----
  { id: "ube-velvet", name: "Ube Velvet Latte", line: "Purple Signature", category: "specials", price: 480, emoji: "🟣", desc: "Silky purple yam, espresso, steamed milk. The ZULA classic.", moods: ["cute", "happy", "low"], signature: true },
  { id: "purple-cloud", name: "Purple Yam Cloud", line: "Purple Signature", category: "specials", price: 450, emoji: "☁️", desc: "Iced ube milk topped with a salted cream cloud.", moods: ["cute", "happy"], signature: true },
  { id: "taro-milk-tea", name: "Taro Milk Tea", line: "Purple Signature", category: "specials", price: 420, emoji: "🧋", desc: "Creamy taro with chewy pearls. Pure comfort.", moods: ["cute", "low", "normal"] },
  { id: "ube-cold-foam", name: "Ube Cold Foam Latte", line: "Purple Signature", category: "specials", price: 470, emoji: "💜", desc: "Cold brew crowned with a sweet ube foam.", moods: ["cute", "normal"] },
  { id: "purple-halo-latte", name: "Purple Halo Latte", line: "Purple Signature", category: "specials", price: 460, emoji: "🌸", desc: "Ube, coconut, and espresso layered over ice.", moods: ["cute", "happy", "normal"] },

  // ---- Matcha ----
  { id: "iced-matcha", name: "Iced Matcha Latte", line: "Matcha", category: "matcha", price: 450, emoji: "🍵", desc: "Ceremonial matcha, cold milk, clean and grassy.", moods: ["normal", "cute"] },
  { id: "matcha-ube-swirl", name: "Matcha Ube Swirl", line: "Matcha", category: "matcha", price: 500, emoji: "🌀", desc: "Green matcha meets purple ube. The photo everyone takes.", moods: ["cute", "happy", "normal"], signature: true },
  { id: "strawberry-matcha", name: "Strawberry Matcha", line: "Matcha", category: "matcha", price: 470, emoji: "🍓", desc: "Fresh strawberry layered under smooth matcha.", moods: ["happy", "cute"] },
  { id: "matcha-cloud", name: "Matcha Cloud", line: "Matcha", category: "matcha", price: 480, emoji: "☁️", desc: "Matcha with a pillowy salted cream top.", moods: ["normal", "happy"] },
  { id: "hojicha-latte", name: "Hojicha Latte", line: "Matcha", category: "matcha", price: 440, emoji: "🍂", desc: "Roasted green tea, toasty and mellow.", moods: ["low", "normal"] },

  // ---- Specialty coffee ----
  { id: "signature-espresso", name: "ZULA Signature Espresso", line: "Specialty Coffee", category: "coffee", price: 300, emoji: "☕", desc: "A bright, balanced single-origin shot. Source stories on the card.", moods: ["tired"] },
  { id: "brown-sugar-oat", name: "Brown Sugar Oat Latte", line: "Specialty Coffee", category: "coffee", price: 420, emoji: "🤎", desc: "Caramelised brown sugar, oat milk, double shot.", moods: ["tired", "low", "happy"], signature: true },
  { id: "cold-brew-tonic", name: "Cold Brew Tonic", line: "Specialty Coffee", category: "coffee", price: 400, emoji: "🫧", desc: "Cold brew over tonic and citrus. Sharp and awake.", moods: ["tired", "normal"] },
  { id: "thai-coconut-coffee", name: "Thai Coconut Coffee", line: "Specialty Coffee", category: "coffee", price: 460, emoji: "🥥", desc: "Cold brew, coconut cream, a whisper of palm sugar.", moods: ["tired", "normal"], signature: true },
  { id: "salted-caramel", name: "Salted Caramel Latte", line: "Specialty Coffee", category: "coffee", price: 430, emoji: "🧈", desc: "Espresso, steamed milk, salted caramel drizzle.", moods: ["happy", "low"] },

  // ---- Thai-inspired tea ----
  { id: "thai-iced-tea", name: "Thai Iced Tea", line: "Thai-Inspired", category: "tea", price: 400, emoji: "🧡", desc: "Bold spiced black tea, sweet cream swirl over ice.", moods: ["happy", "low"] },
  { id: "cha-yen-cream", name: "Cha Yen Cream", line: "Thai-Inspired", category: "tea", price: 430, emoji: "🍮", desc: "Thai tea blended thick and creamy, like dessert.", moods: ["low", "cute"] },
  { id: "lemongrass-tea", name: "Lemongrass Iced Tea", line: "Thai-Inspired", category: "tea", price: 380, emoji: "🌿", desc: "Bright lemongrass steeped cold. Refreshing.", moods: ["normal", "happy"] },
  { id: "butterfly-pea", name: "Butterfly Pea Lemonade", line: "Thai-Inspired", category: "tea", price: 400, emoji: "💙", desc: "Colour-changing blue tea with citrus.", moods: ["cute", "happy"] },
  { id: "jasmine-milk-tea", name: "Jasmine Milk Tea", line: "Thai-Inspired", category: "tea", price: 410, emoji: "🌼", desc: "Fragrant jasmine with creamy milk and pearls.", moods: ["cute", "normal"] },
];

// ZULA desserts — the Halo-Halo / ube sweet side.
export const DESSERTS = [
  // ---- Halo-Halo ----
  { id: "ube-halo-halo", name: "Ube Halo-Halo", line: "Halo-Halo", category: "halohalo", price: 550, emoji: "🍧", desc: "Shaved ice, ube, leche flan & jellies — the ZULA icon.", moods: ["cute", "happy", "normal", "low"], signature: true },
  { id: "mango-halo-halo", name: "Mango Halo-Halo", line: "Halo-Halo", category: "halohalo", price: 520, emoji: "🥭", desc: "Ripe mango over shaved ice and jellies.", moods: ["happy", "cute"] },
  { id: "classic-halo-halo", name: "Classic Halo-Halo", line: "Halo-Halo", category: "halohalo", price: 500, emoji: "🍨", desc: "The traditional mix, loaded and creamy.", moods: ["normal", "happy"] },
  { id: "matcha-halo-halo", name: "Matcha Halo-Halo", line: "Halo-Halo", category: "halohalo", price: 540, emoji: "🍵", desc: "Halo-halo with a matcha snow top.", moods: ["cute", "normal"] },
  { id: "choco-halo-halo", name: "Chocolate Halo-Halo", line: "Halo-Halo", category: "halohalo", price: 520, emoji: "🍫", desc: "Cocoa, jellies, and cream over ice.", moods: ["low", "happy"] },

  // ---- Desserts ----
  { id: "ube-roll", name: "Ube Roll Cake", line: "Dessert", category: "desserts", price: 380, emoji: "🍰", desc: "Soft chiffon rolled around silky ube cream.", moods: ["cute", "normal", "low"], signature: true },
  { id: "leche-flan", name: "Leche Flan", line: "Dessert", category: "desserts", price: 320, emoji: "🍮", desc: "Silky caramel custard, Filipino-style.", moods: ["low", "tired", "normal"] },
  { id: "matcha-basque", name: "Matcha Basque Cheesecake", line: "Dessert", category: "desserts", price: 450, emoji: "🧀", desc: "Burnt-top cheesecake with ceremonial matcha.", moods: ["happy", "normal", "cute"], signature: true },
  { id: "biko", name: "Biko", line: "Dessert", category: "desserts", price: 300, emoji: "🍚", desc: "Warm coconut sticky rice with a caramel top.", moods: ["low", "tired"] },
  { id: "ube-cheesecake", name: "Ube Cheesecake", line: "Dessert", category: "desserts", price: 430, emoji: "💜", desc: "Creamy baked cheesecake swirled with ube.", moods: ["cute", "normal"] },
];

// Desserts that fit a given mood, signatures first.
export function dessertsForMood(moodId) {
  return DESSERTS.filter((d) => d.moods.includes(moodId)).sort(
    (a, b) => (b.signature ? 1 : 0) - (a.signature ? 1 : 0)
  );
}

// The single dessert we pair with a mood — first signature match.
export function dessertForMood(moodId) {
  const matches = dessertsForMood(moodId);
  return matches.find((d) => d.signature) || matches[0] || DESSERTS[0];
}

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

// The mood the page defaults to before the guest picks anything.
export const DEFAULT_MOOD_ID = "normal";

// Full-menu sections, in scroll order. The header title + subtitle flip to
// match whichever section is in view.
export const SECTIONS = [
  { id: "specials", title: "Today's Special", subtitle: "Our purple makes u feel better" },
  { id: "matcha", title: "Matcha", subtitle: "Green, grassy, and grounding" },
  { id: "desserts", title: "Desserts", subtitle: "Sweet endings, ZULA-style" },
  { id: "halohalo", title: "Halo-Halo", subtitle: "Ice, ube, and everything nice" },
  { id: "coffee", title: "Coffee", subtitle: "Specialty shots & source stories" },
  { id: "tea", title: "Tea", subtitle: "Thai-inspired, brewed cold" },
];

// A playful nickname for each weekday (index = Date.getDay(), Sun = 0).
export const DAY_SPECIALS = [
  "Slow Sunday",
  "Monday Special",
  "Taro Tuesday",
  "Wellness Wednesday",
  "Thirsty Thursday",
  "Feel-Good Friday",
  "Sweet Saturday",
];

export function todaySpecialLabel() {
  return DAY_SPECIALS[new Date().getDay()];
}

export const ALL_ITEMS = [...DRINKS, ...DESSERTS];

// Items belonging to a section (category).
export function itemsForSection(categoryId) {
  return ALL_ITEMS.filter((i) => i.category === categoryId);
}

export const CURRENCY = "KES";
