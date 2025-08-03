"use client";
import { MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { handleWhatsAppClick } from "@/lib/utils";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-orange-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-600">Feasina</div>
        <Button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact Us
        </Button>
      </div>
    </nav>
  );
}
export default Navbar;
