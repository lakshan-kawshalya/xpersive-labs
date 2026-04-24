import type {
  GlobalRole,
  ProjectRole,
  ProjectStatus,
  MilestoneStatus,
  TaskStatus,
  Priority,
} from "@prisma/client";

export type { GlobalRole, ProjectRole, ProjectStatus, MilestoneStatus, TaskStatus, Priority };

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
  PLANNING:    { bg: "bg-primary/15",  text: "text-primary",  label: "Planning" },
  IN_PROGRESS: { bg: "bg-accent/15",   text: "text-accent",   label: "In Progress" },
  ON_HOLD:     { bg: "bg-amber-500/15",text: "text-amber-400",label: "On Hold" },
  REVIEW:      { bg: "bg-violet-500/15",text:"text-violet-400",label: "In Review" },
  COMPLETED:   { bg: "bg-emerald-500/15",text:"text-emerald-400",label: "Completed" },
  CANCELLED:   { bg: "bg-red-500/15",  text: "text-red-400",  label: "Cancelled" },
};
