import { WimmNavbar } from "@/components/wimm/navbar";
import { WimmHero } from "@/components/wimm/hero";
import { WimmTrust } from "@/components/wimm/trust";
import { WimmFeatures } from "@/components/wimm/features";
import { WimmHowItWorks } from "@/components/wimm/how-it-works";
import { WimmBenefits } from "@/components/wimm/benefits";
import { WimmWaitlistSection } from "@/components/wimm/waitlist-section";
import { WimmFaq } from "@/components/wimm/faq";
import { WimmFooter } from "@/components/wimm/footer";
import {
  WimmBreadcrumbJsonLd,
  WimmFaqJsonLd,
  WimmSoftwareApplicationJsonLd,
} from "@/components/seo/wimm-json-ld";

export default function WimmPage() {
  return (
    <>
      <WimmSoftwareApplicationJsonLd />
      <WimmFaqJsonLd />
      <WimmBreadcrumbJsonLd />

      <WimmNavbar />
      <main>
        <WimmHero />
        <WimmTrust />
        <WimmFeatures />
        <WimmHowItWorks />
        <WimmBenefits />
        <WimmWaitlistSection />
        <WimmFaq />
      </main>
      <WimmFooter />
    </>
  );
}
