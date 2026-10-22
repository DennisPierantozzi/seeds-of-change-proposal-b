import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Journey from "@/components/Journey";
import About from "@/components/About";
import HowWeWork from "@/components/HowWeWork";
import WhatWeDo from "@/components/WhatWeDo";
import Principles from "@/components/Principles";
import Community from "@/components/Community";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Journey />
        <About />
        <HowWeWork />
        <WhatWeDo />
        <Principles />
        <Community />
        <GetInvolved />
      </main>
      <Footer />
    </>
  );
}
