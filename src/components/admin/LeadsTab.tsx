import React, { useState } from "react";
import { Lead } from "@/data/admin-data";
import { fetchLeadsFromSupabaseFn } from "@/lib/admin.functions";
import {
  Users,
  Search,
  RefreshCw,
  FilePlus2,
  Calendar,
  Building,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

interface LeadsTabProps {
  leads: Lead[];
  onConvertLeadToInvoice: (lead: Lead) => void;
  onUpdateLeadStatus: (leadId: string, status: Lead["status"]) => void;
  onRefreshLeads?: (leads: Lead[]) => void;
}

export function LeadsTab({
  leads,
  onConvertLeadToInvoice,
  onUpdateLeadStatus,
  onRefreshLeads,
}: LeadsTabProps) {
  const [search, setSearch] = useState("");
  const [syncing, setSyncing] = useState(false);

  const filteredLeads = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.full_name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q)
    );
  });

  const handleSyncSupabase = async () => {
    setSyncing(true);
    try {
      const res = await fetchLeadsFromSupabaseFn();
      if (res.success && res.leads && res.leads.length > 0) {
        toast.success(`Synced ${res.leads.length} leads from Supabase!`);
        if (onRefreshLeads) {
          const mapped: Lead[] = res.leads.map((l: unknown) => {
            const item = l as Record<string, unknown>;
            return {
              id: String(item.id || Math.random()),
              full_name: String(item.full_name || item.name || "Client"),
              email: String(item.email || ""),
              company: String(item.company || "Company"),
              company_size: String(item.company_size || "1-10"),
              source: String(item.source || "Website Demo"),
              status: (item.status as Lead["status"]) || "new",
              created_at: String(item.created_at || new Date().toISOString()),
            };
          });
          onRefreshLeads(mapped);
        }
      } else {
        toast.info("Supabase checked: leads database current.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not sync with Supabase demo_leads table.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Client Inquiries & Leads</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Demo requests, inbound project briefs, and 1-click invoice conversions
          </p>
        </div>

        <button
          type="button"
          onClick={handleSyncSupabase}
          disabled={syncing}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#091f17] hover:bg-[#0e2c21] text-neutral-200 border border-[#143326] text-xs font-medium transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin text-brand-lime" : ""}`} />
          {syncing ? "Syncing Supabase..." : "Sync from Supabase"}
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          placeholder="Filter leads by name, email, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-[#040e0a] border border-[#143326]/80 rounded-lg text-xs text-white placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#143326]/80 bg-[#081a13]/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 font-mono uppercase text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-medium">Contact / Prospect</th>
                <th className="py-3.5 px-4 font-medium">Company</th>
                <th className="py-3.5 px-4 font-medium">Team Size</th>
                <th className="py-3.5 px-4 font-medium">Channel / Source</th>
                <th className="py-3.5 px-4 font-medium">Status</th>
                <th className="py-3.5 px-4 font-medium">Date Received</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-300">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-neutral-800/30 transition-colors">
                    {/* Contact */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{lead.full_name}</div>
                      <div className="text-[11px] font-mono text-neutral-400">{lead.email}</div>
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-medium text-neutral-200">
                        <Building className="w-3.5 h-3.5 text-neutral-500" />
                        {lead.company}
                      </div>
                    </td>

                    {/* Team Size */}
                    <td className="py-3.5 px-4 font-mono text-neutral-400">
                      {lead.company_size}
                    </td>

                    {/* Channel */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {lead.source || "Website Inbound"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          onUpdateLeadStatus(lead.id, e.target.value as Lead["status"])
                        }
                        className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-[11px] font-mono capitalize text-neutral-300 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-neutral-500" />
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onConvertLeadToInvoice(lead)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-lime hover:bg-[#bef264] text-stone-950 font-semibold text-[11px] transition-colors cursor-pointer shadow-sm"
                      >
                        <FilePlus2 className="w-3.5 h-3.5" />
                        Create Invoice
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
