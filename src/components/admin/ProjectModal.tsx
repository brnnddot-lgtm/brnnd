import React, { useState } from "react";
import { Project, ProjectMediaFile, ProjectMilestone } from "@/data/admin-data";
import { SUPPORTED_CURRENCIES, getCurrencySymbol } from "@/lib/invoice-pdf";
import {
  X,
  Plus,
  Trash2,
  FolderArchive,
  Save,
  Clock,
  Sparkles,
  Layers,
  Shield,
  Figma,
  Film,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

interface ProjectModalProps {
  project?: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}

const AVAILABLE_SERVICES = [
  "Brand Strategy",
  "Visual Identity",
  "UI/UX Design",
  "Web Development",
  "3D Motion",
  "E-Commerce",
  "Packaging & Merchandise",
  "Design Engineering",
  "Campaign Strategy",
];

export function ProjectModal({ project, onClose, onSave }: ProjectModalProps) {
  const isEditing = Boolean(project);

  const [title, setTitle] = useState(project?.title || "");
  const [clientName, setClientName] = useState(project?.client_name || "");
  const [clientCompany, setClientCompany] = useState(project?.client_company || "");
  const [clientEmail, setClientEmail] = useState(project?.client_email || "");
  const [clientPhone, setClientPhone] = useState(project?.client_phone || "");
  const [clientWhatsapp, setClientWhatsapp] = useState(project?.client_whatsapp || "");

  const [status, setStatus] = useState<Project["status"]>(project?.status || "in_progress");
  const [priority, setPriority] = useState<Project["priority"]>(project?.priority || "high");
  const [budget, setBudget] = useState<number>(project?.budget || 18500);
  const [currency, setCurrency] = useState<string>(
    project?.currency ||
      (typeof window !== "undefined"
        ? localStorage.getItem("brnnd_default_currency") || "BDT"
        : "BDT")
  );
  const currSym = getCurrencySymbol(currency);

  const [startDate, setStartDate] = useState(
    project?.start_date || new Date().toISOString().split("T")[0]
  );
  const [targetLaunchDate, setTargetLaunchDate] = useState(() => {
    if (project?.target_launch_date) return project.target_launch_date;
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });

  const [selectedServices, setSelectedServices] = useState<string[]>(
    project?.services && project.services.length > 0
      ? project.services
      : ["Brand Strategy", "Visual Identity", "UI/UX Design"]
  );

  const [description, setDescription] = useState(
    project?.description ||
      "Comprehensive brand identity transformation, digital experience design, and design system handover."
  );

  // Requirements list
  const [requirements, setRequirements] = useState<string[]>(
    project?.requirements && project.requirements.length > 0
      ? project.requirements
      : [
          "Complete brand book with typography & Pantone color palette",
          "High-conversion web architecture & Figma design system",
          "Exportable production-ready vector assets and component library",
        ]
  );
  const [newReqInput, setNewReqInput] = useState("");

  // Milestones list
  const [milestones, setMilestones] = useState<ProjectMilestone[]>(
    project?.milestones && project.milestones.length > 0
      ? project.milestones
      : [
          { id: "1", title: "Discovery Workshop & Narrative Alignment", completed: true, due_date: startDate },
          { id: "2", title: "Visual Identity & Vector Logomark Exploration", completed: false, due_date: targetLaunchDate },
          { id: "3", title: "High-Fidelity Figma Web Prototype", completed: false, due_date: targetLaunchDate },
          { id: "4", title: "Final Deliverable Handoff & Launch QA", completed: false, due_date: targetLaunchDate },
        ]
  );

  // Media files list
  const [mediaFiles, setMediaFiles] = useState<ProjectMediaFile[]>(project?.media_files || []);
  const [newFileName, setNewFileName] = useState("");
  const [newFileType, setNewFileType] = useState<ProjectMediaFile["type"]>("figma");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newFileNote, setNewFileNote] = useState("");

  const [notes, setNotes] = useState(project?.notes || "");

  // Toggle service tag
  const handleToggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  // Add requirement
  const handleAddRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReqInput.trim()) return;
    setRequirements((prev) => [...prev, newReqInput.trim()]);
    setNewReqInput("");
  };

  const handleRemoveRequirement = (idx: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== idx));
  };

  // Add milestone
  const handleAddMilestone = () => {
    const newM: ProjectMilestone = {
      id: `m-${Date.now()}`,
      title: "New Deliverable Milestone",
      completed: false,
      due_date: targetLaunchDate,
    };
    setMilestones((prev) => [...prev, newM]);
  };

  const handleUpdateMilestone = (index: number, title: string) => {
    setMilestones((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], title };
      return next;
    });
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones((prev) => prev.filter((_, i) => i !== index));
  };

  // Add media file
  const handleAddMediaFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim() || !newFileUrl.trim()) {
      toast.error("Please provide asset title and link URL");
      return;
    }
    const file: ProjectMediaFile = {
      id: `file-${Date.now()}`,
      name: newFileName.trim(),
      type: newFileType,
      url: newFileUrl.trim(),
      size_or_note: newFileNote.trim() || undefined,
      added_at: new Date().toISOString().split("T")[0],
    };
    setMediaFiles((prev) => [...prev, file]);
    setNewFileName("");
    setNewFileUrl("");
    setNewFileNote("");
    toast.success("Media asset attached");
  };

  const handleRemoveMediaFile = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please provide a project title");
      return;
    }
    if (!clientCompany.trim()) {
      toast.error("Please provide the client company name");
      return;
    }
    if (!clientEmail.trim()) {
      toast.error("Client email is required");
      return;
    }

    const payload: Project = {
      id: project?.id || `proj-${Date.now()}`,
      title: title.trim(),
      client_name: clientName.trim() || clientCompany.trim(),
      client_company: clientCompany.trim(),
      client_email: clientEmail.trim(),
      client_phone: clientPhone.trim() || undefined,
      client_whatsapp: clientWhatsapp.trim() || undefined,
      services: selectedServices.length > 0 ? selectedServices : ["Brand Transformation"],
      status,
      priority,
      start_date: startDate,
      target_launch_date: targetLaunchDate,
      budget: Number(budget) || 0,
      currency,
      description: description.trim(),
      requirements,
      milestones,
      media_files: mediaFiles,
      notes: notes.trim() || undefined,
      created_at: project?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onSave(payload);
    toast.success(isEditing ? "Project updated successfully" : "New project created");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
      data-lenis-prevent="true"
    >
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[96vh] sm:max-h-[92vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 my-auto"
        data-lenis-prevent="true"
      >
        {/* Header Bar */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img src="/brnndlogo.png" alt="BRNND" className="h-4 sm:h-5 w-auto object-contain shrink-0" />
            <span className="text-neutral-600">/</span>
            <h2 className="text-sm sm:text-base font-semibold text-white truncate">
              {isEditing ? `Edit Project: ${project?.title}` : "Initialize New Client Project"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <div
            tabIndex={0}
            role="region"
            aria-label="Project configuration form"
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 pb-14 space-y-5 sm:space-y-6 custom-scrollbar outline-none focus-visible:ring-1 focus-visible:ring-brand-lime/30"
          >
            {/* Top Project Identity */}
            <div className="space-y-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <FolderArchive className="w-3.5 h-3.5 text-brand-lime" />
                Project Identity
              </h3>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                  Project Title <span className="text-brand-lime">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lumina AI: Enterprise Rebrand & Web Platform"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Project["status"])}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:border-brand-lime focus:outline-none capitalize"
                  >
                    <option value="discovery">Discovery & Brief</option>
                    <option value="in_progress">In Progress</option>
                    <option value="in_review">In Review & Polish</option>
                    <option value="completed">Completed & Shipped</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Project["priority"])}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:border-brand-lime focus:outline-none capitalize"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:border-brand-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Target Launch</label>
                  <input
                    type="date"
                    required
                    value={targetLaunchDate}
                    onChange={(e) => setTargetLaunchDate(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:border-brand-lime focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-1">
                <div className="sm:col-span-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono uppercase text-neutral-400">
                      Contract Value ({currSym})
                    </label>
                    <span className="text-xs font-mono font-bold text-brand-lime">
                      {currSym}{budget.toLocaleString()} {currency}
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-neutral-400">
                      {currSym}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      inputMode="decimal"
                      value={budget}
                      onChange={(e) => setBudget(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full pl-8 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white font-mono focus:border-brand-lime focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  {/* Budget Slider */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <input
                      type="range"
                      min="0"
                      max={Math.max(50000, Math.round(budget * 1.5))}
                      step="500"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-lime"
                    />
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                      {currSym}{Math.round(budget / 1000)}k
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:border-brand-lime focus:outline-none font-mono cursor-pointer"
                  >
                    {SUPPORTED_CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="space-y-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-brand-lime" />
                Client Profile Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Company Name <span className="text-brand-lime">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lumina AI Systems"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Primary Contact Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Marcus Vance"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Client Email <span className="text-brand-lime">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@lumina.ai"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+1 (415) 890-4412"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-400 mb-1">WhatsApp Number (Optional, for 1-click chat)</label>
                  <input
                    type="tel"
                    placeholder="+14158904412"
                    value={clientWhatsapp}
                    onChange={(e) => setClientWhatsapp(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none font-mono"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Include country code (e.g. +14158904412) to enable direct 1-click WhatsApp launch.
                  </p>
                </div>
              </div>
            </div>

            {/* Scope of Services */}
            <div className="space-y-3 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-brand-lime" />
                Scope of Services
              </h3>
              <p className="text-xs text-neutral-400">Select all services included in this engagement:</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {AVAILABLE_SERVICES.map((svc) => {
                  const isSelected = selectedServices.includes(svc);
                  return (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => handleToggleService(svc)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-brand-lime text-stone-950 font-bold shadow-sm"
                          : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
                      }`}
                    >
                      {isSelected ? `✓ ${svc}` : `+ ${svc}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description & Overview */}
            <div className="space-y-2 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <label className="block text-xs font-mono uppercase text-neutral-400">
                Project Overview &amp; Strategic Goal
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Core objectives, target market, and strategic goals for this client engagement..."
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none leading-relaxed resize-none"
              />
            </div>

            {/* Client Requirements & Deliverables */}
            <div className="space-y-3 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
                Deliverables &amp; Client Requirements
              </h3>

              <div className="space-y-2">
                {requirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-2 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />
                    <span className="flex-1 text-xs text-neutral-200">{req}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(i)}
                      className="text-neutral-500 hover:text-red-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add requirement input */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add specific deliverable, e.g. 'Figma Design System with 40+ components'..."
                  value={newReqInput}
                  onChange={(e) => setNewReqInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newReqInput.trim()) {
                        setRequirements((prev) => [...prev, newReqInput.trim()]);
                        setNewReqInput("");
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm sm:text-xs text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newReqInput.trim()) {
                      setRequirements((prev) => [...prev, newReqInput.trim()]);
                      setNewReqInput("");
                    }
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium cursor-pointer shrink-0 transition-colors"
                >
                  Add Deliverable
                </button>
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-3 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-lime" />
                  Sprint Milestones
                </h3>
                <button
                  type="button"
                  onClick={handleAddMilestone}
                  className="inline-flex items-center gap-1 text-xs font-mono text-brand-lime hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Milestone
                </button>
              </div>

              <div className="space-y-2">
                {milestones.map((m, idx) => (
                  <div key={m.id || idx} className="flex items-center gap-2 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                    <span className="font-mono text-xs text-neutral-500 w-6">0{idx + 1}</span>
                    <input
                      type="text"
                      value={m.title}
                      onChange={(e) => handleUpdateMilestone(idx, e.target.value)}
                      className="flex-1 bg-transparent border-0 text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(idx)}
                      className="text-neutral-500 hover:text-red-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Files & Links */}
            <div className="space-y-3 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <FolderArchive className="w-3.5 h-3.5 text-brand-lime" />
                Media Assets &amp; External Links
              </h3>

              {mediaFiles.length > 0 && (
                <div className="space-y-2">
                  {mediaFiles.map((f, i) => (
                    <div key={f.id || i} className="flex items-center justify-between gap-3 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                      <div className="min-w-0">
                        <span className="text-xs font-medium text-white truncate block">{f.name}</span>
                        <span className="text-[11px] font-mono text-neutral-400 truncate block">{f.url}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMediaFile(i)}
                        className="text-neutral-500 hover:text-red-400 p-1 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add file inline row */}
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Asset Title (e.g. Master Figma File)"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="sm:col-span-2 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-xs text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none"
                  />
                  <select
                    value={newFileType}
                    onChange={(e) => setNewFileType(e.target.value as ProjectMediaFile["type"])}
                    className="px-2 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-xs text-white focus:border-brand-lime focus:outline-none capitalize"
                  >
                    <option value="figma">Figma</option>
                    <option value="drive">Drive</option>
                    <option value="doc">Document</option>
                    <option value="video">Video</option>
                    <option value="zip">Zip Pack</option>
                    <option value="link">Link</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newFileUrl}
                    onChange={(e) => setNewFileUrl(e.target.value)}
                    className="flex-1 px-3 py-2 sm:py-1.5 bg-neutral-950 border border-neutral-800 rounded text-sm sm:text-xs text-white placeholder-neutral-500 focus:border-brand-lime focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddMediaFile}
                    className="w-full sm:w-auto px-4 py-2 sm:py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-medium cursor-pointer shrink-0 transition-colors"
                  >
                    Attach Link
                  </button>
                </div>
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <label className="block text-xs font-mono uppercase text-neutral-400">
                Internal Studio Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Log internal notes, meeting links, or handoff details..."
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-300 placeholder-neutral-500 focus:border-brand-lime focus:outline-none leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="shrink-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-t border-neutral-800 bg-neutral-950">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-lime hover:bg-[#bef264] text-stone-950 text-xs font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md shadow-brand-lime/10"
            >
              <Save className="w-3.5 h-3.5" />
              {isEditing ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
