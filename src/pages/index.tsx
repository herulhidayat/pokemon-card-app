"use client";

import { Container } from "@mui/material";
import HeroFeature from "@/components/Features/Home/HeroFeature";
import PokeCardListFeature from "@/components/Features/Home/PokeCardListFeature";

export default function Home() {
  return (
    <>
      <section className="relative" style={{ height: "calc(100vh - 8.5rem)"}}>
        <Container sx={{ height: "100%" }}>
          <HeroFeature />
        </Container>
      </section>
      <section id="poke-dex" className="relative overflow-x-hidden py-20" style={{ background: "var(--color-pokemon)"}}>
        <div className="absolute w-[560px] h-[280px] -left-[280px] top-0 rounded-b-full border-[100px] border-secondary border-t-0"></div>
        <div className="absolute w-[560px] h-[280px] -right-[280px] bottom-0 rounded-t-full border-[100px] border-secondary border-b-0"></div>
        <Container sx={{ minHeight: "1799px", position: "relative", zIndex: 1}}>
          <PokeCardListFeature />
        </Container>
      </section>
    </>
  );
}
