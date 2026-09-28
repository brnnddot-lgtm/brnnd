import React, { useState, useMemo } from "react";
import { Project } from "@/data/admin-data";
import {
  FolderArchive,
  Plus,
  Search,
  Calendar,
  DollarSign,
  MessageSquare,
  Mail,
  ExternalLink,
  Layers,
  Clock,
  Sparkles,
  ChevronRight,
  Eye,
  Edit2,
  Trash2,
  Receipt,
  LayoutGrid,
  List,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

interface ProjectsTabProps {
  projects: Project[];
  onCreateProject: () => void;
  onSelectProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onCreateInvoiceForProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

export function ProjectsTab({
  projects,
  onCreateProject,
  onSelectProject,
  onEditProject,
  onCreateInvoiceForProject,
  onDeleteProject,
}: ProjectsTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client_company.toLowerCase().includes(q) ||
        p.client_name.toLowerCase().includes(q) ||
        p.client_email.toLowerCase().includes(q) ||
        p.services.some((s) => s.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [projects, statusFilter, search]);

  // Aggregate stats
  const activeCount = projects.filter((p) => p.status === "in_progress" || p.status === "discovery").length;
  const inReviewCount = projects.filter((p) => p.status === "in_review").length;
  const completedCount = projects.filter((p) => p.status === "completed").length;
  const totalPipelineValue = projects.reduce((acc, p) => acc + (p.budget || 0), 0);

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "in_progress":
        return "bg-brand-lime/10 border-brand-lime/30 text-brand-lime";
      case "discovery":
        return "bg-purple-950/70 border-purple-500/30 text-purple-300";
      case "in_review":
        return "bg-blue-950/70 border-blue-500/30 text-blue-300";
      case "completed":
        return "bg-emerald-950/70 border-emerald-500/30 text-emerald-300";
      case "on_hold":
        return "bg-neutral-800 border-neutral-700 text-neutral-400";
      default:
        return "bg-neutral-800 text-neutral-300";
    }
  };

  const getPriorityBadge = (priority: Project["priority"]) => {
    switch (priority) {
      case "urgent":
        return "text-red-400 bg-red-950/60 border-red-500/30";
      case "high":
        return "text-violet-400 bg-violet-950/60 border-violet-500/30";
      case "medium":
        return "text-neutral-300 bg-neutral-800 border-neutral-700";
      default:
        return "text-neutral-400 bg-neutral-900 border-neutral-800";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-white">Client Projects &amp; Deliverables</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-brand-lime/15 border border-brand-lime/30 text-brand-lime font-semibold">
              {projects.length} Active Hubs
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Track client briefs, required deliverables, milestone checklists, and attached media assets
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateProject}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-lime hover:bg-[#bef264] text-stone-950 text-xs font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md shadow-brand-lime/10"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-[#081a13]/80 border border-[#143326]/80">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
            Active In Production
          </span>
          <div className="text-2xl font-bold font-mono text-brand-lime">{activeCount}</div>
          <p className="text-[11px] text-neutral-500 mt-1">Discovery &amp; sprint delivery</p>
        </div>

        <div className="p-4 rounded-xl bg-[#081a13]/80 border border-[#143326]/80">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
            In Review &amp; Polish
          </span>
          <div className="text-2xl font-bold font-mono text-blue-400">{inReviewCount}</div>
          <p className="text-[11px] text-neutral-500 mt-1">Awaiting client sign-off</p>
        </div>

        <div className="p-4 rounded-xl bg-[#081a13]/80 border border-[#143326]/80">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
            Total Pipeline Value
          </span>
          <div className="text-2xl font-bold font-mono text-white">
            ${totalPipelineValue.toLocaleString()}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">Across all studio projects</p>
        </div>

        <div className="p-4 rounded-xl bg-[#081a13]/80 border border-[#143326]/80">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
            Shipped &amp; Delivered
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">{completedCount}</div>
          <p className="text-[11px] text-neutral-500 mt-1">Successfully launched</p>
        </div>
      </div>

      {/* Search, Filter Bar and View Switch */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-[#081a13]/80 rounded-xl border border-[#143326]/80">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search projects, client companies, services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#040e0a] border border-[#143326]/80 rounded-lg text-xs text-white placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All" },
            { id: "in_progress", label: "In Progress" },
            { id: "discovery", label: "Discovery" },
            { id: "in_review", label: "In Review" },
            { id: "completed", label: "Completed" },
            { id: "on_hold", label: "On Hold" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                statusFilter === tab.id
                  ? "bg-neutral-800 text-white font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* View Switch */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 shrink-0 self-end md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
              viewMode === "grid" ? "bg-neutral-800 text-brand-lime" : "text-neutral-500 hover:text-white"
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
              viewMode === "table" ? "bg-neutral-800 text-brand-lime" : "text-neutral-500 hover:text-white"
            }`}
            title="Table View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Projects Content */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-500 space-y-3">
          <FolderArchive className="w-10 h-10 mx-auto opacity-30 text-neutral-400" />
          <p className="text-sm font-medium text-neutral-300">No client projects found</p>
          <p className="text-xs text-neutral-500">
            Initialize a new project or adjust your filter query.
          </p>
          <button
            type="button"
            onClick={onCreateProject}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-lime hover:bg-[#bef264] text-stone-950 text-xs font-bold transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Create First Project
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const totalM = project.milestones?.length || 0;
            const completedM = project.milestones?.filter((m) => m.completed).length || 0;
            const progress = totalM > 0 ? Math.round((completedM / totalM) * 100) : 0;
            const mediaCount = project.media_files?.length || 0;
            const cleanPhone = project.client_whatsapp?.replace(/[^0-9]/g, "") || project.client_phone?.replace(/[^0-9]/g, "");
            const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : null;

            return (
              <div
                key={project.id}
                className="flex flex-col justify-between p-5 rounded-2xl bg-[#081a13]/90 border border-[#143326]/80 hover:border-brand-lime/40 transition-all group shadow-sm"
              >
                <div className="space-y-4">
                  {/* Top tags */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border capitalize ${getStatusBadge(
                        project.status
                      )}`}
                    >
                      {project.status.replace("_", " ")}
                    </span>

                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${getPriorityBadge(
                        project.priority
                      )}`}
                    >
                      {project.priority}
                    </span>
                  </div>

                  {/* Title & Client Company */}
                  <div>
                    <span className="text-[11px] font-mono text-brand-lime uppercase tracking-wider block">
                      {project.client_company}
                    </span>
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="text-base font-semibold text-white tracking-tight hover:text-brand-lime transition-colors cursor-pointer mt-0.5 line-clamp-2"
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Client Contact Quick Actions */}
                  <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-neutral-950/70 border border-neutral-850">
                    <div className="min-w-0 pr-2">
                      <span className="text-white font-medium block truncate text-[11px]">
                        {project.client_name}
                      </span>
                      <span className="text-neutral-500 font-mono text-[10px] truncate block">
                        {project.client_email}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`mailto:${project.client_email}`}
                        title={`Email ${project.client_name}`}
                        className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                      {whatsappUrl && (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="WhatsApp Client"
                          className="p-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-400 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Scope badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.slice(0, 3).map((svc) => (
                      <span
                        key={svc}
                        className="px-2 py-0.5 rounded text-[10px] bg-neutral-950 border border-neutral-800 text-neutral-300"
                      >
                        {svc}
                      </span>
                    ))}
                    {project.services.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] text-neutral-500">
                        +{project.services.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400 font-mono">Milestones ({completedM}/{totalM})</span>
                      <span className="font-mono font-bold text-brand-lime">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-neutral-950 overflow-hidden border border-neutral-800">
                      <div
                        className="h-full bg-brand-lime transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Metadata & Actions */}
                <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-500 block">Value</span>
                    <span className="text-sm font-bold font-mono text-white">
                      ${project.budget.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950 border border-neutral-850 px-2 py-1 rounded">
                      {mediaCount} files
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-brand-lime hover:text-stone-950 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      <span>Track</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="rounded-xl border border-[#143326]/80 bg-[#081a13]/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#040e0a] border-b border-[#143326]/80 text-neutral-400 font-mono uppercase text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 font-medium">Project &amp; Client</th>
                  <th className="py-3.5 px-4 font-medium">Services</th>
                  <th className="py-3.5 px-4 font-medium">Timeline</th>
                  <th className="py-3.5 px-4 font-medium">Progress</th>
                  <th className="py-3.5 px-4 font-medium text-right">Value</th>
                  <th className="py-3.5 px-4 font-medium">Status</th>
                  <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#143326]/80 text-neutral-300">
                {filteredProjects.map((project) => {
                  const totalM = project.milestones?.length || 0;
                  const completedM = project.milestones?.filter((m) => m.completed).length || 0;
                  const progress = totalM > 0 ? Math.round((completedM / totalM) * 100) : 0;

                  return (
                    <tr
                      key={project.id}
                      className="hover:bg-neutral-800/30 transition-colors group cursor-pointer"
                      onClick={() => onSelectProject(project)}
                    >
                      {/* Title & Client */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white group-hover:text-brand-lime transition-colors">
                          {project.title}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          {project.client_company} &bull; {project.client_name}
                        </div>
                      </td>

                      {/* Services */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.services.slice(0, 2).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-neutral-950 text-[10px] text-neutral-300">
                              {s}
                            </span>
                          ))}
                          {project.services.length > 2 && (
                            <span className="text-[10px] text-neutral-500">+{project.services.length - 2}</span>
                          )}
                        </div>
                      </td>

                      {/* Timeline */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400">
                        <div>Launch: {project.target_launch_date}</div>
                        <div className="text-neutral-500 text-[10px]">Start: {project.start_date}</div>
                      </td>

                      {/* Progress */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-neutral-950 overflow-hidden border border-neutral-800">
                            <div className="h-full bg-brand-lime rounded-full" style={{ width: `${progress}%` }} />
                          </div>
                          <span className="font-mono text-xs text-brand-lime">{progress}%</span>
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                        ${project.budget.toLocaleString()}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border capitalize ${getStatusBadge(
                            project.status
                          )}`}
                        >
                          {project.status.replace("_", " ")}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            title="Generate Invoice"
                            onClick={() => onCreateInvoiceForProject(project)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-brand-lime hover:bg-neutral-800 transition-colors cursor-pointer"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Edit Project"
                            onClick={() => onEditProject(project)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Delete Project"
                            onClick={() => {
                              if (confirm(`Delete project "${project.title}"?`)) {
                                onDeleteProject(project.id);
                                toast.info("Project deleted");
                              }
                            }}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
