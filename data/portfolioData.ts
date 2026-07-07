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

export interface ExperienceProduct {
  name: string;
  url?: string;
  description?: string;
}

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  highlights: string[];
  products?: ExperienceProduct[];
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
  topPercentage?: string;
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
      title: "Coming Soon",
      subtitle: "AI-driven talent acquisition and shortlisting tool",
      description: "Engineered an AI-driven recruiting tool that automates candidate screening and resume evaluation, successfully reducing recruiter shortlisting time by 35% across hiring teams.",
      tags: ["Next.js", "TypeScript", "Redux Toolkit", "AI/ML Integration", "Docker"],
      metrics: "35% Faster Shortlisting • AI Screening",
      liveUrl: "https://github.com/anurag-das",
      githubUrl: "https://github.com/anurag-das",
      imageBg: "from-zinc-900/40 via-zinc-950/20 to-black",
      accentColor: "#ffffff"
    },
   
  ] as Project[],

  techStack: [
    { name: "TypeScript", category: "Core", proficiency: "Expert" },
    { name: "JavaScript", category: "Core", proficiency: "Expert" },
    { name: "Python", category: "Core", proficiency: "Advanced" },
    { name: "React.js", category: "Core", proficiency: "Expert" },
    { name: "Next.js", category: "Core", proficiency: "Expert" },
    { name: "Redux Toolkit", category: "Core", proficiency: "Expert" },
    { name: "Tailwind CSS", category: "Design & UI", proficiency: "Expert" },
    { name: "ShadCN UI", category: "Design & UI", proficiency: "Expert" },
    { name: "Material UI", category: "Design & UI", proficiency: "Expert" },
    { name: "Git", category: "Design & UI", proficiency: "Expert" },
    { name: "GitHub", category: "Design & UI", proficiency: "Expert" },
    { name: "Postman", category: "Design & UI", proficiency: "Expert" },
    { name: "Swagger", category: "Design & UI", proficiency: "Expert" },
    { name: "Node.js", category: "Backend & DevOps", proficiency: "Expert" },
    { name: "Express.js", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "NestJS", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "REST APIs", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "GraphQL", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "Django", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "Docker", category: "Backend & DevOps", proficiency: "Intermediate" },
    { name: "Linux", category: "Backend & DevOps", proficiency: "Intermediate" },
    { name: "AWS", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "Cloudflare", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "Vercel", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "Netlify", category: "Backend & DevOps", proficiency: "Advanced" },
    { name: "PostgreSQL", category: "Databases & ORMs", proficiency: "Expert" },
    { name: "MongoDB", category: "Databases & ORMs", proficiency: "Expert" },
    { name: "Prisma ORM", category: "Databases & ORMs", proficiency: "Advanced" },
    { name: "Mongoose", category: "Databases & ORMs", proficiency: "Advanced" },
    { name: "Firebase", category: "Databases & ORMs", proficiency: "Advanced" },
    { name: "Supabase", category: "Databases & ORMs", proficiency: "Advanced" }
  ] as TechItem[],

  experience: [
    {
      year: "June 2026 — Present",
      role: "Full Stack & AI Application Engineer",
      company: "CrystalStone Properties LLP",
      companyUrl: "https://crystalstone.in",
      description: "Developing an AI-enabled SaaS platform for real estate collaboration, investor onboarding, campaign management, contracts, and buyer workflows.",
      highlights: [
        "Designing scalable full-stack architecture using modern JavaScript frameworks (Next.js, NestJS) and API-driven development.",
        "Building automation features and AI workflows that streamline operational and sales processes.",
        "Architecting real-time investor telemetry and campaign monitoring across remote distributed environments."
      ],
      products: [
        {
          name: "CrystalStone AI Platform",
          url: "https://crystalstone.in",
          description: "AI-enabled real estate collaboration & investor onboarding SaaS"
        },
        {
          name: "Investor Telemetry Portal",
          url: "https://crystalstone.in",
          description: "Real-time campaign monitoring & analytics dashboard"
        }
      ]
    },
    {
      year: "Feb 2026 — May 2026",
      role: "Software Development Engineer (Full Stack)",
      company: "Enoylity Media Creations LLC",
      companyUrl: "https://www.enoylitystudio.com/",
      description: "Built a SaaS platform streamlining brand–creator collaborations through campaign management, onboarding, contracts, media kits, and dispute resolution workflows.",
      highlights: [
        "Engineered scalable frontend systems and API integrations using Next.js, TypeScript, Node.js, and MongoDB.",
        "Built an internal KPI tracking tool to monitor productivity across creative teams, including script writers, videographers, and editors.",
        "Revamped the parent company's landing page, improving performance, responsiveness, and lead-generation effectiveness."
      ],
      products: [
        {
          name: "Collabglam",
          url: "https://collabglam.com/",
          description: "Brand–creator collaboration & media management SaaS"
        },
        {
          name: "Studio KPI Tracker",
          url: "https://kdppl.enoylitystudio.com",
          description: "Internal analytics & creative team productivity dashboard"
        }
      ]
    },
    {
      year: "Nov 2024 — Oct 2025",
      role: "Frontend Developer (Intern → Junior Developer)",
      company: "Shubpy Solutions Pvt. Ltd",
      companyUrl: "https://shubpy.com",
      description: "Developed high-impact AI recruiting tools and automated enterprise scheduling workflows for B2B SaaS platforms.",
      highlights: [
        "Built QuidAI, an AI-driven recruiting tool that reduced recruiter shortlisting time by 35% across B2B hiring pipelines.",
        "Developed Vryno Bookings with Google, Microsoft, and Zoom calendar integrations, reducing manual scheduling by 60%.",
        "Engineered Vryno HRMS and optimized frontend performance, improving HR efficiency by 45% and reducing page load times by 30%."
      ],
      products: [
        {
          name: "QuidAI Recruiting Engine",
          url: "https://shubpy.com",
          description: "AI-driven candidate screening & resume evaluation tool"
        },
        {
          name: "Vryno Bookings Suite",
          url: "https://vryno.com",
          description: "Enterprise multi-calendar scheduling & booking automation"
        },
        {
          name: "Vryno HRMS Platform",
          url: "https://vryno.com",
          description: "High-performance enterprise HR & employee management system"
        }
      ]
    },
    {
      year: "May 2024 — Oct 2024",
      role: "Teaching Assistant (React & JavaScript)",
      company: "Coding Ninjas",
      companyUrl: "https://codingninjas.com",
      description: "Mentored aspiring software engineers and enforced institutional code quality across React and modern JavaScript curriculums.",
      highlights: [
        "Mentored 250+ students and resolved 500+ technical doubts on React, Redux Toolkit, Vite, and JavaScript fundamentals.",
        "Reviewed 100+ student capstone projects, improving architectural code quality and best-practice adherence.",
        "Maintained a stellar 4.9/5 performance rating, ranking among the top-performing TAs nationwide."
      ],
      products: [
        {
          name: "Coding Ninjas LMS Portal",
          url: "https://codingninjas.com",
          description: "Interactive learning platform & code review environment"
        }
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
      title: "01",
      issuer: "Coursera",
      image: "/api/certificates?pathname=01_coursera_Y9YDNVJALKGG.jpeg",
      url: "/api/certificates?pathname=01_coursera_Y9YDNVJALKGG.jpeg"
    },
    {
      title: "02",
      issuer: "Coursera",
      image: "/api/certificates?pathname=02_coursera_VHZR6DKZ6UZP.jpg",
      url: "/api/certificates?pathname=02_coursera_VHZR6DKZ6UZP.jpg"
    },
    {
      title: "03",
      issuer: "Coursera",
      image: "/api/certificates?pathname=03_coursera_SB8GD6RAUJPK.jpeg",
      url: "/api/certificates?pathname=03_coursera_SB8GD6RAUJPK.jpeg"
    },
    {
      title: "04",
      issuer: "Coursera",
      image: "/api/certificates?pathname=04_coursera_SF5TQZ6NWV34.jpeg",
      url: "/api/certificates?pathname=04_coursera_SF5TQZ6NWV34.jpeg"
    },
    {
      title: "05",
      issuer: "Coursera",
      image: "/api/certificates?pathname=05_coursera_J4T8QDNU8VUQ.jpeg",
      url: "/api/certificates?pathname=05_coursera_J4T8QDNU8VUQ.jpeg"
    },
    {
      title: "06",
      issuer: "Coursera",
      image: "/api/certificates?pathname=06_coursera_KJTUALC9HLAA.jpeg",
      url: "/api/certificates?pathname=06_coursera_KJTUALC9HLAA.jpeg"
    },
    {
      title: "07",
      issuer: "Coursera",
      image: "/api/certificates?pathname=07_coursera_JGX6RC3AZX5L.jpeg",
      url: "/api/certificates?pathname=07_coursera_JGX6RC3AZX5L.jpeg"
    },
    {
      title: "08",
      issuer: "Coursera",
      image: "/api/certificates?pathname=08_coursera_DHYYKCVHDHXW.jpeg",
      url: "/api/certificates?pathname=08_coursera_DHYYKCVHDHXW.jpeg"
    },
    {
      title: "09",
      issuer: "Coursera",
      image: "/api/certificates?pathname=09_coursera_PJE9TAWQ94HX.jpeg",
      url: "/api/certificates?pathname=09_coursera_PJE9TAWQ94HX.jpeg"
    },
    {
      title: "10",
      issuer: "Coursera",
      image: "/api/certificates?pathname=10_coursera_RGEJDZ3LNUYW.jpeg",
      url: "/api/certificates?pathname=10_coursera_RGEJDZ3LNUYW.jpeg"
    },
    {
      title: "11",
      issuer: "Coursera",
      image: "/api/certificates?pathname=11_coursera_DE5EMMTH829A.jpeg",
      url: "/api/certificates?pathname=11_coursera_DE5EMMTH829A.jpeg"
    },
    {
      title: "12",
      issuer: "Coursera",
      image: "/api/certificates?pathname=12_coursera_FBJAELDLRR4E.jpeg",
      url: "/api/certificates?pathname=12_coursera_FBJAELDLRR4E.jpeg"
    },
    {
      title: "13",
      issuer: "Coursera",
      image: "/api/certificates?pathname=13_coursera_6H3MVA5ZA9DR.jpeg",
      url: "/api/certificates?pathname=13_coursera_6H3MVA5ZA9DR.jpeg"
    },
    {
      title: "14",
      issuer: "Professional Certification",
      image: "/api/certificates?pathname=14_Frontend_page-0001.jpg",
      url: "/api/certificates?pathname=14_Frontend_page-0001.jpg"
    },
    {
      title: "15",
      issuer: "Professional Certification",
      image: "/api/certificates?pathname=15_Backend_page-0001.jpg",
      url: "/api/certificates?pathname=15_Backend_page-0001.jpg"
    },
    {
      title: "16",
      issuer: "Professional Certification",
      image: "/api/certificates?pathname=16_certificate_177307189ef448573c36cc9a17780c744db851b.jpg",
      url: "/api/certificates?pathname=16_certificate_177307189ef448573c36cc9a17780c744db851b.jpg"
    },
    {
      title: "17",
      issuer: "Professional Certification",
      image: "/api/certificates?pathname=17_certificate_1773072221c57f7625f24f4847367e55d9c9119.jpg",
      url: "/api/certificates?pathname=17_certificate_1773072221c57f7625f24f4847367e55d9c9119.jpg"
    },
    {
      title: "18",
      issuer: "Professional Certification",
      image: "/api/certificates?pathname=18_certificate_177307352b7ec1f2d066bc29385d38b3c54f7e4.jpg",
      url: "/api/certificates?pathname=18_certificate_177307352b7ec1f2d066bc29385d38b3c54f7e4.jpg"
    },
    {
      title: "19",
      issuer: "Professional Certification",
      image: "/api/certificates?pathname=19_certificate_28681851d8be6c7f7eb5277a8f4cdb3ae1e95b5.jpg",
      url: "/api/certificates?pathname=19_certificate_28681851d8be6c7f7eb5277a8f4cdb3ae1e95b5.jpg"
    },
    {
      title: "20",
      issuer: "Professional Certification",
      image: "/api/certificates?pathname=20_FE-cert_page-0001.jpg",
      url: "/api/certificates?pathname=20_FE-cert_page-0001.jpg"
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
      rank: "Global Rank 1558",
      topPercentage: "Top 9%",
      details: "Codeforces Round #863 (17K+ participants)"
    },
    {
      platform: "CodeChef",
      badge: "2⭐ Rating",
      rank: "Global Rank 115",
      topPercentage: "Top 0.6%",
      details: "CodeChef Starter 83 (17K+ participants)"
    },
    {
      platform: "CodeChef",
      badge: "2⭐ Rating",
      rank: "Global Rank 217",
      topPercentage: "Top 1.5%",
      details: "CodeChef Starter 84 (14K+ participants)"
    },
    {
      platform: "LeetCode",
      badge: "Top 22%",
      rank: "Global Rank 800",
      topPercentage: "Top 3.3%",
      details: "Weekly Contest 306 (24K+ participants)"
    }
  ] as Achievement[]
};
