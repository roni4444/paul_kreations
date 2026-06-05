import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Apps } from "@/components/sections/apps";
import { Services } from "@/components/sections/services";
import { Team } from "@/components/sections/team";
import { Roadmap } from "@/components/sections/roadmap";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Apps />
        <Services />
        <Team />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
