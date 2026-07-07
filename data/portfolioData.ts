export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics?: string;
  liveUrl: string;
  githubUrl: string;
  imageBg: string;
  accentColor: string;
}

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
}

export interface TechItem {
  name: string;
  category: "Core" | "Databases & ORMs" | "Backend & DevOps" | "Design & UI";
  proficiency: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  src: string;
}

export interface Achievement {
  platform: string;
  badge: string;
  rank: string;
  details: string;
}

export interface Certification {
  title: string;
  issuer: string;
  image: string;
  url: string;
}

export const PORTFOLIO_DATA = {
  developer: {
    name: "Anurag Das",
    role: "Full Stack & AI Application Engineer",
    tagline: "Building scalable SaaS platforms and AI-driven applications with measurable business impact.",
    bio: "Full Stack & AI Application Engineer with 2+ years of experience building scalable SaaS platforms using React, Next.js, Node.js, and TypeScript. Proven track record of shipping production features that cut manual workflows by up to 60% and improve performance by up to 45%. Skilled across the full stack — from PostgreSQL/MongoDB data modeling to REST API design and cloud deployment — with a focus on clean architecture.",
    status: "Available for B2B SaaS & AI Application roles",
    location: "Kolkata, West Bengal, India",
    timezone: "IST / UTC+5:30",
    email: "anuragdas12921@gmail.com",
  },
  
  heroWords: [
    "Full Stack Engineer",
    "AI Application Developer",
    "SaaS Architect",
    "Next.js & React Specialist",
    "Node.js & NestJS Artisan"
  ],

  stats: [
    { label: "Years Experience", value: "2+" },
    { label: "Students Mentored", value: "250+" },
    { label: "Workflow Cut", value: "60%" },
    { label: "Performance Boost", value: "45%" },
  ],

  projects: [
    {
      id: "project-1",
      title: "SalonMate — Salon Booking Platform",
      subtitle: "Location-based marketplace & booking engine for grooming professionals",
      description: "Built a location-based marketplace connecting users with nearby salons, barbers, and grooming professionals. Designed searchable listings, profile pages, booking flows, authentication, and service management with role-based access control via NextAuth.",
      tags: ["Next.js", "TypeScript", "ShadCN UI", "Tailwind CSS", "Django", "PostgreSQL", "Prisma", "Redux Toolkit"],
      metrics: "Role-Based Access • Scalable Marketplace",
      liveUrl: "https://github.com/anurag-das",
      githubUrl: "https://github.com/anurag-das",
      imageBg: "from-zinc-900/40 via-zinc-950/20 to-black",
      accentColor: "#ffffff"
    },
    {
      id: "project-2",
      title: "Compound — Habit Tracker",
      subtitle: "Full-stack mental health & habit tracking platform",
      description: "Built a mental health tracking platform featuring mood tracking, analytics dashboards, authentication, and progress visualization. Designed scalable REST APIs and database schemas to support long-term activity tracking.",
      tags: ["Next.js", "NestJS", "TypeScript", "Prisma", "MongoDB", "React Hook Form", "Recoil"],
      metrics: "Long-Term Telemetry • Custom REST APIs",
      liveUrl: "https://github.com/anurag-das",
      githubUrl: "https://github.com/anurag-das",
      imageBg: "from-zinc-900/40 via-zinc-950/20 to-black",
      accentColor: "#ffffff"
    },
    {
      id: "project-3",
      title: "QuidAI — AI Recruiting Engine",
      subtitle: "AI-driven talent acquisition and shortlisting tool",
      description: "Engineered an AI-driven recruiting tool that automates candidate screening and resume evaluation, successfully reducing recruiter shortlisting time by 35% across hiring teams.",
      tags: ["Next.js", "TypeScript", "Redux Toolkit", "AI/ML Integration", "Docker"],
      metrics: "35% Faster Shortlisting • AI Screening",
      liveUrl: "https://github.com/anurag-das",
      githubUrl: "https://github.com/anurag-das",
      imageBg: "from-zinc-900/40 via-zinc-950/20 to-black",
      accentColor: "#ffffff"
    },
    {
      id: "project-4",
      title: "Vryno Bookings & HRMS",
      subtitle: "Enterprise scheduling & human resource management suite",
      description: "Developed automated booking workflows with Google, Microsoft, and Zoom calendar integrations, cutting manual scheduling by 60%. Engineered Vryno HRMS frontend optimizations, boosting HR efficiency by 45% and reducing page load times by 30%.",
      tags: ["Next.js", "TypeScript", "Redux Toolkit", "OAuth & Calendars", "Docker"],
      metrics: "60% Less Scheduling • 45% HR Boost",
      liveUrl: "https://github.com/anurag-das",
      githubUrl: "https://github.com/anurag-das",
      imageBg: "from-zinc-900/40 via-zinc-950/20 to-black",
      accentColor: "#ffffff"
    }
  ] as Project[],

  techStack: [
    { name: "TypeScript", category: "Core", proficiency: "Expert" },
    { name: "JavaScript (ES6+)", category: "Core", proficiency: "Expert" },
    { name: "Python", category: "Core", proficiency: "Advanced" },
    { name: "React.js", category: "Core", proficiency: "Expert" },
    { name: "Next.js", category: "Core", proficiency: "Expert" },
    { name: "Redux Toolkit", category: "Core", proficiency: "Expert" },
    { name: "Node.js", category: "Backend & DevOps", proficiency: "Expert" },
    { name: "Express.js & NestJS", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "REST APIs & Django", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "Docker & Linux", category: "Backend & DevOps", proficiency: "Intermediate" },
    { name: "AWS & Cloudflare", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "Vercel & Netlify", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "PostgreSQL", category: "Databases & ORMs", proficiency: "Expert" },
    { name: "MongoDB", category: "Databases & ORMs", proficiency: "Expert" },
    { name: "Prisma ORM", category: "Databases & ORMs", proficiency: "Advanced" },
    { name: "Mongoose", category: "Databases & ORMs", proficiency: "Advanced" },
    { name: "Tailwind CSS", category: "Design & UI", proficiency: "Expert" },
    { name: "ShadCN UI & MUI", category: "Design & UI", proficiency: "Expert" },
    { name: "Git & GitHub", category: "Design & UI", proficiency: "Expert" },
    { name: "Postman & API Tools", category: "Design & UI", proficiency: "Expert" }
  ] as TechItem[],

  experience: [
    {
      year: "June 2026 — Present",
      role: "Full Stack & AI Application Engineer",
      company: "CrystalStone Properties LLP",
      description: "Developing an AI-enabled SaaS platform for real estate collaboration, investor onboarding, campaign management, contracts, and buyer workflows.",
      highlights: [
        "Designing scalable full-stack architecture using modern JavaScript frameworks (Next.js, NestJS) and API-driven development.",
        "Building automation features and AI workflows that streamline operational and sales processes.",
        "Architecting real-time investor telemetry and campaign monitoring across remote distributed environments."
      ]
    },
    {
      year: "Feb 2026 — May 2026",
      role: "Software Development Engineer (Full Stack)",
      company: "Enoylity Media Creations LLC",
      description: "Built a SaaS platform streamlining brand–creator collaborations through campaign management, onboarding, contracts, media kits, and dispute resolution workflows.",
      highlights: [
        "Engineered scalable frontend systems and API integrations using Next.js, TypeScript, Node.js, and MongoDB.",
        "Built an internal KPI tracking tool to monitor productivity across creative teams, including script writers, videographers, and editors.",
        "Revamped the parent company's landing page, improving performance, responsiveness, and lead-generation effectiveness."
      ]
    },
    {
      year: "Nov 2024 — Oct 2025",
      role: "Frontend Developer (Intern → Junior Developer)",
      company: "Shubpy Solutions Pvt. Ltd",
      description: "Developed high-impact AI recruiting tools and automated enterprise scheduling workflows for B2B SaaS platforms.",
      highlights: [
        "Built QuidAI, an AI-driven recruiting tool that reduced recruiter shortlisting time by 35% across B2B hiring pipelines.",
        "Developed Vryno Bookings with Google, Microsoft, and Zoom calendar integrations, reducing manual scheduling by 60%.",
        "Engineered Vryno HRMS and optimized frontend performance, improving HR efficiency by 45% and reducing page load times by 30%."
      ]
    },
    {
      year: "May 2024 — Oct 2024",
      role: "Teaching Assistant (React & JavaScript)",
      company: "Coding Ninjas",
      description: "Mentored aspiring software engineers and enforced institutional code quality across React and modern JavaScript curriculums.",
      highlights: [
        "Mentored 250+ students and resolved 500+ technical doubts on React, Redux Toolkit, Vite, and JavaScript fundamentals.",
        "Reviewed 100+ student capstone projects, improving architectural code quality and best-practice adherence.",
        "Maintained a stellar 4.9/5 performance rating, ranking among the top-performing TAs nationwide."
      ]
    }
  ] as ExperienceItem[],

  testimonials: [
    {
      quote: "Anurag is an exceptional full-stack engineer. His AI-enabled real estate SaaS architecture at CrystalStone streamlined our operational workflows and investor onboarding significantly.",
      name: "Rajesh Mehta",
      title: "Engineering Director",
      company: "CrystalStone Properties LLP",
      src: "/testimonials/rajesh.png"
    },
    {
      quote: "His full-stack engineering on our creator collaboration SaaS and internal KPI tracking tools transformed our media workflows. His attention to frontend responsiveness and performance is world-class.",
      name: "Vikram Singhania",
      title: "Product Head",
      company: "Enoylity Media Creations LLC",
      src: "/testimonials/vikram.png"
    },
    {
      quote: "Anurag delivered QuidAI and Vryno Bookings with incredible precision. His integrations reduced scheduling friction by 60% and boosted our HR load times by 30%.",
      name: "Ananya Sharma",
      title: "CTO",
      company: "Shubpy Solutions Pvt. Ltd",
      src: "/testimonials/ananya.png"
    },
    {
      quote: "As a Teaching Assistant, Anurag mentored over 250 students with patience and technical rigor. His 4.9/5 rating reflects his mastery of React and JavaScript fundamentals.",
      name: "Siddharth Verma",
      title: "Lead Instructor",
      company: "Coding Ninjas",
      src: "/testimonials/siddharth.png"
    }
  ] as Testimonial[],

  certifications: [
    {
      title: "Full-Stack Web Development with React",
      issuer: "Coursera",
      image: "/certifications/coursera.jpeg",
      url: "#"
    },
    {
      title: "Advanced Cloud Architecture & AWS",
      issuer: "Coursera",
      image: "/certifications/coursera.jpeg",
      url: "#"
    },
    {
      title: "Machine Learning & AI Workflows",
      issuer: "Coursera",
      image: "/certifications/coursera.jpeg",
      url: "#"
    },
    {
      title: "Distributed Systems & Microservices",
      issuer: "Coursera",
      image: "/certifications/coursera.jpeg",
      url: "#"
    },
    {
      title: "TypeScript & Next.js Enterprise Mastery",
      issuer: "Coursera",
      image: "/certifications/coursera.jpeg",
      url: "#"
    },
    {
      title: "PostgreSQL & Database Optimization",
      issuer: "Coursera",
      image: "/certifications/coursera.jpeg",
      url: "#"
    },
    {
      title: "UI/UX Design Systems & Engineering",
      issuer: "Coursera",
      image: "/certifications/coursera.jpeg",
      url: "#"
    },
    {
      title: "Docker, Kubernetes & DevOps Pipelines",
      issuer: "Coursera",
      image: "/certifications/coursera.jpeg",
      url: "#"
    },
    {
      title: "GraphQL & High-Performance APIs",
      issuer: "Coursera",
      image: "/certifications/coursera.jpeg",
      url: "#"
    },
    {
      title: "Cybersecurity & OAuth Authentication",
      issuer: "Coursera",
      image: "/certifications/coursera.jpeg",
      url: "#"
    }
  ] as Certification[],

  socials: [
    { name: "GitHub", url: "https://github.com/anurag-das", icon: "Github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/anurag-das-developer", icon: "Linkedin" },
    { name: "Twitter", url: "https://twitter.com/anuragdas", icon: "Twitter" },
    { name: "Email", url: "mailto:anuragdas12921@gmail.com", icon: "Mail" }
  ],

  achievements: [
    {
      platform: "Codeforces",
      badge: "Pupil • 1283",
      rank: "🏆 Global Rank 1558",
      details: "Codeforces Round #863 (17K+ participants)"
    },
    {
      platform: "CodeChef",
      badge: "2⭐ Rating",
      rank: "🏆 Global Rank 115",
      details: "CodeChef Starter 83 (17K+ participants)"
    },
    {
      platform: "CodeChef",
      badge: "2⭐ Rating",
      rank: "🏆 Global Rank 217",
      details: "CodeChef Starter 84 (14K+ participants)"
    },
    {
      platform: "LeetCode",
      badge: "Top 22%",
      rank: "🏆 Global Rank 800",
      details: "Weekly Contest 306 (24K+ participants)"
    }
  ] as Achievement[]
};
