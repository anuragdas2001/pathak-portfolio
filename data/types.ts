/**
 * Typed domain models for the Cybersecurity Developer Portfolio.
 * Swap the backing source in `data/portfolioService.ts` to transition
 * from static template data to a CMS, database, or REST/GraphQL API
 * without modifying any UI components.
 */

export type ProjectCategory = "TOOL" | "RESEARCH" | "DEFENSE" | "CTF";

export type SkillCategory =
  | "Offensive & AppSec"
  | "Defensive & SecOps"
  | "Cloud & Infra"
  | "Scripting & Dev";

export type ProficiencyLevel = "Core" | "Advanced" | "Working";

export interface NavItem {
  label: string;
  href: string;
  ariaLabel: string;
}

export interface SocialEndpoint {
  name: "GitHub" | "LinkedIn" | "X" | "Mastodon" | "Email";
  handle: string;
  url: string;
}

export interface OperatorStat {
  label: string;
  value: string;
  detail: string;
}

export interface OperatorProfile {
  name: string;
  handle: string;
  role: string;
  specialty: string;
  tagline: string;
  bio: string[];
  location: string;
  timezone: string;
  email: string;
  pgpFingerprint: string;
  resumeUrl: string;
  languages: string[];
}

export interface FocusPillar {
  code: string;
  title: string;
  summary: string;
  techniques: string[];
}

export interface SkillItem {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  context: string;
}

export interface SecurityProject {
  id: string;
  category: ProjectCategory;
  status: "ACTIVE" | "ARCHIVED" | "LAB";
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  stack: string[];
  repoUrl: string;
  docsUrl?: string;
}

export interface WriteupEntry {
  id: string;
  tag: "APPSEC" | "CLOUD" | "CTF_LAB" | "DETECTION";
  date: string;
  readTime: string;
  title: string;
  summary: string;
  takeaways: string[];
  url: string;
}

export interface ExperienceEntry {
  id: string;
  period: string;
  role: string;
  organization: string;
  orgUrl?: string;
  location: string;
  summary: string;
  outcomes: string[];
  stack: string[];
}

export interface CredentialEntry {
  id: string;
  code: string;
  name: string;
  issuer: string;
  status: string;
  notes: string;
}

export interface PortfolioData {
  profile: OperatorProfile;
  navItems: NavItem[];
  stats: OperatorStat[];
  focusPillars: FocusPillar[];
  skills: SkillItem[];
  projects: SecurityProject[];
  writeups: WriteupEntry[];
  experience: ExperienceEntry[];
  credentials: CredentialEntry[];
  socials: SocialEndpoint[];
}

