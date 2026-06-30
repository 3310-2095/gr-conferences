"use client";
import { useState } from "react";

const INSTITUTION_TYPES = ["University", "College", "Research Institute", "Corporate / Industry", "NGO / Non-Profit", "Government Body", "Media / Publication", "Startup", "Other"];

const PARTNERSHIP_TYPES = [
  "Technical Partnership",
  "Financial Partnership",
  "Publication Partnership",
  "Sponsorship Partnership",
  "EdTech Partnership",
  "Promotional / Media Partnership",
  "Startup Partnership",
  "Non-Government / Community Partnership",
  "Academic / Institutional Partnership",
  "Other",
];

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Brazil","Brunei","Bulgaria","Cambodia","Cameroon","Canada",
  "Chile","China","Colombia","Croatia","Cuba","Cyprus","Czech Republic","Denmark",
  "Ecuador","Egypt","Estonia","Ethiopia","Finland","France","Georgia","Germany","Ghana",
  "Greece","Guatemala","Hungary","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Latvia","Lebanon",
  "Libya","Lithuania","Luxembourg","Malaysia","Maldives","Malta","Mexico","Moldova",
  "Mongolia","Morocco","Myanmar","Nepal","Netherlands","New Zealand","Nigeria","Norway",
  "Oman","Pakistan","Palestine","Panama","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Saudi Arabia","Serbia","Singapore","Slovakia","Slovenia",
  "South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Tunisia","Turkey","Turkmenistan",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay",
  "Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

type F = {
  /* A — Institution Details */
  institutionName: string;
  institutionType: string;
  country: string;
  /* B — Contact Person */
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  /* C — Partnership Type */
  partnershipTypes: string[];
  otherPartnershipType: string;
  /* D — Partnership Details */
  partnershipIntent: string;
  collaborationArea: string;
  expectedOutcomes: string;
  /* E — Additional Information */
  websiteUrl: string;
  additionalNotes: string;
};

const EMPTY: F = {
  institutionName: "", institutionType: "", country: "",
  contactName: "", designation: "", email: "", phone: "",
  partnershipTypes: [], otherPartnershipType: "",
  partnershipIntent: "", collaborationArea: "", expectedOutcomes: "",
  websiteUrl: "", additionalNotes: "",
};

export default function PartnerPage() {
  const [form, setForm] = useState<F>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const togglePartnershipType = (val: string) => {
    setForm(p => ({
      ...p,
      partnershipTypes: p.partnershipTypes.includes(val)
        ? p.partnershipTypes.filter(t => t !== val)
        : [...p.partnershipTypes, val],
    }));
  };

  const hasOther = form.partnershipTypes.includes("Other");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  /* ── Success ── */
  if (submitted) {
    return (
      <div className="bg-[#FAFAFC] min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden" style={{ paddingTop: 72 }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[80px] rounded-full z-0 pointer-events-none" />
        <div className="max-w-md w-full p-10 md:p-14 bg-white/80 backdrop-blur-2xl border border-white/40 rounded-xl text-center relative z-10 shadow-[0_20px_60px_-15px_rgba(82,3,128,0.1)] overflow-hidden">
          <div className="w-24 h-24 rounded-xl flex items-center justify-center mx-auto mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 relative shadow-inner">
            <div className="absolute inset-0 rounded-xl animate-glow-pulse opacity-50" />
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Partnership Request Received</p>
          <h2 className="text-4xl font-heading text-[#1A1A2E] mb-5">Thank You!</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-10">
            Your partnership application has been received. Our team will review your submission and get back to you within 5–7 business days.
          </p>
          <a href="/" className="inline-flex items-center justify-center w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 rounded-xl shadow-[0_8px_20px_rgba(82,3,128,0.25)] transition-all hover:-translate-y-1 text-sm tracking-wide uppercase">
            Return to Home
          </a>
        </div>
      </div>
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
                  Become a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#8A2BE2]">Partner</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                  Partner with GR Conferences to shape the future of global academic research. Fill in the details below and our team will be in touch.
                </p>
              </div>
            </div>

            {/* Form body */}
            <div className="p-8 md:p-14 space-y-12 relative z-10 bg-white/60">

              {/* ── A: Institution Details ── */}
              <div>
                <SectionHeader id="A" label="Institution Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                  <div className="md:col-span-2">
                    <Field label="Institution / Organization Name" required>
                      <Input name="institutionName" value={form.institutionName} onChange={set} placeholder="e.g. University of Cambridge" required />
                    </Field>
                  </div>
                  <Field label="Type of Institution" required>
                    <Select name="institutionType" value={form.institutionType} onChange={set} options={INSTITUTION_TYPES} placeholder="Select type" required />
                  </Field>
                  <Field label="Country" required>
                    <Select name="country" value={form.country} onChange={set} options={COUNTRIES} placeholder="Select country" required />
                  </Field>
                </div>
              </div>

              {/* ── B: Contact Person ── */}
              <div>
                <SectionHeader id="B" label="Contact Person Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                  <Field label="Full Name" required>
                    <Input name="contactName" value={form.contactName} onChange={set} placeholder="e.g. Dr. John Smith" required />
                  </Field>
                  <Field label="Designation" optional>
                    <Input name="designation" value={form.designation} onChange={set} placeholder="e.g. Director of Research" />
                  </Field>
                  <Field label="Email Address" required>
                    <Input name="email" value={form.email} onChange={set} type="email" placeholder="you@institution.edu" required />
                  </Field>
                  <Field label="Phone Number" optional>
                    <Input name="phone" value={form.phone} onChange={set} type="tel" placeholder="+1 234 567 8900" />
                  </Field>
                </div>
              </div>

              {/* ── C: Partnership Type ── */}
              <div>
                <SectionHeader id="C" label="Partnership Type" hint="Select all that apply" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {PARTNERSHIP_TYPES.map((type) => {
                    const checked = form.partnershipTypes.includes(type);
                    return (
                      <label
                        key={type}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-sm border cursor-pointer transition-all duration-200 select-none"
                        style={{
                          borderColor: checked ? "var(--primary)" : "#e5e7eb",
                          background: checked ? "rgba(82,3,128,0.05)" : "#FAFAFC",
                        }}
                      >
                        {/* Custom checkbox */}
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200"
                          style={{
                            borderColor: checked ? "var(--primary)" : "#d1d5db",
                            background: checked ? "var(--primary)" : "white",
                          }}
                        >
                          {checked && (
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="2 6 5 9 10 3" />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => togglePartnershipType(type)}
                        />
                        <span className="text-sm font-medium" style={{ color: checked ? "var(--primary)" : "#374151" }}>
                          {type}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* "Other" text field */}
                {hasOther && (
                  <div className="mt-1">
                    <Field label="Please specify" required>
                      <Input
                        name="otherPartnershipType"
                        value={form.otherPartnershipType}
                        onChange={set}
                        placeholder="Describe your partnership type"
                        required={hasOther}
                      />
                    </Field>
                  </div>
                )}
              </div>

              {/* ── D: Partnership Details ── */}
              <div>
                <SectionHeader id="D" label="Partnership Details" />
                <div className="space-y-5">
                  <Field label="Briefly Describe Your Partnership Intent" required>
                    <textarea
                      name="partnershipIntent"
                      value={form.partnershipIntent}
                      onChange={set}
                      rows={4}
                      placeholder="Describe what you hope to achieve through this partnership..."
                      required
                      className="w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-4 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none shadow-sm hover:border-gray-300 text-sm"
                    />
                  </Field>
                  <Field label="Area of Collaboration / Interest" optional>
                    <textarea
                      name="collaborationArea"
                      value={form.collaborationArea}
                      onChange={set}
                      rows={3}
                      placeholder="e.g. Joint research, co-branding, curriculum development..."
                      className="w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-4 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none shadow-sm hover:border-gray-300 text-sm"
                    />
                  </Field>
                  <Field label="Expected Outcomes / Goals" optional>
                    <textarea
                      name="expectedOutcomes"
                      value={form.expectedOutcomes}
                      onChange={set}
                      rows={3}
                      placeholder="What outcomes are you expecting from this collaboration?"
                      className="w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-4 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none shadow-sm hover:border-gray-300 text-sm"
                    />
                  </Field>
                </div>
              </div>

              {/* ── E: Additional Information ── */}
              <div>
                <SectionHeader id="E" label="Additional Information" />
                <div className="space-y-5">
                  <Field label="Website / Organization Profile" optional>
                    <Input
                      name="websiteUrl"
                      value={form.websiteUrl}
                      onChange={set}
                      type="url"
                      placeholder="https://www.yourorganization.com"
                    />
                  </Field>
                  <Field label="Additional Notes" optional>
                    <textarea
                      name="additionalNotes"
                      value={form.additionalNotes}
                      onChange={set}
                      rows={3}
                      placeholder="Any other information you'd like to share with our team..."
                      className="w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-4 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none shadow-sm hover:border-gray-300 text-sm"
                    />
                  </Field>
                </div>
              </div>

            </div>

            {/* Submit footer */}
            <div className="px-8 md:px-14 py-8 bg-gray-50/80 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
              <div className="flex items-start gap-3 text-sm text-gray-500 max-w-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5 opacity-70">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p>
                  Fields marked with <span className="text-primary font-bold">*</span> are required. Your data is handled securely and in accordance with our privacy policy.
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || form.partnershipTypes.length === 0}
                className="w-full md:w-auto px-10 md:px-12 py-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold tracking-[0.15em] uppercase rounded-xl shadow-[0_10px_25px_-5px_rgba(82,3,128,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(82,3,128,0.5)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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

      <style dangerouslySetInnerHTML={{ __html: `@keyframes shimmer { 100% { transform: translateX(100%); } }` }} />
    </div>
  );
}

/* ── Section header ── */
function SectionHeader({ id, label, hint }: { id: string; label: string; hint?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold text-xs border border-primary/15">{id}</span>
      <h3 className="text-sm font-bold text-[#1A1A2E] uppercase tracking-[0.1em]">{label}</h3>
      {hint && <span className="text-xs text-gray-400 font-normal ml-1">({hint})</span>}
    </div>
  );
}

/* ── Field wrapper ── */
function Field({ label, required, optional, children }: {
  label: string; required?: boolean; optional?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-sm font-semibold text-[#1A1A2E] flex items-center gap-1.5">
        {label}
        {required && <span className="text-primary text-lg leading-none">*</span>}
        {optional && <span className="text-gray-400 text-xs font-medium ml-1 bg-gray-100 px-2 py-0.5 rounded-xl">(Optional)</span>}
      </label>
      {children}
    </div>
  );
}

/* ── Input ── */
function Input({ name, value, onChange, placeholder, type = "text", required }: {
  name: keyof F; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <input name={name} value={value} onChange={onChange} type={type}
      placeholder={placeholder} required={required}
      className="w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-3.5 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:border-gray-300 font-medium text-sm" />
  );
}

/* ── Select ── */
function Select({ name, value, onChange, options, placeholder, required }: {
  name: keyof F; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="relative">
      <select name={name} value={value} onChange={onChange} required={required}
        className={`w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-3.5 outline-none transition-all duration-300 hover:border-gray-300 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 appearance-none cursor-pointer shadow-sm font-medium text-sm ${value ? "text-[#1A1A2E]" : "text-gray-400"}`}>
        <option value="" disabled>{placeholder ?? "Select…"}</option>
        {options.map(o => <option key={o} value={o} className="text-[#1A1A2E]">{o}</option>)}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={value ? "text-primary" : "text-gray-400"}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
