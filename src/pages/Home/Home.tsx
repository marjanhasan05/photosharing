import EverythingYouNeed from "@/components/HomePageComponent/EverythingYouNeed";
import FooterHome from "@/components/HomePageComponent/FooterHome";
import HeroSection from "@/components/HomePageComponent/HeroSection";
import HowItWorks from "@/components/HomePageComponent/HowItWorks";
import PricingSection from "@/components/HomePageComponent/PricingSection";
import ReadyGetStarted from "@/components/HomePageComponent/ReadyGetStarted";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <EverythingYouNeed />
      <HowItWorks />
      <PricingSection />
      <ReadyGetStarted />
      <FooterHome />
    </div>
  );
}
