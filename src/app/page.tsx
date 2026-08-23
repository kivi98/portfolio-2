import React from "react";
import { Container } from "@mui/material";
import Hero from "@/components/home/Hero";
import TechMarquee from "@/components/home/TechMarquee";
import Highlights from "@/components/home/Highlights";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ContactCTA from "@/components/ContactCTA";

// data-kiwi-hint lets the optional pixel guide narrate a section as it scrolls
// into view. Purely decorative — the attribute is inert when the guide is off.
export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ overflow: "visible" }}>
      <Hero />
      <div data-kiwi-hint="That strip is the stack I actually work in — not a wish list.">
        <TechMarquee />
      </div>
      <div data-kiwi-hint="The short version of what I do. Three lines, no filler.">
        <Highlights />
      </div>
      <div data-kiwi-hint="Pick a card — each one opens a proper write-up, not a screenshot.">
        <FeaturedProjects />
      </div>
      <div data-kiwi-hint="That's the door. It's open.">
        <ContactCTA />
      </div>
    </Container>
  );
}
