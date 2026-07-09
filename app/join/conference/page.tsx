"use client";
import { useState } from "react";
import { COUNTRIES, CONFERENCE_PARTNERSHIP_OPTIONS } from "../../lib/formData";
import { SectionHeader, Field, Input, Select } from "../_shared/FormFields";
import { SuccessScreen } from "../_shared/SuccessScreen";

type F = {
  fullName: string; designation: string; organization: string;
  email: string; contactNumber: string; country: string;
  partnerships: string[]; otherPartnership: string;
  scheduleCall: boolean;
  contactPerson: string; contactPersonEmail: string;
};

const EMPTY: F = {
  fullName: "", designation: "", organization: "",
  email: "", contactNumber: "", country: "",
  partnerships: [], otherPartnership: "",
  scheduleCall: false,
  contactPerson: "", contactPersonEmail: "",
};

// ── Replace with your real Calendly link ──
const CALENDLY_URL = "https://calendly.com/your-link";

export default function ConferencePage() {
  const [form, setForm]           = useState<F>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const togglePartnership = (opt: string) =>
    setForm(p => ({
      ...p,
      partnerships: p.partnerships.includes(opt)
        ? p.partnerships.filter(x => x !== opt)
        : [...p.partnerships, opt],
    }));

  const toggleOther = () =>
    setForm(p => ({
      ...p,
      partnerships: p.partnerships.includes("Any Other")
        ? p.partnerships.filter(x => x !== "Any Other")
        : [...p.partnerships, "Any Other"],
      otherPartnership: p.partnerships.includes("Any Other") ? "" : p.otherPartnership,
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: "conference", data: form }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success ── */
  if (submitted) {
    return (
      <SuccessScreen
        eyebrow="Request Received"
        message="Your partnership request has been submitted. Our team will get in touch with you within 2–3 business days."
      />
    );
  }

  /* ── Main ── */
  return (
    <div className="relative min-h-screen bg-[#fff] overflow-hidden text-[#1A1A2E]" style={{ paddingTop: 72 }}>

      {/* Dotted pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #520380 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-10 pb-24 relative z-10">
        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-white/80 backdrop-blur-2xl border border-white/80 rounded-xl shadow-[0_20px_60px_-15px_rgba(82,3,128,0.08)] relative overflow-hidden">

            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-[#C084FC] to-primary opacity-90 z-20" />

            {/* Form header */}
            <div className="relative px-8 md:px-14 pt-14 pb-10 border-b border-gray-100 bg-white/40 overflow-hidden">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/15 to-[#C084FC]/10 blur-[100px] rounded-full z-0 pointer-events-none -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 blur-[80px] rounded-full z-0 pointer-events-none translate-y-1/2 -translate-x-1/4" />
              <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-[#1A1A2E] mb-6 leading-tight">
                  Start Your Own <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#8A2BE2]">Conference</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                  Partner with GR Conferences to launch, manage or grow your academic conference. Fill in your details and we'll get in touch to discuss the next steps.
                </p>
              </div>
            </div>

            {/* Form body */}
            <div className="p-8 md:p-14 space-y-12 relative z-10 bg-white/60">

              {/* ── A: Information ── */}
              <div>
                <SectionHeader id="A" label="Information" />

                {/* Full Name + Designation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                  <Field label="Full Name" required>
                    <Input name="fullName" value={form.fullName} onChange={set} placeholder="e.g. Dr. Jane Smith" required />
                  </Field>
                  <Field label="Designation / Role" required>
                    <Input name="designation" value={form.designation} onChange={set} placeholder="e.g. Professor, Research Director" required />
                  </Field>
                </div>

                {/* Organization full width */}
                <div className="mb-5">
                  <Field label="Organization / Institution Name" required>
                    <Input name="organization" value={form.organization} onChange={set} placeholder="e.g. University of Cambridge, IEEE" required />
                  </Field>
                </div>

                {/* Email + Contact + Country */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5">
                  <Field label="Email ID" required>
                    <Input name="email" value={form.email} onChange={set} type="email" placeholder="you@example.com" required />
                  </Field>
                  <Field label="Contact Number" optional>
                    <Input name="contactNumber" value={form.contactNumber} onChange={set} type="tel" placeholder="+1 234 567 8900" />
                  </Field>
                  <Field label="Country" required>
                    <Select name="country" value={form.country} onChange={set} options={COUNTRIES} placeholder="Select country" required />
                  </Field>
                </div>
              </div>

              {/* ── B: Partnership Type ── */}
              <div>
                <SectionHeader id="B" label="Partnership Type" />
                <Field label="Select Partnership Interest" required hint="Select all that apply">
                  <div className="mt-1 space-y-3">
                    {CONFERENCE_PARTNERSHIP_OPTIONS.map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={() => togglePartnership(opt)}
                          className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                            form.partnerships.includes(opt)
                              ? "bg-primary border-primary"
                              : "bg-[#FAFAFC] border-gray-300 group-hover:border-primary/50"
                          }`}
                        >
                          {form.partnerships.includes(opt) && (
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span
                          onClick={() => togglePartnership(opt)}
                          className={`text-sm font-medium transition-colors duration-200 ${form.partnerships.includes(opt) ? "text-[#1A1A2E]" : "text-gray-500 group-hover:text-[#1A1A2E]"}`}
                        >
                          {opt}
                        </span>
                      </label>
                    ))}

                    {/* Any Other with text field */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={toggleOther}
                          className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                            form.partnerships.includes("Any Other")
                              ? "bg-primary border-primary"
                              : "bg-[#FAFAFC] border-gray-300 group-hover:border-primary/50"
                          }`}
                        >
                          {form.partnerships.includes("Any Other") && (
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span
                          onClick={toggleOther}
                          className={`text-sm font-medium transition-colors duration-200 ${form.partnerships.includes("Any Other") ? "text-[#1A1A2E]" : "text-gray-500 group-hover:text-[#1A1A2E]"}`}
                        >
                          Any Other (Please Specify)
                        </span>
                      </label>

                      {form.partnerships.includes("Any Other") && (
                        <div className="ml-8 animate-fade-in">
                          <input
                            name="otherPartnership"
                            value={form.otherPartnership}
                            onChange={set}
                            placeholder="Please describe your partnership interest…"
                            className="w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-3.5 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:border-gray-300 font-medium text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Field>
              </div>

              {/* ── C: Schedule a Discussion ── */}
              <div>
                <SectionHeader id="C" label="Schedule a Discussion" />

                <div className="space-y-6">
                  {/* Schedule a Call checkbox */}
                  <Field label="Preferred Next Step" optional>
                    <label className="flex items-center gap-3 cursor-pointer group mt-1">
                      <div
                        onClick={() => setForm(p => ({ ...p, scheduleCall: !p.scheduleCall }))}
                        className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                          form.scheduleCall
                            ? "bg-primary border-primary"
                            : "bg-[#FAFAFC] border-gray-300 group-hover:border-primary/50"
                        }`}
                      >
                        {form.scheduleCall && (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() => setForm(p => ({ ...p, scheduleCall: !p.scheduleCall }))}
                        className={`text-sm font-medium transition-colors duration-200 ${form.scheduleCall ? "text-[#1A1A2E]" : "text-gray-500 group-hover:text-[#1A1A2E]"}`}
                      >
                        Schedule a Call
                      </span>
                    </label>
                  </Field>

                  {/* Calendly button — shown when checked */}
                  {form.scheduleCall && (
                    <div className="ml-8 animate-fade-in">
                      <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-7 py-3.5 bg-white border border-primary/30 rounded-xl text-primary text-sm font-semibold shadow-[0_4px_16px_rgba(82,3,128,0.12)] hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_8px_24px_rgba(82,3,128,0.28)] transition-all duration-300 group"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        Schedule a Call via Calendly
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* ── D: Additional Contact ── */}
              <div>
                <SectionHeader id="D" label="Additional Contact" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                  <Field label="Preferred Contact Person" optional>
                    <Input name="contactPerson" value={form.contactPerson} onChange={set} placeholder="Name of preferred contact" />
                  </Field>
                  <Field label="Contact Person Email" optional>
                    <Input name="contactPersonEmail" value={form.contactPersonEmail} onChange={set} type="email" placeholder="contact@example.com" />
                  </Field>
                </div>
              </div>

            </div>

            {/* Submit footer */}
            <div className="px-8 md:px-14 py-8 bg-gray-50/80 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
              <div className="flex flex-col gap-2 max-w-md">
                <div className="flex items-start gap-3 text-sm text-gray-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5 opacity-70">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <p>
                    Fields marked with <span className="text-primary font-bold">*</span> are required. Your data is handled securely and in accordance with our privacy policy.
                  </p>
                </div>
                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 md:px-12 py-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold tracking-[0.15em] uppercase rounded-xl shadow-[0_10px_25px_-5px_rgba(82,3,128,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(82,3,128,0.5)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex-shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                <span className={`flex items-center justify-center gap-3 transition-transform duration-300 ${isSubmitting ? "-translate-y-16" : "translate-y-0"}`}>
                  Submit Partnership Request
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isSubmitting ? "translate-y-0" : "translate-y-16"}`}>
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </span>
              </button>
            </div>

          </div>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.22s ease forwards; }
      ` }} />
    </div>
  );
}

