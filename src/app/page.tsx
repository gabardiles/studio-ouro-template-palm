/**
 * Home – onepager: all sections in order with anchor IDs per prompt.
 * Every section reads from client.config.ts only.
 */

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { USPs } from "@/components/USPs";
import { References } from "@/components/References";
import { FAQ } from "@/components/FAQ";
import { Reviews } from "@/components/Reviews";
import { Trust } from "@/components/Trust";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingWidgets } from "@/components/FloatingWidgets";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />       {/* id="hem" */}
        <About />      {/* id="om-oss" */}
        <Services />   {/* id="tjanster" — includes ROT block when skill is active */}
        <References /> {/* id="referencer" */}
        <USPs />
        <FAQ />        {/* id="faq" */}
        <Reviews />
        <Trust />
        <Contact />    {/* id="kontakt" */}
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}

