// Enums duplicated here so @xpersive/types has no dependency on generated Prisma client.
// Keep in sync with packages/db/prisma/schema.prisma.

export type GlobalRole = "SUPER_ADMIN" | "ADMIN" | "TEAM_MEMBER" | "CLIENT";
export type ProjectRole = "PROJECT_MANAGER" | "TECH_LEAD" | "DEVELOPER" | "DESIGNER" | "QA_ENGINEER" | "CLIENT_STAKEHOLDER";
export type ProjectStatus = "PLANNING" | "IN_PROGRESS" | "ON_HOLD" | "REVIEW" | "COMPLETED" | "CANCELLED";
export type MilestoneStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProjectStatusColor {
  bg: string;
  text: string;
  label: string;
}

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, ProjectStatusColor> = {
  PLANNING:    { bg: "bg-primary/15",    text: "text-primary",    label: "Planning" },
  IN_PROGRESS: { bg: "bg-accent/15",     text: "text-accent",     label: "In Progress" },
  ON_HOLD:     { bg: "bg-amber-500/15",  text: "text-amber-400",  label: "On Hold" },
  REVIEW:      { bg: "bg-violet-500/15", text: "text-violet-400", label: "In Review" },
  COMPLETED:   { bg: "bg-emerald-500/15",text: "text-emerald-400",label: "Completed" },
  CANCELLED:   { bg: "bg-red-500/15",    text: "text-red-400",    label: "Cancelled" },
};
