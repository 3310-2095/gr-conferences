"use client";
import { useState } from "react";
import { TITLES, PRONOUNS, DEGREES, EXPERIENCE_LEVELS, YEARS_OF_EXPERIENCE, CONFERENCES, COUNTRIES } from "../../lib/formData";
import { SectionHeader, Field, Input, Select } from "../_shared/FormFields";

type F = {
  title: string; firstName: string; middleName: string; lastName: string; pronouns: string;
  degree: string; currentExperience: string; yearsExperience: string;
  publications: string; briefProfile: string; advisoryRoles: string; peerReview: string;
  orcid: string; googleScholar: string; researcherId: string;
  scopusId: string; researchGate: string; otherProfile: string;
  conference: string; researchArea: string;
  affiliation: string; additionalAffiliation: string;
  email: string; institutionalEmail: string; country: string;
};

const EMPTY: F = {
  title: "", firstName: "", middleName: "", lastName: "", pronouns: "",
  degree: "", currentExperience: "", yearsExperience: "",
  publications: "", briefProfile: "", advisoryRoles: "", peerReview: "",
  orcid: "", googleScholar: "", researcherId: "",
  scopusId: "", researchGate: "", otherProfile: "",
  conference: "", researchArea: "",
  affiliation: "", additionalAffiliation: "",
  email: "", institutionalEmail: "", country: "",
};

export default function AdvisoryPage() {
  const [form, setForm]           = useState<F>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleBriefProfile = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val   = e.target.value;
    const words = val.trim() === "" ? 0 : val.trim().split(/\s+/).length;
    if (words <= 100) { setWordCount(words); setForm(p => ({ ...p, briefProfile: val })); }
  };

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
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Application Received</p>
          <h2 className="text-4xl font-heading text-[#1A1A2E] mb-5">Thank You!</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-10">
            Your advisory board application has been submitted successfully. Our team will review your profile and respond within 5–7 business days.
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
                  Advisory Board <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#8A2BE2]">Application</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                  Join our distinguished advisory board and help shape the direction of global academic conferences. Complete all required fields to submit your application.
                </p>
              </div>
            </div>

            {/* Form body */}
            <div className="p-8 md:p-14 space-y-12 relative z-10 bg-white/60">

              {/* ── A: Personal Details ── */}
              <div>
                <SectionHeader id="A" label="Personal Details" />

                {/* Title + First | Middle + Last */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                  <div className="grid grid-cols-3 gap-x-4">
                    <div className="col-span-1">
                      <Field label="Title" required>
                        <Select name="title" value={form.title} onChange={set} options={TITLES} placeholder="Title" required />
                      </Field>
                    </div>
                    <div className="col-span-2">
                      <Field label="First Name" required>
                        <Input name="firstName" value={form.firstName} onChange={set} placeholder="First name" required />
                      </Field>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <Field label="Middle Name" optional>
                      <Input name="middleName" value={form.middleName} onChange={set} placeholder="Middle" />
                    </Field>
                    <Field label="Last Name" required>
                      <Input name="lastName" value={form.lastName} onChange={set} placeholder="Last name" required />
                    </Field>
                  </div>
                </div>

                {/* Pronouns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                  <Field label="Preferred Pronouns" optional>
                    <Select name="pronouns" value={form.pronouns} onChange={set} options={PRONOUNS} placeholder="Select pronouns" />
                  </Field>
                </div>
              </div>

              {/* ── B: Academic Degree & Experience ── */}
              <div>
                <SectionHeader id="B" label="Academic Degree & Experience" />

                {/* Degree + Current Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                  <Field label="Highest Academic Degree" required>
                    <Select name="degree" value={form.degree} onChange={set} options={DEGREES} placeholder="Select degree" required />
                  </Field>
                  <Field label="Current Academic / Professional Experience" required>
                    <Select name="currentExperience" value={form.currentExperience} onChange={set} options={EXPERIENCE_LEVELS} placeholder="Select experience" required />
                  </Field>
                </div>

                {/* Years + Publications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                  <Field label="Years of Experience" required>
                    <Select name="yearsExperience" value={form.yearsExperience} onChange={set} options={YEARS_OF_EXPERIENCE} placeholder="Select range" required />
                  </Field>
                  <Field label="Number of Publications" required>
                    <Input name="publications" value={form.publications} onChange={set} type="number" placeholder="e.g. 45" required />
                  </Field>
                </div>

                {/* Brief Profile — word counter */}
                <div className="mb-5">
                  <Field label="Brief Profile" optional hint="Max 100 words · Written in third person in English">
                    <div className="relative">
                      <textarea
                        name="briefProfile"
                        value={form.briefProfile}
                        onChange={handleBriefProfile}
                        rows={4}
                        placeholder="Write a short professional bio in third person…"
                        className="w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-4 pb-10 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none shadow-sm hover:border-gray-300 text-sm"
                      />
                      <div className={`absolute bottom-3 right-3 text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-white shadow-sm border border-gray-100 ${wordCount >= 95 ? "text-red-500" : "text-gray-400"}`}>
                        {wordCount} / 100
                      </div>
                    </div>
                  </Field>
                </div>

                {/* Advisory Roles */}
                <div className="mb-5">
                  <Field label="Previous Advisory / Editorial Roles" optional hint="List any advisory boards, editorial boards or programme committees served on">
                    <textarea
                      name="advisoryRoles"
                      value={form.advisoryRoles}
                      onChange={set}
                      rows={4}
                      placeholder="e.g. Editorial Board Member – Journal of AI Research (2020–present), Programme Committee – ICML 2022…"
                      className="w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-4 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none shadow-sm hover:border-gray-300 text-sm"
                    />
                  </Field>
                </div>

                {/* Peer Review */}
                <Field label="Peer Review Experience" optional>
                  <textarea
                    name="peerReview"
                    value={form.peerReview}
                    onChange={set}
                    rows={4}
                    placeholder="Describe your peer review experience — journals, conferences, years of reviewing…"
                    className="w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-4 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none shadow-sm hover:border-gray-300 text-sm"
                  />
                </Field>
              </div>

              {/* ── C: Academic Profiles ── */}
              <div>
                <SectionHeader id="C" label="Academic Profiles" />

                {/* ORCID + Google Scholar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                  <Field label="ORCID iD" required hint="Format: 0000-0000-0000-0000">
                    <Input name="orcid" value={form.orcid} onChange={set} placeholder="0000-0000-0000-0000" required />
                  </Field>
                  <Field label="Google Scholar Profile" required>
                    <Input name="googleScholar" value={form.googleScholar} onChange={set} type="url" placeholder="https://scholar.google.com/…" required />
                  </Field>
                </div>

                {/* ResearcherID + Scopus */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                  <Field label="Web of Science ResearcherID" optional>
                    <Input name="researcherId" value={form.researcherId} onChange={set} placeholder="e.g. A-1234-2024" />
                  </Field>
                  <Field label="Scopus Author ID" optional>
                    <Input name="scopusId" value={form.scopusId} onChange={set} placeholder="e.g. 57123456789" />
                  </Field>
                </div>

                {/* ResearchGate + Other */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                  <Field label="ResearchGate Profile" optional>
                    <Input name="researchGate" value={form.researchGate} onChange={set} type="url" placeholder="https://www.researchgate.net/…" />
                  </Field>
                  <Field label="Other Profile / Personal Website" optional>
                    <Input name="otherProfile" value={form.otherProfile} onChange={set} type="url" placeholder="https://yourwebsite.com" />
                  </Field>
                </div>
              </div>

              {/* ── D: Conference Preference & Expertise ── */}
              <div>
                <SectionHeader id="D" label="Conference Preference & Expertise" />

                <div className="grid grid-cols-1 gap-y-5">
                  <Field label="Preferred Conference" required>
                    <Select name="conference" value={form.conference} onChange={set} options={CONFERENCES} placeholder="Choose a conference" required />
                  </Field>
                  <Field label="Research Area / Expertise" optional>
                    <textarea
                      name="researchArea"
                      value={form.researchArea}
                      onChange={set}
                      rows={3}
                      placeholder="e.g. Artificial Intelligence, Biomedical Engineering, Climate Science…"
                      className="w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-4 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none shadow-sm hover:border-gray-300 text-sm"
                    />
                  </Field>
                </div>
              </div>

              {/* ── E: Affiliations & Contact ── */}
              <div>
                <SectionHeader id="E" label="Affiliations & Contact" />

                {/* Affiliation + Additional Affiliation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                  <Field label="Affiliation" required hint="Primary institution">
                    <Input name="affiliation" value={form.affiliation} onChange={set} placeholder="e.g. University of Cambridge" required />
                  </Field>
                  <Field label="Additional Affiliation" optional>
                    <Input name="additionalAffiliation" value={form.additionalAffiliation} onChange={set} placeholder="Secondary institution (if any)" />
                  </Field>
                </div>

                {/* Email + Institutional Email + Country */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5">
                  <Field label="Email ID" required>
                    <Input name="email" value={form.email} onChange={set} type="email" placeholder="you@example.com" required />
                  </Field>
                  <Field label="Institutional Email ID" optional>
                    <Input name="institutionalEmail" value={form.institutionalEmail} onChange={set} type="email" placeholder="you@university.edu" />
                  </Field>
                  <Field label="Country" required>
                    <Select name="country" value={form.country} onChange={set} options={COUNTRIES} placeholder="Select country" required />
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
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 md:px-12 py-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold tracking-[0.15em] uppercase rounded-xl shadow-[0_10px_25px_-5px_rgba(82,3,128,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(82,3,128,0.5)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex-shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                <span className={`flex items-center justify-center gap-3 transition-transform duration-300 ${isSubmitting ? "-translate-y-16" : "translate-y-0"}`}>
                  Submit Advisory Board Application
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

