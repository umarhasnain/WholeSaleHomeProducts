import BulkOrderCTA from "@/components/BulkOrderCTA";
import CTABanner from "@/components/CTABanner";
import CustomerTrustSection from "@/components/CustomerTrustSection";

import HeroSection1 from "@/components/HeroSec";
import Hero from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import LimitedTimeOffers from "@/components/LimitedTimeOffers";
import NewsletterAndContact from "@/components/NewsletterSignup";
import ProductData from "@/components/Products";

import TopCategories from "@/components/TopCategories";
import WholesaleFAQs from "@/components/WholesaleFAQs";
import WhyBuySection from "@/components/WhyBuySection";
import React from "react";

const page = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />

      <WhyBuySection />

      <TopCategories />

      <LimitedTimeOffers />

      <CustomerTrustSection />

      <HowItWorks />

      <BulkOrderCTA />
      <ProductData />
      <HeroSection1 />

      <CTABanner />
      <WholesaleFAQs />
      <NewsletterAndContact />
    </div>
  );
};

export default page;
