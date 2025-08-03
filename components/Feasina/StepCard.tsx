"use client";

import { Step } from "@/lib/prepData";

export function StepCard({ iconBg, iconColor, iconText, title, desc }: Step) {
  return (
    <div className="text-center">
      <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <span className={`text-2xl font-bold ${iconColor}`}>{iconText}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}