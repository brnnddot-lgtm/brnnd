import React, { useState } from "react";
import { Project, ProjectMediaFile, ProjectMilestone } from "@/data/admin-data";
import {
  X,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Edit2,
  Receipt,
  Figma,
  FolderArchive,
  Film,
  FileText,
  Link as LinkIcon,
  Sparkles,
  Layers,
  ArrowUpRight,
  Shield,
  Clock,
  Send,
} from "lucide-react";
import { toast } from "sonner";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  onUpdateProject: (updated: Project) => void;
  onEditProject: (project: Project) => void;
  onCreateInvoiceForProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

export function ProjectDetailModal({
  project,
  onClose,
  onUpdateProject,
  onEditProject,
  onCreateInvoiceForProject,
  onDeleteProject,
}: ProjectDetailModalProps) {
  // New media file form state
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFileType, setNewFileType] = useState<ProjectMediaFile["type"]>("figma");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newFileNote, setNewFileNote] = useState("");

  // New milestone form state
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestoneDate, setNewMilestoneDate] = useState("");

  // Calculate progress
  const totalMilestones = project.milestones?.length || 0;
  const completedMilestones = project.milestones?.filter((m) => m.completed).length || 0;
  const progressPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  // Toggle milestone completion
  const handleToggleMilestone = (milestoneId: string) => {
    const updatedMilestones = (project.milestones || []).map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );
    const updated = { ...project, milestones: updatedMilestones };
    onUpdateProject(updated);
    toast.success("Project milestone updated");
  };

  // Add new milestone
  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;

    const newM: ProjectMilestone = {
      id: `m-${Date.now()}`,
      title: newMilestoneTitle.trim(),
      completed: false,
      due_date: newMilestoneDate || undefined,
    };

    const updated = {
      ...project,
      milestones: [...(project.milestones || []), newM],
    };
    onUpdateProject(updated);
    setNewMilestoneTitle("");
    setNewMilestoneDate("");
    setIsAddingMilestone(false);
    toast.success("Milestone added to project");
  };

  // Delete milestone
  const handleDeleteMilestone = (milestoneId: string) => {
    const updated = {
      ...project,
      milestones: (project.milestones || []).filter((m) => m.id !== milestoneId),
    };
    onUpdateProject(updated);
    toast.info("Milestone removed");
  };

  // Add new media file
  const handleAddMediaFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim() || !newFileUrl.trim()) {
      toast.error("Please provide both asset name and a link URL");
      return;
    }

    const newFile: ProjectMediaFile = {
      id: `file-${Date.now()}`,
      name: newFileName.trim(),
      type: newFileType,
      url: newFileUrl.trim(),
      size_or_note: newFileNote.trim() || undefined,
      added_at: new Date().toISOString().split("T")[0],
    };

    const updated = {
      ...project,
      media_files: [...(project.media_files || []), newFile],
    };
    onUpdateProject(updated);
    setNewFileName("");
    setNewFileUrl("");
    setNewFileNote("");
    setIsAddingFile(false);
    toast.success("Media asset attached to project");
  };

  // Delete media file
  const handleDeleteMediaFile = (fileId: string) => {
    const updated = {
      ...project,
      media_files: (project.media_files || []).filter((f) => f.id !== fileId),
    };
    onUpdateProject(updated);
    toast.info("Media file removed");
  };

  // Status changer
  const handleStatusChange = (newStatus: Project["status"]) => {
    onUpdateProject({ ...project, status: newStatus });
    toast.success(`Project status shifted to ${newStatus.replace("_", " ")}`);
  };

  const getMediaIcon = (type: ProjectMediaFile["type"]) => {
    switch (type) {
      case "figma":
        return <Figma className="w-4 h-4 text-purple-400" />;
      case "video":
        return <Film className="w-4 h-4 text-blue-400" />;
      case "zip":
        return <FolderArchive className="w-4 h-4 text-violet-400" />;
      case "doc":
        return <FileText className="w-4 h-4 text-emerald-400" />;
      default:
        return <LinkIcon className="w-4 h-4 text-brand-lime" />;
    }
  };

  // WhatsApp click to chat
  const cleanPhone = project.client_whatsapp?.replace(/[^0-9]/g, "") || project.client_phone?.replace(/[^0-9]/g, "");
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${project.client_name}, this is BRNND Studio regarding our project: "${project.title}".`)}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-5xl max-h-[92vh] bg-[#081a13] border border-[#143326]/80 rounded-2xl shadow-2xl overflow-hidden text-neutral-100">
        {/* Header Bar */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-[#143326]/80 bg-[#040e0a]">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/brnndlogo.png" alt="BRNND" className="h-5 w-auto object-contain shrink-0" />
            <span className="text-neutral-600">/</span>
            <div className="min-w-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-brand-lime">
                {project.client_company}
              </span>
              <h2 className="text-base font-semibold text-white truncate">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEditProject(project)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#0c271e] hover:bg-[#143d2f] text-neutral-200 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (confirm(`Are you sure you want to delete project "${project.title}"?`)) {
                  onDeleteProject(project.id);
                  onClose();
                }
              }}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-[#0c271e] transition-colors cursor-pointer"
              title="Delete Project"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#0c271e] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Top Status & Progress Bar Card */}
          <div className="p-5 rounded-xl bg-[#040e0a] border border-[#143326]/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {/* Status Dropdown */}
                <select
                  value={project.status}
                  onChange={(e) => handleStatusChange(e.target.value as Project["status"])}
                  className="px-2.5 py-1 rounded-full text-xs font-mono capitalize bg-[#081a13] border border-[#143326] text-white focus:border-brand-lime focus:outline-none cursor-pointer"
                >
                  <option value="discovery">Discovery & Brief</option>
                  <option value="in_progress">In Progress</option>
                  <option value="in_review">In Review & Revisions</option>
                  <option value="completed">Completed & Shipped</option>
                  <option value="on_hold">On Hold</option>
                </select>

                {/* Priority */}
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    project.priority === "urgent"
                      ? "bg-red-950 text-red-400 border-red-500/30"
                      : project.priority === "high"
                      ? "bg-violet-950/70 text-violet-400 border-violet-500/30"
                      : "bg-[#0c271e] text-neutral-300 border-[#143326]"
                  }`}
                >
                  {project.priority} priority
                </span>

                <span className="text-xs text-neutral-400 font-mono">
                  Started {project.start_date} &bull; Target {project.target_launch_date}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono">
                    Project Milestones: {completedMilestones} of {totalMilestones} done
                  </span>
                  <span className="font-mono font-bold text-brand-lime">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
                  <div
                    className="h-full bg-brand-lime transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Financials & Invoice Generator */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-neutral-800 pt-4 sm:pt-0 sm:pl-6 shrink-0 gap-3">
              <div>
                <div className="text-[11px] font-mono text-neutral-400 sm:text-right uppercase">Contract Value</div>
                <div className="text-2xl font-bold font-mono text-white sm:text-right">
                  ${project.budget.toLocaleString()} <span className="text-xs font-normal text-neutral-400">{project.currency}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCreateInvoiceForProject(project);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-lime hover:bg-[#bef264] text-stone-950 text-xs font-bold tracking-wide transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>Create Invoice</span>
              </button>
            </div>
          </div>

          {/* Two-Column: Client Information & Requirements Brief */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Client Contact Information Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand-lime" />
                  Client Profile
                </h3>

                <div className="space-y-1">
                  <div className="font-semibold text-white text-sm">{project.client_name}</div>
                  <div className="text-xs text-brand-lime font-mono">{project.client_company}</div>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-800/80 text-xs">
                  {/* Email (Required) */}
                  <a
                    href={`mailto:${project.client_email}`}
                    className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors group"
                  >
                    <Mail className="w-3.5 h-3.5 text-neutral-500 group-hover:text-brand-lime shrink-0" />
                    <span className="font-mono truncate">{project.client_email}</span>
                  </a>

                  {/* Phone */}
                  {project.client_phone && (
                    <a
                      href={`tel:${project.client_phone}`}
                      className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors group"
                    >
                      <Phone className="w-3.5 h-3.5 text-neutral-500 group-hover:text-brand-lime shrink-0" />
                      <span className="font-mono">{project.client_phone}</span>
                    </a>
                  )}

                  {/* WhatsApp */}
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/60 text-xs font-mono transition-colors mt-1 w-full justify-center"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message on WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Scope & Services */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-brand-lime" />
                  Scope of Services
                </h3>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.services.map((svc) => (
                    <span
                      key={svc}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-neutral-900 border border-neutral-800 text-neutral-300"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Project Description, Requirements & Deliverables */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Project Overview
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Specific Client Requirements */}
                <div className="pt-2 border-t border-neutral-800/80">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
                    Required Deliverables &amp; Client Specs
                  </h3>

                  {project.requirements && project.requirements.length > 0 ? (
                    <ul className="space-y-2">
                      {project.requirements.map((req, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-neutral-200 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-850"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-lime mt-1.5 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-neutral-500 italic">No specific requirements noted yet.</p>
                  )}
                </div>

                {/* Internal Studio Notes */}
                {project.notes && (
                  <div className="pt-2 border-t border-neutral-800/80">
                    <span className="text-[11px] font-mono text-neutral-500 uppercase">Internal Studio Notes</span>
                    <p className="text-xs text-neutral-400 font-mono mt-1 bg-neutral-900/40 p-2.5 rounded-lg border border-neutral-850">
                      {project.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section: Milestones & Sprint Checklist */}
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-lime" />
                  Milestone Sprint Checklist
                </h3>
                <p className="text-xs text-neutral-400">
                  Click to check off deliverables as they are handed over to the client
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingMilestone(!isAddingMilestone)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-lime hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Milestone</span>
              </button>
            </div>

            {/* Add milestone inline form */}
            {isAddingMilestone && (
              <form onSubmit={handleAddMilestone} className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 space-y-2 animate-in fade-in">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Milestone title, e.g. 'Figma Web Prototype Complete'"
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none"
                  />
                  <input
                    type="date"
                    value={newMilestoneDate}
                    onChange={(e) => setNewMilestoneDate(e.target.value)}
                    className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:border-brand-lime focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-brand-lime hover:bg-[#bef264] text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingMilestone(false)}
                      className="px-3 py-1.5 bg-neutral-800 text-neutral-300 text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Milestone List */}
            <div className="divide-y divide-neutral-850">
              {project.milestones?.map((m) => (
                <div
                  key={m.id}
                  className="py-3 flex items-center justify-between gap-4 group hover:bg-neutral-900/30 px-2 rounded-lg transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => handleToggleMilestone(m.id)}
                    className="flex items-center gap-3 text-left cursor-pointer flex-1"
                  >
                    {m.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-neutral-600 shrink-0 group-hover:text-neutral-400" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        m.completed ? "line-through text-neutral-500" : "text-neutral-200"
                      }`}
                    >
                      {m.title}
                    </span>
                  </button>

                  <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-neutral-500">
                    {m.due_date && <span>Due {m.due_date}</span>}
                    <button
                      type="button"
                      onClick={() => handleDeleteMilestone(m.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-neutral-600 hover:text-red-400 transition-opacity cursor-pointer"
                      title="Remove milestone"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Media Files & Project Assets Hub */}
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <FolderArchive className="w-4 h-4 text-brand-lime" />
                  Media Files &amp; Assets Vault
                </h3>
                <p className="text-xs text-neutral-400">
                  Figma links, Google Drive assets, 3D renders, vector packs, and client media
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingFile(!isAddingFile)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-brand-lime border border-neutral-800 text-xs font-mono transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Attach Asset Link</span>
              </button>
            </div>

            {/* Inline Add Media Form */}
            {isAddingFile && (
              <form onSubmit={handleAddMediaFile} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Asset Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master Figma Web System v2"
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Type</label>
                    <select
                      value={newFileType}
                      onChange={(e) => setNewFileType(e.target.value as ProjectMediaFile["type"])}
                      className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:border-brand-lime focus:outline-none capitalize"
                    >
                      <option value="figma">Figma File</option>
                      <option value="drive">Google Drive</option>
                      <option value="doc">Document / PDF</option>
                      <option value="video">Motion / Video</option>
                      <option value="zip">Zip / Asset Pack</option>
                      <option value="image">Image Gallery</option>
                      <option value="link">External Link</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">URL / Link</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={newFileUrl}
                      onChange={(e) => setNewFileUrl(e.target.value)}
                      className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">Size or Note</label>
                    <input
                      type="text"
                      placeholder="e.g. 42 MB · Final Rev"
                      value={newFileNote}
                      onChange={(e) => setNewFileNote(e.target.value)}
                      className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingFile(false)}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-brand-lime hover:bg-[#bef264] text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Add Asset
                  </button>
                </div>
              </form>
            )}

            {/* Media Files List */}
            {project.media_files && project.media_files.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.media_files.map((file) => (
                  <div
                    key={file.id}
                    className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start justify-between gap-3 group hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 shrink-0 mt-0.5">
                        {getMediaIcon(file.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white text-xs truncate group-hover:text-brand-lime transition-colors">
                          {file.name}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono mt-0.5">
                          <span className="uppercase">{file.type}</span>
                          {file.size_or_note && <span>&bull; {file.size_or_note}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                        title="Open Resource"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeleteMediaFile(file.id)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-neutral-500 text-xs">
                No media files or links attached yet. Click "Attach Asset Link" to add your Figma or Drive assets.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
