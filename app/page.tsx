"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import SwissLanding from "@/components/sections/SwissLanding";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen relative pt-20">
      <LoadingAnimation onComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <>
          <Navigation />
          <SwissLanding />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
