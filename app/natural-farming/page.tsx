import { NaturalFarmingNavbar } from "@/components/natural-farming/navbar";
import { NaturalFarmingHero } from "@/components/natural-farming/hero";
import { NaturalFarmingTrust } from "@/components/natural-farming/trust";
import { NaturalFarmingYourPrivacy } from "@/components/natural-farming/your-privacy";
import { NaturalFarmingFeatures } from "@/components/natural-farming/features";
import { NaturalFarmingHowItWorks } from "@/components/natural-farming/how-it-works";
import { NaturalFarmingScreens } from "@/components/natural-farming/screens";
import { NaturalFarmingBenefits } from "@/components/natural-farming/benefits";
import { NaturalFarmingDownloadSection } from "@/components/natural-farming/download-section";
import { NaturalFarmingFaq } from "@/components/natural-farming/faq";
import { NaturalFarmingFooter } from "@/components/natural-farming/footer";
import {
  NaturalFarmingBreadcrumbJsonLd,
  NaturalFarmingFaqJsonLd,
  NaturalFarmingSoftwareApplicationJsonLd,
} from "@/components/seo/natural-farming-json-ld";

export default function NaturalFarmingPage() {
  return (
    <>
      <NaturalFarmingSoftwareApplicationJsonLd />
      <NaturalFarmingFaqJsonLd />
      <NaturalFarmingBreadcrumbJsonLd />

      <NaturalFarmingNavbar />
      <main>
        <NaturalFarmingHero />
        <NaturalFarmingTrust />
        <NaturalFarmingYourPrivacy />
        <NaturalFarmingFeatures />
        <NaturalFarmingHowItWorks />
        <NaturalFarmingScreens />
        <NaturalFarmingBenefits />
        <NaturalFarmingDownloadSection />
        <NaturalFarmingFaq />
      </main>
      <NaturalFarmingFooter />
    </>
  );
}
