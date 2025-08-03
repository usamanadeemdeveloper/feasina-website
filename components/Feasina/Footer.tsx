"use client";

import { handleWhatsAppClick } from "@/lib/utils";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Feasina</h3>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for instant, refreshing, and delicious powder
              drinks. Bringing summer flavors to your everyday life.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#flavours"
                  className="hover:text-orange-400 transition-colors"
                >
                  Our Flavours
                </a>
              </li>
              <li>
                <a
                  href="#benefits"
                  className="hover:text-orange-400 transition-colors"
                >
                  Health Benefits
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="hover:text-orange-400 transition-colors"
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <Button
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white w-[50%] justify-start"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
              <p className="text-gray-300 text-sm">
                Available 9 AM - 6 PM, Monday to Saturday
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 Feasina. All rights reserved. Made with ❤️ for
            refreshment lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
