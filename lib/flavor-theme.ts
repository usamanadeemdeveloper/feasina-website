// Purely cosmetic (emoji/gradient/text color) -- not modeled in the DB.
// Keyed by flavour slug. Re-theming to real product photos is a separate
// future decision, not part of wiring up live catalog/checkout data.
export interface FlavourTheme {
  emoji: string;
  bgGradient: string;
  textColor: string;
  borderStyle?: string;
}

const FALLBACK_THEME: FlavourTheme = {
  emoji: "🥤",
  bgGradient: "from-orange-400 to-red-500",
  textColor: "text-white",
};

const FLAVOUR_THEMES: Record<string, FlavourTheme> = {
  "tropical-mango": {
    emoji: "🥭",
    bgGradient: "from-yellow-400 to-orange-500",
    textColor: "text-white",
  },
  "zesty-orange": {
    emoji: "🍊",
    bgGradient: "from-orange-400 to-red-500",
    textColor: "text-white",
  },
  "sweet-peach": {
    emoji: "🍑",
    bgGradient: "from-pink-400 to-orange-400",
    textColor: "text-white",
  },
  "vimto-cola": {
    emoji: "🥤",
    bgGradient: "from-gray-800 to-black",
    textColor: "text-white",
    borderStyle: "border-2 border-gray-800",
  },
  "lemon-twist": {
    emoji: "🍋",
    bgGradient: "bg-gray-100",
    textColor: "text-gray-600",
    borderStyle: "border-2 border-gray-300",
  },
};

export function getFlavourTheme(slug: string): FlavourTheme {
  return FLAVOUR_THEMES[slug] ?? FALLBACK_THEME;
}
