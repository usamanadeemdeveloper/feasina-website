"use client";
import { features } from "@/lib/featuresData";
import { FeatureCard } from "./FeatureCard";

export default function Features() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Feasina?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of convenience, taste, and refreshment with every sip
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
