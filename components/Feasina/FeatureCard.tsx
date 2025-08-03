"use client";
import { Feature } from "@/lib/featuresData";
import { Card, CardContent } from "../ui/card";

export function FeatureCard({ Icon, title, description, bgColor, iconColor }: Feature) {
  return (
    <Card className="cursor-pointer border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-8 text-center">
        <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
