"use client";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { handleWhatsAppClick } from "@/lib/utils";
import Link from "next/link";

function Hero() {
  return (
    <section className="pt-20 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Refresh Your
                <span className="text-orange-500 block">Summer</span>
                <span className="text-blue-500">Instantly</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Feasina brings you the perfect instant powder drink that
                transforms ordinary water into extraordinary refreshment. From
                tropical mango paradise to zesty orange sunshine – just mix,
                stir, and dive into a world of irresistible summer flavors
                anytime, anywhere.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleWhatsAppClick}
                className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-4 text-lg"
              >
                <Link href="#features" className="flex items-center">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-blue-400 rounded-3xl blur-3xl opacity-20"></div>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvXfZljDiyUXBIWRdqrsv27kepqaw2fhpNbw&s"
              alt="Feasina Instant Drink"
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
export default Hero;
