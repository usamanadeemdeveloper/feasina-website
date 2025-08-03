"use client";

import Image from "next/image";

function Benefits() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              More Than Just Great Taste
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Feasina isn't just about incredible flavors – we've packed each
              serving with goodness that your body will thank you for.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 text-xl">🍊</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Vitamin C Boost
                  </h3>
                  <p className="text-gray-600">
                    Each serving provides essential Vitamin C to support your
                    immune system and keep you energized throughout the day.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-xl">💧</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Enhanced Hydration
                  </h3>
                  <p className="text-gray-600">
                    Electrolytes help your body absorb water more effectively,
                    keeping you hydrated longer than plain water.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xl">🌱</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Natural Ingredients
                  </h3>
                  <p className="text-gray-600">
                    Made with real fruit extracts and natural flavoring – no
                    artificial colors or harmful preservatives.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 text-xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Low Calorie
                  </h3>
                  <p className="text-gray-600">
                    Only 25 calories per serving – enjoy guilt-free refreshment
                    without compromising your health goals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl blur-3xl opacity-20"></div>
            <Image
              src="/placeholder.svg?height=500&width=400"
              alt="Feasina Nutritional Benefits"
              width={400}
              height={500}
              className="relative z-10 rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Benefits;
