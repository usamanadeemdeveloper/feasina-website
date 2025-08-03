import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleWhatsAppClick = () => {
  const whatsappNumber = "+923132929709";
  const whatsappMessage =
    "Hi! I'm interested in learning more about Feasina drinks.";

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  window.open(url, "_blank");
};
