"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { AmbientExperience, OrbitDetails } from "./AmbientExperience";
import { ArrowDown, ArrowUpRight, ArrowRight, Check, Copy, X, Menu, Sparkles, Cpu, Code2, Layers, Database, MapPin, Download, Github, Linkedin, Phone } from "lucide-react";
import { projects, profile, skills } from "@/data/portfolio";
import { SignalOrb } from "./SignalOrb";
import { ProjectArtwork } from "./ProjectArtwork";
import { IntelligenceLab } from "./IntelligenceLab";

type Project = typeof projects[number];
const icons = [Code2, Cpu, Layers, Database];

const contactLinks = [
  { label: "LinkedIn", detail: "Vaibhav Pandey", description: "Let’s connect professionally", href: profile.linkedin, icon: Linkedin, external: true },
  { label: "GitHub", detail: "VaibhavPandey-01", description: "Explore the code behind the work", href: profile.github, icon: Github, external: true },
  { label: "Phone", detail: profile.phone, description: "Start a conversation", href: profile.phoneHref, icon: Phone, external: false },
];

function ContactLinks({ compact = false }: { compact?: boolean }) {
  return <nav className={compact ? "hero-socials" : "contact-cards"} aria-label={compact ? "Quick contact links" : "Connect with Vaibhav"}>
    {contactLinks.map(({ label, detail, description, href, icon: Icon, external }) => (
      <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        <Icon size={compact ? 15 : 22} aria-hidden="true" />
        {compact ? <span>{label === "Phone" ? detail : label}</span> : <div><span className="contact-label">{label}</span><strong>{detail}</strong><span className="contact-description">{description}</span></div>}
        {!compact && <ArrowUpRight size={18} className="contact-card-arrow" aria-hidden="true" />}
      </a>
    ))}
  </nav>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 0, y: reduced ? 0 : 42, filter: reduced ? "none" : "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [orbMode, setOrbMode] = useState(0);
  const [active, setActive] = useState("home");
  const [selected, setSelected] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id); }, { rootMargin: "-20% 0px -55% 0px" });
    document.querySelectorAll("main > section[id]").forEach(section => observer.observe(section));
    return () => { observer.disconnect(); if (copyTimer.current) clearTimeout(copyTimer.current); };
  }, []);
  useEffect(() => {
    if (selected) { dialog.current?.showModal(); const previous = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = previous; }; }
    dialog.current?.close();
  }, [selected]);
  const copy = async () => { try { await navigator.clipboard.writeText(profile.email); setCopied(true); copyTimer.current = setTimeout(() => setCopied(false), 2500); } catch { window.location.href = `mailto:${profile.email}`; } };
  const close = () => setSelected(null);
  return <>
    <AmbientExperience />
    <a className="skip-link" href="#work">Skip to projects</a>
    <motion.div className="reading-progress" style={{ scaleX: progress }} />
    <header className="site-header">
      <a href="#home" className="wordmark" aria-label="Vaibhav Pandey home">v<span>p</span><i /></a>
      <nav aria-label="Main navigation" className={menu ? "nav-links is-open" : "nav-links"}>
        {[["work", "Work"], ["about", "About"], ["toolkit", "Toolkit"], ["journey", "Journey"]].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} aria-current={active === id ? "location" : undefined}>{label}<span /></a>)}
      </nav>
      <a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
      <button className="menu-toggle" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>
    <main>
      <section id="home" className="hero shell">
        <div className="hero-topline"><span className="eyebrow"><i className="status-dot" /> OPEN TO INTERNSHIPS</span><span className="eyebrow hero-location">GREATER NOIDA, INDIA ↗</span></div>
        <div className="hero-content">
          <div className="hero-copy"><motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>Hey, I’m Vaibhav Pandey.</motion.p>
            <h1 aria-label="Curiosity. Code. Real impact.">{["Curiosity.", "Code.", "Real impact."].map((line, index) => <span className="headline-mask" aria-hidden="true" key={line}><motion.span className={index === 2 ? "hero-impact" : ""} initial={{ y: "110%", rotate: 3 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1.1, delay: 0.15 + index * 0.16, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span></span>)}</h1>
            <p className="hero-description">I build software that meets the real world.<br />From AI that works offline to apps that bring people together.</p>
            <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowDown size={17} /></a><a className="text-link" href="/Vaibhav-Pandey-CV.docx" download>Download CV <Download size={15} /></a></div>
            <ContactLinks compact />
          </div>
          <div className="hero-scene"><SignalOrb mode={orbMode} /><OrbitDetails /><span className="scene-coordinate coordinate-top">FIG. 001 — LANGUAGES IN MOTION</span><span className="scene-coordinate coordinate-side">28.47° N / 77.50° E</span><div className="scene-caption"><span className="scene-cross">+</span><span>Human curiosity.<br /><strong>Machine possibilities.</strong></span></div><div className="orb-controls" aria-label="Choose a programming language">{["C++", "Python"].map((label, index) => <button key={label} onClick={() => setOrbMode(index)} aria-pressed={orbMode === index}><span>0{index + 1}</span>{label}</button>)}</div></div>
        </div>
        <div className="hero-bottom"><span>SOFTWARE DEVELOPMENT <i /> APPLIED AI <i /> CREATIVE PROBLEM SOLVING</span><a href="#work">SCROLL TO DISCOVER <ArrowDown size={13} /></a></div>
      </section>
      <div className="ticker" aria-hidden="true"><div>{Array.from({ length: 4 }, (_, i) => <span key={i}>THINK DEEPLY <b>✳</b> BUILD PURPOSEFULLY <b>✳</b> KEEP EXPLORING <b>✳</b></span>)}</div></div>
      <section id="work" className="work-section shell section-space">
        <Reveal className="section-heading"><div><p className="eyebrow section-index">01 / SELECTED WORK</p><h2>Ideas, made <em>real.</em></h2></div><p>A few things I’ve built.<br />Each one, a new problem to solve.</p></Reveal>
        <div className="projects-grid">{projects.map(project => <Reveal key={project.id} className={`project-card ${project.color} ${project.id === "disaster" ? "featured-project" : ""}`}><button className="project-open" onClick={() => setSelected(project)} aria-label={`Read ${project.name} case study`}><ProjectArtwork id={project.id} /><div className="project-info"><div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div><div className="project-title"><h3>{project.name}</h3><span className="round-arrow"><ArrowUpRight size={22} /></span></div><p>{project.summary}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="case-link">Explore the project <ArrowRight size={14} /></span></div></button></Reveal>)}</div>
      </section>
      <IntelligenceLab />
      <section id="about" className="about-section section-space"><div className="shell about-grid"><Reveal className="portrait-panel"><div className="portrait-image" role="img" aria-label="Stylized portrait of Vaibhav Pandey" /><div className="portrait-overlay"><span className="eyebrow">THE PERSON BEHIND THE CODE</span><span>Vaibhav<br />Pandey<span className="period">.</span></span></div><span className="portrait-corner">VP / 2026</span></Reveal><Reveal className="about-copy"><p className="eyebrow section-index">02 / A LITTLE ABOUT ME</p><h2>Always a student.<br /><em>Always building.</em></h2><p>I’m a Computer Science student specializing in AI & ML at IILM University. I like finding the point where an interesting idea becomes something people can actually use.</p><p>That curiosity has taken me from C++ and problem solving to mobile development, multimodal AI, and running language models on a phone without the internet.</p><p>I’m looking for an internship where I can contribute, learn from a team, and keep turning ambitious questions into working software.</p><div className="about-facts"><span><MapPin size={15} /> Greater Noida, India</span><span>Hindi & English</span></div><a href="/Vaibhav-Pandey-CV.docx" download className="text-link">The full story, on paper <ArrowUpRight size={17} /></a></Reveal></div></section>
      <section id="toolkit" className="shell section-space"><Reveal className="section-heading"><div><p className="eyebrow section-index">03 / THE TOOLKIT</p><h2>Different tools.<br /><em>One curious mind.</em></h2></div><p>A growing stack for building<br />across the screen and beyond.</p></Reveal><div className="skills-grid">{skills.map((skill, i) => { const Icon = icons[i]; return <Reveal className="skill-card" key={skill.title}><span className="skill-number">0{i + 1}</span><Icon size={27} strokeWidth={1.2} /><h3>{skill.title}</h3><p>{skill.subtitle}</p><div className="skill-list">{skill.items.map(item => <span key={item}>{item}</span>)}</div></Reveal>; })}</div><Reveal className="learning-note"><span className="status-dot" /> CURRENTLY DEEPENING MY FOUNDATION IN DATA STRUCTURES & ALGORITHMS.</Reveal></section>
      <section id="journey" className="journey-section section-space"><div className="shell journey-grid"><Reveal><p className="eyebrow section-index">04 / THE JOURNEY SO FAR</p><h2>Small steps.<br /><em>Real momentum.</em></h2><p className="journey-intro">Learning in classrooms.<br />Growing through building.</p><div className="award"><Sparkles size={24} /><strong>2nd place</strong><span>Promptaethon · Ignite Tech Fest<br />IILM University, April 2026</span></div></Reveal><div className="timeline">{[
          ["AUG 2026", "Smart India Hackathon", "Team member · Internal round, IILM University", "Built with a team on DisasterSafe. Contributed to Android development, on-device AI, the volunteer dashboard, and research into offline communication."],
          ["JUN — JUL 2026", "Building for the community", "Summer intern · MARS", "Developed CivicSafe during an internship focused on sustainable community development. Took primary ownership of the platform’s technical implementation."],
          ["APR 2026", "Ideas under pressure", "Promptaethon · Ignite Tech Fest", "Secured second place in an AI prompting challenge. Built AI Study Buddy and explored prompt design, iteration, and reliable structured outputs."],
          ["2025 — 2029", "The foundation", "B.Tech CSE · AI & ML", "Studying Computer Science & Engineering with a specialization in Artificial Intelligence and Machine Learning at IILM University, Greater Noida."],
        ].map(([date, title, role, description]) => <Reveal className="timeline-item" key={date}><span className="timeline-dot" /><span className="eyebrow">{date}</span><h3>{title}</h3><span className="timeline-role">{role}</span><p>{description}</p></Reveal>)}</div></div></section>
      <section id="contact" className="contact-section shell section-space"><Reveal><p className="eyebrow"><i className="status-dot" /> OPEN TO INTERNSHIPS & INTERESTING CONVERSATIONS</p><h2>Have something<br />in <em>mind?</em><a href={`mailto:${profile.email}`} aria-label="Email Vaibhav" className="contact-arrow"><ArrowUpRight /></a></h2><div className="contact-bottom"><p>A project, an opportunity, or a good question.<br />I’d love to hear it.</p><div className="email-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><button onClick={copy} aria-label={copied ? "Email copied" : "Copy email address"}>{copied ? <Check size={18} /> : <Copy size={18} />}</button><span className="copy-message" role="status">{copied ? "Copied!" : ""}</span></div></div><ContactLinks /></Reveal></section>
    </main>
    <footer className="site-footer shell"><a className="wordmark" href="#home">v<span>p</span><i /></a><span>© {new Date().getFullYear()} Vaibhav Pandey</span><span className="footer-note">MADE OF CURIOSITY & CODE</span><a href="#home">Back to top <ArrowUpRight size={15} /></a></footer>
    <dialog ref={dialog} className="project-dialog" aria-label={selected ? `${selected.name} project details` : "Project details"} onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }} onClose={() => setSelected(null)}>{selected && <div className={`dialog-content ${selected.color}`}><button className="dialog-close" onClick={close} aria-label="Close project details" autoFocus><X /></button><p className="eyebrow">{selected.category} / {selected.year}</p><h2>{selected.name}</h2><p className="dialog-headline">{selected.title}</p><div className="dialog-metric"><strong>{selected.metric}</strong><span>{selected.metricLabel}</span></div><p>{selected.detail}</p><h3>Inside the build</h3><ul>{selected.points.map(point => <li key={point}>{point}</li>)}</ul><div className="tags">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{selected.repo && <a className="button button-primary" href={selected.repo} target="_blank" rel="noreferrer">View source <ArrowUpRight size={16} /></a>}<a className="text-link" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let's talk about ${selected.name}`)}`}>Ask me about this project <ArrowUpRight size={16} /></a></div>}</dialog>
  </>;
}
