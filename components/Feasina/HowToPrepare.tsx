"use client";

import { steps, tips } from "@/lib/prepData";
import { StepCard } from "./StepCard";
import { TipCard } from "./TipCard";

export default function HowToPrepare() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect Every Time</h2>
          <p className="text-xl text-gray-600">Follow these simple steps for the ultimate Feasina experience</p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s) => (
            <StepCard key={s.title} {...s} />
          ))}
        </div>

        {/* Pro Tips */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">💡 Pro Tips for Maximum Enjoyment</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {tips.map((t) => (
              <TipCard key={t.title} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
