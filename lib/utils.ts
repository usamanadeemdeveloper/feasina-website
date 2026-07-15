import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleWhatsAppClick = (
  message = "Hi! I'm interested in learning more about Feasina drinks."
) => {
  const whatsappNumber = "+923132929709";

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
};
