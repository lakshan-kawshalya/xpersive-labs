# Xpersive Labs — Project Bible for Claude Code

## Company Overview

**Xpersive Labs** is a Sri Lankan-based software startup focused on immersive tech experiences.

- **Tagline:** "Innovation for a Better Tomorrow"
- **Live Website:** https://xpersive-labs-xi.vercel.app/
- **Location:** Colombo, Sri Lanka

---

## Design System

### Color Palette

```
--color-primary:     #6D71F9
--color-accent:      #54C1FB
--color-dark:        #272848
--color-gray:        #DCDDE5
--color-white:       #FFFFFF
```

### Typography

- Primary: DM Sans (Google Fonts)
- Display: Syne (Google Fonts)
- Mono: JetBrains Mono (Google Fonts)

### Project Status Colors

```
PLANNING     → #6D71F9
IN_PROGRESS  → #54C1FB
ON_HOLD      → #F59E0B
REVIEW       → #8B5CF6
COMPLETED    → #10B981
CANCELLED    → #EF4444
```

---

## Monorepo Structure (Turborepo)

```
xpersive-labs/
├── apps/
│   ├── web/         ← Marketing website (existing, Next.js 14)
│   ├── client/      ← Client dashboard (Next.js 14)
│   └── admin/       ← Admin panel (Next.js 14)
├── packages/
│   ├── ui/          ← Shared shadcn/ui components
│   ├── db/          ← Prisma schema + Supabase client
│   ├── auth/        ← NextAuth.js v5 config
│   └── types/       ← Shared TypeScript types
├── turbo.json
└── package.json
```

---

## Tech Stack

| Layer        | Choice                   |
| ------------ | ------------------------ |
| Monorepo     | Turborepo                |
| Framework    | Next.js 14 (App Router)  |
| Language     | TypeScript               |
| Styling      | Tailwind CSS + shadcn/ui |
| Animations   | Framer Motion            |
| Icons        | Lucide React             |
| Database     | Supabase (PostgreSQL)    |
| ORM          | Prisma                   |
| Auth         | NextAuth.js v5           |
| File Storage | Supabase Storage         |
| Realtime     | Supabase Realtime        |
| Email        | Resend                   |
| Charts       | Recharts                 |
| Drag & Drop  | @hello-pangea/dnd        |
| Deployment   | Vercel                   |

---

## Prisma Schema (packages/db/prisma/schema.prisma)

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum GlobalRole {
  SUPER_ADMIN
  ADMIN
  TEAM_MEMBER
  CLIENT
}

enum ProjectRole {
  PROJECT_MANAGER
  TECH_LEAD
  DEVELOPER
  DESIGNER
  QA_ENGINEER
  CLIENT_STAKEHOLDER
}

enum ProjectStatus {
  PLANNING
  IN_PROGRESS
  ON_HOLD
  REVIEW
  COMPLETED
  CANCELLED
}

enum MilestoneStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  IN_REVIEW
  DONE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

model User {
  id             String          @id @default(cuid())
  email          String          @unique
  name           String?
  avatar         String?
  role           GlobalRole      @default(TEAM_MEMBER)
  password       String?
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  clientUsers    ClientUser[]
  projectMembers ProjectMember[]
  updates        Update[]
  uploadedFiles  File[]
  assignedTasks  Task[]          @relation("AssignedTo")
}

model Client {
  id           String       @id @default(cuid())
  companyName  String
  contactEmail String       @unique
  logo         String?
  phone        String?
  address      String?
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  users        ClientUser[]
  projects     Project[]
}

model ClientUser {
  id       String @id @default(cuid())
  clientId String
  userId   String
  client   Client @relation(fields: [clientId], references: [id])
  user     User   @relation(fields: [userId], references: [id])
  @@unique([clientId, userId])
}

model Project {
  id          String          @id @default(cuid())
  name        String
  description String?
  status      ProjectStatus   @default(PLANNING)
  clientId    String
  startDate   DateTime?
  endDate     DateTime?
  budget      Float?
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  client      Client          @relation(fields: [clientId], references: [id])
  members     ProjectMember[]
  milestones  Milestone[]
  tasks       Task[]
  updates     Update[]
  files       File[]
}

model ProjectMember {
  id        String      @id @default(cuid())
  projectId String
  userId    String
  role      ProjectRole
  project   Project     @relation(fields: [projectId], references: [id])
  user      User        @relation(fields: [userId], references: [id])
  @@unique([projectId, userId])
}

model Milestone {
  id          String          @id @default(cuid())
  projectId   String
  title       String
  description String?
  dueDate     DateTime?
  status      MilestoneStatus @default(PENDING)
  order       Int             @default(0)
  project     Project         @relation(fields: [projectId], references: [id])
  tasks       Task[]
}

model Task {
  id          String     @id @default(cuid())
  projectId   String
  milestoneId String?
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  assigneeId  String?
  dueDate     DateTime?
  createdAt   DateTime   @default(now())
  project     Project    @relation(fields: [projectId], references: [id])
  milestone   Milestone? @relation(fields: [milestoneId], references: [id])
  assignee    User?      @relation("AssignedTo", fields: [assigneeId], references: [id])
}

model Update {
  id        String   @id @default(cuid())
  projectId String
  content   String
  authorId  String
  createdAt DateTime @default(now())
  project   Project  @relation(fields: [projectId], references: [id])
  author    User     @relation(fields: [authorId], references: [id])
}

model File {
  id           String   @id @default(cuid())
  projectId    String
  name         String
  url          String
  size         Int?
  type         String?
  uploadedById String
  createdAt    DateTime @default(now())
  project      Project  @relation(fields: [projectId], references: [id])
  uploadedBy   User     @relation(fields: [uploadedById], references: [id])
}

model InviteToken {
  id        String     @id @default(cuid())
  email     String
  token     String     @unique
  clientId  String?
  role      GlobalRole
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime   @default(now())
}
```

---

## Auth Rules (NextAuth.js v5)

- **ADMIN / SUPER_ADMIN:** Credentials provider (email + password, bcrypt)
- **CLIENT / TEAM_MEMBER:** Invite token → magic link email → set password on first login
- **Middleware:** `/admin/*` requires ADMIN or SUPER_ADMIN; `/client/*` requires CLIENT role
- JWT strategy: include `id`, `role`, `clientId` in token and session
- Env: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

---

## Client Dashboard (apps/client)

Port: 3001

### Routes

```
/login
/dashboard                    ← overview: active projects, recent updates
/projects                     ← all projects for this client
/projects/[id]/overview       ← status, timeline, progress
/projects/[id]/milestones     ← milestone tracker
/projects/[id]/tasks          ← task list (read-only)
/projects/[id]/updates        ← activity feed
/projects/[id]/files          ← documents & deliverables
/settings                     ← profile
```

### Client Dashboard Rules

- Dark theme (#272848 base)
- Collapsible sidebar
- READ-ONLY: clients cannot edit projects/tasks/milestones
- Clients CAN: update profile, download files
- Real-time: Supabase Realtime for live project status updates
- Mobile responsive

---

## Admin Panel (apps/admin)

Port: 3002

### Routes

```
/login
/dashboard                    ← stats: clients, projects, team
/clients                      ← all clients
/clients/new                  ← create client + send invite email
/clients/[id]                 ← client detail + projects + users
/projects                     ← all projects
/projects/new                 ← create project
/projects/[id]/overview
/projects/[id]/team           ← add/remove members, assign roles
/projects/[id]/milestones     ← full CRUD milestones
/projects/[id]/tasks          ← Kanban board (drag-and-drop)
/projects/[id]/updates        ← post progress updates
/projects/[id]/files          ← upload files (Supabase Storage)
/team                         ← internal team
/team/invite                  ← send invite to team member
/settings
```

### Admin Panel Rules

- Light/dark mode toggle
- Collapsible sidebar with sections
- Data tables: sorting, filtering, pagination
- Kanban: @hello-pangea/dnd drag-and-drop
- File upload: Supabase Storage via drag-drop or file picker
- Optimistic UI updates
- Zod validation on all forms

---

## Shared packages/db (index.ts)

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma || new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export * from "@prisma/client";
```

---

## Environment Variables (.env at root)

```
DATABASE_URL="postgresql://postgres.ixrcpgqbnttitibttope:Pwd.supabase.Xplbs@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.ixrcpgqbnttitibttope:Pwd.supabase.Xplbs@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://ixrcpgqbnttitibttope.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4cmNwZ3FibnR0aXRpYnR0b3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Nzg3MjUsImV4cCI6MjA5MjI1NDcyNX0.IbfpuYzJkwMOv69LC59vPsommYY3BobOOQ6oQTONYDo"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4cmNwZ3FibnR0aXRpYnR0b3BlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY3ODcyNSwiZXhwIjoyMDkyMjU0NzI1fQ.E_SQKhfK5Hz-eMPQ6FprSUgPxCBMUaI_VtX2jsjoIm0"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
RESEND_API_KEY="re_ZpWiuQLe_QHr3PRBH5wHbiipd7nnb53cE"
NEXT_PUBLIC_CLIENT_URL="http://localhost:3001"
NEXT_PUBLIC_ADMIN_URL="http://localhost:3002"
NEXT_PUBLIC_WEB_URL="http://localhost:3000"
```

---

## Development Phases

### Website (apps/web) — COMPLETE

- [x] Marketing site live at https://xpersive-labs-xi.vercel.app/

### Dashboards — IN PROGRESS

- [ ] Phase 6 — Turborepo monorepo setup, migrate existing web app in
- [ ] Phase 7 — packages/db: Prisma schema, Supabase connection, migrations
- [ ] Phase 8 — packages/auth: NextAuth.js v5, middleware, invite token logic
- [ ] Phase 9 — Admin panel: layout, sidebar, dashboard stats, clients CRUD
- [ ] Phase 10 — Admin panel: projects CRUD, team management, Kanban tasks
- [ ] Phase 11 — Admin panel: file uploads, progress updates, invite emails
- [ ] Phase 12 — Client dashboard: layout, project overview, milestones
- [ ] Phase 13 — Client dashboard: tasks view, updates feed, file downloads
- [ ] Phase 14 — Real-time (Supabase), notifications, polish, mobile

---

## Global Claude Code Rules

- Always TypeScript
- Always Tailwind for styling — no inline styles except dynamic JS values
- Framer Motion for all animations
- next/image for all images
- lucide-react for icons
- One component per file
- Server components by default, client components only when needed
- All DB access via packages/db (Prisma)
- Never expose SUPABASE_SERVICE_ROLE_KEY or NEXTAUTH_SECRET to client
- Zod validation before every DB write
- Handle loading / error / empty states everywhere
- Mobile-first responsive (sm → md → lg)
