"use client";

import { Tip } from "@/lib/prepData";

export function TipCard({ iconBg, iconText, title, desc }: Tip) {
  return (
    <div className="flex items-start space-x-3">
      <div className={`w-6 h-6 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
        <span className="text-white text-xs">{iconText}</span>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    </div>
  );
}
