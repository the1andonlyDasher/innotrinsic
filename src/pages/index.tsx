import ContactForm from "@/components/ContactForm";
import { CookieConsent } from "@/components/cookies/Cookiebanner";
import LandingSection from "@/components/sections/LandingSection";
import IconsSection from "@/components/sections/IconsSection";
import AboutUsSection from "@/components/sections/AboutUsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import GetToKnowSection from "@/components/sections/GetToKnowSection";
import BusinessSection from "@/components/sections/BusinessSection";
import MountainSection from "@/components/sections/MountainSection";
import FaqSection from "@/components/sections/FaqSection";
import Footer from "@/components/Footer";
import { Html, Head } from "next/document";

export default function Home() {
  return (
    <>

      <CookieConsent />
      <LandingSection />
      <IconsSection />
      <AboutUsSection />
      <ServicesSection />
      <GetToKnowSection />
      <BusinessSection />
      <MountainSection />
      <FaqSection />
      <ContactForm props={{ id: "kontakt", title: "Kontakt" }} />
      <Footer data legal home={false} />
    </>
  );
}
