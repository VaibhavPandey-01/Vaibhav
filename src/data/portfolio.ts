export const profile = {
  email: "pandeyvaibhav0310@gmail.com",
  github: "https://github.com/VaibhavPandey-01",
  linkedin: "https://www.linkedin.com/in/vaibhav-pandey-a9006338b/",
  phone: "+91 9369868977",
  phoneHref: "tel:+919369868977",
};

export const projects = [
  {
    id: "disaster", number: "01", name: "DisasterSafe", category: "EDGE AI / DISASTER RESPONSE", year: "AUG 2026", color: "coral",
    title: "Intelligence.\nEven when the internet isn't.",
    summary: "An offline-first disaster response ecosystem. On-device AI guidance for victims. A command hub for the people bringing help.",
    tags: ["Kotlin", "Gemma · llama.cpp", "Jetpack Compose", "PHP / SQL"],
    metric: "On-device", metricLabel: "AI inference", detail: "Built with a team for the Smart India Hackathon internal round at IILM University. DisasterSafe brings local AI assistance and rescue coordination into one ecosystem.",
    points: ["Integrated Gemma 3 1B through llama.cpp for offline Android assistance.", "Grounded the model in NDMA emergency protocols with GPS, altitude, medical profile, and SOS context.", "Contributed to the role-based GeoGuardians volunteer dashboard and Android application.", "Researched low-connectivity communication, including cellular SOS transmission when internet access is unavailable."], repo: "",
  },
  {
    id: "civic", number: "02", name: "CivicSafe", category: "FULL STACK / MULTIMODAL AI", year: "JUN — JUL 2026", color: "blue",
    title: "A better city starts\nwith better evidence.",
    summary: "GPS-tagged civic reporting with AI that checks the evidence. Built during a summer internship to connect citizens and municipal admins.",
    tags: ["React Native", "TypeScript", "MongoDB", "Gemini Vision"],
    metric: "Dual-proof", metricLabel: "image verification", detail: "Developed during a summer internship with MARS – Centre for Sustainable Community Development, taking primary ownership of the technical implementation with AI-assisted development.",
    points: ["Built a React Native mobile app and Node.js / Express backend with MongoDB Atlas.", "Implemented GPS tagging, Cloudinary media uploads, and JWT role-based access.", "Used Gemini multimodal vision to compare before-and-after repair images and flag fraudulent closures.", "Added an AI intake filter with English and Hindi rejection reasons for invalid submissions."], repo: "",
  },
  {
    id: "study", number: "03", name: "AI Study Buddy", category: "GENAI / LEARNING TOOLS", year: "APR 2026", color: "violet",
    title: "Less information overload.\nMore lightbulb moments.",
    summary: "A learning companion that turns questions and documents into contextual tutoring, quizzes, flashcards, and a plan to keep going.",
    tags: ["Node.js", "Express", "Gemini", "JavaScript"], metric: "7", metricLabel: "REST endpoints", detail: "Built at the Promptaethon university hackathon during Ignite Tech Fest. The platform combines conversational tutoring with structured study tools.",
    points: ["Integrated Gemini 2.0 Flash across seven endpoints for tutoring, quizzes, flashcards, and study planning.", "Enforced structured JSON outputs with fallback parsing for generated questions and flashcards.", "Added multi-turn contextual memory and document ingestion with Multer.", "Built study streaks and analytics into a gamified interface."], repo: "",
  },
  {
    id: "echo", number: "04", name: "EchoBrief AI", category: "PYTHON / MULTILINGUAL AI", year: "NOV 2025", color: "green",
    title: "Long videos.\nClear takeaways.",
    summary: "From a YouTube link to structured study notes. A multilingual summarizer that makes long-form learning easier to revisit.",
    tags: ["Python", "Streamlit", "Gemini API", "Supadata"], metric: "20+", metricLabel: "languages supported", detail: "A college project that converts long-form YouTube content into revision-ready notes of 800–1,000 words, with a reported processing time of under 45 seconds.",
    points: ["Integrated Supadata for transcript extraction across YouTube URL formats.", "Designed hierarchical prompts for key concepts, takeaways, and quotes.", "Supported summaries in more than 20 languages through the Gemini API.", "Created a custom dark-mode Streamlit interface."], repo: "",
  },
];

export const skills = [
  { title: "Languages", subtitle: "The building blocks", items: ["C / C++", "Python", "TypeScript", "JavaScript", "Kotlin", "PHP"] },
  { title: "AI & intelligence", subtitle: "From cloud to the edge", items: ["Gemini API", "Multimodal Vision", "Gemma / llama.cpp", "Prompt Engineering"] },
  { title: "Apps & systems", subtitle: "Ideas into working products", items: ["React Native / Expo", "Jetpack Compose", "Node.js / Express", "Streamlit", "REST APIs"] },
  { title: "Data & tooling", subtitle: "What keeps it all connected", items: ["MongoDB Atlas", "SQL / SQLite", "Room DB", "Git / GitHub", "JWT", "Cloudinary"] },
];
