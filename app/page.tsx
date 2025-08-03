"use server";
import Navbar from "@/components/Feasina/Navbar";
import Hero from "@/components/Feasina/Hero";
import Features from "@/components/Feasina/Features";
import Flavors from "@/components/Feasina/Flavors";
import HowToPrepare from "@/components/Feasina/HowToPrepare";
import Benefits from "@/components/Feasina/Benefits";
import Showcase from "@/components/Feasina/Showcase";
import Testimonials from "@/components/Feasina/Testimonials";
import CTA from "@/components/Feasina/CTA";
import Footer from "@/components/Feasina/Footer";

export default async function FeasinaLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      <Features />
      {/* Flavors Section */}
      <Flavors />
      {/* How to Prepare Section */}
      <HowToPrepare />
      {/* Nutritional Benefits */}
      <Benefits />
      {/* Product Showcase */}
      <Showcase />
      {/* Testimonials */}
      <Testimonials />
      {/* CTA Section */}
      <CTA />
      {/* Footer */}
      <Footer />
    </div>
  );
}
