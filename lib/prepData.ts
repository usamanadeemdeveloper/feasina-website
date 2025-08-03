export interface Step {
  iconBg: string;
  iconColor: string;
  iconText: string;
  title: string;
  desc: string;
}

export const steps: Step[] = [
  {
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    iconText: "1",
    title: "Pour Water",
    desc: "Add 200ml of chilled water to your glass",
  },
  {
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    iconText: "2",
    title: "Add Feasina",
    desc: "Empty one sachet into the water",
  },
  {
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    iconText: "3",
    title: "Stir Well",
    desc: "Mix for 10–15 seconds until fully dissolved",
  },
  {
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    iconText: "4",
    title: "Enjoy!",
    desc: "Sip and savor the burst of flavor",
  },
];

export interface Tip {
  iconBg: string;
  iconText: string;
  title: string;
  desc: string;
}

export const tips: Tip[] = [
  {
    iconBg: "bg-blue-500",
    iconText: "❄️",
    title: "Ice Cold Water",
    desc: "Use chilled water for the most refreshing experience",
  },
  {
    iconBg: "bg-orange-500",
    iconText: "🧊",
    title: "Add Ice Cubes",
    desc: "Drop in a few ice cubes for extra chill factor",
  },
  {
    iconBg: "bg-green-500",
    iconText: "🍃",
    title: "Fresh Garnish",
    desc: "Add mint leaves or fruit slices for a gourmet touch",
  },
];
