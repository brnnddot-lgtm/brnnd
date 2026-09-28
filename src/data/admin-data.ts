import { Invoice } from "@/lib/invoice-pdf";

export interface Lead {
  id: string;
  full_name: string;
  email: string;
  company: string;
  company_size: string;
  source?: string | null;
  status: "new" | "contacted" | "qualified" | "converted" | "closed";
  created_at: string;
}

export interface ProjectMediaFile {
  id: string;
  name: string;
  type: "figma" | "drive" | "image" | "video" | "zip" | "doc" | "link";
  url: string;
  size_or_note?: string;
  added_at: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  completed: boolean;
  due_date?: string;
}

export interface Project {
  id: string;
  title: string;
  client_name: string;
  client_company: string;
  client_email: string;
  client_phone?: string;
  client_whatsapp?: string;
  services: string[];
  status: "discovery" | "in_progress" | "in_review" | "completed" | "on_hold";
  priority: "low" | "medium" | "high" | "urgent";
  start_date: string;
  target_launch_date: string;
  budget: number;
  currency: string;
  description: string;
  requirements: string[];
  milestones: ProjectMilestone[];
  media_files: ProjectMediaFile[];
  notes?: string;
  created_at: string;
  updated_at?: string;
}

// Production — no seed/demo data. All data is created via the admin UI.
export const INITIAL_INVOICES: Invoice[] = [];
export const INITIAL_LEADS: Lead[] = [];
export const INITIAL_PROJECTS: Project[] = [];
