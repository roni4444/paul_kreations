import { SurroundItNavbar } from "@/components/surround-it/navbar";
import { SurroundItHero } from "@/components/surround-it/hero";
import { SurroundItTrust } from "@/components/surround-it/trust";
import { SurroundItYourPrivacy } from "@/components/surround-it/your-privacy";
import { SurroundItFeatures } from "@/components/surround-it/features";
import { SurroundItHowItWorks } from "@/components/surround-it/how-it-works";
import { SurroundItScreens } from "@/components/surround-it/screens";
import { SurroundItBenefits } from "@/components/surround-it/benefits";
import { SurroundItDownloadSection } from "@/components/surround-it/download-section";
import { SurroundItFaq } from "@/components/surround-it/faq";
import { SurroundItFooter } from "@/components/surround-it/footer";
import {
  SurroundItBreadcrumbJsonLd,
  SurroundItFaqJsonLd,
  SurroundItSoftwareApplicationJsonLd,
} from "@/components/seo/surround-it-json-ld";

export default function SurroundItPage() {
  return (
    <>
      <SurroundItSoftwareApplicationJsonLd />
      <SurroundItFaqJsonLd />
      <SurroundItBreadcrumbJsonLd />

      <SurroundItNavbar />
      <main>
        <SurroundItHero />
        <SurroundItTrust />
        <SurroundItYourPrivacy />
        <SurroundItFeatures />
        <SurroundItHowItWorks />
        <SurroundItScreens />
        <SurroundItBenefits />
        <SurroundItDownloadSection />
        <SurroundItFaq />
      </main>
      <SurroundItFooter />
    </>
  );
}
