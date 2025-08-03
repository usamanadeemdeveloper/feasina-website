import { Zap, Droplets, Heart } from "lucide-react";

export interface Feature {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export const features: Feature[] = [
  {
    Icon: Zap,
    title: "Instant Mix",
    description:
      "No waiting, no hassle. Just add water, stir for 10 seconds, and your refreshing drink is ready to enjoy.",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    Icon: Droplets,
    title: "Burst of Flavors",
    description:
      "From tropical mango to zesty citrus, each packet delivers an explosion of authentic summer flavors.",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    Icon: Heart,
    title: "Health Conscious",
    description:
      "Made with quality ingredients, no artificial preservatives, and packed with vitamins for your daily boost.",
    bgColor: "bg-green-100",
    iconColor: "text-green-500",
  },
];
