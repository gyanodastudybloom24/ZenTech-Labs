"use client";

import { useState } from "react";
import type { Enquiry, EnquiryStatus } from "@/lib/db";

const STATUS_ORDER: EnquiryStatus[] = ["new", "read", "responded"];
const STATUS_COLOR: Record<EnquiryStatus, string> = { new: "#c9ff36", read: "#ffd166", responded: "#8fd6a3" };

const emptyForm = { name: "", email: "", company: "", message: "" };

export function AdminEnquiries({ initial }: { initial: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);

  const cycleStatus = async (enquiry: Enquiry) => {
    const next = STATUS_ORDER[(STATUS_ORDER.indexOf(enquiry.status) + 1) % STATUS_ORDER.length];
    setBusyId(enquiry.id);
    const previous = enquiries;
    setEnquiries(list => list.map(e => (e.id === enquiry.id ? { ...e, status: next } : e)));
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setEnquiries(previous); // revert on failure
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this enquiry? This can't be undone.")) return;
    setBusyId(id);
    const previous = enquiries;
    setEnquiries(list => list.filter(e => e.id !== id));
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setEnquiries(previous); // revert on failure
      alert("Couldn't delete that enquiry. Please try again.");
    } finally {
      setBusyId(null);
    }
  };

  const addEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError("Name and message are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong.");
      setEnquiries(list => [result.enquiry, ...list]);
      setForm(emptyForm);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <p style={{ color: "#666", margin: 0 }}>{enquiries.length} received{enquiries.length ? ", most recent first" : ""}.</p>
        <button
          type="button"
          onClick={() => setShowForm(s => !s)}
          style={{ background: "#101613", color: "#fff", border: 0, borderRadius: 8, padding: ".6rem 1.1rem", cursor: "pointer", fontSize: ".9rem" }}
        >
          {showForm ? "Cancel" : "+ Log an enquiry"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addEnquiry} style={{ border: "1px solid #e2e2e2", borderRadius: 10, padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "grid", gap: ".75rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
            <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          </div>
          <input placeholder="Company (optional)" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={inputStyle} />
          <textarea placeholder="Message / notes" rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical" as const }} />
          {error && <p style={{ color: "#c0392b", margin: 0, fontSize: ".85rem" }}>{error}</p>}
          <button type="submit" disabled={saving} style={{ justifySelf: "start", background: "#c9ff36", color: "#101613", border: 0, borderRadius: 8, padding: ".6rem 1.2rem", cursor: "pointer", fontWeight: 600 }}>
            {saving ? "Saving…" : "Save enquiry"}
          </button>
        </form>
      )}

      {enquiries.length === 0 && <p style={{ color: "#888" }}>No enquiries yet.</p>}

      {enquiries.map(e => (
        <article key={e.id} style={{ border: "1px solid #e2e2e2", borderRadius: 10, padding: "1.25rem 1.5rem", marginBottom: "1rem", opacity: busyId === e.id ? 0.6 : 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: ".5rem" }}>
            <strong>{e.name}</strong>
            <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
              <button
                type="button"
                onClick={() => cycleStatus(e)}
                disabled={busyId === e.id}
                title="Click to change status"
                style={{ background: STATUS_COLOR[e.status], border: 0, borderRadius: 99, padding: ".2rem .7rem", fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".05em", cursor: "pointer", fontWeight: 600 }}
              >
                {e.status}
              </button>
              <span style={{ color: "#888", fontSize: ".85rem" }}>{new Date(e.receivedAt).toLocaleString("en-GB")}</span>
              <button
                type="button"
                onClick={() => remove(e.id)}
                disabled={busyId === e.id}
                aria-label="Delete enquiry"
                style={{ background: "none", border: "1px solid #e2a5a5", color: "#c0392b", borderRadius: 6, padding: ".2rem .6rem", cursor: "pointer", fontSize: ".78rem" }}
              >
                Delete
              </button>
            </div>
          </div>
          <div style={{ color: "#444", fontSize: ".9rem", marginBottom: ".75rem" }}>
            <a href={`mailto:${e.email}`}>{e.email}</a>{e.company ? ` · ${e.company}` : ""}
          </div>
          <p style={{ whiteSpace: "pre-wrap", margin: 0, lineHeight: 1.5 }}>{e.message}</p>
        </article>
      ))}
    </div>
  );
}

const inputStyle: React.CSSProperties = { padding: ".55rem .7rem", border: "1px solid #ddd", borderRadius: 6, fontFamily: "inherit", fontSize: ".9rem" };
