import { HenstelNavbar } from "@/components/henstel/navbar";
import { HenstelHero } from "@/components/henstel/hero";
import { HenstelTrust } from "@/components/henstel/trust";
import { HenstelYourPrivacy } from "@/components/henstel/your-privacy";
import { HenstelFeatures } from "@/components/henstel/features";
import { HenstelHowItWorks } from "@/components/henstel/how-it-works";
import {
  henstelHasScreenshots,
  HenstelScreens,
} from "@/components/henstel/screens";
import { HenstelBenefits } from "@/components/henstel/benefits";
import { HenstelDownloadSection } from "@/components/henstel/download-section";
import { HenstelFaq } from "@/components/henstel/faq";
import { HenstelFooter } from "@/components/henstel/footer";
import {
  HenstelBreadcrumbJsonLd,
  HenstelFaqJsonLd,
  HenstelSoftwareApplicationJsonLd,
} from "@/components/seo/henstel-json-ld";

export default function HenstelPage() {
  return (
    <>
      <HenstelSoftwareApplicationJsonLd />
      <HenstelFaqJsonLd />
      <HenstelBreadcrumbJsonLd />

      <HenstelNavbar showScreens={henstelHasScreenshots()} />
      <main>
        <HenstelHero />
        <HenstelTrust />
        <HenstelYourPrivacy />
        <HenstelFeatures />
        <HenstelHowItWorks />
        <HenstelScreens />
        <HenstelBenefits />
        <HenstelDownloadSection />
        <HenstelFaq />
      </main>
      <HenstelFooter />
    </>
  );
}
