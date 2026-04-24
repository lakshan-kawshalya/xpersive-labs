# @xpersive/db

Prisma ORM + Supabase PostgreSQL database layer for Xpersive Labs.

## Setup

### 1. Get your Supabase connection strings

1. Go to [supabase.com](https://supabase.com) → your project → **Settings → Database**
2. Scroll to **Connection string** and select **URI** mode
3. Copy the two strings:
   - **Transaction pooler** (port 6543) → `DATABASE_URL` (used by Prisma at runtime with pgbouncer)
   - **Session mode / Direct** (port 5432) → `DIRECT_URL` (used by Prisma CLI for migrations)

### 2. Set environment variables

Copy `.env.example` to `.env` at the repo root and fill in the values:

```bash
cp .env.example .env
```

Also create `packages/db/.env` with just the two database URLs (Prisma CLI uses this):

```
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

### 3. Push schema to database

```bash
# From the repo root:
npm run db:push -w @xpersive/db

# Or from packages/db/:
npx prisma db push
```

### 4. Generate Prisma client

```bash
npm run db:generate -w @xpersive/db
```

### 5. Seed demo data

```bash
npm run db:seed -w @xpersive/db
```

Creates:
- `admin@xpersivelabs.com` (SUPER_ADMIN, password: `Admin@123`)
- `dev@xpersivelabs.com` (TEAM_MEMBER)
- `john@democlient.com` (CLIENT for "Demo Client Ltd")
- 1 project, 3 milestones, 5 tasks, 2 updates

### 6. Open Prisma Studio (optional)

```bash
npm run db:studio -w @xpersive/db
```

## Schema changes

Edit `packages/db/prisma/schema.prisma`, then:

```bash
# Dev — push directly (no migration files)
npm run db:push -w @xpersive/db

# Production — create a migration
npm run db:migrate -w @xpersive/db
```

## Usage in apps

```typescript
import { db } from "@xpersive/db";

const projects = await db.project.findMany();
```
