@AGENTS.md

# Xpersive Labs — Project Bible for Claude Code

## Company Overview

**Xpersive Labs** is a Sri Lankan-based software startup focused on immersive tech experiences.

- **Tagline:** "Innovation for a Better Tomorrow"
- **Mission:** Develop cutting-edge technologies that drive progress and enhance human experience across diverse industries.
- **Vision:** Revolutionize how people interact with technology by fully immersing them in a new world of possibilities.
- **Location:** Colombo, Sri Lanka

---

## Design System

### Color Palette

```
--color-primary:     #6D71F9   /* Primary Blue — main brand color */
--color-accent:      #54C1FB   /* Accent Blue — highlights, glows */
--color-dark:        #272848   /* Dark Background */
--color-gray:        #DCDDE5   /* Subtle Gray — borders, muted text */
--color-white:       #FFFFFF
```

### Typography

- **Primary Font:** DM Sans (Google Fonts — free, Sofia Pro alternative)
- **Display/Hero Font:** Syne (Google Fonts — free, bold and modern)
- **Monospace (code/blog):** JetBrains Mono (Google Fonts — free)
- Load via: `https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&family=JetBrains+Mono&display=swap`

### Logo Files

- Full logo (with name + tagline): `public/images/logo-full.png`
- Icon only: `public/images/logo-icon.png`
- Copy from: `[place logo files in public/images/]`

### Spacing & Radius

- Border radius: `1rem` (16px) default, `1.5rem` for cards
- Section padding: `py-24` (6rem top/bottom)
- Container max-width: `max-w-7xl mx-auto px-6`

---

## Tech Stack

| Layer      | Choice                  |
| ---------- | ----------------------- |
| Framework  | Next.js 14 (App Router) |
| Language   | TypeScript              |
| Styling    | Tailwind CSS            |
| Animations | Framer Motion           |
| Icons      | Lucide React            |
| Forms      | React Hook Form         |
| Email      | EmailJS (free tier)     |
| Blog       | Contentlayer + MDX      |
| Deployment | Vercel                  |

### Key Packages to Install

```bash
npm install framer-motion lucide-react react-hook-form @emailjs/browser
npm install contentlayer next-contentlayer date-fns
npm install -D @tailwindcss/typography
```

---

## Project Structure

```
xpersive-labs/
├── app/
│   ├── layout.tsx              # Global layout — Navbar + Footer + cursor
│   ├── page.tsx                # Home page
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── portfolio/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── team/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # Primary, secondary, ghost variants
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── SectionHeading.tsx
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky, blur backdrop, mobile hamburger
│   │   ├── Footer.tsx
│   │   └── CustomCursor.tsx    # Glow cursor effect
│   └── sections/
│       ├── HeroSection.tsx
│       ├── ServicesSection.tsx
│       ├── PortfolioSection.tsx
│       ├── StatsSection.tsx
│       ├── TestimonialsSection.tsx
│       └── CTASection.tsx
├── content/
│   └── blog/                   # .mdx blog posts
├── public/
│   └── images/
│       ├── logo-full.png
│       └── logo-icon.png
├── lib/
│   ├── utils.ts
│   └── animations.ts           # Shared Framer Motion variants
├── styles/
│   └── globals.css
└── CLAUDE.md                   # This file
```

---

## Pages & Content

### Home (`/`)

1. **Hero** — Large headline, tagline, two CTAs ("View Our Work" + "Get in Touch"), animated floating glow orbs behind logo
2. **Services Snapshot** — 3 cards: Web Development, Mobile Development, UI/UX Design
3. **Portfolio Preview** — 3 featured projects grid
4. **Stats Counter** — Animated numbers: Projects Completed, Happy Clients, Years of Experience, Technologies Used
5. **Testimonials** — Horizontal scroll strip
6. **CTA Banner** — "Ready to build something amazing?" with contact button

### About (`/about`)

- Company story, mission + vision statements (from brief)
- Brand values: Innovation, Reliability, User-Centric, Cutting-Edge
- Company timeline / milestones

### Services (`/services`)

- **Web Development** — React, Next.js, full-stack web apps
- **Mobile Development** — React Native, cross-platform apps
- **UI/UX Design** — Research, wireframes, prototypes, design systems
- Each service: description + process steps + tools used

### Portfolio (`/portfolio`)

- Filterable grid (All / Web / Mobile / Design)
- Project cards: thumbnail, title, tags, hover overlay with description
- Individual project pages

### Team (`/team`)

- Team member cards: photo, name, role, bio, social links (LinkedIn, GitHub)
- Placeholder: 4–6 members

### Blog (`/blog`)

- MDX-powered articles
- Tags: Web Dev, Design, AI, Company News
- Reading time estimate

### Contact (`/contact`)

- Form: Name, Email, Company (optional), Service Interest, Message
- EmailJS integration
- Colombo, Sri Lanka location mention

---

## Animation Guidelines

### Shared Variants (lib/animations.ts)

```typescript
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
```

### Interaction Rules

- **Scroll reveal:** All sections use `whileInView="visible" initial="hidden" viewport={{ once: true, margin: "-100px" }}`
- **Magnetic buttons:** Primary CTAs have subtle magnetic pull on hover
- **Card hover:** `whileHover={{ y: -8, scale: 1.02 }}`
- **Page transitions:** `AnimatePresence` with fade + slide between routes
- **Custom cursor:** Glow orb that follows mouse, enlarges on hoverable elements
- **Hero orbs:** Floating gradient blobs with slow `animate` loops
- **Stats:** Count up animation on scroll into view
- **Navbar:** Blur backdrop + slight border appears on scroll

### Performance Rules

- Use `viewport={{ once: true }}` — animate once, not on every scroll
- Lazy load images with `next/image`
- No animation on `prefers-reduced-motion`

---

## Tailwind Config Additions

Add to `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#6D71F9',
      accent: '#54C1FB',
      dark: '#272848',
      'subtle-gray': '#DCDDE5',
    },
    fontFamily: {
      sans: ['DM Sans', 'sans-serif'],
      display: ['Syne', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    backgroundImage: {
      'gradient-brand': 'linear-gradient(135deg, #6D71F9, #54C1FB)',
    },
  },
},
```

---

## Global CSS Notes (`styles/globals.css`)

```css
/* Custom cursor — hide default */
* {
  cursor: none;
}

/* Glow utility */
.glow-primary {
  box-shadow: 0 0 40px rgba(109, 113, 249, 0.3);
}
.glow-accent {
  box-shadow: 0 0 40px rgba(84, 193, 251, 0.3);
}

/* Gradient text */
.text-gradient {
  background: linear-gradient(135deg, #6d71f9, #54c1fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Selection color */
::selection {
  background: #6d71f9;
  color: white;
}
```

---

## Development Phases

- [x] **Phase 0** — Planning & brief (complete)
- [x] **Phase 1** — Scaffold: Next.js setup, Tailwind config, fonts, design tokens, Navbar, Footer, CustomCursor
- [x] **Phase 2** — Home page: all sections
- [x] **Phase 3** — About, Services, Portfolio pages
- [x] **Phase 4** — Team, Blog (MDX), Contact (form + email)
- [x] **Phase 5** — Polish: animations audit, mobile responsiveness, performance
- [ ] **Phase 6** — Client dashboard (future: auth + project tracker)

---

## Claude Code Instructions

- Always use TypeScript
- Always use Tailwind for styling (no inline styles unless for dynamic JS values)
- Always use Framer Motion for animations
- Always use `next/image` for images
- Use `lucide-react` for all icons
- Components should be modular — one component per file
- Keep sections in `components/sections/`, reusable UI in `components/ui/`
- Follow the animation guidelines above for every animated element
- Mobile-first responsive design (`sm:` → `md:` → `lg:`)
- All text content should match the brand voice: modern, innovative, professional but approachable
