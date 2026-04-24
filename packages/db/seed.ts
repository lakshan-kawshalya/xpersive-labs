import { PrismaClient, GlobalRole, ProjectRole, ProjectStatus, MilestoneStatus, TaskStatus, Priority } from "@prisma/client";
import { createHash } from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  // Simple SHA-256 hash for seed purposes — use bcrypt in production auth
  return createHash("sha256").update(password).digest("hex");
}

async function main() {
  console.log("Seeding database...");

  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@xpersivelabs.com" },
    update: {},
    create: {
      email: "admin@xpersivelabs.com",
      name: "Super Admin",
      role: GlobalRole.SUPER_ADMIN,
      password: hashPassword("Admin@123"),
    },
  });

  // Team member
  const dev = await prisma.user.upsert({
    where: { email: "dev@xpersivelabs.com" },
    update: {},
    create: {
      email: "dev@xpersivelabs.com",
      name: "Alex Developer",
      role: GlobalRole.TEAM_MEMBER,
      password: hashPassword("Dev@123"),
    },
  });

  // Client company
  const client = await prisma.client.upsert({
    where: { contactEmail: "contact@democlient.com" },
    update: {},
    create: {
      companyName: "Demo Client Ltd",
      contactEmail: "contact@democlient.com",
      phone: "+94 77 000 0000",
      address: "Colombo 03, Sri Lanka",
    },
  });

  // Client user account
  const clientUser = await prisma.user.upsert({
    where: { email: "john@democlient.com" },
    update: {},
    create: {
      email: "john@democlient.com",
      name: "John Smith",
      role: GlobalRole.CLIENT,
    },
  });

  await prisma.clientUser.upsert({
    where: { clientId_userId: { clientId: client.id, userId: clientUser.id } },
    update: {},
    create: { clientId: client.id, userId: clientUser.id },
  });

  // Sample project
  const project = await prisma.project.upsert({
    where: { id: "seed-project-001" },
    update: { status: ProjectStatus.IN_PROGRESS },
    create: {
      id: "seed-project-001",
      name: "Demo Web App",
      description: "A full-stack web application for Demo Client Ltd",
      status: ProjectStatus.IN_PROGRESS,
      clientId: client.id,
      startDate: new Date("2026-01-15"),
      endDate: new Date("2026-06-30"),
      budget: 15000,
    },
  });

  // Project members
  await prisma.projectMember.upsert({
    where: { projectId_userId: { projectId: project.id, userId: admin.id } },
    update: {},
    create: { projectId: project.id, userId: admin.id, role: ProjectRole.PROJECT_MANAGER },
  });

  await prisma.projectMember.upsert({
    where: { projectId_userId: { projectId: project.id, userId: dev.id } },
    update: {},
    create: { projectId: project.id, userId: dev.id, role: ProjectRole.DEVELOPER },
  });

  await prisma.projectMember.upsert({
    where: { projectId_userId: { projectId: project.id, userId: clientUser.id } },
    update: {},
    create: { projectId: project.id, userId: clientUser.id, role: ProjectRole.CLIENT_STAKEHOLDER },
  });

  // Milestones
  const m1 = await prisma.milestone.upsert({
    where: { id: "seed-ms-001" },
    update: {},
    create: {
      id: "seed-ms-001",
      projectId: project.id,
      title: "Discovery & Design",
      description: "Requirements gathering, wireframes, and UI design",
      dueDate: new Date("2026-02-28"),
      status: MilestoneStatus.COMPLETED,
      order: 1,
    },
  });

  const m2 = await prisma.milestone.upsert({
    where: { id: "seed-ms-002" },
    update: {},
    create: {
      id: "seed-ms-002",
      projectId: project.id,
      title: "Core Development",
      description: "Backend API, database, and frontend implementation",
      dueDate: new Date("2026-04-30"),
      status: MilestoneStatus.IN_PROGRESS,
      order: 2,
    },
  });

  const m3 = await prisma.milestone.upsert({
    where: { id: "seed-ms-003" },
    update: {},
    create: {
      id: "seed-ms-003",
      projectId: project.id,
      title: "Testing & Launch",
      description: "QA testing, bug fixes, and production deployment",
      dueDate: new Date("2026-06-30"),
      status: MilestoneStatus.PENDING,
      order: 3,
    },
  });

  // Tasks
  const tasks = [
    {
      id: "seed-task-001",
      title: "Set up project repository",
      status: TaskStatus.DONE,
      priority: Priority.HIGH,
      milestoneId: m1.id,
      assigneeId: dev.id,
    },
    {
      id: "seed-task-002",
      title: "Create wireframes for all pages",
      status: TaskStatus.DONE,
      priority: Priority.HIGH,
      milestoneId: m1.id,
      assigneeId: admin.id,
    },
    {
      id: "seed-task-003",
      title: "Build authentication system",
      status: TaskStatus.IN_PROGRESS,
      priority: Priority.URGENT,
      milestoneId: m2.id,
      assigneeId: dev.id,
    },
    {
      id: "seed-task-004",
      title: "Implement dashboard UI",
      status: TaskStatus.TODO,
      priority: Priority.MEDIUM,
      milestoneId: m2.id,
      assigneeId: dev.id,
    },
    {
      id: "seed-task-005",
      title: "Write end-to-end tests",
      status: TaskStatus.TODO,
      priority: Priority.MEDIUM,
      milestoneId: m3.id,
      assigneeId: null,
    },
  ];

  for (const task of tasks) {
    await prisma.task.upsert({
      where: { id: task.id },
      update: {},
      create: { ...task, projectId: project.id },
    });
  }

  // Progress updates
  await prisma.update.upsert({
    where: { id: "seed-update-001" },
    update: {},
    create: {
      id: "seed-update-001",
      projectId: project.id,
      authorId: admin.id,
      content: "Project kicked off successfully. Discovery phase is complete and we have signed off on the wireframes.",
    },
  });

  await prisma.update.upsert({
    where: { id: "seed-update-002" },
    update: {},
    create: {
      id: "seed-update-002",
      projectId: project.id,
      authorId: dev.id,
      content: "Authentication system is 60% complete. JWT tokens and role-based middleware are in place.",
    },
  });

  console.log("Seed complete.");
  console.log(`  Admin: admin@xpersivelabs.com / Admin@123`);
  console.log(`  Client: john@democlient.com`);
  console.log(`  Project: "${project.name}" (${project.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
