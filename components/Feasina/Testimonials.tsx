"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";

function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of satisfied customers who've made Feasina their
            go-to drink
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Feasina has become my daily refreshment! The mango flavor is
                absolutely incredible – it tastes like I'm sipping fresh
                tropical juice. I've tried orange and peach too, and they're all
                amazing!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-orange-600 font-semibold">S</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Fitness Enthusiast</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Perfect for the office! I keep a few sachets in my desk drawer.
                Quick, tasty, and much better than sugary sodas."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">M</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Mike Chen</p>
                  <p className="text-sm text-gray-500">Office Manager</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "My kids love the citrus flavor, and I love that it's healthier
                than other instant drinks. Win-win for our family!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold">L</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Lisa Rodriguez</p>
                  <p className="text-sm text-gray-500">Mother of Two</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
export default Testimonials;
