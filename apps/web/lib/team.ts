import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export interface TeamSocialLink {
  icon: IconDefinition;
  href: string;
  label: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  initials: string;
  avatar?: string;
  social: TeamSocialLink[];
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Lakshan Kawshalya",
    role: "Founder & Lead Developer",
    bio: "Building web applications, automation systems, and AI-powered tools for businesses in AU, UK, US, and Europe. Based in Colombo, Sri Lanka — shipping production-grade software since 2024.",
    shortBio: "Leads Xpersive Labs and works across product development, architecture, and full-stack engineering.",
    initials: "LK",
    avatar: "/team/lakshan.jpeg",
    social: [
      { icon: faGithub, href: "https://github.com/lakshan-kawshalya", label: "GitHub" },
      { icon: faLinkedin, href: "https://www.linkedin.com/in/lakshan-kawshalya/", label: "LinkedIn" },
    ],
  },
  {
    name: "Kaveesha",
    role: "Backend Developer",
    bio: "Builds reliable backend systems, APIs, and data processing workflows — the infrastructure behind every product Xpersive Labs ships.",
    shortBio: "Builds reliable backend systems, APIs, data processing workflows, and the infrastructure behind our products.",
    initials: "KA",
    avatar: "/team/kaveesha.jpeg",
    social: [
      { icon: faGithub, href: "https://github.com/kavisha-jay", label: "GitHub" },
      { icon: faLinkedin, href: "https://www.linkedin.com/in/kaveesha-jayasingha-b183b5266", label: "LinkedIn" },
    ],
  },
  {
    name: "Kavindu Nalinda",
    role: "Frontend Developer",
    bio: "Builds responsive, high-performance interfaces that turn complex functionality into simple, fast user experiences.",
    shortBio: "Builds responsive, high-performance interfaces that turn complex functionality into simple user experiences.",
    initials: "KN",
    avatar: "/team/kavindu.jpeg",
    social: [
      { icon: faLinkedin, href: "https://www.linkedin.com/in/kavindu-nalinda/", label: "LinkedIn" },
    ],
  },
  {
    name: "Oshini Liyanage",
    role: "UI/UX Developer",
    bio: "Combines interface design and frontend development to create digital experiences that are intuitive, polished, and enjoyable to use.",
    shortBio: "Combines interface design and frontend development to create digital experiences that are intuitive, polished, and enjoyable to use.",
    initials: "OL",
    avatar: "/team/oshini.jpeg",
    social: [
      { icon: faLinkedin, href: "https://www.linkedin.com/in/oshini-geethya-97a958292/", label: "LinkedIn" },
    ],
  },
];
