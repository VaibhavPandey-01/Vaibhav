import { Navbar } from "@/components/Navbar";
import { HeroCanvas } from "@/components/HeroCanvas";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StatsSection } from "@/components/StatsSection";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <main className="bg-black text-white selection:bg-[#ff0033]/30 min-h-screen">
      <Navbar />
      <HeroCanvas />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <StatsSection />
      <CTASection />

      {/* Minimal Footer */}
      <footer className="py-8 text-center text-sm font-light text-gray-500 bg-black border-t border-white/5">
        &copy; {new Date().getFullYear()} Vaibhav Pandey. Engineered with pure logic.
      </footer>
    </main>
  );
}
