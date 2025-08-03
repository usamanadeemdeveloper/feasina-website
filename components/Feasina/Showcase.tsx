"use client";

import { CheckCircle, Star } from "lucide-react";
import Image from "next/image";

function Showcase() {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-blue-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfOqr2rQWERdrlNDdk78QJWMkHNVh42RbEUw&s"
              alt="Feasina Product Range"
              width={500}
              height={400}
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-sm text-gray-600 mt-1">Loved by thousands</p>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Perfect for Every Occasion
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Whether you're at home, office, gym, or on-the-go, Feasina fits
                perfectly into your lifestyle. Our convenient sachets make it
                easy to carry your favorite flavors wherever life takes you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">
                  Individual serving sachets for portion control
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">
                  Long shelf life - no refrigeration needed
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">
                  Multiple flavors to suit every taste preference
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">
                  Affordable pricing for premium quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Showcase;
