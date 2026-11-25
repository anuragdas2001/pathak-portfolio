import type { PortfolioData } from "@/data/types";

/**
 * SAMPLE STATIC PORTFOLIO DATA (Cybersecurity Practitioner Template)
 * ------------------------------------------------------------------
 * Replace the placeholder values below with your own verified biography,
 * repositories, writeups, experience, and credentials, or replace
 * `getPortfolioData()` in `data/portfolioService.ts` with a dynamic fetch.
 *
 * Note: All entries here are harmless template examples with no fabricated
 * CVEs, bug bounty claims, or credential IDs.
 */
export const STATIC_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Alex Mercer",
    handle: "0xmercer",
    role: "Security Engineer & AppSec Researcher",
    specialty: "Application Security · Cloud Hardening · Detection Engineering",
    tagline:
      "Hardening web architectures, building open-source defensive tooling, and turning threat models into clean, maintainable engineering.",
    bio: [
      "I focus on the intersection of software engineering and security: reviewing authentication flows, automating static and dynamic checks in CI/CD, and building lightweight tooling that helps product teams ship safely without slowing down.",
      "Outside day-to-day AppSec and cloud security work, I maintain home-lab telemetry pipelines, write educational CTF lab walkthroughs, and document defensive patterns for modern TypeScript, Go, and Python services.",
    ],
    location: "Bengaluru, India",
    timezone: "IST (UTC+05:30)",
    email: "security@example-portfolio.dev",
    pgpFingerprint: "4F8A 9C12 D301 E7B4 8810  2A6C 90E1 774B 11D9 00AA",
    resumeUrl: "#contact",
    languages: ["English", "Hindi"],
  },

  navItems: [
    { label: "~/whoami", href: "#about", ariaLabel: "Jump to About section" },
    { label: "./toolkit", href: "#skills", ariaLabel: "Jump to Skills and Toolkit section" },
    { label: "./projects", href: "#projects", ariaLabel: "Jump to Security Projects section" },
    { label: "~/writeups", href: "#writeups", ariaLabel: "Jump to Research Writeups section" },
    { label: "~/experience", href: "#experience", ariaLabel: "Jump to Experience section" },
    { label: "connect --secure", href: "#contact", ariaLabel: "Jump to Contact section" },
  ],

  stats: [
    { label: "Focus Domain", value: "AppSec", detail: "Web, APIs & AuthN/Z" },
    { label: "Open-Source", value: "4 Tools", detail: "CLI & CI/CD scanners" },
    { label: "Lab Writeups", value: "12+", detail: "Defense & CTF notes" },
    { label: "Primary Stack", value: "Go / TS", detail: "Python & Linux" },
  ],

  focusPillars: [
    {
      code: "SEC_01",
      title: "Application Security & Threat Modeling",
      summary:
        "Architecture design reviews, STRIDE threat modeling, and hands-on code auditing for REST/GraphQL APIs, OAuth2/OIDC, and session boundaries.",
      techniques: ["STRIDE", "OWASP ASVS", "OAuth2 / OIDC", "RBAC Auditing"],
    },
    {
      code: "SEC_02",
      title: "DevSecOps & CI/CD Guardrails",
      summary:
        "Embedding fast, low-noise SAST, dependency checks, SBOM generation, and container hardening directly into developer pull requests.",
      techniques: ["Semgrep Rules", "SBOM / Trivy", "Least-Privilege IAM", "Policy-as-Code"],
    },
    {
      code: "SEC_03",
      title: "Detection Engineering & Telemetry",
      summary:
        "Structuring audit logs, writing Sigma-style correlation rules, and reducing alert fatigue with reproducible home-lab test scenarios.",
      techniques: ["Structured Logging", "Sigma Rules", "eBPF Basics", "Auditd / Sysmon"],
    },
    {
      code: "SEC_04",
      title: "Security Tooling & Automation",
      summary:
        "Writing crisp CLI utilities in Go and Python to automate header checks, IAM diffing, and configuration drift verification.",
      techniques: ["Go CLIs", "Python Automation", "JSON/SARIF Output", "Unit-Tested Checks"],
    },
  ],

  skills: [
    {
      name: "OWASP ASVS & Threat Modeling",
      category: "Offensive & AppSec",
      proficiency: "Core",
      context: "Design reviews & auth boundary verification",
    },
    {
      name: "Burp Suite Pro / Proxy",
      category: "Offensive & AppSec",
      proficiency: "Core",
      context: "Manual HTTP/API traffic analysis & auth testing",
    },
    {
      name: "Semgrep (Custom Rules)",
      category: "Offensive & AppSec",
      proficiency: "Advanced",
      context: "Pattern-based SAST rules for TS, Go & Python",
    },
    {
      name: "OAuth 2.0 / OIDC / JWT",
      category: "Offensive & AppSec",
      proficiency: "Core",
      context: "Token validation, PKCE & session lifecycle review",
    },
    {
      name: "Static Code Review",
      category: "Offensive & AppSec",
      proficiency: "Core",
      context: "Data-flow tracing for injection & SSRF sinks",
    },
    {
      name: "Wireshark & tcpdump",
      category: "Defensive & SecOps",
      proficiency: "Advanced",
      context: "Packet capture inspection & TLS handshake debugging",
    },
    {
      name: "Sigma & Log Correlation",
      category: "Defensive & SecOps",
      proficiency: "Advanced",
      context: "Detection rule authoring & false-positive tuning",
    },
    {
      name: "Linux Hardening & auditd",
      category: "Defensive & SecOps",
      proficiency: "Core",
      context: "Syscall auditing, systemd sandboxing & SSH policy",
    },
    {
      name: "Incident Triage Playbooks",
      category: "Defensive & SecOps",
      proficiency: "Working",
      context: "Timeline reconstruction & containment checklists",
    },
    {
      name: "AWS IAM & CloudTrail",
      category: "Cloud & Infra",
      proficiency: "Core",
      context: "Least-privilege policies & audit trail monitoring",
    },
    {
      name: "Docker & Container Hardening",
      category: "Cloud & Infra",
      proficiency: "Core",
      context: "Distroless builds, non-root UIDs & cap drops",
    },
    {
      name: "Terraform / Policy-as-Code",
      category: "Cloud & Infra",
      proficiency: "Advanced",
      context: "OPA/Conftest checks in infrastructure pipelines",
    },
    {
      name: "Kubernetes RBAC & NetPol",
      category: "Cloud & Infra",
      proficiency: "Working",
      context: "Namespace isolation & workload identity boundaries",
    },
    {
      name: "Go",
      category: "Scripting & Dev",
      proficiency: "Core",
      context: "Concurrent CLI auditors & lightweight agents",
    },
    {
      name: "Python",
      category: "Scripting & Dev",
      proficiency: "Core",
      context: "Parser scripts, API harnesses & lab automation",
    },
    {
      name: "TypeScript & Next.js",
      category: "Scripting & Dev",
      proficiency: "Core",
      context: "Full-stack security dashboards & internal tools",
    },
    {
      name: "Bash & POSIX Shell",
      category: "Scripting & Dev",
      proficiency: "Advanced",
      context: "CI/CD checks, environment hardening & log parsing",
    },
  ],

  projects: [
    {
      id: "proj-csp-auditor",
      category: "TOOL",
      status: "ACTIVE",
      title: "header-lint — HTTP & CSP Policy Auditor",
      subtitle: "Zero-dependency CLI to validate security headers & CSP directives in CI",
      description:
        "A fast Go CLI that inspects local or staging HTTP responses for Content-Security-Policy pitfalls, missing HSTS/frame directives, and unsafe inline allowances, emitting SARIF reports for GitHub Actions.",
      highlights: [
        "Parses CSP directives into an AST to flag unsafe-inline and wildcard script sources",
        "Outputs human-readable tables locally and SARIF v2.1.0 in CI pipelines",
      ],
      stack: ["Go", "HTTP/TLS", "SARIF", "GitHub Actions"],
      repoUrl: "https://github.com/example/header-lint",
      docsUrl: "https://github.com/example/header-lint#readme",
    },
    {
      id: "proj-iam-diff",
      category: "DEFENSE",
      status: "ACTIVE",
      title: "iam-policy-diff — Least-Privilege Reviewer",
      subtitle: "Static analyzer comparing Terraform IAM changes against baseline guardrails",
      description:
        "Analyzes Terraform plan JSON before merge to highlight newly introduced wildcard actions, cross-account trust policies, and privilege-escalation paths in PR comments.",
      highlights: [
        "Deterministic offline evaluation with zero cloud credentials required in PR checks",
        "Ships with customizable YAML allowlists for approved service roles",
      ],
      stack: ["Python", "Terraform JSON", "OPA / Rego", "YAML"],
      repoUrl: "https://github.com/example/iam-policy-diff",
      docsUrl: "https://github.com/example/iam-policy-diff#usage",
    },
    {
      id: "proj-jwt-lab",
      category: "RESEARCH",
      status: "LAB",
      title: "auth-boundary-lab — OIDC & Session Testbed",
      subtitle: "Reproducible local Docker lab demonstrating common token & CSRF pitfalls",
      description:
        "An educational sandbox pairing vulnerable-by-design reference endpoints with patched implementations and automated pytest checks to teach secure session and JWT handling.",
      highlights: [
        "Side-by-side 'before/after' diffs for PKCE, state binding, and key rotation",
        "Runs completely offline via Docker Compose for team AppSec workshops",
      ],
      stack: ["TypeScript", "Python", "Docker Compose", "OIDC"],
      repoUrl: "https://github.com/example/auth-boundary-lab",
    },
    {
      id: "proj-homelab-siem",
      category: "CTF",
      status: "ARCHIVED",
      title: "telemetry-sandbox — Lightweight Detection Lab",
      subtitle: "Reproducible log generation & Sigma rule validation harness",
      description:
        "Self-contained Vagrant/Docker lab that replays benign synthetic auth and process events to unit-test detection rules before promoting them to production.",
      highlights: [
        "Automated rule regression suite verifying zero false positives on baseline traffic",
        "Clean JSON log normalization schema compatible with standard SIEM pipelines",
      ],
      stack: ["Linux", "Docker", "Sigma", "Python"],
      repoUrl: "https://github.com/example/telemetry-sandbox",
    },
  ],

  writeups: [
    {
      id: "wu-ssrf-egress",
      tag: "APPSEC",
      date: "2026-09",
      readTime: "6 min read",
      title: "Defense-in-Depth Against SSRF Beyond Naive IP Blocklists",
      summary:
        "Why string-based URL checks fail against DNS rebinding and redirects, and how egress proxies plus socket-level IP validation close the gap.",
      takeaways: [
        "Disable automatic HTTP redirects on user-triggered fetchers",
        "Validate resolved IP addresses right before socket connection",
        "Enforce metadata-service isolation at the VPC / IMDSv2 layer",
      ],
      url: "https://github.com/example/security-notes",
    },
    {
      id: "wu-semgrep-ci",
      tag: "DETECTION",
      date: "2026-07",
      readTime: "5 min read",
      title: "Writing High-Signal Semgrep Rules Developers Actually Fix",
      summary:
        "Practical patterns for scoping custom SAST rules to project-specific auth helpers so CI alerts stay actionable and free of noise.",
      takeaways: [
        "Target internal wrapper APIs instead of generic sink regexes",
        "Include autofix suggestions or remediation links in rule metadata",
        "Measure false-positive rate against recent PR history before blocking merges",
      ],
      url: "https://github.com/example/security-notes",
    },
    {
      id: "wu-container-hardening",
      tag: "CLOUD",
      date: "2026-05",
      readTime: "7 min read",
      title: "Practical Container Hardening Checklist for Node & Go Services",
      summary:
        "Step-by-step walkthrough moving production images to multi-stage distroless builds with read-only root filesystems and dropped capabilities.",
      takeaways: [
        "Drop ALL Linux capabilities by default and add back only what is required",
        "Run with non-root UIDs and readOnlyRootFilesystem enabled",
        "Pin base image digests and attach SBOMs during CI builds",
      ],
      url: "https://github.com/example/security-notes",
    },
  ],

  experience: [
    {
      id: "exp-1",
      period: "2025 — Present",
      role: "Application Security Engineer (Sample)",
      organization: "Northstar Cloud Systems",
      orgUrl: "https://example.com",
      location: "Bengaluru · Hybrid",
      summary:
        "Partnering with product engineering squads on threat modeling, secure architecture reviews, and automated CI/CD security guardrails.",
      outcomes: [
        "Introduced pre-merge Semgrep and dependency policy checks across core TypeScript and Go repositories.",
        "Standardized OAuth2 PKCE and short-lived token patterns across internal microservices.",
        "Ran quarterly hands-on secure coding workshops covering SSRF, IDOR, and authorization testing.",
      ],
      stack: ["Semgrep", "Go", "TypeScript", "AWS IAM", "Docker"],
    },
    {
      id: "exp-2",
      period: "2023 — 2025",
      role: "Security Analyst & Automation Developer (Sample)",
      organization: "Veridian Infosec Labs",
      orgUrl: "https://example.com",
      location: "Remote",
      summary:
        "Supported SOC detection engineering, cloud posture reviews, and internal Python/Bash tooling to streamline alert triage.",
      outcomes: [
        "Built automated log enrichment scripts reducing manual context gathering during alert investigations.",
        "Authored and tuned Sigma detection rules backed by reproducible lab replay tests.",
        "Documented cloud IAM and container baseline standards for engineering onboarding.",
      ],
      stack: ["Python", "Linux", "Sigma", "CloudTrail", "Wireshark"],
    },
    {
      id: "exp-3",
      period: "2022 — 2023",
      role: "Junior Systems & Backend Developer (Sample)",
      organization: "CivicStack Technologies",
      location: "Bengaluru",
      summary:
        "Built REST APIs, role-based access controls, and deployment automation — forming the engineering foundation behind my AppSec work.",
      outcomes: [
        "Implemented parameterized query layers, rate-limiting middleware, and structured audit logging.",
        "Hardened Nginx reverse-proxy TLS configuration and HTTP security response headers.",
      ],
      stack: ["Node.js", "PostgreSQL", "Nginx", "Linux"],
    },
  ],

  credentials: [
    {
      id: "cred-1",
      code: "CERT_TEMPLATE_01",
      name: "Security Certification Placeholder",
      issuer: "e.g., CompTIA Security+ / GIAC / OSCP",
      status: "TEMPLATE",
      notes: "Replace with your verified certification title and public verification link.",
    },
    {
      id: "cred-2",
      code: "CERT_TEMPLATE_02",
      name: "Cloud Security Specialty Placeholder",
      issuer: "e.g., AWS Security / CCSP / CKS",
      status: "TEMPLATE",
      notes: "Replace with your cloud or Kubernetes security credential.",
    },
    {
      id: "cred-3",
      code: "LAB_TRACK_03",
      name: "AppSec & Web Labs Track",
      issuer: "e.g., PortSwigger Web Security Academy",
      status: "TEMPLATE",
      notes: "Replace with completed labs, coursework, or training tracks.",
    },
  ],

  socials: [
    { name: "GitHub", handle: "@0xmercer", url: "https://github.com/example" },
    { name: "LinkedIn", handle: "/in/0xmercer", url: "https://linkedin.com/in/example" },
    { name: "X", handle: "@0xmercer", url: "https://x.com/example" },
    { name: "Email", handle: "security@example-portfolio.dev", url: "mailto:security@example-portfolio.dev" },
  ],
};
