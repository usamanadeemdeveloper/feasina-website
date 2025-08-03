export interface Flavor {
  emoji: string;
  title: string;
  description: string;
  bgGradient: string;
  badgeText?: string;
  badgeStyle?: string;
  isTall?: boolean;
  borderStyle?: string;
  textColor?: string;
}

export const popularFlavors: Flavor[] = [
  {
    emoji: "🥭",
    title: "Tropical Mango",
    description:
      "Our #1 bestseller! Rich, creamy mango flavor that tastes like biting into a fresh, juicy mango from the tropics.",
    bgGradient: "from-yellow-400 to-orange-500",
    badgeText: "⭐ Most Popular",
    badgeStyle: "bg-white/20",
    isTall: true,
    textColor: "text-white",
  },
  {
    emoji: "🍊",
    title: "Zesty Orange",
    description:
      "Bursting with vitamin C and sunshine! A perfect balance of sweet and tangy that energizes your entire day.",
    bgGradient: "from-orange-400 to-red-500",
    badgeText: "🔥 Energy Boost",
    badgeStyle: "bg-white/20",
    isTall: true,
    textColor: "text-white",
  },
  {
    emoji: "🍑",
    title: "Sweet Peach",
    description:
      "Delicately sweet with floral notes. Like summer captured in a glass—smooth, refreshing, and absolutely divine.",
    bgGradient: "from-pink-400 to-orange-400",
    badgeText: "💎 Premium Choice",
    badgeStyle: "bg-white/20",
    isTall: true,
    textColor: "text-white",
  },
];

export const otherFlavors: Flavor[] = [
  {
    emoji: "🥤",
    title: "Classic Cola",
    description:
      "The timeless fizzy flavor you love, now in instant powder form!",
    bgGradient: "from-gray-800 to-black",
    borderStyle: "border-2 border-gray-800",
    isTall: false,
    textColor: "text-white",
  },
  {
    emoji: "🍋",
    title: "Lemon Twist",
    description: "Refreshing citrus burst",
    bgGradient: "bg-gray-100",
    borderStyle: "border-2 border-gray-300",
    isTall: false,
    textColor: "text-gray-600",
    badgeText: "Temporarily Out of Stock",
    badgeStyle: "bg-red-100 text-red-600",
  },
];
