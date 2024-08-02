import ContactForm from "@/components/ContactForm";
import { CookieConsent } from "@/components/cookies/Cookiebanner";
import LandingSection from "@/components/sections/Home/LandingSection";
import IconsSection from "@/components/sections/Home/IconsSection";
import AboutUsSection from "@/components/sections/Home/AboutUsSection";
import ServicesSection from "@/components/sections/Home/ServicesSection";
import GetToKnowSection from "@/components/sections/Home/GetToKnowSection";
import BusinessSection from "@/components/sections/Home/BusinessSection";
import MountainSection from "@/components/sections/Home/MountainSection";
import FaqSection from "@/components/sections/Home/FaqSection";
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
        <link rel="canonical" href="https://www.myinnotrinsic.de/" />
      </Head>
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
