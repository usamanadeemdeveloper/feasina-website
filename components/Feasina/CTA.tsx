"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { handleWhatsAppClick } from "@/lib/utils";

function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-blue-500">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Hydration?
        </h2>
        <p className="text-xl text-white/90 mb-10 leading-relaxed">
          Join the Feasina family today and discover why thousands choose us for
          their daily refreshment. Contact us now to learn about our flavors,
          pricing, and bulk orders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={handleWhatsAppClick}
            className="bg-white text-orange-500 hover:bg-gray-100 px-10 py-4 text-lg font-semibold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-orange-500 px-10 py-4 text-lg font-semibold bg-transparent"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Us Now
          </Button>
        </div>
      </div>
    </section>
  );
}
export default CTA;
