"use client";

import { Flavor } from "@/lib/flavorsData";
import { Card, CardContent } from "../ui/card";

export function FlavorCard({
  emoji,
  title,
  description,
  bgGradient,
  badgeText,
  badgeStyle,
  isTall = false,
  borderStyle = "",
  textColor = "text-gray-800",
}: Flavor) {
  const heightClass = isTall ? "h-80" : "";

  return (
    <Card
      className={`
        cursor-pointer 
        border-0 
        shadow-xl hover:shadow-2xl transition-all duration-300 
        hover:-translate-y-2
        ${borderStyle} 
        ${
          bgGradient.startsWith("from-")
            ? `bg-gradient-to-br ${bgGradient}`
            : bgGradient
        }
      `}
    >
      <CardContent
        className={`p-8 text-center ${textColor} ${heightClass} flex flex-col justify-between`}
      >
        <div>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <span className="text-4xl">{emoji}</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="leading-relaxed mb-4">{description}</p>
        </div>
        {badgeText && (
          <div
            className={`rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm ${badgeStyle}`}
          >
            {badgeText}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
