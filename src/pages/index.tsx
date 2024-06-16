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
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>MY InnoTrinsic</title>
        <meta property="og:title" content="MY InnoTrinsic" key="title" />
        <meta
          name="description"
          content="Mehrwert durch BrainCare: MY InnoTrinsic eröffnet neuroloyale
                   Perspektiven und bietet „Do-it-Lösungen“ für Menschen, Unternehmen
                   und Organisationen."
        />
        <meta name="robots" content="index, follow" />
      </Head>
      {/* <CookieConsent /> */}
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
